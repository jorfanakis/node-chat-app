  const socket = io();
  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
      text: data.text,
      from: data.from,
      createAt: formattedTime
    });

    jQuery('#messages').append(html);
  });

  socket.on('newLocationMessage', function(data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    const template = jQuery('#locationMessage-template').html();
    const html = Mustache.render(template, {
      from: data.from,
      url: data.url
    });
    jQuery('#messages').append(html);
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
