const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require('express-session');

const nourriture = ['viande','supp','sauce','boisson','dessert'];

const countDownDate = new Date('October 11, 2019 13:15:00').getTime();
let now = new Date().getTime();

const app = express();
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cow-snack',
    port: 3306
});

app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'cowsnacksecuredtoken',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

connexion.query('SELECT * FROM composition INNER JOIN purchase PC on composition.sandwich_id = PC.composition_id INNER JOIN stock ST on composition.ingredient_id = ST.id INNER JOIN size SZ on PC.size_id = SZ.id', (err, rows) => {
    if (err){
        console.log('une erreur est survenue !');
    } else {
        let actual = 0;
        let count;
        let commande = {};
        rows.forEach((result) => {
            if (result.sandwich_id > actual){
                actual = result.sandwich_id;
                count = [0,0,0,0,0];
                commande[result.sandwich_id] = {
                    'id': result.sandwich_id,
                    'name': result.user_name,
                    'phone': result.user_phone,
                    'ingredients': {},
                    'size': result.size_label
                };
                commande[result.sandwich_id]['ingredients'][nourriture[result.type-1]+count[result.type-1]] = result.label;
                count[result.type-1]++;
            } else {
                commande[result.sandwich_id]['ingredients'][nourriture[result.type-1]+count[result.type-1]] = result.label;
                count[result.type-1]++;
            }
        });
        console.log(commande);
    }
});

if (countDownDate > now) {
    app.use((req, res, next) => {
        res.render('countdown.ejs');
    });
} else {
    app.get('/', (req, res) =>{
        res.render('index.ejs');
    })
    .get('/sandwich', (req, res) => {
        connexion.query('SELECT * FROM stock', (err, rows) => {
            res.render('sandwich.ejs', {print: rows, print2: rows, print3: rows, print4: rows});
        });
    })
    .post('/sandwich', urlencodedParser, (req, res) => {
        console.log(req.body.postname);
        console.log(req.body.postclicked);
    })
    .get('/special', (req, res) => {
        res.render('special.ejs');
    })
    .get('/apropos', (req, res) => {
        res.render('apropos.ejs');
    })
    .get('/contact', (req, res) => {
        res.render('contact.ejs');
    })
    .get('/conditionsgenerales', (req, res) => {
        res.render('conditionsgenerales.ejs');
    })
    .get('/politique', (req, res) => {
        res.render('politique.ejs')
    })
    .get('/mentionslegales', (req, res) => {
        res.render('mentionslegales.ejs')
    })
    .use((req, res, next) => {
        res.status(404).render('maintenance.ejs');
    });
}
app.listen(8080);

//SELECT * FROM composition INNER JOIN purchase PC on composition.sandwich_id = PC.composition_id INNER JOIN stock ST on composition.ingredient_id = ST.id INNER JOIN size SZ on PC.size_id = SZ.id