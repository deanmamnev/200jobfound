const path = require("path");
const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT = process.env.PORT || 4001;

var options = { //this will go in the .env
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE//,
};
// var options ={
//     user: "root",
//     password: "root",
//     database: "twohundredjobfound",
//     host: " 127.0.0.1",
//     port: 3306,
//     dialect: "mysql"
// }
var sessionStore = new MySQLStore(options);

app.use(express.static('public'))
app.use(cookieParser('keyboard cat'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/search', (req, res) => res.sendFile(path.join(__dirname + '/views/search.html')))
app.get('/saved', (req, res) => res.sendFile(path.join(__dirname + '/views/saved.html')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/landing.html')))

const publicRoute = require('./routes/publicRoutes.js')
publicRoute(app, passport);

const privateRoute = require('./routes/privateRoutes.js')
privateRoute(app, passport);

const models = require("./models/index.js");
require('./config/passport.js')(passport, models.user);

models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});
app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/views/notfound.html')))
app.listen(PORT, function () {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});