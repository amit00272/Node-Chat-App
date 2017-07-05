const path=require('path');
const http=require('http');
const express=require('express');
const SocketIO=require('socket.io');
const {isRealString}=require('./utils/validation')
const {Users}=require('./utils/user');

var {generateMessage,generateLocationMessage}=require('./utils/message');

const public_path=path.join(__dirname,'../public');
const port=process.env.PORT || 3000 ;
var app=express();
var server=http.createServer(app);
var io=SocketIO(server);
var users=new Users();



//adding express middleware
app.use(express.static(public_path));

io.on('connection',(socket)=>{

    socket.on('join',(params,callback)=>{

         if(!isRealString(params.name) || !isRealString(params.room)){

            return  callback('Name and Room name are Required');
         }

         socket.join(params.room);
         users.removeUser(socket.id);
         users.addUser(socket.id,params.name,params.room);

         io.to(params.room).emit("updateUserList",users.getUsersList(params.room));
         socket.emit('newMessage',generateMessage("Admin","Welcome to the chat App"));
         socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has Joined`));
         callback();
    });




    socket.on('createMessage',(message,callback)=>{

        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();

    });


    socket.on("createLocationMsg",(coords)=>{
      io.emit('newLocationMessage',generateLocationMessage('User',coords.latitude,coords.longitude))

    });


    socket.on('disconnect',()=>{

        var user=users.removeUser(socket.id);
        if(user){

            io.to(user.room).emit('updateUserList',users.getUsersList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));

        }

    });


});




server.listen(port,()=>{

    console.log(`Server is fired up and listing on port ${port} `);
});

