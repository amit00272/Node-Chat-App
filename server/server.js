const path=require('path');
const express=require('express');


const public_path=path.join(__dirname,'../public');
const port=process.env.PORT || 3000 ;
var app=express();

//adding express middleware
app.use(express.static(public_path));



app.get('/',(req,res)=>{

   res.send("Hi this is your home page");
});


app.listen(port,()=>{

    console.log(`Server is fired up and listing on port ${port} `);
});

console.log(public_path);