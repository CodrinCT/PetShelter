const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express();
const connectionDB = require('./DBconection/connection')
const user = require('./models/user')
const pet = require('./models/pet')
const nodemailer = require('nodemailer');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const randomString = require('randomstring')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const path = require('path');
const adoptionForms = require('./models/adoption_form');

const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

OAuth2_client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})
const port = process.env.PORT || 5000;
connectionDB();
require('dotenv').config()

const joiSchema = Joi.object().keys({
    userName: Joi.string().alphanum().min(5).max(20).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','ro'] } }).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(session({
    name: 'sid',
    cookie:{
        sameSite:true,
        secure: false,
        maxAge: Number(process.env.TWO_HOURS)
    },
    resave:false,
    saveUninitialized:false,
    secret : process.env.ACCES_TOKEN_SECRET,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URL
    })
}))

app.set('trust proxy',1)
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(express.static(__dirname, +'/style'));

app.use((req,res,next)=>{
    const splitUrl = req.url.toString().split('/');
    // Change the splitUrl array selection when you work locally
    if(req.url !=='/login' && req.url !=='/' && req.url !=='/register' && req.url !=='/logout' && req.url !== '/verify/'+splitUrl[2]+'/'+splitUrl[3] && req.url !=='favicon.ico' && req.url !== '/petprofile/:petId'){
        const {userId} = req.session
    if(userId){
        if(req.session.userId === userId){ 
        return next()
        }
        else{
        console.log('userId is incorect');
        return res.redirect('/')
        }
    }else{
    return res.redirect('/')
    }
    }
next()
})

app.get('/logout', (req,res)=>{
req.session.destroy((err)=>{
    console.log(err);
})
res.clearCookie('sid').redirect('/');
})

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html')
})

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    console.log(req.body);
    const foundUser = await user.findOne({
       'email':email
    })
    if (foundUser) {
    const comparison = await bcrypt.compare(password, foundUser.password);
    if(comparison == true && foundUser.verified == true){
    req.session.userId = foundUser._id;
    res.redirect('/pets-search');
    }else if(foundUser.verified == false){
     res.send({err:'You need to verify your account first'})
    }else if(comparison == false){
        res.send({err:'The password is incorrect!'})
    }
    }else{
        console.log('user not found');
    }
})

app.get('/pets-search',(req,res)=>{
    res.sendFile(__dirname+'/pages/pets_search.html')
})

app.get('/register',(req,res)=>{
res.sendFile(__dirname+'/pages/register.html')
})

app.post('/register', async (req,res)=>{

    const body = req.body;
    const validated = joiSchema.validate(body);
    const {userName,email,password} = req.body
    const securePassword = await bcrypt.hash(password, 10)

    //generate secret token
    const secretToken =  randomString.generate()
    if(validated){
       const createdUser = await user.create({
            'userName':userName,
            'email':email,
            'password':securePassword, 
            'secretToken':secretToken
        })
 let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken:process.env.ACCES_TOKEN
        },
        // tls:{
        //     rejectUnauthorized:false
        // }
    });

    let mailOptions={
        form:`"Pet Shelter" <${process.env.GMAIL_USER}>`,
        to: email,
        subject:'Verify your account',
        text: "Hello world",
        html:`<h1>Hello, please click the link bellow to verify your account</h1>
        <span>Link: </span><a href="${process.env.DOMAIN}/verify/${createdUser.id}/${createdUser.secretToken}">${process.env.DOMAIN}/verify/${createdUser.id}/${createdUser.secretToken}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);
    })
    res.status(200).redirect('/')
    }else if(validated.error){
        send(error)
    }
    })

app.get('/verify/:id/:token', async(req, res)=>{
    try{
    const token = req.params.token;
    const id= req.params.id;
    const User = await user.findById(id);
    if(User.secretToken == token){
        User.verified = true;
        await User.save();
        res.redirect('/');
    }
    }catch(error){
        console.log(error);
    }
})

app.post('/pets-search', async(req,res)=>{
    const body = req.body;
    const {petCategory, petAge, petWeight, petHealth} = body
    const keyArr = []
    const valueArr=[]
    let viableKey;
    const finalArr={};
   for(const key in body){
        if(body[key] !== ''){
            keyArr.push(key)
            valueArr.push(body[key])
        }
            for(let i = 0; i< keyArr.length;i++){
                viableKey = keyArr[i]
                finalArr[viableKey] =  valueArr[i].toLowerCase()
            }
        }
    if (keyArr.length < 4) {
        const pets = await pet.find(finalArr);
        console.log(pets);
        res.send(pets)
    
    }else{
         const pets = await pet.find({
             'petCategory':petCategory,
             'petAge':petAge,
             'petWeight':petWeight,
             'petHealth':petHealth
         });
         res.send(pets)
    }
})

app.get('/petprofile/:petId',async(req,res)=>{
     const id = req.params.petId;
    console.log('pet id: '+id);

    const foundPet = await pet.findById(id)
res.render('pet_profile_page',{
    thePet:foundPet
})
})

app.post('/petprofile/:petId', async(req,res)=>{
    const {name, email, date, petId} = req.body
    console.log(req.body);
    console.log(petId);
    try{
    await adoptionForms.create({
        'name':name,
        'email':email,
        'time_of_visit':date,
        'petId': petId
    })
        res.sendStatus(200)
    }catch(e){
        res.sendStatus(500)
    }
})

app.listen(port,()=>{
    console.log('Server is running...');
})
