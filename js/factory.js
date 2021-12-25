module.exports = function makeChanges(pool) {
    async function getSnipArt() {
        var data = (await pool.query('select title,description, image, content, author, tags, p_date as date from articles')).rows;
        console.log(data[0].author)
        return data
    }
    async function getPost(id) {
        var data = (await pool.query('select * from articles where id= $1', [id])).rows;
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
    return {
        getSnipArt,
        getPost,
        makeNewPost
    }
}