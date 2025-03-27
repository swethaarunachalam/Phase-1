const fs = require('fs');

const sourcefile ='source.txt';
const destinationfile ='destination.txt';

if(!fs.existsSync(destinationfile)){
    fs.copyFile(sourcefile,destinationfile,(err=>{
        if(err){
            console.log('error copying file:',err)
            
        }else{
            console.log('file coped successfully ${sourcefile} to ${destinationfile}')

        }
    }));
}else{
console.log(`file "${destinationfile}" already exists.copy operation skipped.`)
    }
