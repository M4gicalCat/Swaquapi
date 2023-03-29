drop table if exists gorgee;
drop table if exists swallower;

create table if not exists swallower (
    id serial,
    username varchar(255) not null,
    password varchar(255) not null,
    primary key (id),
    unique (username)
);

create table if not exists gorgee (
    swallower_id integer references swallower(id) not null,
    quantity integer not null,
    date timestamptz not null,
    primary key (swallower_id, date)
);