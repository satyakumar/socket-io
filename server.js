var port = process.env.port || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
app.use(express.static(__dirname+ '/public'));
io.on('connection',function(socket) {
	console.log('User connected via socket.io');
	socket.on('message',function(message){
		console.log('Message Received: '+ message.text);
		socket.broadcast.emit('message',message);
	});
	socket.emit('message',{
		name: 'system',
		text: 'Welcome to the chat application',
		timestamp: moment.valueOf(),
	});
});
http.listen(port,function() {
	console.log('Server started');
});