
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function(){
      document.getElementById('intro').style.display = 'none';
      document.getElementById('firstScreen').style.display = 'block';
    }, 3000);
});

var answertypes = {
	yesno:'<em>like tinder!</em>',
	text: '<input type="text">',
	slider: 'input type="range"/>',
	number: '<input type="number">'
};

function startCensus() {
  document.getElementById('firstScreen').style.display = 'none';
  document.getElementById('fbScreen').style.display = 'block';
}

function startQuestions() {
  document.getElementById('fbScreen').style.display = 'none';
  document.getElementById('viewport').style.display = 'block';
}

var importQuestions = function(data) {
	var datalen = data.feed.entry.length, i, row, stack = document.querySelector('.stack');
	for(i=0; i<datalen; i++) {
		row = data.feed.entry[i];
		if(row['gsx$question']['$t'].length > 10 ) {
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
