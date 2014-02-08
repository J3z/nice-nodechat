var url 		= window.location;

var browser		= $(window);
var chatSpaceWr	= $('#text-zone');
var chatSpace	= $('#conversation');
var roomSpace	= $('#rooms');
var usersSpace	= $('#users');
var heightbr 	= browser.height();

socket = io.connect(url);

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("Entrez votre nom"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
	chatSpace.append('<div class"chat-line row"><span class="username">'+ username + ':</span><span class"message"> ' + data + '</span></span>');
	
	$(".chat-line").animate({
			opacity: 0.1
		}, 3000);
	chatSpaceWr.animate({
			scrollTop: chatSpace.height()
		}, 3);

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