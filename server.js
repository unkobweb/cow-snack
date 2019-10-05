const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require('express-session');
const bcrypt = require('bcrypt');

const nourriture = ['viande','supp','sauce','boisson','dessert'];

const countDownDate = new Date('October 11, 2019 13:15:00').getTime();
let now = new Date().getTime();

const app = express();
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cow_snack',
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
        console.log('💥-La connexion a la BDD a échouee');
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

if (false/*countDownDate > now*/) {
    app.use((req, res, next) => {
        res.render('countdown.ejs');
    });
} else {
    app.get('/', (req, res) =>{
        res.render('index.ejs', {session: req.session});
    })
    .get('/sandwich', (req, res) => {
        connexion.query('SELECT * FROM stock', (err, rows1) => {
            connexion.query('SELECT * FROM size', (err, rows2) => {
                connexion.query('SELECT * FROM composition INNER JOIN sandwich SW on composition.sandwich_id = SW.composition_id INNER JOIN stock ST on composition.ingredient_id = ST.id', (err, rows3) => {
                    res.render('sandwich.ejs', {print: rows1, printSize: rows2, printMenu: rows3, session: req.session});
                });
            });
        });
    })
    .post('/sandwich', urlencodedParser, (req, res) => {
        req.session.commande = JSON.parse(req.body.user_commande);
        console.log(req.session.commande);
    })
    .get('/special', (req, res) => {
        res.render('special.ejs', {session: req.session});
    })
    .get('/apropos', (req, res) => {
        res.render('apropos.ejs', {session: req.session});
    })
    .get('/contact', (req, res) => {
        res.render('contact.ejs', {session: req.session});
    })
    .get('/conditionsgenerales', (req, res) => {
        res.render('conditionsgenerales.ejs', {session: req.session});
    })
    .get('/politique', (req, res) => {
        res.render('politique.ejs', {session: req.session})
    })
    .get('/mentionslegales', (req, res) => {
        res.render('mentionslegales.ejs', {session: req.session})
    })
    .get('/compte', (req, res) => {
        res.render('compte.ejs', {session: req.session});
    })
    .get('/deconnexion', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    })
    .get('/connexion', (req, res) => {
        if (req.session.userID) {
            res.redirect('/');
        }
        res.render('connexion.ejs');
    })
    .post('/connexion', urlencodedParser, (req, res) => {
        let loginCheck = new Promise((resolve, reject) => {
            connexion.query("SELECT * FROM account WHERE mail = ?", [req.body.usermail], (err, rows) => {
                if (rows.count == 0) {
                    resolve({err: "Aucun compte ne possède cet email !"});
                } else {
                    rows.forEach((result) => {
                        bcrypt.compare(req.body.userpassword, result.password, (err, res) => {
                            if (!res) {
                                resolve({err: "Vous n'avez pas entré le bon mot de passe !"});
                            } else {
                                resolve({userID: result.id, userName: result.name, userFirstname: result.firstname, userMail: result.mail, userPhone: result.phone});
                            }
                        });
                    });
                }
            });
        });
        loginCheck.then((value) => {
            if (value.err) {
                res.render('connexion.ejs',{err: value.err});
            } else {
                req.session.userID        = value.userID;
                req.session.userName      = value.userName;
                req.session.userFirstname = value.userFirstname;
                req.session.userMail      = value.userMail;
                req.session.userPhone     = value.userPhone;
                console.log(req.session);
                res.redirect('/');
            }
        });
    })
    .get('/creationcompte', (req, res) => {
        res.render('creationcompte.ejs');
    })
    .post('/creationcompte', urlencodedParser, (req, res) => {
        let signupCheck = new Promise((resolve, reject) => {
            let errors = [];
            connexion.query("SELECT * FROM account WHERE mail = ?" ,[req.body.usermail], (err, rows) => {
                if (rows.length > 0){
                    errors.push('Cette adresse mail est déjà utilisée !');
                }
            });
            connexion.query("SELECT * FROM account WHERE phone = ?" ,[req.body.userphone.replace(/\s/g, "")], (err, rows) => {
                if (rows.length > 0){
                    errors.push('Ce numéro de téléphone est déjà utilisé !');
                }
            });
            resolve({err: errors});
        });
        signupCheck.then((value) => {
            if (value.err.length > 0){
                res.render('creationcompte.ejs', {err: value.err});
            } else {
                let hash = bcrypt.hashSync(req.body.userpassword, 10);
                connexion.query("INSERT INTO account (name, firstname, password, mail, phone) VALUES (?, ?, ?, ?, ?)",[req.body.username, req.body.userfirstname, hash, req.body.usermail, req.body.userphone.replace(/\s/g, "")]);
                res.render('connexion.ejs',{success: "Votre compte à été créer, vous pouvez vous connecter !"});
            }
        });
    })
    .use((req, res, next) => {
        res.status(404).render('maintenance.ejs', {session: req.session});
    });
}
app.listen(8080);