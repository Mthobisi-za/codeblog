const express = require('express');
require('dotenv').config();
const { engine } = require('express-handlebars');
const body = require('body-parser');
const session = require('express-session');
const app = express();
const USID = require("usid");
const usid = new USID();
const unique_id = usid.uuid();
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
var connectionString = process.env.DATABASE_URL;
var pool;
if (connectionString) {
    pool = new Pool({
        connectionString,
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
};
const routes = require('./js/routes');
const useRoutes = routes(pool, unique_id);

app.get('/', useRoutes.basicHome);
app.get('/upload', useRoutes.basicForm);
app.get('/blog', useRoutes.basicBlog);
app.get('/post/:title', useRoutes.post);
app.get('/newpost', useRoutes.newpost);
app.post('/addpost', useRoutes.addpost);
//edit post
app.get('/edit', useRoutes.editPost);
app.get('/edit/post/:title', useRoutes.changePost);
app.post('/update', useRoutes.update);
app.post('/search', useRoutes.search);


//api
const apiFactory = require('./api/apifactory')
const useApi = apiFactory(pool, unique_id);
app.get('/data', useApi.getAllPosts);
app.get('/axios/post/:title', useApi.post);
app.get('/axios/next/post/:title', useApi.getpost);
//api dashboard
app.get('/stats', useApi.stats);
app.get('/stats/user', useApi.statsUser);

//dashboard
const useDashRoutes = require('./dashboardapi/routes')(pool, unique_id);
app.get('/admin/:username', useDashRoutes.home);
app.get('/statistics', useDashRoutes.statistics)

///auth
app.post('/login', useDashRoutes.authFun);

//contact form
app.get('/contact', useDashRoutes.contact);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started on ' + PORT);
});