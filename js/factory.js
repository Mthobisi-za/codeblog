const { database } = require("pg/lib/defaults");

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
    async function updatePost(title, description, data, author, oldTitle) {
        var date = new Date()
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var fullDate = dd + '/' + mm + '/' + yyyy;
        await pool.query(`
        update articles set title = $1,
        description = $2,
        content = $3,
        author = $4,
        p_date = $5
        where title = $6
        `, [title, description, data, author, fullDate, oldTitle])
    }
    async function setUserData(fullData, userId, date) {
        var rDate = '30/01/2021'
        var id = ((await pool.query(`select userid from stats where userid = $1`, [userId])).rows)[0];
        var dataDate = ((await pool.query(`select * from dates where user_id = $1`, [userId])).rows)[0];
        console.log(id);
        console.log(dataDate);
        if (id !== undefined) {
            //update counter
            if (dataDate.actual_date === rDate) {
                //update counter
                await pool.query(`update dates set  page_view = page_view + 1`);
            } else {
                //add new entry for a date
                await pool.query(`insert into dates values($1,$2,$3)`, [userId, rDate, 1]);
            }
        } else {
            //initialize data
            await pool.query(`insert into stats values($1,$2)`, [fullData, userId]);
            await pool.query(`insert into dates values($1,$2,$3)`, [userId, rDate, 1]);
        }
    }
    return {
        getSnipArt,
        getPost,
        makeNewPost,
        getId,
        updatePost,
        setUserData
    }
}