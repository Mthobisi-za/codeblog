create table articles(id serial primary key, 
title text not null, content text not null, 
publisher text not null, p_date text not null, link text not null);


insert into articles(title, content, publisher, p_date, link) values(
    'Make money online',
    'It is very easy to make money online just do it',
    'Mthobisi',
    '2021/03/20',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png'
);