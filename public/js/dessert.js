function goToDrink() {
	document.querySelector('.Boissons').classList.toggle('opac');
}

function goToDessert() {
	document.querySelector('.Desserts').classList.toggle('opac');
}

document.querySelector('#drinkButton').addEventListener('click', goToDrink);
document.querySelector('#dessertButton').addEventListener('click', goToDessert);


function opacitySoda() {
	document.querySelectorAll('.sodaButton').classList.toggle('opac');
}

document.querySelector('.sodaButton').addEventListener('click', opacitySoda);
