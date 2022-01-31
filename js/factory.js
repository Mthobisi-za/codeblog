module.exports = function makeChanges(pool) {
    async function getSnipArt() {
        var data = (await pool.query(`
        select articles.title,articles.description, articles.image, articles.content, articles.author, articles.tags, articles.p_date as date, 
        category.category_name, grade.grade_name from 
        ((articles inner join category on articles.category_id = category.id)
        inner join grade  on articles.grade_id = grade.id)
        `)).rows;
        return data
    }
    async function getPost(title) {
        var data = (await pool.query('select * from articles where title= $1', [title])).rows;
        return data[0];
    }
    async function makeNewPost(title, desription, img, data, author, tags, subject, grade) {
        var date = new Date()
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var fullDate = dd + '/' + mm + '/' + yyyy;
        await pool.query('insert into articles (title,description, image, content, author, tags, p_date, category_id, grade_id) values($1,$2,$3,$4, $5, $6, $7, $8,$9)', [title, desription, img, data, author, tags, fullDate, subject, grade])
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
        p_date = $5 where title = $6 `, [title, description, data, author, fullDate, oldTitle])
    };
    async function setUserData(fullData, userId, date) {
        var rDate = '30/01/2021'
        var id = ((await pool.query(`
                    select userid from stats where userid = $1 `, [userId])).rows)[0];
        var dataDate = ((await pool.query(`
                    select * from dates where user_id = $1 `, [userId])).rows)[0];
        console.log(id);
        console.log(dataDate);
        if (id !== undefined) {
            //update counter
            if (dataDate.actual_date === rDate) {
                //update counter
                await pool.query(`
                    update dates set page_view = page_view + 1 `);
            } else {
                //add new entry for a date
                await pool.query(`
                    insert into dates values($1, $2, $3)
                    `, [userId, rDate, 1]);
            }
        } else {
            //initialize data
            await pool.query(`
                    insert into stats values($1, $2)
                    `, [fullData, userId]);
            await pool.query(`
                    insert into dates values($1, $2, $3)
                    `, [userId, rDate, 1]);
        }
    }
    //drop down list
    async function getGrades() {
        return (await pool.query(`select * from grade`)).rows;
    }
    async function getSubject() {
        return (await pool.query(`select * from category`)).rows;
    }
    async function search(subject, grade) {
        var grade_id = ((await pool.query('select id from grade where grade_name = $1', [grade])).rows[0]).id;
        var subject_id = ((await pool.query('select id from category where category_name = $1', [subject])).rows[0]).id;
        console.log(grade_id, subject_id);
        return (await pool.query(`
        select articles.title,articles.description, articles.image, articles.content, articles.author, articles.tags, articles.p_date as date, 
        category.category_name, grade.grade_name from 
        ((articles inner join category on articles.category_id = category.id)
        inner join grade  on articles.grade_id = grade.id) where category_id = $1 and grade_id= $2
        `, [subject_id, grade_id])).rows
    }
    //drop down list
    return {
        getSnipArt,
        getPost,
        makeNewPost,
        getId,
        updatePost,
        setUserData,
        getGrades,
        getSubject,
        search
    }
}