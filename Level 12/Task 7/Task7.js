const fs =require('fs');

const dirName = 'new_floder';

if(fs.existsSync(dirName)){
    fs.mkdir(dirName,(err)=>{
        if(err){
            console.log("error creating directory:",err)
        }else{
            console.log('directory "new-floder" created successfully');
        }
    });
}else{
    console.log('directory "new-floder"already exist' )
}