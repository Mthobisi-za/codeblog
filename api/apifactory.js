module.exports = function factory(pool) {
    async function getAllPosts(req, res) {
        var data = (await pool.query('select * from articles')).rows;
        res.json(data);
    }
    async function post(req, res) {
        var title = req.params.title;
        var data = (await pool.query('select * from articles where title = $1', [title])).rows;
        res.json(data[0]);
    }
    async function getPosts(req, res) {
        var title = req.params.title;
        var data = (await pool.query('select id from articles where title= $1', [title])).rows;
        var nextost = (await pool.query('select title from articles where id= $1', [data[0].id + 1])).rows;
        res.json(data[0]);
    }
    async function getpost(req, res) {
        var title = req.params.title;
        var data = (await pool.query('select id from articles where title= $1', [title])).rows;
        var nexpost = (await pool.query('select title from articles where id= $1', [data[0].id + 1])).rows;
        res.json(nexpost[0].title);
    }
    return {
        getAllPosts,
        post,
        getPosts
    }
}