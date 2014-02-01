var express = require('express');
var http	= require('http');

var app		= express();
var server	= http.createServer(app);
var io		= require('socket.io').listen(server);


var usernames 	= {};
var rooms		= ['home', 'playground'];

server.listen(4224);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/html/index.html');
});

app.get('/jquery.js', function(req, res){
	res.sendfile(__dirname + '/lib/jquery.js');
});

app.get('/socket.js', function(req, res){
	res.sendfile(__dirname + '/custom/client/socket.js');
});

app.get('/scripts.js', function(req, res){
	res.sendfile(__dirname + '/custom/client/main.js');
});

app.get('/css/bootstrap.min.css', function(req, res){
	res.sendfile(__dirname + '/lib/bootstrap/css/bootstrap.min.css');
});

app.get('/css/styles.css', function(req, res){
	res.sendfile(__dirname + '/css/styles.css');
});

io.sockets.on('connection', function(socket){
	
	socket.on('adduser', function(username){

		socket.username = username;

		socket.room = 'home';

		usernames[username] = username;

		socket.join('home');

		socket.emit('updatechat', 'SERVER', 'Bienvenue à la maison');
		
		socket.broadcast.to('home').emit('updatechat', 'SERVER', username + ' vient tout juste de se connecter. Dites lui bonjour !');

		socket.emit('updaterooms', rooms, 'home');
		socket.emit('updateusers', usernames);
		socket.broadcast.emit('updateusers', usernames);
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
