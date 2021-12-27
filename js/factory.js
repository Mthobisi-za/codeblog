module.exports = function makeChanges(pool) {
    async function getSnipArt() {
        var data = (await pool.query('select title,description, image, content, author, tags, p_date as date from articles')).rows;
        return data
    }
    async function getPost(title) {
        var data = (await pool.query('select * from articles where title= $1', [title])).rows;
        return data[0];
    }
    async function makeNewPost(title, desription, img, data, author, tags) {
        var date = new Date()
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var fullDate = dd + '/' + mm + '/' + yyyy;
        await pool.query('insert into articles (title,description, image, content, author, tags, p_date) values($1,$2,$3,$4, $5, $6, $7)', [title, desription, img, data, author, tags, fullDate])
    }
    async function getId(title) {
        var data = (await pool.query('select id from articles where title= $1', [title])).rows;
        var nextost = (await pool.query('select title from articles where id= $1', [data[0].id + 1])).rows;
        return data[0];
    }
    return {
        getSnipArt,
        getPost,
        makeNewPost,
        getId
    }
}