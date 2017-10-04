  const socket = io();
  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    li.text(`${data.from} ${formattedTime} ${data.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', function(data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_">My Current Location</a>');
    li.text(`${data.from} ${formattedTime}:`);
    a.attr('href', data.url);
    li.append(a);
    
    jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val('');
    });
  });

  var locationButton = jQuery("#send-location");
  locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
      alert("No Geo-location on your browser.");
      return;
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (pos) {
      locationButton.removeAttr('disabled');
      socket.emit('createLocationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr('disabled').text('Send location');
      alert("Unable to fetch location.");
    });
  });
