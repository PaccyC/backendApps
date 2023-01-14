const express=require("express");
const app=express();
const morgan=require("morgan");
const bodyParser=requre("body-parser");
const productRoutes=require('./api/routes/ptoducts');
const orderRoutes=require("./api/routes/orders");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({exetended: false}));
app.use(bodyParser.json());
//Routes which should handle requests
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use((req,res,next)=>{
    const error =new Error('Not found');
    error.status=404;
}
    )