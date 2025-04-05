const express =require('express');
const app =express();
app.get('/search',(req,res)=>{
    const query = req.query.q;
    const limit = req.query.limit || 5; 

    if (!query) {
        res.send("Error: You must give a search like ?q=something");
    }else{
        res.send(`search for:${query},limit:${limit}`);
    }
});
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});