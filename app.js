const express = require('express');
const app = express();
const connectionDB = require('./DBconection/connection')
const user = require('./models/user')
const bodyParser = require('body-parser');
const pet = require('./models/pet')
const port = process.env.PORT || 3000;
connectionDB();
let newUser = new user({
    userName:'Codrin',
    email:'codrin@yahoo.com',
    password:'codrin123'
})
// app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(__dirname, +'/css'));

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html')
})

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    console.log(req.body);
    const foundUser = await user.findOne({
        email
    })
    console.log(foundUser.password);
    if(foundUser.password === password){
    res.status(200).redirect('/pets-search');
    }else{
        console.log('in the else!')
        res.status(500).json()
    }
})

app.get('/pets-search',(req,res)=>{
    res.sendFile(__dirname+'/pages/pets_search.html')
})

app.get(__dirname+'/register',(req,res)=>{
res.sendFile(__dirname+'/pages/register.html')
})

app.post(__dirname + '/register',(req,res)=>{
user.create(newUser);
res.send('user created')
})

app.post('/pets-search/:pet', async(req,res)=>{
    const petsArr = [];
    const petParam = req.params.pet.toString();

     const pets = await pet.find({});

     if(pets){
        pets.forEach((element)=>{
        if(element.petCategory.toLowerCase()==petParam.toLowerCase() || element.petName==petParam || element.petAge==petParam || element.petWeight==petParam || element.petHealth==petParam || element.petDinstinctiveFeatures==petParam){
            petsArr.push(element);
        }
     })
     res.send(petsArr);
     }
})

app.listen(port,()=>{
    console.log('Server is running...');
})
