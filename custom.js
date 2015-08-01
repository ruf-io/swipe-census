
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function(){
      document.getElementById('intro').style.display = 'none';
      document.getElementById('firstScreen').style.display = 'block';
    }, 3000);
});

var answertypes = {
	yesno:'@image',
	text: '<input type="text"/>',
	slider: '<small>@option1</small><input type="range"/><small>@option2</small>',
	number: '<input type="number"/>'
};

function startCensus() {
  document.getElementById('firstScreen').style.display = 'none';
  document.getElementById('fbScreen').style.display = 'block';
}

function startQuestions() {
  document.getElementById('fbScreen').style.display = 'none';
  document.getElementById('viewport').style.display = 'block';
}

var googleForm = $(window).jqGoogleForms({"formKey": "1zHYIVcquNnogxAbftE3A3qqm1kiT2GOZERqZdqbeXDw"}),
uniqueid = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4),
importQuestions = function(data) {
	var datalen = data.feed.entry.length, i, row, stack = document.querySelector('.stack');
	for(i=datalen-1; i>=0; i--) {
		row = data.feed.entry[i];
		if(row['gsx$question']['$t'].length > 10 ) {
			html = '<li data-id="' + row['gsx$id']['$t'] + '" data-type="' + row['gsx$answertype']['$t'] + '"> <h2>' + row['gsx$question']['$t'] + '</h2> <p>' + row['gsx$explanation']['$t'] + '</p>' + answertypes[row['gsx$answertype']['$t']].replace('@option1', row['gsx$option1']['$t']).replace('@option2', row['gsx$option2']['$t']).replace('@image', '<img src="1_mashUp/' + row['gsx$image']['$t'] + '" height="500px" width="500px">') + '</li>';
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
    	googleForm.sendFormData({
		    "entry.1840451094": e.target.dataset.id,
		    "entry.713192399": e.target.querySelector('input').value,
		    "entry.1207641367": e.throwDirection,
		    "entry.473262822":uniqueid
		});
    });

    stack.on('dragmove', function (e) {
    	document.getElementById('yesno').style.display = "block";
    });
    stack.on('dragend', function (e) {
    	document.getElementById('yesno').style.display = "none";
    });
}
