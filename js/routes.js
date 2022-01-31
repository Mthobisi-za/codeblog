const factor = require('./factory');
const userData = require('./userData')();
var fs = require('fs');
var key = process.env.KEY
var convertapi = require('convertapi')(key);
module.exports = function factory(pool, unique_id) {
    const useFactory = factor(pool);
    async function basicHome(req, res) {
        /*------
        convertapi.convert('txt', {
            File: './dummy.pdf'
        }, 'pdf').then(function(result) {
            console.log(result);
            result.saveFiles('./');
        });---------*/
        var userInfo = await userData.getUserData();
        var userDateInfo = await userData.getUserDate();
        if (req.session.unique_id) {
            //already a user
            await useFactory.setUserData(userInfo, unique_id, userDateInfo);
        } else {
            //new user
            req.session.unique_id = unique_id;
            await useFactory.setUserData(userInfo, unique_id, userDateInfo);
        }
        res.render('index')

    }

    async function basicBlog(req, res) {
        var data = await useFactory.getSnipArt();
        var subject = await useFactory.getSubject();
        var grade = await useFactory.getGrades();
        res.render('blog', { data, subject, grade });
    }

    function basicForm(req, res) {
        res.render('blog');
    }

    async function post(req, res) {
        var title = req.params.title;
        var post = await useFactory.getPost(title);
        res.render('post', { post });
    }
    async function newpost(req, res) {
        var getGrade = await useFactory.getGrades();
        var getSubjectList = await useFactory.getSubject();
        res.render('newpost', { grade: getGrade, subject: getSubjectList });
    }
    async function addpost(req, res) {
        var title = req.body.title;
        var description = req.body.description;
        var img = req.body.image;
        var data = JSON.stringify(req.body.data);
        var author = req.body.author;
        var tags = req.body.tags.split(' ');
        var subject = req.body.subject;
        var grade = req.body.grade;
        console.log(subject);
        console.log(grade);
        await useFactory.makeNewPost(title, description, img, data, author, tags.toString(), subject, grade);
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
        var title = req.body.title;
        var description = req.body.description;
        var img = req.body.image;
        var data = JSON.stringify(req.body.data);
        var author = req.body.author;
        var oldTitle = req.body.hiddenInput;
        await useFactory.updatePost(title, description, data, author, oldTitle);
        res.redirect('/');
    }
    async function search(req, res) {
        var subjectt = req.body.subject;
        var gradee = req.body.grade;
        var data = await useFactory.search(subjectt, gradee);
        var subject = await useFactory.getSubject();
        var grade = await useFactory.getGrades();
        if (data.length < 1) {
            var err = 'Err : No data for this subject and grade you chosed';
            var tip = 'Tip: Please click on the show all button to see all the content.'
            res.render('blog', { err, subject, grade, tip })
        } else {
            res.render('blog', { data, subject, grade });
        }


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
        update,
        search
    }
}