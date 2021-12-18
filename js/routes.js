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
    async function newpost(req, res) {
        res.render('newpost');
    }
    async function addpost(req, res) {
        var title = req.body.title;
        var data = JSON.stringify(req.body.data);
        var author = req.body.author;
        var tags = req.body.tags.split(' ');
        await useFactory.makeNewPost(title, data, author, tags.toString());
        res.redirect('/newpost');
    }
    return {
        basicHome,
        basicBlog,
        basicForm,
        post,
        newpost,
        addpost
    }
}