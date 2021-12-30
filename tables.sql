create table articles(id serial primary key, 
title text not null,
description text not null,
image text not null,
content text not null, 
author text not null, 
tags text not null,
p_date text not null
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

