const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
 const app=express();
 const Blog=require('./models/blog');
const res = require('express/lib/response');
const { findById } = require('./models/blog');
const { render } = require('express/lib/response');

 const dburl='mongodb://localhost:27017';
 mongoose.connect(dburl)
 .then((result) =>app.listen(5003))
 
 .catch((err)=>console.log(err))
 //register view engine
 app.set('view engine','ejs');

 //middleware and static files
 app.use(express.static('public'));
 app.use(express.urlencoded({extends:true}))

// app.listen(5001);
app.use((req,res,next)=>{
    console.log("The request is made");
    console.log('host:',req.hostname);
    console.log('path:',req.path);
    console.log('method',req.method);
    next();
})
//same as
app.use(morgan('dev'));

//Adding and saving data

app.get('/add-blog',(req,res)=>{
const blog=new  Blog({
    title:'new blog',
    snippet:'about my new blog',
    body:'more about my new blog'
});
blog.save()
.then((result)=>
res.send(result))
})
//  .catch((err)=>{
//  console.log(err);
//  });
 

app.get('/all-blogs',(req,res)=>{
Blog.find()
.then((result)=>{
    res.send(result);
})
.catch((err)=>{
    console.log(err);
});
})
app.get('/single-blog',(req,res)=>{
    Blog.findById('63c1e33e5240aefee4af4e4a')
    .then((result)=>{
       res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
})
//middleware and static files
// app.use(express.status( 'public')); 

app.get('/',(req,res)=>{
    res.redirect('/blogs');
    //   res.send('Home Page' );
    // const blogs=[
    //     {title:'paccy is a boy',snippets:'Paccy like his mother'},
    //     {title:'paccy is a boy',snippets:'Paccy like his mother'},
    //     {title:'paccy is a boy',snippets:'Paccy like his mother'},

    // ]
    // res.render('index2',{title:'Home',blogs});

    
}) 
app.post('/blogs',(req,res)=>{
    // console.log(req.body);
    const blog=new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id
    console.log(id);
   Blog.findById(id)
   .then(result=>{
    render('deatails',{blogs:result , title:'My blog'})
   })
})

app.get('/about',(req, res)=>{
    
    // res.send(' About Page' );
    // res.sendFile('./apps/index3.html',{root:__dirname})

res.render('about',{title:'about page'});

    
})
app.get('/404',(req,res)=>{
//     // res.send(' About Page' );
//     // res.sendFile('./apps/404.html',{root:__dirname})

})
//redirects
app.get('/about-me',(req,res)=>{
    res.redirect('/about')
})
//blog routes 
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
    res.render('index2',{title:'All blogs',blogs:result})
    })
    .catch(err=>{

    })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:"created blogs"});
})
//creating middleware functions using app.use() method
app.use((req,res)=>{
    res.status(404).render('404');
    // .sendFile('./apps/404.html',{root:__dirname})
})
// app.listen(5002,()=>{

//     console.log('The server is runnning on the port 5000...');
// })