var url = window.location;

socket = io.connect(url);

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("Entrez votre nom"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
	$('#conversation').append('<div class"chat-line row"><div class="col-md-1">'+ username + ':</div><div class"col-md-11"> ' + data + '</div></div>');
	

	$('#conversation').animate({
			scrollBottom: $('#conversation').prop('scrollHeight')
		});

});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updaterooms', function(rooms, current_room) {
	$('#rooms').empty();
	$.each(rooms, function(key, value) {
		if(value == current_room){
			$('#rooms').append('<div>' + value + '</div>');
		}
		else {
			$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
		}
	});
});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updateusers', function(users) {
	$('#users').empty();
	$.each(users, function(key, value) {
		$('#users').append('<div><a href="#">' + value + '</a></div>');
	});
});

function switchRoom(room){
	socket.emit('switchRoom', room);
}