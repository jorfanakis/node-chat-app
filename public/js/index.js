  const socket = io();
  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(data) {
    const li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', function(data) {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_">My Current Location</a>');
    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);
    
    jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
    },
    function() {
    });
  });

  var locationButton = jQuery("#send-location");
  locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
      alert("No Geo-location on your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(function (pos) {
      socket.emit('createLocationMessage', {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    },
    function() {
      alert("Unable to fetch location.");
    });
  });
