var socket = io();
var name = getQueryVariable('name');
var room = getQueryVariable('room');
console.log(name+ ' was joined the room '+ room);
socket.on('connect',function(){
	console.log('Connected via socket.io');
	socket.emit('joinRoom',{
		name: name,
		room: room,
	});
});
socket.on('message',function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message');
	console.log(message.text);
	jQuery('.messages').append(message.name+' <p><strong>'+momentTimestamp.local().format('D MMM YYYY h:m a')+'</strong></p><p>'+message.text+'</p>');
})
// Handles submitting of new messages
$(document).ready(function() {
	jQuery('.room-title').text(room);
	var $form = jQuery('#message-form');
	$form.on('submit',function(event){
		event.preventDefault();
		var $message = $form.find('input[name="message"]');
		socket.emit('message',{
			name: name,
			text: $message.val(),
		});
		$message.val('');
	});	
});
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1].replace(/\+/g,' '));
        }
    }
    
    return undefined;
}
