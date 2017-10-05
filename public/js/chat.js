  const socket = io();

  function scrollToBottom() {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');

    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }

  socket.on('connect', function() {
    const params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('No error');
      }
    });
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
      ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
  });

  socket.on('newMessage', function(data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
      text: data.text,
      from: data.from,
      createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newLocationMessage', function(data) {
    const formattedTime = moment(data.createdAt).format('h:mm a');
    const template = jQuery('#locationMessage-template').html();
    const html = Mustache.render(template, {
      from: data.from,
      url: data.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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
