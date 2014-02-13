// on load of page
$(function(){
	
	var browser 	= $(window);
	var html	= $(document);
	// Input initialisation
	var buttonSend 	= $('#datasend');
	var fieldSend	= $('#data');

	// Chat space initialisation
	var chatSpace	= $('#text-zone');
	var sendZone	= $('#send-zone');

	// Update height of conversation field
	var updateChatSpaceHeight = function(){
		var newHeight = browser.height() - sendZone.height() - 10;
		chatSpace.height(newHeight);
	};
	
	updateChatSpaceHeight();

	// Force chat space resize height
	browser.resize(function(){
		updateChatSpaceHeight();
	});
	
	// Send texte when click on send
	buttonSend.click( function() {
		// tell server to execute 'sendchat' and send along one parameter
		socket.emit('sendchat', fieldSend.val());
		// Emptying input
		fieldSend.val('');
	});
	
	// Focus and click event when we push enter
	browser.keypress(function(e) {
		// Keypress 13 (enter) and input focused
		if(e.which == 13 && fieldSend.is(":focus")) {
			fieldSend.blur();
			// If field not empty
			if (fieldSend.val() != ""){
				// Simulate click
				buttonSend.click();
			}
			return;
		}
		// Toggle focus
		fieldSend.focus();
	});

	browser.on("focus",function(){
		document.title = "Nice node chat wohhhoooo";
	});
});
