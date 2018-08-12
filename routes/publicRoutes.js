const controller = require('../controller/publicController');

module.exports = function (app, passport) {

    app.get('/api/publicSearch', controller.publicSearch)

    app.get('/api/auth', function (req, res) {
        console.log('is authenticated:', req.isAuthenticated() )
        res.json(req.isAuthenticated())
    })

    app.post('/api/register', passport.authenticate('local-register'));

    app.post('/api/login', passport.authenticate('local-login'), function (req,res) {
        console.log('[/api/login]', req.isAuthenticated() )
        res.json(req.isAuthenticated())
    });

    

}
