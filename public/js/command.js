let selected = "";
let commande = {};

function openMenu() {
  document.querySelector("#cowmenu").classList.toggle("see");
  document.querySelector("#cowcustom").classList.remove("see");
}
function openCustom() {
  document.querySelector("#cowcustom").classList.toggle("see");
  document.querySelector("#cowmenu").classList.remove("see");
}

function opacityCustom() {
  document.querySelector("#choicemenu").classList.toggle("opac");
  document.querySelector("#choicecustom").classList.remove("opac");
  selected = "custom";
  commande = {
    name: "",
    phone: "",
    ingredients: {
      sandwich_name: "",
      meat: {},
      supp: {},
      sauce: {},
      drink: {},
      dessert: {},
      size: "small"
    }
  };
  console.log(commande);
}

function opacityMenu() {
  document.querySelector("#choicecustom").classList.toggle("opac");
  document.querySelector("#choicemenu").classList.remove("opac");
  selected = "menu";
  commande = {
    name: "",
    phone: "",
    ingredients: {
      sandwich_name: "",
      size: "small",
      composition_id: 0
    }
  };
  console.log(commande);
}

$("#choicemenu").click(() => {
  openMenu();
});
$("#choicecustom").click(() => {
  openCustom();
});

var viandeChoice = 0;

var suppChoice = 0;

var sauceChoice = 0;

var size = "";

var allType = ["allMeat", "allSupp", "allSauce"];

function updateCommand() {
  commande.ingredients.meat = {};
  commande.ingredients.supp = {};
  commande.ingredients.sauce = {};
  allType.forEach(element => {
    var ingredient = element.substring(3).toLowerCase();
    var ingredientNb = 0;
    eval(element).forEach(element => {
      if (eval(element + " == true")) {
        eval(
          "commande.ingredients." +
            ingredient +
            "[ingredient+ingredientNb.toString()] = parseInt(element.substring(8))"
        );
        ingredientNb++;
      }
    });
  });
  console.log(commande);
}

let viandeLimit = 2;
let suppLimit = 2;
let sauceLimit = 3;

$(".selecteurViande, .selecteurSupp, .selecteurSauce").click(function() {
  console.log(this.classList[0].substring(9).toLowerCase());
  let typeFood = this.classList[0].substring(9).toLowerCase();
  if (
    eval(this.value + " ==  false") &&
    eval(typeFood + "Choice < " + typeFood + "Limit")
  ) {
    eval(this.value + " = true");
    eval(typeFood + "Choice" + "++");
    this.classList.add("active");
  } else {
    if (eval(this.value + " == true")) {
      eval(typeFood + "Choice" + "--");
      this.classList.remove("active");
    }
    eval(this.value + " = false");
  }

  if (eval(typeFood + "Choice == " + typeFood + "Limit")) {
    $("#" + typeFood + "Limit").text("Maximum Atteint😔");
  } else {
    $("#" + typeFood + "Limit").text("");
  }

  $("#compteur" + this.classList[0].substring(9)).text(
    eval(typeFood + "Choice")
  );

  updateCommand();
});

$("#priceCustom, #priceMenu").text(small.toFixed(2) + " €");

$(".size").click(function() {
  if (selected != "custom") {
    commande.ingredients.size = document.querySelector(
      'input[name="taille"]:checked'
    ).value;
    $("#priceMenu").text(eval(commande.ingredients.size).toFixed(2) + " €");
  } else {
    commande.ingredients.size = document.querySelector(
      'input[name="taille2"]:checked'
    ).value;
    $("#priceCustom").text(eval(commande.ingredients.size).toFixed(2) + " €");
  }
  console.log(commande);
});

$("#customsubmit, #menusubmit").click(() => {
  let precision = "";
  if (selected == "custom") {
    commande.ingredients.sandwich_name = $("#sandwichName").val();
    precision = document.querySelector("#customPrecision").value;
  } else {
    precision = "";
  }

  let erreurPlace = document.querySelector("#error");
  erreurPlace.innerHTML = "";
  let erreur = document.createElement("ul");
  erreur.classList.add("errorUser");

  if (selected == "custom") {
    if (
      commande.ingredients.meat.meat0 != undefined ||
      commande.ingredients.supp.supp0 != undefined ||
      commande.ingredients.sauce.sauce0 != undefined
    ) {
      $.post(
        "/sandwich",
        { user_commande: JSON.stringify(commande), precision: precision },
        () => {
          window.location.href = "/dessert";
        }
      );
    } else {
      console.log("oui");
      let noCustom = document.createElement("li");
      noCustom.innerHTML = "Vous n'avez choisi aucun ingrédient";
      erreur.appendChild(noCustom);
    }
  } else {
    if (commande.ingredients.composition_id != 0) {
      $.post(
        "/sandwich",
        { user_commande: JSON.stringify(commande), precision: precision },
        () => {
          window.location.href = "/dessert";
        }
      );
    } else {
      let noPre = document.createElement("li");
      noPre.innerHTML = "Vous n'avez choisi aucun sandwich";
      erreur.appendChild(noPre);
    }
  }

  erreurPlace.appendChild(erreur);
  window.scrollTo(0, 0);
});

$(".presandwich").click(function() {
  console.log(this.id);
  document.querySelectorAll(".presandwich").forEach(element => {
    element.classList.remove("active");
  });
  if (this.classList == "active") {
    this.classList.remove("active");
  } else {
    this.classList.toggle("active");
  }

  commande.ingredients.composition_id = parseInt(this.value);
  commande.ingredients.sandwich_name = this.id;
});
