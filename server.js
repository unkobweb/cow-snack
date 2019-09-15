const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cow-snack',
    port: 3306
});

app.use(express.static(__dirname + '/public'));

connexion.query('SELECT * FROM composition INNER JOIN purchase PC on composition.sandwich_id = PC.sandwich_id INNER JOIN stock ST on composition.ingredient_id = ST.ingredient_id', (err, rows) => {
    if (err){
        console.log('une erreur est survenue !');
    } else {
        let actual = 0;
        let count;
        let commande = {};
        rows.forEach((result) => {
            if (result.sandwich_id > actual){
                actual = result.sandwich_id;
                count = 0;
                commande[result.sandwich_id] = {
                    'id': result.sandwich_id,
                    'name': result.user_name,
                    'phone': result.phone,
                    'ingredients': {'ingredient 0': result.label}
                };
            } else {
                count++;
                commande[result.sandwich_id]['ingredients']['ingredient '+parseInt(count)] = result.label;
            }
        });
        console.log(commande);
    }
});

app.get('/', (req, res) =>{
    res.render('index.ejs');
})
.post('/', urlencodedParser, (req, res) => {
    console.log(req.body.postname);
    console.log(req.body.postclicked);
});

app.listen(8080);