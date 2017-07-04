
var socket=io();

socket.on('connect',function(){
    console.log("connected to server");

});

socket.on('disconnect',function(){
    console.log("disconnected to server");

});

socket.on('newMessage',function(email){

    var createdTime=moment(email.createdAt).format('h:mm a');

    var li=jQuery('<li></li>');
    li.text(`${email.from} ${createdTime}: ${email.text}`);
    jQuery('#messages').append(li);

});




socket.on('newLocationMessage',function(message){

    var createdTime=moment(message.createdAt).format('h:mm a');
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from} ${createdTime}:`);
    a.attr('href',message.url);
    li.append(a);

    jQuery('#messages').append(li);

});


jQuery('#message-form').on('submit',function (e) {

    e.preventDefault();

    var messageBox=jQuery('#message');

    socket.emit("createMessage",{

        'from':'User',
        'text':messageBox.val(),

    },function () {

        messageBox.val('')


    });

});

var locationButton=jQuery('#sendlocation');

locationButton.on('click',function () {

    if(!navigator.geolocation){

        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr("disabled",'disabled').text('Sending location...');;
    navigator.geolocation.getCurrentPosition(function (possition) {

        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit("createLocationMsg",{
            latitude:possition.coords.latitude,
            longitude:possition.coords.longitude
        });


    },function () {

        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });

});



