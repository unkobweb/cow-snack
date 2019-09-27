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

let viandeLimit = 2;
let suppLimit = 2;
let sauceLimit = 3;

$('.selecteurViande, .selecteurSupp, .selecteurSauce').click(function(){
    console.log(this.classList[0].substring(9).toLowerCase());
    let typeFood = this.classList[0].substring(9).toLowerCase()
    if (eval(this.value + " ==  false") && eval(typeFood+"Choice < "+typeFood+"Limit")){
        eval(this.value + " = true");
        eval(typeFood+"Choice" + "++");
        this.classList.add('active');
    } else {
        if (eval(this.value + " == true")){
            eval(typeFood+"Choice" + "--");
            this.classList.remove('active');
        }
        eval(this.value + " = false");
    }

    if (eval(typeFood+"Choice == "+typeFood+"Limit")){
        $('#'+typeFood+'Limit').text('Maximum Atteint😔');
    } else {
        $('#'+typeFood+'Limit').text('');
    }

    console.log(eval(typeFood+"Choice"));

    $('#compteur'+this.classList[0].substring(9)).text(eval(typeFood+"Choice"));

    updateCommand();
});

$('.size').click(function(){
    commande.ingredients.size = document.querySelector('input[name="taille"]:checked, input[name="taille2"]:checked').value;
    console.log(commande);
});