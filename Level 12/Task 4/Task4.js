const fs = require('fs');

const filepath = 'text.txt';

if(fs.existsSync(filepath)){
    console.log(`The file "${filepath}" exists.`);
}else{
    console.log(`the files is"${filepath} "dont notexists.`);
}