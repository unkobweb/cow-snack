// Changement de style des boutons.
var image = document.querySelectorAll('img');

for (var i = 0; i < image.length; i++) {
	image[i].addEventListener('click', function(event){
		event.target.parentElement.classList.toggle('active');
	});
}

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function(event){
		event.target.classList.toggle('active');
	});
}