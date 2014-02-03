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
		if(e.which == 13) {
			if(fieldSend.is(":focus") && fieldSend.val() == ""){
				fieldSend.blur();
			}else if (fieldSend.is(":focus")){
				buttonSend.click();
				fieldSend.blur();
			}else{
				fieldSend.focus();
			}
		} else {
			fieldSend.focus();
		}
	});
});
 