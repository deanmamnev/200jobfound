const path = require("path");
const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4001;

var options = { //this will go in the .env
    host: 'qzkp8ry756433yd4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'pb2zjsjoyz065grb',
    password: 'f9nqjopt771twijx',
    database: 'sik6moku3wk94twj'//,
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser('keyboard cat'))

app.use(session({
    secret: 'keyboard cat',
    store: sessionStore,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))
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