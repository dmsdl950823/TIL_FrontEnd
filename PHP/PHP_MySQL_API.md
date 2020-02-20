# PHP_MySQL_API.md

 > Php 는 데이터베이스와 연동하는데 다양한 함수들 제공. Mysqli
지원하는 DBMS종류가 많기때문에 각각의 DBMS와 연동할 수 있는 함수들을 별도로 지원

|함수|의미|주로 많이 사용되는 함수|
|------|---|---|
|Mysql_affected_rows ( )|최근 MYSQL 작업으로 처리된 행의 갯수를 구한다||
|Mysql_change_user ( )|현재 접속중인 로그인 사용자 변경||
|Mysql_close ( )|MYSQL 서버연결을 닫는다|스크립트 마지막에 도달하면 자동적으로 연결을 닫지만 미리 연결을 닫는것이 메모리관리상 용이|
|Mysql_connect ( )|MYSQL 서버에 접속한다|함수로 데이터베이스 연결을 도와주는 함수|
|Mysql_create_db ( )|MYSQL 데이터베이스를 생성한다|
|Mysql_data_seek ( )|해당 결과 포인터로 이동한다|
|Mysql_db_name ( )|데이터의 결과를 얻는다|
|Mysql_db_query ( )|MYSQL 질의문을 전송한다|
|Mysql_drop_db ( )|MYSQL 데이터베이스를 삭제한다|
|Mysql_errno ( )|최근 MYSQL 작업으로 발생한 에러 번호를 반환한다.|Mysql 작업으로 발생한 에 러 번호 반환, 에 러 없을경우 0반환
최근에 실행된 MySQL 에서 발생된 에러코드만 얻을 수 있고 다른 MySQL함수보다 먼저 사용해야함
|Mysql_error ( )|실행된 MYSQL 작업으로 발생한 에러 메시지 반환|MySQL작업으로 발생한 에러메세지를 반환, 에러없을 경우 공백 （"）반환
최근에 실행된 MySQL 에서 발생된 에러코드만 얻을 수 있고 다른 MySQL함수보다 먼저 사용해야함
|Mysql_fetch_array ( )|결과를 필드이름 색인 또는 숫자 색인으로 된 배열|질의한 결과에서 한 행（레코드）씩 배열로 받는 함수.
배열로 저장된 데이터를 가져오기 위해서 컬럼（필드）명 키로 사용
|Mysql_fetch_assoc ( )|결과를 필드이름 색인 으로 된 연관배열로 반환
|Mysql_fetch_field ( )|결과로부터 열 정보를 얻어서 객체 반환
|Mysql_fetch_lengths ( )|각 열의 길이를 반환（색인 값이 0으로 시작하는 배열로 저장）|Mysql_fetch_object(), Mysql_fetch_array(), Mysql_fetch_row() 함수로부터 얻은행으로부터 
각 열의 길이를 색인값이 0으로 시작하는 배열로 저장하여 반환
|Mysql_fetch_object ( )|행의 결과를 객체로부터 얻고, 행이없을때 false 반환|MYSQL 검색결과중 한개의 행을 객체로 반환. Fetch.ArrayO 함수와 유사하가 만 배열대신 객체로 반환 
필드이름으로 데이터에 접근가능. 두번째 매개변수（result type）에는 상수가 오며 MYSQL_ASSOC, MYSQL_NUM, MYSQL_BOTH 값을 가질 수 있다.
|Mysql_fetch_row ( )|결과를 숫자색인으로 돈 배열로 반환|질의한 결과에서 한행씩 배열로 받는 함수.처음필드를 0부터 시작하여 마지막컬럼（필드） 까지 번호화하여 저장
|Mysql_field_flag ( )|특정 필드의 상태정보를 반환
|Mysql_field_name ( )|특정필드의 이름을 반환|MYSQL 결과로부터 특정 컬럼의 색인값 반환
Fieldjndex 는 0부터 시작, 컬럼의숫자가 오프셋
|Mysql_field_len ( )|특정필드의 길이 반환
|Mysql_field_seek ( )|특정필드의 오프셋의 위치로 이동
|Mysql_field_table ( )|특정필드가 있는 테이블의 이름을 반환한다
|Mysql_field_type ( )|특정필드의 데이터형 정보를 반환|MySQL 결과로부터 특정 컬럼의 데이터형 정보를 반환 
Fieldjndex 0부터 시작, 컬럼의 숫자가 오프셋
|Mysql_free_result ( )|메모리 내용을 해제한다|MySQL 결과 메모리에있는 내용을 모두 제거. 결과값이 커서 데이터를 많이 사용하는 경우 사용.
결과값은 프로그럼 종료후 자동 삭제됨
|Mysql_insert_id ( )|Insert 작업으로 생성된 identifier 값 반환
|Mysql_list_dbs ( )|MYSQL 서버에 있는 데이터베이스 이름 반환
|Mysql_list_tables ( )|Mysql 결과의 필드리스트 반환
|Mysql_num_field ( )|Mysql 데이터베이스의 테이블 목록 반환
|Mysql_num_rows ( )|필드의 개수를 반환|질의한 테이블의 행（레코드）의 수 반환
|Mysql_pconnect ( )|MYSQL 서버와 영구적으로 접속한다
|Mysql_query ( )|Mysql 에 질의를 보낸다|데이터베이스에 쿼리 문을 실행하도록하는 함수
|Mysql_result ( )|결과데이 터를 반환한다|질의한 결과 데이터에 행（레코드）과 컬럼（필드）를 지정하여 데이터를 가져오는 함수
|Mysql_select_db ( )|Mysql 데이터베이스를 선택한다|여러개의 db중 사용할 하나의 데이 터베이스를 선택하는 함수.
|Mysql_tablename ( )|필드의 테이블 이름을 반환한다.
