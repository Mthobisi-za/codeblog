const factor = require('./factory')
module.exports = function factory(pool) {
    const useFactory = factor(pool);

    function basicHome(req, res) {
        res.render('index')
    }

    async function basicBlog(req, res) {
        var data = await useFactory.getSnipArt();
        res.render('blog', { data });
    }

    function basicForm(req, res) {
        res.render('blog')
    }

    async function post(req, res) {
        var title = req.params.title;
        var post = await useFactory.getPost(title);
        res.render('post', { post });
    }
    async function newpost(req, res) {
        res.render('newpost');
    }
    async function addpost(req, res) {
        var title = req.body.title;
        var description = req.body.description;
        var img = req.body.image;
        var data = JSON.stringify(req.body.data);
        var author = req.body.author;
        var tags = req.body.tags.split(' ');
        await useFactory.makeNewPost(title, description, img, data, author, tags.toString());
        res.redirect('/newpost');
    }
    async function editPost(req, res) {
        var data = await useFactory.getSnipArt();
        res.render('edit/allpost', { data });
    }
    async function changePost(req, res) {
        var title = req.params.title;
        var post = await useFactory.getPost(title);
        res.render('edit/postedit', { post });
    }
    async function update(req, res) {
        console.log(req.body);
        var title = req.body.title;
        var description = req.body.description;
        var img = req.body.image;
        var data = JSON.stringify(req.body.data);
        var author = req.body.author;
        var oldTitle = req.body.hiddenInput;
        await useFactory.updatePost(title, description, data, author, oldTitle);
        res.redirect('/');
    }
    return {
        basicHome,
        basicBlog,
        basicForm,
        post,
        newpost,
        addpost,
        editPost,
        changePost,
        update
    }
}