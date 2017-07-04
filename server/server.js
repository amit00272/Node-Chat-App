const path=require('path');
const http=require('http');
const express=require('express');
const SocketIO=require('socket.io');

var {generateMessage,generateLocationMessage}=require('./utils/message');

const public_path=path.join(__dirname,'../public');
const port=process.env.PORT || 3000 ;
var app=express();
var server=http.createServer(app);
var io=SocketIO(server);

//adding express middleware
app.use(express.static(public_path));

io.on('connection',(socket)=>{

    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat App"));

    socket.broadcast.emit('newMessage',generateMessage("Admin","New User Joined"));


    socket.on('disconnect',()=>{
        console.log("disconnected to server");

    });




    socket.on('createMessage',(message,callback)=>{

        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();

    });


    socket.on("createLocationMsg",(coords)=>{
      io.emit('newLocationMessage',generateLocationMessage('User',coords.latitude,coords.longitude))

    });

});




server.listen(port,()=>{

    console.log(`Server is fired up and listing on port ${port} `);
});

