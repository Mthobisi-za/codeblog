var factory = require('./factory');
module.exports = function routes(pool, id) {
    var useFactory = factory(pool);

    async function home(req, res) {
        //var data = await axios.get('/stats');
        //console.log(data.data);
        res.render('dash/home');
    }
    return {
        home
    }
};