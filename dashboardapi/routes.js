const res = require('express/lib/response');
var factory = require('./factory');
module.exports = function routes(pool, id) {
    var useFactory = factory(pool);

    async function home(req, res) {
        var userOne = process.env.USER_ONE;
        var userTwo = process.env.USER_TWO;
        var passOne = process.env.USER_ONE_PASS;
        var passTwo = process.env.USER_TWO_PASS;
        var userName = req.params.username;
        if (userName == userOne) {
            res.render('dash/home', { userName });
        } else if (userName == userTwo) {
            res.render('dash/home', { userName });
        } else {
            res.redirect('../');
        }
    }
    async function statistics(req, res) {
        var stats = await useFactory.stats();
        var statsuser = await useFactory.statsUser();
        var userName = req.session.userName;
        res.render('dash/stats', { stats, user: statsuser, userName });
    }
    async function authFun(req, res) {
        var userName = (req.body.username).toLowerCase();
        var password = req.body.psw;
        var userOne = process.env.USER_ONE;
        var userTwo = process.env.USER_TWO;
        var passOne = process.env.USER_ONE_PASS;
        var passTwo = process.env.USER_TWO_PASS;
        if (userName == userOne && password == passOne) {
            req.session.userName = userName;
            res.redirect('/admin/' + userName);
        } else if (userName == userTwo && password == passTwo) {
            req.session.userName = userName;
            res.redirect('/admin/' + userName);
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