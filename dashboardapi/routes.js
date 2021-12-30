var factory = require('./factory');
module.exports = function routes(pool, id) {
    var useFactory = factory(pool);

    function home(req, res) {
        res.render('dash/home')
    }
    return {
        home
    }
};