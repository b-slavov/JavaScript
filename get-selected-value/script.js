document.onmouseup = document.onkeyup = document.onselectionchange = function() {
	document.getElementById('my-input').value = window.getSelection().toString();
};
