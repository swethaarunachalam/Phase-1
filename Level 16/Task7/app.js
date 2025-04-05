const express=require('express');
const app=express();
function localDetails(req,res,next){
    const time=new Date().toISOString();
    const method=req.method;
    const url=req.url;
    console.log(`[${time}],${method},${url}`);
    next();
};
app.use(localDetails);

app.get('/',(req,res)=>{
    res.send("Home page");
});
app.get('/contact',(req,res)=>{
    res.send("contact page");
});
app.get('/About',(req,res)=>{
    res.send("About page");
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});


