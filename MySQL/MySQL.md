# MySQL Query

## Database
  #### See all databases
    $ SHOW DATABASES;    
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
      $ CREATE DATABASE <database name>;
          Query OK, 1 row affected (0.01 sec)

  #### Use database
      $ USE <database name>;
          Database changed

  #### Remove database
      $ DROP DATABASE <database name>;
          Query OK, 1 row affected (0.01 sec)

  #### See type of tables
      $ DESCRIBE <table name>;
          +------------+-------------+------+-----+---------+----------------+
          | Field      | Type        | Null | Key | Default | Extra          |
          +------------+-------------+------+-----+---------+----------------+
          | _id        | int(11)     | NO   | PRI | NULL    | auto_increment |
          | name       | varchar(30) | NO   |     | NULL    |                |
          | department | varchar(30) | YES  |     | NULL    |                |
          | wage       | int(10)     | YES  |     | NULL    |                |
          | enter_dt   | datetime    | YES  |     | NULL    |                |
          +------------+-------------+------+-----+---------+----------------+


## Use Data in tables
- Char => with '' | Int => without ''

  #### SELECT 

    SELECT * FROM <table name>;
    SELECT <column name 1>, <column name 2>, ... FROM <table name>;
    
  #### INSERT

    INSERT INTO <table name> (column1, column2, column3, column4) VALUE ('value1', 'value2', value3, 'value4');

  #### UPDATE

    UPDATE <table name> SET column1 = 'value1', column2 = 'value2'  WHERE column3 = 'value3' and column4 = 'value4';

  #### DELETE 
  
    DELETE FROM <table name> WHERE column1 = 'value1';
    
    
