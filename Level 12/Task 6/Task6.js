const fs = require('fs');

fs.rename('text.txt', 'sample.txt', (err) => {

    if(err){
        console.log('error renaming file:',err)
    }else{
        console.log('file renamed successfully from text.txt to sample.txt')
    }
});