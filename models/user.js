const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    userName:{type:String},
    email:{type:String},
    password:{type:String},
},
{
    collection:'users'
}
)

const model = mongoose.model('userSchema', userSchema)

module.exports = model;

