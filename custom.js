document.addEventListener('DOMContentLoaded', function () {
    
});

var importQuestions = function(data) {
	console.log(data);
	var datalen = data.feed.entry.length, i, row, stack = document.querySelector('.stack');
	for(i=0; i<datalen; i++) {
		row = data.feed.entry[i];
		html = '<li data-id="' + row['gsx$id']['$t'] + '" data-type="' + row['gsx$answertype']['$t'] + '"> <h2>' + row['gsx$question']['$t'] + '</h2> <p>' + row['gsx$explanation']['$t'] + '</p></li>';
		stack.innerHTML = stack.innerHTML + html;
	}
	var stack = gajus.Swing.Stack(),
        cardElement = document.querySelector('.stack li');

    window.card = stack.createCard(cardElement);

    stack.on('throwout', function (e) {
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