const express=require('express');
const app=express();
app.get('/users/:id',(req,res)=>{
    const userId=req.params.id;
    res.send(`user ID: ${userId}`);
});
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});