# MySQL

## 🚪 Access
    $ mysql -u root - p
        Enter password : 
        
---------------------------

## 📋 Database
  #### See all databases
    > SHOW DATABASES;    
        +--------------------+
        | Database           |
        +--------------------+
        | information_schema |
        | front_end          |
        | mysql              |
        | performance_schema |
        | sys                |
        +--------------------+

  #### Create database
      > CREATE DATABASE <database name>;
          Query OK, 1 row affected (0.01 sec)

  #### Use database
      > USE <database name>;
          Database changed

  #### Remove database
  The DROP TABLE command deletes a table in the database.
      > DROP DATABASE <database name>;
          Query OK, 1 row affected (0.01 sec)
          
  


---------------------------------------------------------------
## 🧱 Manage Tables

  #### Create Table
    > CREATE TABLE <table_name> (
        column1 INT PRIMARY KEY AUTO_INCREMENT,
        column2 VARCHAR(32) NOT NULL,
        column3 VARCHAR(12) DEFAULT 'FOO',
        column4 VARCHAR(12)
      ) ENGINE=INNODB;
      
      
  #### See all the tables
      > SHOW TABLES;
          +------------------+
          | Tables_in_dbname |
          +------------------+
          | example_info     |
          | table_name       |
          +------------------+
    

  #### Look inside the Table
    > DESCRIBE <table_name>;
        +---------+-------------+------+-----+---------+----------------+
        | Field   | Type        | Null | Key | Default | Extra          |
        +---------+-------------+------+-----+---------+----------------+
        | column1 | int(11)     | NO   | PRI | NULL    | auto_increment |
        | column2 | varchar(32) | NO   |     | NULL    |                |
        | column3 | varchar(12) | YES  |     | FOO     |                |
        | column4 | varchar(12) | YES  |     | NULL    |                |
        +---------+-------------+------+-----+---------+----------------+

  #### Empty table
  The TRUNCATE TABLE command deletes the data inside a table, but not the table itself.
  
      > TRUNCATE TABLE <table_name>;
          Query OK, 1 row affected (0.01 sec)

  #### Remove table
      > DROP TABLE <table_name>;

---------------------------------------------------------------

## 🔑 Give Grant before using databases / table
  You can give authority to other people before use the dbs.
  Otherwise MySQL blocks server which is not granted so that you can not use the db.
  
    > GRANT <authority> ON <database.table> TO '<id>'@'<hostname>' IDENTIFIED BY '<password>';
    
    # example - You can give authority to all user with => <id>@`%`
    > GRANT DELETE, INSERT, SELECT, UPDATE ON class.* TO `root`@`%` IDENTIFIED BY '1111';

##### ✔️ Types of Authorities
|controler|authorities|
|------|---|
|developer|DELETE, INSERT, SELECT, UPDATE|
|constructer|ALTER, CREATE, DELETE, DROP, INDEX, INSERT, SELECT, UPDATE, DELETE, INSERT, SELECT, UPDATE|
|DBA|ALL|


----------------------------------------------------------------


