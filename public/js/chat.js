
var socket=io();

function scrollTobottom() {

  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');


  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
  }

}


socket.on('connect',function(){

    var params=jQuery.deparam(window.location.search);
    socket.emit('join',params,function (err) {

        if (err){

            alert(err);
            window.location.href="/";
            return;
        }

        console.log("no error");
    });

});

socket.on('disconnect',function(){
    console.log("disconnected to server");

});

socket.on('updateUserList',function(users){

    var ol=jQuery('<ol></ol>')
    users.forEach(function (user) {

        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);

});


socket.on('newMessage',function(message){

  var createdTime=moment(message.createdAt).format('h:mm a');
  var templete=jQuery('#message-templete').html();
  var html=Mustache.render(templete,{

      text:message.text,
      from:message.from,
      createdAt:createdTime
  });

  jQuery('#messages').append(html);

  scrollTobottom();

});




socket.on('newLocationMessage',function(message){

    var createdTime=moment(message.createdAt).format('h:mm a');
    var templete=jQuery('#location-message-templete').html();
    var html=Mustache.render(templete,{

        url:message.url,
        from:message.from,
        createdAt:createdTime
    });

    jQuery('#messages').append(html);
    scrollTobottom();
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



