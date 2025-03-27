const fs = require ('fs');

const content ="hello,node.js!";

fs.writeFile("output.txt",content,'utf8',(err)=>{
    if(err){
        console.error('Error weiting to files:',err);
        return;
    }
console.log('file written succesfully')
    
});