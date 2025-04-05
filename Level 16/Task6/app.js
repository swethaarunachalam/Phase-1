const express=require('express');
const app=express();

app.use(express.static('Public'));
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});