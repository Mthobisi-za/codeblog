var factory = require('./factory');
module.exports = function routes(pool, id) {
    var useFactory = factory(pool);

    async function home(req, res) {
        res.render('dash/home');
    }
    async function statistics(req, res) {
        var stats = await useFactory.stats();
        var statsuser = await useFactory.statsUser();
        statsuser
        res.render('dash/stats', { stats, user: statsuser });
    }
    return {
        home,
        statistics
    }
};