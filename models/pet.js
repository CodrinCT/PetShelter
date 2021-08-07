const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    petCategory:{type:String},
    petName:{type:String},
    petAge:{type:String},
    petWeight:{type:String},
    petHealth:{type:String},
    petDinstinctiveFeatures:{type:String},
},{
    collection:'pets'
})

 const pet =  mongoose.model('petSchema', petSchema)

 module.exports = pet;