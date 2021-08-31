const mongoose = require('mongoose');
require('dotenv').config()

const URI = process.env.MONGODB_URL;

const connectionDB = async()=>{
   await mongoose.connect(URI, {useUnifiedTopology:true,useNewUrlParser:true});
   console.log('DB connected!...');
}

module.exports = connectionDB;