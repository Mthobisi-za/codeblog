module.exports = function makeChanges(pool) {
    async function getSnipArt() {
        var data = (await pool.query('select * from articles')).rows;
        console.log(data)
        return data
    }
    async function getPost(id) {
        var data = (await pool.query('select * from articles where id= $1', [id])).rows;
        return data[0];
    }
    return {
        getSnipArt,
        getPost
    }
}