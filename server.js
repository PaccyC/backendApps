const express=require("express");
const app=express();
app.use(logger);
app.get('/',(req,res)=>{
    console.log('Home page');
    res.send('Home page ');
});
app.get('/users',auth,(req,res)=>{
    console.log('Users page');
    res.send('Users page');
})
function logger(req,res,next){u
    // console.log('Log');
    console.log(req.originalUrl)
    next();
}
function auth(req,res,next){
    if(req.query.admin==='true'){
        next();

    }
    else{
        res.send("No Auth")
    }
    next();
}

app.listen(6500);