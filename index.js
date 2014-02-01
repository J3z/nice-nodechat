var express = require('express');
var http	= require('http');

var app		= express();
var server	= http.createServer(app);
var io		= require('socket.io').listen(server);


var usernames 	= {};
var rooms		= ['home', 'playground'];

server.listen(4224);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

app.get('/jquery.js', function(req, res){
	res.sendfile(__dirname + '/jquery.js');
});

io.sockets.on('connection', function(socket){
	socket.io('adduser'. function(username){

		socket.username = username;

		socket.room = 'home';

		usernames[username] - username;

		socket.join('home');

		socket.emit('updatechat', 'SERVER', 'Bienvenue à la maison');
		
		socket.broadcast.to('home').emit('updatechat', 'SERVER', username + ' vient tout juste de se connecter. Dites lui bonjour !');

		socket.emit('updaterooms', rooms, 'home');
	});

	socket.on('sendchat', function(data){
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'Vous vous êtes connecté dans la room ' + newroom);
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' vient tout juste de rejoindre votre room !');
		socket.emit('updaterooms', rooms, newroom);
	});

	socket.on('disconnect', function(){
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' vient de partir. On lui dit à bientôt !');
		socket.leave(socket.room);
	});
});
