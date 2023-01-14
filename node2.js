const http=require('http');
const fs=require('fs');
const req = require('express/lib/request');
const res = require('express/lib/response');
const server=http.createServer((req,res) =>{
// res.send();
// console.log(req.url,req.method);
//setting header
res.setHeader('Content-Type','text/html');
res.write("<p>Hello Paccy</p>");
fs.readFile("./apps/index3.html",(err,success)=>{
    if(err){
        console.log(err);
        res.end();
    }
    else{
        console.log( success);
        res.statusCode=200;
        res.end();
    }
});


})
let path='./apps/';
switch(req.url){
    case '/':
    path+= 'index3.html'
    res.status(200);
    break;
    case '/about-me':
        res.status(301);
    res.setHeader('Location','/');    
    case '/index2':
        path +='index2.html'
        res.status(200);
        break
        default:
            path+='404.html'
            res.status(404);
            break;
}

server.listen(3000,()=>{
    console.log("The server is running on port 3000 ....");
})