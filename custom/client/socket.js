var url 		= window.location;

var chatSpace	= $('#conversation');
var roomSpace	= $('#rooms');
var usersSpace	= $('#users');

socket = io.connect(url);

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("Entrez votre nom"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
	chatSpace.append('<div class"chat-line row"><div class="col-md-1">'+ username + ':</div><div class"col-md-11"> ' + data + '</div></div>');
	chatSpace.scrollBottom = chatSpace.scrollHeight;

	chatSpace.animate({
			scrollBottom: chatSpace.prop('scrollHeight')
		});

});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updaterooms', function(rooms, current_room) {
	roomSpace.empty();
	$.each(rooms, function(key, value) {
		if(value == current_room){
			roomSpace.append('<div>' + value + '</div>');
		}
		else {
			roomSpace.append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
		}
	});
});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updateusers', function(users) {
	usersSpace.empty();
	$.each(users, function(key, value) {
		usersSpace.append('<div><a href="#">' + value + '</a></div>');
	});
});

function switchRoom(room){
	socket.emit('switchRoom', room);
}