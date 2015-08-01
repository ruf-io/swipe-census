var answertypes = {
	yesno:'<em>like tinder!</em>',
	text: '<input type="text">',
	slider: '<div id="slider"></div>',
	number: '<input type="text">'
};

var importQuestions = function(data) {
	var datalen = data.feed.entry.length, i, row, stack = document.querySelector('.stack');
	for(i=0; i<datalen; i++) {
		if(row['gsx$question']['$t'].length > 10 ) {
			row = data.feed.entry[i];
			html = '<li data-id="' + row['gsx$id']['$t'] + '" data-type="' + row['gsx$answertype']['$t'] + '"> <h2>' + row['gsx$question']['$t'] + '</h2> <p>' + row['gsx$explanation']['$t'] + '</p>' + answertypes[row['gsx$answertype']['$t']] + '</li>';
			stack.innerHTML = stack.innerHTML + html;
		}
	}

	var stack,
    config,
    cards;

	config = {
	    throwOutConfidence: function (offset, element) {
	        return Math.min(Math.abs(offset) / element.offsetWidth * 2, 1);
	    }
	};

	stack = gajus.Swing.Stack(config);
    


// Prepare the cards in the stack for iteration.
cards = [].slice.call(document.querySelectorAll('.stack li'));

cards.forEach(function (targetElement) {
    // Add card element to the Stack.
    stack.createCard(targetElement);
});


    stack.on('throwoutend', function (e) {
    	e.target.parentNode.removeChild(e.target);
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
    });

    stack.on('throwin', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
    });

    stack.on('dragstart', function (e) {
    	document.getElementById('yesno').style.display = "block";
    });
    stack.on('dragend', function (e) {
    	document.getElementById('yesno').style.display = "none";
    });
}