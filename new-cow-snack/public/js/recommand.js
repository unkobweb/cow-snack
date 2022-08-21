		//disparition du popup de confirmation de recommande
		function cancelCommand(){
			document.querySelector('body').classList.remove('blur');
			document.querySelector('.confirmWindow').remove();
		}


		//fonction pour recommandé le sandwich
		function deleteCommand(evt){
			// evt.parentElement.remove();
			cancelCommand();

		}


		//apparition du popup de confirmation de commande
		function confirm(evt) {

			document.querySelector('body').classList.toggle('blur');	
			let confirm = document.createElement('div');
			let paraConfirm = document.createElement('p');
			let confirmB = document.createElement('div');
			let buttonConfirm = document.createElement('button');
			let buttonDelete = document.createElement('button');
			confirm.className = "confirmWindow";
			confirmB.className = "confirmB";
			buttonConfirm.className = "buttonCancel";
			buttonDelete.className = "buttonDelete";
			buttonConfirm.innerText = "Annuler";
			buttonDelete.innerText = "Bien sûr 😋";
			paraConfirm.innerText = "Souhaitez vous recommandé ce sandwich ?";
			document.querySelector('html').appendChild(confirm);
			confirm.appendChild(paraConfirm);
			confirm.appendChild(confirmB);
			confirmB.appendChild(buttonConfirm);
			confirmB.appendChild(buttonDelete);

			document.querySelector('.buttonDelete').addEventListener('click', function(){
				deleteCommand(evt);
			});
			document.querySelector('.buttonCancel').addEventListener('click', cancelCommand);
		}




		//bouton de suppression d'une commande
		let reco = document.getElementsByClassName('recommand');
		for(let i = 0; i < reco.length; i++){
			reco[i].addEventListener('click', function(event){
				confirm(event.target);
			});
		}	