document.addEventListener('DOMContentLoaded', function () {
    var stack = gajus.Swing.Stack(),
        cardElement = document.querySelector('.stack li');

    window.card = stack.createCard(cardElement);

    stack.on('throwout', function (e) {
    	e.target.style.display = "none";
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
});