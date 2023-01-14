//web servers
var express = require('express');
var app = express();

// // define routes here..

// var server = app.listen(5000, function () {
    //     console.log('Node server is running..');
    // });
    
    
    
const bodyParser=require("body-parser");


app.get('/',function(req,res){
    res.send('<html><body><h1>Hello World</h1></body></html>')

});
app.post("/submit-data",function(req,res){
    res.send('POST Request');

});
// app.put("/update-data",function(req,res){
// res.send("Put Request");

// });
// app.delete("/delete-data",function(req,res){
//     res.send("Delete Request");
// });
// //Handle POST Route in express.js

// app.use(bodyParser.urlencoded({extended:false}));

// app.post('/submit-student-data',function(req,res){
//     var name=req.body.firstName +" "+req.body.lastName;
//     res.send(name+" Submitted Successfully!");
// });

const port=process.env.port || 7000;
app.listen(port,()=>{
    console.log(`the shit is running on port ${port}`)
})