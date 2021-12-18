module.exports = function factory(pool) {
    async function getAllPosts(req, res) {
        var data = (await pool.query('select * from articles')).rows;
        console.log(data)
        res.json(data);
    }
    return {
        getAllPosts
    }
}