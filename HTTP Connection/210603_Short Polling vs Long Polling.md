# Short Polling vs Long Polling

챗봇같은 real-time application 은 기본 request-response 구조를 사용할 수 없습니다. 이를 구현하기 위해서는 polling 메커니즘을 구현해야합니다. polling 메커니즘에는 real-time 을 구현하기위한 Websoket 과 SSE(server-side event) 도 존재합니다.

그래서, polling 은 무엇일까요?

## Polling

Polling 은 client 가 일정시간 내에 데이터를 얻기 위해 request 를 server 에 보내는 기술을 말합니다.

## Short Polling

`Short Polling` 은 client 가 데이터를 얻기위해 request를 서버에 보낸 후, 정해진 지연(정해진 시간) 후에 respose 를 얻을 수 있는 기술입니다.

1. client 는 request 를 server 에 보냅니다.
2. server 는 가능한 경우, response 를 보내줍니다.
3. client 는 response 를 받은 후에 특정 시간 동안 기다립니다.
4. 그리고 같은 request-response 과정을 반복합니다.

이 기술은 아주 간단하며, server 의 자원을 소비하지도 않지만, event notification 은 즉시 실행되지 않으며, 약간의 지연이 생길수도 있습니다.

> 예시)
> client 가 데이터를 위해 server 에 request 를 요청했지만, 데이터는 즉시 가능하지 않고, 서버는 > 텅 빈 응답을 돌려줍니다.
> 
> client 는 다음 request 를 보내기 전, 5초동안 기다립니다. 이것은 만약, 특정한 시간 동안에는 > (여기선 5 초), client 는 이에대해 알지 못합니다.
> 
> client 는 다음 request 가 보내졌을 때, 드디어 이 데이터를 받습니다.
> 
> 그러므로, 이 기술은 빠른 동작은 아니며, 지연이 발생합니다.

## Long Polling

`Long Polling` 기술은 client 가 데이터를 위해 request 를 server 에 요청할때, 데이터를 가져오는 것이 불가능할경우, server 가 즉각적으로 반응하지 않고 특정 시간을 기다리는 기술입니다. 만약 특정시간동안에 어떤 event 가 발생하거나 데이터에 접근이 가능하게 된 경우, server 는 데이터와함께 응답을 할것입니다. event 나 데이터가 없을 경우, server 는 특정시간 후에 빈 response 를 보내줍니다.

이 기술은 더 복잡하고 server 자원을 많이 소비합니다. 그러나 client 가 지연없이 real-time 경험을 할 수 있도록 해줍니다.

출처 :: [dev.to/bibekkakati](https://dev.to/bibekkakati/short-polling-vs-long-polling-2fme)