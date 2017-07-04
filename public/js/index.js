
var socket=io();

socket.on('connect',function(){
    console.log("connected to server");

});

socket.on('disconnect',function(){
    console.log("disconnected to server");

});

socket.on('newMessage',function(email){
    console.log("New Message",email);
    var li=jQuery('<li></li>');
    li.text(`${email.from} : ${email.text}`);
    jQuery('#messages').append(li);

});




jQuery('#message-form').on('submit',function (e) {

    e.preventDefault();

    socket.emit("createMessage",{

        'from':'User',
        'text':jQuery('#message').val(),

    },function () {


    });


});





