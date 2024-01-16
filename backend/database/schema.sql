-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE `User` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `name` varchar(50)  NOT NULL ,
    `email` varchar(100)  NOT NULL ,
    `password` varchar(255)  NOT NULL ,
    `image` varchar(255),
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `Post` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `content` text  NOT NULL ,
    `user_id` int  NOT NULL ,
    `categorie_id` int  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `Categorie` (
    `id` int  NOT NULL AUTO_INCREMENT,
    `name` varchar(50)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

ALTER TABLE `Post` ADD CONSTRAINT `fk_Post_user_id` FOREIGN KEY(`user_id`)
REFERENCES `User` (`id`);

ALTER TABLE `Post` ADD CONSTRAINT `fk_Post_categorie_id` FOREIGN KEY(`categorie_id`)
REFERENCES `Categorie` (`id`);

