const express= require('express');
const app=express();

function stylePage(title, message) {
    return `
    <html>
    <head>
    <title>${title}</title>
    <style>
                body {
                    font-family: Arial, sans-serif;
                    background: grey;
                    color: white;
                    text-align: center;
                    padding-top: 100px;
                }
                h1 {
                    color: purple;
                    font-size: 3rem;
                }
                p {
                    font-size: 1.5rem;
                }
         </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p>${message}</p>
        </body>
    </html>
    `;
}
app.get('/',(req,res)=>{
    res.send(stylePage("Home","welcome to our homepage!"));
});
app.get('/About',(req,res)=>{
    res.send(stylePage("About","welcome to our Aboutpage!"));
});
app.get('/contact',(req,res)=>{
    res.send(stylePage("Contact","welcome to our Contactpage!"));
});

app.get('/services',(req,res)=>{
    res.send(stylePage("services","welcome to our servicespage!"));
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});