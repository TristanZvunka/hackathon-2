create table if not exists email
(
    id    int unsigned auto_increment
        primary key,
    email varchar(255) null,
    constraint email_pk
        unique (email)
);

create table if not exists data
(
    id    int unsigned primary key auto_increment not null,
    mot   VARCHAR(255)                            NOT NULL,
    count INT                                     NOT NULL
);


create table if not exists blacklist
(
    id  int unsigned primary key auto_increment not null,
    mot VARCHAR(255)                            NOT NULL
);


create table if not exists user
(
    id       int unsigned primary key auto_increment not null,
    email    VARCHAR(255)                            NOT NULL,
    password VARCHAR(255)                            NOT NULL,
    constraint user_pk
        unique (email)
);


create table request (
  id int unsigned primary key auto_increment not null,
  count INT NOT NULL
);

