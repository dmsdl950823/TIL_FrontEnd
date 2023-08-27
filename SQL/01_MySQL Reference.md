# 51_MySQL 레퍼런스

## String Function

| CHAR_LENGTH | SELECT CHAR_LENGTH("SQL Tutorial") AS LengthOfString; |
| --- | --- |
| CHARACTER_LENGTH | SELECT CHARACTER_LENGTH("SQL Tutorial") AS LengthOfString; |
| CONCAT | 문자열 연결하기 - CONCAT("A ", "B", "C") |
| CONCAT_WS | 문자열 특정 문자로 연결하기 - CONCAT_WS("-", "A", "B", "C") |
| FIELD | 문자열에서 특정 문자 idx 찾기 - FIELD('A', 'A', 'b', 'c') |
| FIND_IN_SET | 문자열에서 특정문자 idx 찾기 - FIND_IN_SET('A', 'A,b,c') |
| FORMAT | 소수점 n 번째까지 절삭 - FORMAT(200.5643, n) |
| INSERT | 특정 위치의 문자열을 대체함 - INSERT("W3Schools.com", 1, 9, "Example" |
| INSTR | 특정 문자의 idx를 반환함 - INSTR('W3Schools.com', ‘S’) |
| LCASE, LOWER | lowercase 표기 - LCASE|LOWER('SQL Tutorial') |
| UCASE , UPPER | uppercase 표기 - UCASE|UPPER('SQL Tutorial') |
| LEFT / RIGHT | 왼쪽/오른쪽에서부터 N번째 문자까지 잘라오기 - LEFT|RIGHT(’SQL Tutorial’, 3) |
| LENGTH | 문자열 길이 반환 - LENGTH('SQL Tutorial') |
| LOCATE | 특정 문자의 idx를 반환함 - LOCATE('S', 'W3Schools.com') |
| LTRIM / RTRIM / TRIM | 좌측/우측의 패딩 문자를 삭제함 - LTRIM|RTRIM|TRIM('   SQL Tutorial    ') |
| REPEAT | 문자열 N번 반복 - REPEAT('SQL Tutorial', N) |
| REPLACE | 문자열 대체 - REPLACE('SQL Tutorial', 'SQL', 'HTML') |
| REVERSE | 문자열 뒤집기 - REVERSE('SQL Tutorial') |
| STRCMP | 문자열 비교 - STRCMP('SQL Tutorial', 'SQL Tutorial') |
| SUBSTR / SUBSTRING | 문자열 n~n까지 자르기 - SUBSTR|SUBSTRING('SQL Tutorial', 5, 3) |
| SUBSTRING_INDEX | 문자열에서 기준점의 N번째를 포함해서 가져옴 -  SUBSTRING_INDEX('www.w3school.com', '.', 2) |

## Numeric Function

| ABS | 절대값으로 변환 - ABS(-243.5) |
| --- | --- |
| ACOS | COS | 숫자의 cosin 값으로 변환 - ACOS|COS(0.25) |
| ASIN | 숫자의 sine 값으로 변환 - ASIN(0.25) |
| ATAN | 숫자의 tangent 값으로 변환 - ATAN(2.5) |
| ATAN2 | 두 숫자의 tangent 값으로 변환 - ATAN(0.5, 1) |
| AVG | 특정 컬럼의 평균값을 구함 - SELECT AVG(column_name) FROM table_name; |
| COT | 숫자의 cotangent 값으로 변환 - COT(6) |
| CEIL | 올림하여 소숫점을 버림 - CEIL(25.35) ⇒ 26 |
| CEILING | 올림하여 소숫점을 버림 - CEILING(25.35) ⇒ 26 |
| COUNT | 특정 컬럼 값 개수를 구함 - SELECT COUNT(column_name) FROM table_name |
| DIV | 나누기 - SELECT 10 DIV 5; |
| FLOOR | 내림하여 소숫점을 버림 - FLOOR(25.99) ⇒ 25 |
| GREATEST | 가장 큰 값을 구함 - GREATEST(3, 12, 64, 8, 25) |
| LEAST | 가장 작은 값을 구함 - LEAST(3, 12, 64, 8, 25) |
| MAX | 특정 컬럼 내 가장 큰 값을 구함 - SELECT MAX(column_name) FROM table_name |
| MIN | 특정 컬럼 내 가장 작은 값을 구함 - SELECT MIN(column_name) FROM table_name |
| RAND | 랜덤 숫자 생성 - RAND() |
| ROUND | 반올림하여 소숫점 N 번째까지 절삭 - ROUND(135.321, 2) ⇒ 135.32 |
| SQRT | 특정 숫자의 제곱근 - SQRT(64) ⇒ 8 |
| SUM | 특정 컬럼 내 값을 모두 더함 - SELECT SUM(column_name) FROM table_name |
| TRUNCATE | 소수점 N번째 이후로 모두 절삭 - TRUNCATE(135.379, 2) ⇒ 135.37 |

## Date Function

| ADDDATE | DATE_ADD | Day 더하기 - ADDDATE|DATE_ADD("2017-06-15", INTERVAL 10 DAY) ⇒ 2017-06-25 |
| --- | --- |
| ADDTIME | Second 더하기 - ADDTIME("2017-06-15 09:34:21", "2") ⇒ 2017-06-15 09:34:23 |
| CURDATE | CURRENT_DATE | 오늘 YYYY-MM-DD 구하기 - CURDATE|CURRENT_DATE() |
| CURRTIME | CURRENT_TIME | 현재 HH:mm:ss 구하기 - CURRTIME|CURRENT_TIME() |
| CURRENT_TIMESTAMP | 현재 YYYY-MM-DD HH:mm:ss 구하기 - CURRENT_TIMESTAMP() |
| DATE | 특정 날짜를 입력하면 YYYY-MM-DD 가 나온다 - DATE('2017-06-15 22:32:33') ⇒ 2017-06-15 |
| DATEDIFF | Day 비교 - DATEDIFF("2017-06-25", "2017-06-15") ⇒ 10 |
| DATE_FORMAT | 날짜 형식 가공 - DATE_FORMAT("2017-06-15", "%Y") ⇒ 2017 |
| SUBDATE | DATE_SUB | Day 빼기 - SUBDATE|DATE_SUB("2017-06-15", INTERVAL 10 DAY) ⇒ 2017-06-15 |
| DAY | 특정 날짜를 입력하면 Day 가 나온다 - DAY("2017-06-15") ⇒ 15 |
| DAYNAME | 특정 날짜를 입력하면 요일이 나온다 - DAYNAME("2017-06-15") ⇒ Tursday |
| DAYOFMONTH | 특정 날짜를 입력하면 1~N Day까지 정보가 나온다 - DAYOFMONTH("2017-06-28") ⇒ 28 |
| DAYOFWEEK | 요일을 알려줌 - DAYOFWEEK("2017-06-15") ⇒ 5
(1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thursday, 6=Friday, 7=Saturday) |
| DAYOFYEAR | 1년 중 며칠인지 알려줌 - DAYOFYEAR("2017-06-15") ⇒ 166
(날짜는 1 ~ 366) |
| EXTRACT | 날짜/월/일 추출 - EXTRACT(YEAR FROM "2017-06-15") ⇒ 2017 |
| HOUR | hour 추출 - HOUR("2017-06-20 09:34:00") ⇒ 9 |
| LAST_DAY | 달의 마지막 Day가 언제인지 알려줌 - LAST_DAY("2017-06-15") ⇒ 2017-06-30 |
| MAKETIME | HH:mm:dd 를 만들어줌 - MAKETIME(11, 35, 4) ⇒ 11:35:04 |
| MINUTE | minute 추출 - MINUTE("2017-06-20 09:34:00") ⇒ 34 |
| MONTH | month 추출 - MONTH("2017-06-15") ⇒ 6 |
| MONTHNAME | 달 이름 추출 - MONTHNAME("2017-06-15") ⇒ June |
| NOW | 현재 YYYY-mm-dd HH:mm:ss 시간 추출 - NOW() |
| SUBTIME | Second 빼기 - SUBTIME("2017-06-15 10:24:21.000004", "5.000001") ⇒ 2017-06-15 10:24:16.000003 |
| TIME_FORMAT | 시간 형식 가공 - TIME_FORMAT("19:30:10", "%H %i %s") ⇒ 19 30 10 |
| TIME_TO_SEC | 시간 ⇒ second 로 가공 - TIME_TO_SEC("19:30:10") ⇒ 70210 |
| TIMEDIFF | 시간 비교 - TIMEDIFF("13:10:11", "13:10:10") ⇒ 00:00:01 |
| TO_DAYS | 날짜를 DAYS로 변환 - TO_DAYS("2017-06-20") ⇒ 736865 |
| WEEK | WEEKOFYEAR | 1년중 몇주인지 알려줌 - WEEK|WEEKOFYEAR("2017-06-15") ⇒ 24 |
| YEAR | year 추출 - YEAR("2017-06-15") ⇒ 2017 |

## Advanced Functions

| IF | 조건이 맞으면, 맞지않으면 출력 - SELECT IF(500<1000, "YES", "NO") |
| --- | --- |
| IFNULL | NULL 인경우 처리 - IFNULL(NULL, "W3Schools.com") |
| ISNULL | NULL 인지 확인 - ISNULL(NULL) |