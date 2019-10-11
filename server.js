const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require("express-session");
const bcrypt = require("bcrypt");

const nourriture = ["viande", "supp", "sauce", "boisson", "dessert"];

const countDownDate = new Date("October 11, 2019 13:15:00").getTime();
let now = new Date().getTime();

const app = express();
const connexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cow_snack",
  port: 3306
});

app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "cowsnacksecuredtoken",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

if (false /*countDownDate > now*/) {
  app.use((req, res, next) => {
    res.render("countdown.ejs");
  });
} else {
  app
    .get("/", (req, res) => {
      res.render("index.ejs", { session: req.session });
    })
    .get("/sandwich", (req, res) => {
      connexion.query("SELECT * FROM stock", (err, rows1) => {
        connexion.query("SELECT * FROM size", (err, rows2) => {
          connexion.query(
            "SELECT * FROM composition INNER JOIN sandwich SW on composition.sandwich_id = SW.composition_id INNER JOIN stock ST on composition.ingredient_id = ST.id",
            (err, rows3) => {
              res.render("sandwich.ejs", {
                print: rows1,
                printSize: rows2,
                printMenu: rows3,
                session: req.session
              });
            }
          );
        });
      });
    })
    .post("/sandwich", urlencodedParser, (req, res, next) => {
      let beModified = JSON.parse(req.body.user_commande);

      req.session.commande = {
        name: "",
        phone: "",
        sandwich_name: "",
        user_precision: "",
        ingredients: [],
        size: "",
        dessert: "",
        drink: ""
      };

      let treatment = new Promise((resolve, reject) => {
        if (beModified.ingredients.composition_id != undefined) {
          req.session.commande.sandwich_name =
            beModified.ingredients.sandwich_name;
          req.session.commande.user_precision = req.body.precision;
          req.session.commande.size = beModified.ingredients.size;
          connexion.query(
            "SELECT * FROM composition INNER JOIN sandwich SW on composition.sandwich_id = SW.composition_id INNER JOIN stock ST on composition.ingredient_id = ST.id WHERE composition_id = ?",
            [beModified.ingredients.composition_id],
            (err, rows) => {
              rows.forEach(x => {
                req.session.commande.ingredients.push({
                  id: x.id,
                  slug: x.slug,
                  label: x.label,
                  type: x.type
                });
              });
              resolve();
            }
          );
        } else {
          req.session.commande.sandwich_name =
            beModified.ingredients.sandwich_name;
          req.session.commande.size = beModified.ingredients.size;
          let ingredients = [];
          let sentence = "SELECT * FROM stock WHERE id IN (";
          let count = 0;
          let commande = beModified;
          while (commande.ingredients.meat["meat" + count] != undefined) {
            ingredients.push(commande.ingredients.meat["meat" + count]);
            count++;
          }
          count = 0;
          while (commande.ingredients.supp["supp" + count] != undefined) {
            ingredients.push(commande.ingredients.supp["supp" + count]);
            count++;
          }
          count = 0;
          while (commande.ingredients.sauce["sauce" + count] != undefined) {
            ingredients.push(commande.ingredients.sauce["sauce" + count]);
            count++;
          }
          count = 0;
          ingredients.forEach(result => {
            count == 0 ? (sentence += result) : (sentence += ", " + result);
            count++;
          });
          sentence += ")";
          connexion.query(sentence, (err, rows) => {
            rows.forEach(x => {
              req.session.commande.ingredients.push({
                id: x.id,
                slug: x.slug,
                label: x.label,
                type: x.type
              });
            });
            resolve();
          });
        }
      });
      treatment.then(value => {
        res.sendStatus(200);
      });
    })
    .get("/dessert", (req, res) => {
      connexion.query("SELECT * FROM stock WHERE type = 4", (err, rows) => {
        connexion.query("SELECT * FROM stock WHERE type = 5", (err, rows2) => {
          res.render("dessert.ejs", {
            session: req.session,
            printDrink: rows,
            printDessert: rows2
          });
        });
      });
    })
    .post("/dessert", urlencodedParser, (req, res) => {
      let drinkDessert = new Promise((resolve, reject) => {
        req.session.commande.drink = req.body.boisson;
        req.session.commande.dessert = req.body.dessert;
        resolve();
      });
      drinkDessert.then(value => {
        res.sendStatus(200);
      });
    })
    .get("/livraison", (req, res) => {
      console.log(req.session.commande);
      res.render("livraison.ejs", { session: req.session });
    })
    .post("/livraison", urlencodedParser, (req, res) => {
      let livraison = new Promise((resolve, reject) => {
        let composition_id;
        req.session.commande.name = req.body.nom;
        req.session.commande.phone = req.body.telephone;
        connexion.query(
          "SELECT MAX(sandwich_id) as count FROM composition",
          (err, rows) => {
            composition_id = rows[0].count + 1;
            req.session.commande.ingredients.forEach(result => {
              connexion.query(
                "INSERT INTO composition (sandwich_id, ingredient_id) VALUES (?,?)",
                [composition_id, result.id]
              );
            });
            connexion.query(
              "INSERT INTO purchase (composition_id, user_name, user_phone, sandwich_name, delivery_date, size, user_precision, drink, dessert) VALUES (?,?,?,?,?,?,?,?,?)",
              [
                composition_id,
                req.session.commande.name,
                req.session.commande.phone,
                req.session.commande.sandwich_name,
                req.body.livraison,
                req.session.commande.size,
                req.session.commande.user_precision,
                req.session.commande.drink,
                req.session.commande.dessert
              ]
            );
            req.session.commande = {};
            connexion.query(
              "SELECT MAX(id) as count FROM purchase",
              (err, rows) => {
                req.session.commandeid = rows[0].count;
                resolve();
              }
            );
          }
        );
      });
      livraison.then(value => {
        res.sendStatus(200);
      });
    })
    .get("/final", (req, res) => {
      if (req.session.commandeid == undefined) {
        res.redirect("/");
      } else {
        res.render("final.ejs", { session: req.session });
      }
    })
    .post("/final", urlencodedParser, (req, res) => {
      let note = new Promise((resolve, reject) => {
        connexion.query(
          "INSERT INTO rate (mark, purchase_id, user_precision) VALUES (?,?,?)",
          [req.body.mark, req.session.commandeid, req.body.remarque]
        );
        resolve();
      });
      note.then(value => {
        res.sendStatus(200);
      });
    })
    .get("/special", (req, res) => {
      res.render("special.ejs", { session: req.session });
    })
    .get("/apropos", (req, res) => {
      res.render("apropos.ejs", { session: req.session });
    })
    .get("/contact", (req, res) => {
      res.render("contact.ejs", { session: req.session });
    })
    .get("/conditionsgenerales", (req, res) => {
      res.render("conditionsgenerales.ejs", { session: req.session });
    })
    .get("/politique", (req, res) => {
      res.render("politique.ejs", { session: req.session });
    })
    .get("/mentionslegales", (req, res) => {
      res.render("mentionslegales.ejs", { session: req.session });
    })
    /*.get('/compte', (req, res) => {
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
    })*/
    .use((req, res, next) => {
      res.status(404).render("maintenance.ejs", { session: req.session });
    });
}
app.listen(8080);
