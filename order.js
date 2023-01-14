const express=require('express')
const app=express();
app.use('/product',productRoutes);
app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status ||500);
    res.json({
        error:{
            message :error.message
        }
    });
});
const router=express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Orders were fetched'
    });
});
router.post('/',(req,res,next)=>{
    const order={
        productId:req.body.productId,
        quantity:req.body.quantity
    };
    res.status(201).json({
        message:'Order was created ',
        order:order
    });
});
module.exports