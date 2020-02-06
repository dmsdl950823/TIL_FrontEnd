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
          
  #### Empty database
  The TRUNCATE TABLE command deletes the data inside a table, but not the table itself.
      > TRUNCATE TABLE <database name>;
          Query OK, 1 row affected (0.01 sec)

  #### See type of tables
      > DESCRIBE <table name>;
          +------------+-------------+------+-----+---------+----------------+
          | Field      | Type        | Null | Key | Default | Extra          |
          +------------+-------------+------+-----+---------+----------------+
          | _id        | int(11)     | NO   | PRI | NULL    | auto_increment |
          | name       | varchar(30) | NO   |     | NULL    |                |
          | department | varchar(30) | YES  |     | NULL    |                |
          | wage       | int(10)     | YES  |     | NULL    |                |
          | enter_dt   | datetime    | YES  |     | NULL    |                |
          +------------+-------------+------+-----+---------+----------------+

---------------------------------------------------------------

## 🔑 Give Grant before using databases / table
  You can give authority to other people before use the dbs.
  Otherwise MySQL blocks server which is not granted so that you can not use the db.
  
    > GRANT <authority> ON <database.table> TO '<id>'@'<hostname>' IDENTIFIED BY '<password>';
    
    # example - You can give authority to all user with => <id>@`%`
    > GRANT DELETE, INSERT, SELECT, UPDATE ON class.* TO `dev`@`%` IDENTIFIED BY '1111';

##### ✔️ Types of Authorities
|controler|authorities|
|------|---|
|developer|DELETE, INSERT, SELECT, UPDATE|
|constructer|ALTER, CREATE, DELETE, DROP, INDEX, INSERT, SELECT, UPDATE, DELETE, INSERT, SELECT, UPDATE|
|DBA|ALL|


----------------------------------------------------------------


## ✏️ Qurey
Char => with '' | Int => without ''

  #### SELECT 

    SELECT * FROM <table name>;
    SELECT <column name 1>, <column name 2>, ... FROM <table name>;
    
  #### INSERT

    INSERT INTO <table name> (column1, column2, column3, column4) VALUE ('value1', 'value2', value3, 'value4');

  #### UPDATE

    UPDATE <table name> SET column1 = 'value1', column2 = 'value2'  WHERE column3 = 'value3' and column4 = 'value4';

  #### DELETE 
  
    DELETE FROM <table name> WHERE column1 = 'value1';
   
   
---------------------------------------------------------------------

## ⚽ Function

  #### 1. Number function
  
  |function | Eng | Kor |
  |------|---|---|
  | ABS(int) | Print absolute number | 절대값 출력 |
  | CEILING(int) |  | 값보다 큰 정수 중 가장 작은 수 |
  |FLOOR(int)|  |값보다 작은 정수 중 가장 큰 수 - 실수를 무조건 버림(음수일 경우는 제외)|
  |ROUND(int, index)||int를 소수점 이하 index(자릿수)에서 반올림 - (자릿수는 양수,0,음수를 가질 수 있음)|
  |TRUNCATE(int,index)||int를 소수점 이하 index(자릿수)에서 버림|
  |POW(X,Y) or POWER(X,Y)||X의 Y승|
  |MOD (numerator, denominator)||numerator(분자)를 denominator(분모)로 나눈 나머지를 구한다.(연산자 %와 같음)|
  |GREATEST(num1,num2,num3...)||주어진 수 중 제일 큰 수 리턴|
  |LEAST(num1,num2,num3...)||주어진 수 중 제일 작은 수 리턴.|
  |INTERVAL(a,b,c,d.....)||a(숫자)의 위치 반환|
 
 
 
 
 
