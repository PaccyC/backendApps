const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const bodyParser=require('body-parser')
const courses=[
    {id:1,name:'course1'},
     {id:2,name:'course2'},
      {id:3,name:'course3'}
    ]
app.get('/',(req,res)=>{
    res.send("Hello World")
});
app.get('/api/courses',(req,res)=>{
    // res.send([1,2,3,4,5]);
    res.send(courses)
})
app.post('/api/courses',(req,res)=>{
    const schema={
        name:Joi.string().min(3).required()
    };
   const result= Joi.validate(req.body,schema)
   console.log(result);
   if (result.error){
    res.status(400).send(result.error.details[0].message)
    return;
}
    if(!req.body.name ||req.body.length<3){
        req.status(400).send("The name is too short ");
        return;
    }
    const course={
        id:courses.length +1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.get('api/courses/:id',(req,res)=>{
    // res.send(req.query);
    const course= courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send("The course of given id is not avairable");
    res.send(course);
})

const port=process.env.PORT || 3222
app.listen(port,()=>{
    console.log(`The app is running on ${port}`);
})
