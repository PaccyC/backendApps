const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.sendFile('index.html');

});
app.post('/submit-student-data',(req,res)=>{
const name=req.body.firstName +" "+req.body.lastName;
res.sendFile(name+ " Submitted Successfully!");

});
app.listen(50000,()=>{
    console.log('Node server is running..');
})
//post method
const xpress=require('express')
const path=require('path')
const fs=require('fs');