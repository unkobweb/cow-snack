let wantDrink = false;
let wantDessert = false;

function opacitySoda() {
  this.classList.toggle("opac");
}

function goToDrink() {
  if (!wantDrink) {
    wantDrink = true;
  } else {
    wantDrink = false;
  }
  console.log(wantDrink);
  document.querySelector(".Boissons").classList.toggle("opac");
}

function goToDessert() {
  if (!wantDessert) {
    wantDessert = true;
  } else {
    wantDessert = false;
  }
  console.log(wantDessert);
  document.querySelector(".Desserts").classList.toggle("opac");
}

document.querySelector("#drinkButton").addEventListener("click", goToDrink);
document.querySelector("#dessertButton").addEventListener("click", goToDessert);

document.querySelector(".sodaButton").addEventListener("click", opacitySoda);

let selecteur = document.querySelectorAll(".selecteur");

for (let i = 0; i < selecteur.length; i++) {
  selecteur[i].addEventListener("click", function() {
    this.classList.toggle("active");
  });
}

// Changement de style des boutons.
var buttons = document.querySelectorAll(".img");

function unSeeAll() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].parentElement.classList.remove("active");
  }
}

let actualDessert = "panini nutella";

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function(event) {
    unSeeAll();
    event.target.parentElement.classList.toggle("active");
    actualDessert = this.parentElement.id;
  });
}

let choosenDrink = "";
let choosenDessert = "";
document.querySelector("#customsubmit").addEventListener("click", () => {
  if (wantDrink) {
    if (document.querySelector("#drinkCustom").value.trim() != "") {
      choosenDrink = document.querySelector("#drinkCustom").value;
    } else {
      choosenDrink = document.querySelector("input[name=soda]:checked").value;
    }
  }
  if (wantDessert) {
    choosenDessert = actualDessert;
  }
  $.post("/dessert", { boisson: choosenDrink, dessert: choosenDessert }, () => {
    window.location.href = "/livraison";
  });
});
