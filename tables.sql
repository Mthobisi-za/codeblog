create table category(
    id serial primary key,
    category_name text not null
);

insert into category(category_name) values('Isizulu');
insert into category(category_name) values('English');
insert into category(category_name) values('Geography');
insert into category(category_name) values('History');
insert into category(category_name) values('Business');
insert into category(category_name) values('Economics');
insert into category(category_name) values('Tourism');
insert into category(category_name) values('Physical Science');
insert into category(category_name) values('Life Science');
insert into category(category_name) values('Accounting');
insert into category(category_name) values('Life Orientation');
insert into category(category_name) values('Mathematics');
insert into category(category_name) values('Maths Literacy');

create table grade(
    id serial primary key,
    grade_name int not null
);

insert into grade(grade_name) values(10);
insert into grade(grade_name) values(11);
insert into grade(grade_name) values(12);

create table articles(id serial primary key, 
title text not null,
description text not null,
image text not null,
content text not null, 
author text not null, 
tags text not null,
p_date text not null,
category_id int,
foreign key (category_id) references category(id),
grade_id int,
foreign key (grade_id) references grade(id)
);


create table stats(
data text not null, 
userid text primary key
);

create table dates(
    user_id text, foreign key (user_id) references stats(userid),
    actual_date text not null,
    page_view int not null
);

create table subscribers(
    username text not null,
    email text not null
)

