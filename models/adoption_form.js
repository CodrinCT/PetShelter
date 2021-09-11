const mongoose = require('mongoose')

const adoptionSchema = new mongoose.Schema({
    name:String,
    email: String,
    time_of_visit:Date,
    petId: String
},{
    collection:'pet_adoption_forms'
}
)

const adoptionForms = mongoose.model('adoptionSchema',adoptionSchema)

module.exports = adoptionForms