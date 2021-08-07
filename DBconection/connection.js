const mongoose = require('mongoose');

const URI = "mongodb+srv://codrin:codrin123@first.bgqmf.mongodb.net/NodeJsDB?retryWrites=true&w=majority";

const connectionDB = async()=>{
   await mongoose.connect(URI, {useUnifiedTopology:true,useNewUrlParser:true});
   console.log('DB connected!...');
}

module.exports = connectionDB;