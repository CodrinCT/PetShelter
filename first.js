const http = require('http');
const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('Home Page').json();
    res.end();
});




app.listen(5000,()=>{
console.log('Server is running on port 5000');
})
