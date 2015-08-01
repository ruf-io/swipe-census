var importQuestions = function(data) {
	console.log(data);
	var datalen = data.feed.entry.length, i, row, stack = document.querySelector('.stack');
	for(i=0; i<datalen; i++) {
		row = data.feed.entry[i];
		html = '<li data-id="' + row['gsx$id']['$t'] + '" data-type="' + row['gsx$answertype']['$t'] + '"> <h2>' + row['gsx$question']['$t'] + '</h2> <p>' + row['gsx$explanation']['$t'] + '</p></li>';
		stack.innerHTML = stack.innerHTML + html;
	}

	var stack,
    config;

	config = {
	    /**
	     * Invoked in the event of dragmove.
	     * Returns a value between 0 and 1 indicating the completeness of the throw out condition.
	     * Ration of the absolute distance from the original card position and element width.
	     * 
	     * @param {Number} offset Distance from the dragStart.
	     * @param {HTMLElement} element Element.
	     * @return {Number}
	     */
	    throwOutConfidence: function (offset, element) {
	        return Math.min(Math.abs(offset) / element.offsetWidth * 3, 1);
	    }
	};

	stack = gajus.Swing.Stack(config);
    var cardElement = document.querySelector('.stack li');

    window.card = stack.createCard(cardElement);

    stack.on('throwoutend', function (e) {
    	//e.target.parentNode.rem
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