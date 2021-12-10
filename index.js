const express = require('express');
const { engine } = require('express-handlebars');
const body = require('body-parser');
const session = require('express-session');
const app = express();
const { Pool } = require('pg');
app.use(express.static('public'));
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);
var connectionstr = process.env.DATABASE_URL;
var pool;
if (connectionstr) {
    pool = new Pool({
        connectionString: connectionstr,
        ssl: { rejectUnauthorized: false },
    });
} else {
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        port: 5432,
        password: 'mthobisi',
        database: 'users',
        ssl: false,
    });
}
const routes = require('./js/routes')
const useRoutes = routes(pool);

app.get('/', useRoutes.basicHome);
app.get('/upload', useRoutes.basicForm);
app.get('/blog', useRoutes.basicBlog);
app.get('/post/:ids', useRoutes.post);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on ' + PORT);
});