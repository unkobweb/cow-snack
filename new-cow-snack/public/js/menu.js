function openMenu() {
	document.querySelector('#cowmenu').classList.toggle('see');
	document.querySelector('#cowcustom').classList.remove('see');
}
function openCustom() {
	document.querySelector('#cowcustom').classList.toggle('see');
	document.querySelector('#cowmenu').classList.remove('see');
} 

function opacityCustom() {
	document.querySelector('#choicemenu').classList.toggle('opac');
	document.querySelector('#choicecustom').classList.remove('opac');
}

function opacityMenu() {
	document.querySelector('#choicecustom').classList.toggle('opac');
	document.querySelector('#choicemenu').classList.remove('opac');
}

document.querySelector('#choicemenu').addEventListener('click', openMenu);
document.querySelector('#choicecustom').addEventListener('click', openCustom);