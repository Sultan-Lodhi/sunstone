module.exports = {
    "up": "CREATE TABLE add_users (id int(11) unsigned NOT NULL AUTO_INCREMENT,name varchar(100) NOT NULL,email varchar(100) NOT NULL,subject varchar(100) DEFAULT NULL,user_type smallint(5) unsigned NOT NULL COMMENT '1=> Student, 2=> Faculty',image varchar(200) NULL,creation_date date NOT NULL,PRIMARY KEY (id)) ENGINE=MyISAM DEFAULT CHARSET=latin1",
    "down": "DROP TABLE add_users"
}