document.querySelector('.denied').addEventListener('click', function(){
	history.back();
})

document.querySelector('.validRGPD').addEventListener('click', function(event){
	event.target.parentElement.parentElement.parentElement.remove();
})