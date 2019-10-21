//flèche de modification des stocks
let arrowUp = document.querySelectorAll(".arrowUp");
let arrowDown = document.querySelectorAll(".arrowDown");
let vari = [];

for (let i = 0; i < arrowUp.length; i++) {
  vari[i] = parseInt(arrowUp[i].parentElement.nextElementSibling.innerHTML);
  arrowUp[i].addEventListener("click", function(event) {
    $.post("/admin", { action: 1, slug: this.id });
    vari[i] += 1;
    event.target.parentElement.nextElementSibling.innerHTML = vari[i];
    if (vari[i] >= 10 || vari[i] < 0) {
      event.target.parentElement.parentElement.classList.add("extended");
    } else {
      event.target.parentElement.parentElement.classList.remove("extended");
    }
  });
}

for (let i = 0; i < arrowDown.length; i++) {
  arrowDown[i].addEventListener("click", function(event) {
    $.post("/admin", { action: 2, slug: this.id });
    vari[i] -= 1;
    event.target.parentElement.nextElementSibling.innerHTML = vari[i];
    if (vari[i] >= 10 || vari[i] < 0) {
      event.target.parentElement.parentElement.classList.add("extended");
    } else {
      event.target.parentElement.parentElement.classList.remove("extended");
    }
  });
}

//changement de couleur dynamique pour le menu choisi par le client
let enhance = document.querySelectorAll(".colorSandwich");

for (let i = 0; i < enhance.length; i++) {
  enhance[i].classList.toggle("custom");
}

//changement de couleur dynamique pour le statut de la livraison
let statut = document.querySelectorAll(".statut");

for (let i = 0; i < statut.length; i++) {
  let content = statut[i].textContent;
  if (content === "Livré") {
    statut[i].classList.toggle("green");
  } else if (content === "En cours") {
    statut[i].classList.toggle("orange");
  } else if (content === "Annulé") {
    statut[i].classList.toggle("red");
  }
}

//passé un sandwich en Livré grâce au bouton paiement effectué
let payValid = document.querySelectorAll(".paiementValidate");

for (let i = 0; i < payValid.length; i++) {
  payValid[i].addEventListener("click", function(event) {
    event.target.previousElementSibling
      .querySelector(".statut")
      .classList.toggle("green");
    event.target.previousElementSibling.querySelector(".statut").textContent =
      "Livré";
  });
}

//affichage des ingrédients pour les sandwichs cow-custom
let customs = document.querySelectorAll(".colorSandwich");

for (let i = 0; i < customs.length; i++) {
  customs[i].addEventListener("click", function(event) {
    for (let i = 0; i < customs.length; i++) {
      customs[i].nextElementSibling.classList.remove("custom");
    }
    event.target.nextElementSibling.classList.toggle("custom");
    event.target.classList.toggle("presence");
  });
}

//affichage des différents précisions et remarque d'informations de la clientèle
let infos = document.querySelectorAll(".infos");
let containInfos = document.getElementsByClassName("infosContainer");

for (let i = 0; i < infos.length; i++) {
  infos[i].addEventListener("click", function(event) {
    if (event.target.children[0].classList.contains("open")) {
      event.target.children[0].classList.remove("open");
    } else {
      for (let c = 0; c < containInfos.length; c++) {
        containInfos[c].classList.remove("open");
      }
      event.target.children[0].classList.add("open");
    }
  });
}

//Réinitialisation des besoins dans la partie stock
let besoins = document.querySelectorAll(".initBesoin");
let crosses = document.querySelectorAll(".cross");

for (let i = 0; i < besoins.length; i++) {
  crosses[i].addEventListener("click", function(event) {
    $.post("/admin", { action: 3, slug: this.id });
    event.target.parentElement.previousElementSibling.children[0].innerText =
      " 0";
  });
  besoins[i].addEventListener("click", function(event) {
    event.target.previousElementSibling.children[0].innerText = " 0";
  });
}

//disparition du popup de confirmation de suppression
function cancelCommand() {
  document.querySelector("body").classList.remove("blur");
  document.querySelector(".confirmWindow").remove();
}

//suppression de la commande
function deleteCommand(evt) {
  evt.parentElement.parentElement.remove();
  cancelCommand();
}

//aparition du popup de confirmation de suppression
function confirm(evt) {
  document.querySelector("body").classList.toggle("blur");
  let confirm = document.createElement("div");
  let paraConfirm = document.createElement("p");
  let confirmB = document.createElement("div");
  let buttonConfirm = document.createElement("button");
  let buttonDelete = document.createElement("button");
  confirm.className = "confirmWindow";
  confirmB.className = "confirmB";
  buttonConfirm.className = "buttonCancel";
  buttonDelete.className = "buttonDelete";
  buttonConfirm.innerText = "Annuler";
  buttonDelete.innerText = "Supprimer la commande";
  paraConfirm.innerText = "Souhaitez vous supprimer cette commande ?";
  document.querySelector("html").appendChild(confirm);
  confirm.appendChild(paraConfirm);
  confirm.appendChild(confirmB);
  confirmB.appendChild(buttonConfirm);
  confirmB.appendChild(buttonDelete);

  document.querySelector(".buttonDelete").addEventListener("click", function() {
    deleteCommand(evt);
  });
  document
    .querySelector(".buttonCancel")
    .addEventListener("click", cancelCommand);
}

//bouton de suppression d'une commande
let suppr = document.getElementsByClassName("suppr");
for (let i = 0; i < suppr.length; i++) {
  suppr[i].addEventListener("click", function(event) {
    confirm(event.target);
  });
}
