# Lazy Loading

Lazy loading (also known as asynchronous loading).


Instead of loading the entire web page and rendering it to the user in one go as in bulk loading,
the concept of lazy loading assists in loading only the required section and delays the remaining,
until it is needed by the user.


전체 페이지를 로딩/렌더링 하는것 대신에, lazy loading의 개념은 요구되는 부분의 로딩을 지원하고,
유저에게 필요할 때 까지 남아있는 것들을 지연시킵니다.

One form of lazy loading is infinity scroll, in which, the content of the web page is loaded as and when the user scrolls down the page.
It is a popular technique being used by various websites.

lazyloading의 한 형태는 infinity scroll 인데, 유저가 스크롤을 내릴 때 web page의 컨텐츠가 로드 되는 것입니다.
다양한 웹사이트에서 사용되므로 아주 유명합니다.


### Lazy loading's advantages

* Reducing time consumption and memory usage thereby optimizing content delivery.
  > 최적화된 컨텐츠 전달로 메모리 사용량과 시간을 줄일 수 있습니다.
  필요한 웹 페이지의 일부분이 처음에 로딩 되면, 시간이 줄어들고 나머지 부분의 로딩은 지연되면서 저장공간을 줄입니다.
   All of this enhances the user’s experience as the requested content is fed in no time.
   사용자들의 경함을 향상시킵니다.

* Unnecessary code execution is avoided.
  > 불필요한 코드 실행을 피할 수 있습니다.

* Optimal usage of time and space resources makes it a cost-effective approach from the point of view of business persons. (website owners)
  > 시간과 공간 자원의 최적화는 비즈니스의 관점에서 비용을 효과적으로 만들어줍니다. 


### Disadvantages of Lazy loading

* the extra lines of code, to be added to the existing ones, to implement lazy load makes the code a bit complicated.
  > 이미 존재하는 코드에 추가되는 lazy load의 실행을 위해 만들어진 여분의 코드는 조금 복잡합니다.

*  lazy loading may affect the website’s ranking on search engines sometimes, due to improper indexing of the unloaded content.
  > 올라가지 않은 컨텐츠의 부적절한 indexing 때문에 검색 엔진에서 웹사이트의 랭킹에 영향이 갈 수 있습니다.
