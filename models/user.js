const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    userName:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    secretToken:{type:String},
    verified:{type:Boolean, default:false}
},
{
    collection:'users'
}
)

const model = mongoose.model('userSchema', userSchema)

module.exports = model;
module.exports.comparePassword = async (inputPassword,hashedPassord)=>{
    try{
        return await bcrypt.compare(inputPassword, hashedPassord);
    }catch(error){
        throw new Error('Comparing failed', error);
    }
}
