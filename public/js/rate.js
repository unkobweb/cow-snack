let rate = document.querySelectorAll('.cowRate');

for(let i = 0; i < rate.length; i++){
	rate[i].addEventListener('click', function(event){
			event.target.classList.add('choose');
			for(let y = 0; y < 5; y++){
				console.log(i);
				if(i < y){
					event.target.parentElement.children[y].classList.remove('choose');	
				}
				else{
					event.target.parentElement.children[y].classList.add('choose');	
				}
			}
	});
}

document.querySelector('.star').addEventListener('click', function(event){
	for (let e = 0; e < 5; e++){
		event.target.parentElement.children[e].classList.toggle('anim');
	}
})