create table articles(id serial primary key, 
title text not null,
description text not null,
image text not null,
content text not null, 
author text not null, 
tags text not null,
p_date text not null
);


create table stats(id serial primary key, 
pageview int not null, data text not null, userid text not null
);