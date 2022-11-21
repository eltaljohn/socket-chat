var socket = io();

var params = new URLSearchParams(this.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';

    throw new Error('The name and room are riquierd.')
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Connected to the server');

    socket.emit('inChat', user, function (resp) {
        // console.log('Users connected', resp);
        rederUsers(resp);
    });
});

socket.on('createMessage', function (message) {
    // console.log('Server', message);
    renderMessages(message, false);
    scrollBottom();
});

socket.on('peopleList', function (message) {
    rederUsers(message);
})

// escuchar
socket.on('disconnect', function() {

    console.log('Connection lost');

});

socket.on('privateMessage', function (message) {
    console.log('Private Message:', message);
})