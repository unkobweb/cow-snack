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

//$('#choicemenu').addEventListener('click', openMenu);
//$('#choicecustom').addEventListener('click', openCustom);

$('#choicemenu').click(()=>{
    openMenu();
});
$('#choicecustom').click(()=>{
    openCustom();
});

// Changement de style des boutons.
/*$('button').click(function(){
    this.classList.toggle('active');
});*/

var commande = {
    name: '',
    phone: '',
    ingredients: {
        meat: {},
        supp: {},
        sauce: {},
        drink: {},
        dessert: {},
        size: ''
    }
}

// Viandes
var selectedSteak 	= false;
var selectedJambon 	= false;
var selectedEmince 	= false;
var selectedNuggets = false;
var selectedMerguez = false;
var allMeat = ['selectedSteak', 'selectedJambon', 'selectedEmince', 'selectedNuggets', 'selectedMerguez'];

// Suppléments
var selectedCheddar = false;
var selectedBacon 	= false;
var selectedSalade 	= false;
var selectedGruyere = false;
var selectedTomate 	= false;
var selectedLardon 	= false;
var allSupp = ['selectedCheddar', 'selectedBacon', 'selectedSalade', 'selectedGruyere', 'selectedTomate', 'selectedLardon'];

//Sauces
var selectedKetchup = false;
var selectedMayo 	= false;
var selectedBBQ 	= false;
var selectedBiggy 	= false;
var selectedCurry 	= false;
var selectedBBQMiel	= false;
var allSauce = ['selectedKetchup', 'selectedMayo', 'selectedBBQ', 'selectedBiggy', 'selectedCurry', 'selectedBBQMiel'];

var viandeChoice = 0;

var suppChoice = 0;

var sauceChoice = 0;

var size = '';

var allType = ['allMeat', 'allSupp', 'allSauce'];

function updateCommand(){
    allType.forEach(element => {
        var ingredient = element.substring(3).toLowerCase();
        var ingredientNb = 0;
        eval(element).forEach(element => {
            if (eval(element + " == true")){
                eval("commande.ingredients."+ingredient+"[ingredient+ingredientNb.toString()] = element.substring(8)");
                ingredientNb++;
            }
        });
    });
    console.log(commande);
};

$('.selecteurViande, .selecteurSupp, .selecteurSauce').click(function(){
    if (eval(this.value + " ==  false") && eval(this.classList[0].substring(9).toLowerCase()+"Choice" + "< 2")){
        eval(this.value + " = true");
        eval(this.classList[0].substring(9).toLowerCase()+"Choice" + "++");
    } else {
        if (eval(this.value + " == true")){
            eval(this.classList[0].substring(9).toLowerCase()+"Choice" + "--");
        }
        eval(this.value + " = false");
    }

    if (eval(this.classList[0].substring(9).toLowerCase()+"Choice" + "== 2")){
        $('#'+this.classList[0].substring(9).toLowerCase()+'Limit').text('Maximum Atteint😔');
    } else {
        $('#'+this.classList[0].substring(9).toLowerCase()+'Limit').text('');
    }

    $('#compteur'+this.classList[0].substring(9)).text(eval(this.classList[0].substring(9).toLowerCase()+"Choice"));

    updateCommand();

    this.classList.toggle('active');
});

$('.size').click(function(){
    commande.ingredients.size = document.querySelector('input[name="taille"]:checked, input[name="taille2"]:checked').value;
    console.log(commande);
});