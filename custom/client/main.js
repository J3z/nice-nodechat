// on load of page
$(function(){
	
	var buttonSend 	= $('#datasend');
	var fieldSend	= $('#data');

	// when the client clicks SEND
	buttonSend.click( function() {
		var message = fieldSend.val();
		fieldSend.val('');

		// tell server to execute 'sendchat' and send along one parameter
		socket.emit('sendchat', message);
	});
	// when the client hits ENTER on their keyboard
	$(window).keypress(function(e) {
		if(e.which == 13 && fieldSend.is(":focus")) {
			fieldSend.blur();
			if (fieldSend.val() != ""){
				buttonSend.click();
			}
			return;
		}
		fieldSend.focus();
	});
});
 