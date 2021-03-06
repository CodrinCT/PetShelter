const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser(async (id,done)=>{
try{
const user = await User.findById(id);
done(null, user)
}catch(error){
done(error, null)
}
})

passport.use('local', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:false
}, async (email, password, done)=>{
    try{
        const user = await User.findOne({'email':email});
        if(!user){
            return done(null, false,{message:'Unknown user!'})
        }
        const isValid = User.comparePassword(password, user.password)
        if(isValid){
            return done(null, user)
        }else{
            return done(null, false, {message:'Unknown password'})
        }
    }catch(error){
        return done(error, false)
    }
}))