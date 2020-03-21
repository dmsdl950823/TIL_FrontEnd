# 🧇 Graphql
서버에서 미리 쿼리를 통하여 필요한 데이터만 fetching 을 하여 데이터를 전송. overfetch 혹은 underfetch 를 할 걱정을 할 필요가 없다.
Node.js, Ruby, PHP, Python, Golang, 등 여러 환경에서 사용 할 수 있고, 데이터베이스도 어떤 데이터베이스를 사용하던 상관없음

### 쿼리 작성 방법
```
    query {                         |   
      accounts {                    |   accounts 데이터베이스 전체에서
    # account (id: "1") {           |   # accounts 데이터베이스에서 (id가 1인것중에서)만
        username                    |   username과
        email                       |   email
        id                          |   id 를 fetch할거야
      }                              
    }                               
```
