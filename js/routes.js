const factor = require('./factory')
module.exports = function factory(pool) {
    const useFactory = factor(pool);

    function basicHome(req, res) {
        res.render('index')
    }

    async function basicBlog(req, res) {
        var data = await useFactory.getSnipArt();
        console.log(data);
        res.render('blog', { data })
    }

    function basicForm(req, res) {
        res.render('blog')
    }

    async function post(req, res) {
        var ids = req.params.ids;
        var data;
        if (ids != 'script.js') {
            data = await useFactory.getPost(ids);
            console.log(data);
            res.render('post');
        } else {
            res.render('post');
        }

    }
    return {
        basicHome,
        basicBlog,
        basicForm,
        post
    }
}