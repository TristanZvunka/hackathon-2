create table if not exists email
(
    id    int unsigned auto_increment
        primary key,
    email varchar(255) null,
    constraint email_pk
        unique (email)
);

create table data (
  id int unsigned primary key auto_increment not null,
  mot VARCHAR(255) NOT NULL,
  count INT NOT NULL
);

