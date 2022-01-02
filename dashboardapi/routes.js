const res = require('express/lib/response');
var factory = require('./factory');
module.exports = function routes(pool, id) {
    var useFactory = factory(pool);

    async function home(req, res) {
        var userName = req.params.username;
        if (userName == 'mthobisi') {
            res.render('dash/home', { userName });
        } else if (userName == 'mthandeni') {
            res.render('dash/home', { userName });
        } else {
            res.redirect('../');
        }
    }
    async function statistics(req, res) {
        var stats = await useFactory.stats();
        var statsuser = await useFactory.statsUser();
        statsuser
        res.render('dash/stats', { stats, user: statsuser });
    }
    async function authFun(req, res) {
        var userName = req.body.username;
        var password = req.body.psw
        if (userName.toLowerCase() == 'mthobisi' && password.toLowerCase() == 'mthosasa3') {
            res.redirect('/admin/' + userName.toLowerCase());
        } else if (userName.toLowerCase() == 'mthandeni' && password.toLowerCase() == 'mthosasa3') {
            res.redirect('/admin/' + userName.toLowerCase());
        } else {
            res.redirect('/');
        }
    }
    async function contact(req, res) {
        res.render('contact');
    }
    return {
        home,
        statistics,
        authFun,
        contact
    }
};