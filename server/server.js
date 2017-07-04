const path=require('path');
const http=require('http');
const express=require('express');
const SocketIO=require('socket.io');


const public_path=path.join(__dirname,'../public');
const port=process.env.PORT || 3000 ;
var app=express();
var server=http.createServer(app);
var io=SocketIO(server);

//adding express middleware
app.use(express.static(public_path));

io.on('connection',(socket)=>{

    console.log('new user connected');

    socket.on('disconnect',()=>{
        console.log("disconnected to server");

    });




    socket.on('createMessage',(message)=>{

        io.emit('newMessage',{

            from:message.from,
            text:message.text,
            createdAt:new Date()
        });
    });

});




server.listen(port,()=>{

    console.log(`Server is fired up and listing on port ${port} `);
});

