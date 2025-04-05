const express=require('express');
const app=express();

const users=[
    {id:1,name:"swetha",email:"swethaarunachalam21@gmail.com"},
     {id:2,name:"ajay",email:"ajay@gmail.com"},
     {id:3,name:"padma",email:"padma@gamil.com"}
];

app.get('/api/users',(req,res)=>{
    res.json(users);
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});
