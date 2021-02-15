# Typescript Handbook 2 _ Function

## Index

* [Functions](#functions)

---------------------------------------

# Functions

Typescript에서 Function은 class, namespace, module들이 있긴 하지만, 여전히 '무언가를 하는 역할'을 합니다.
Typescript는 표준 Javascript function을 더 쉽게 사용, 동작할 수 있도록 새로운 기능을 추가합니다.

Javascript 처럼, Typescript function은 named function이나 anonymous function 둘 다 생성할 수 있습니다.

## Functions Types
``` js
  function add(x: number, y: number): number {
    return x + y
  }

  let myAdd = function (x: number, y: number): number {
    return x + y
  }
```

각 parameter에 type을 더해줄 수 있고, function 자신에게는 `return` type을 지정할 수 있습니다. return type 은 옵션으로 생략 할 수도 있습니다.

## Writing the function type

``` js
  let myAdd: (x: number, y: number) =>
    number = function ( x: number, y: number ): number {
      return x + y;
    };
```

function의 타입은 공통된 투가지 arguments와 return type을 가집니다.

parameter list 처럼 parameter types를 적고, 각 parameter에 name과 type을 지정해줍니다. 이 name은 읽을 수 있도록 도와주는 용도입니다. 하단과 같이 작성할 수 있습니다.

``` js
  let myAdd: (baseValue: number, increment: number) =>
    number = function (x: number, y: number): number {
      return x + y;
    };
```

return type은 parameter과 return type 사이의 arrow (=>) 를 사용하여 정의합니다.

이전에 언급했던 바와 같이 function이 value를 반환하지 않는다면, 그냥 두는 것 보다 void 를 사용하는 것이 좋습니다.

이상하다고 생각 했겠지만, Typescript compiler는 등호(=) 옆에 type을 정의해 해당 type을 찾을 수 있습니다.

이것은 `"contextual typing"`이라고 부르는 type interface의 형태입니다. 이것은 타이핑 노력과 시간을 줄이는데 도움을 줍니다.

## Optional and Default Parameters

Typescript에서, 모든 parameter는 값을 갖게 되지만 null이나 undefined가 주어질 수도 있습니다.
<b>function에 제공된 매개변수의 숫자는 function이 예상하는 parameter의 숫자에 일치해야합니다.<b>

``` js
  function buildName(firstName: string, lastName: string) {
    return firstName + '' + lastName
  }

  // Error! Expected 2 arguments..
  let result1 = buildName('bob')
  let result2 = buildName('bob', 'adams', 'Sr.')
```

Javascript에서, 모든 parameter는 옵션입니다. parameter에 값이 없을 때는 undefined가 할당됩니다.
Typescript에선는 parameter의 끝에 `?`를 더하여 해당 parameter는 옵션이라는 것을 알려줄 수 있습니다. 

``` js
  function buildName(firstName: string, lastName?: string) {
    return firstName + '' + lastName
  }

  let result1 = buildName('bob', 'adams', 'Sr.') // Error! Expected 1-2 arguments..
  let result2 = buildName('bob', 'adams')
  let result3 = buildName('bob')

  function buildName(firstName?: string, lastName: string) {
    return firstName + '' + lastName
  }

  let result1 = buildName('bob') // Error! Expected 2 arguments..
```

Typescript에서는, 만약 사용자가 parameter를 제공하지 않을 경우, 또는 undefined를 입력한 경우, 필요한 경우에 해당 부분에 설정될 기본 값을 세팅해주어야 합니다.

optional parameter과 기본 parameter는 그들의 타입을 공유한다는 것을 의미하므로,
두가지 방법 모두 (사이트 function 두개 참고) `(firstName: string, lastName?: string) => string` type을 공유합니다. 😒😒😒
기본 lastName 값은 type에서 사라지고, parameter는 optional 이라는 사실만 남습니다.

일반 optional parameter과는 다르게 기본 생성된(default-initailized) parameters는 필수 parameter 뒤에 올 필요는 없습니다.
만약 default-initalized parameter가 필수 parameter 앞에 올 경우, 사용자는 default initialized 값을 갖기 위하여 구체적으로 undefined를 넘겨주어야 합니다. 

``` js
  function buildName(firstName = 'Will', lastName: string) {
    return firstName + ' ' + lastName
  }

  buildName('Bob', 'Jae')
  buildName(undefined, 'Jae')
```


## Rest Parameters

필요한, 옵션, 기본 parameters 들은 모두 한번에 한 parameter 에 대해서만 보여줍니다.
가끔 많은 parameters를 그룹으로 가지고있거나, 얼마나 많은 parameter들이 function에 들어올지 알 수 없는 경우가 있습니다.

Javascript에서, 여러분은 모든 function 안에서 보여지는 arguments 변수를 직접적으로 사용할 수도 있습니다만, Typescript에서는 변수에 이 arguments들을 뭉쳐넣을 수 있습니다.

``` js
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + '' + restOfName.join(' ')
  }

  let employeeName = buildName('A', 'B', 'C', 'D')
```

'Rest parameter'는 제한없는 optional parameters의 갯수를 다룹니다.
여러분은 arguments를 원하는 만큼 rest parameter에 넘겨줄 수 있습니다. (아무것도 넘기지 않아도 됩니다!)

컴파일러는 ( ... ) 뒤에 주어진 arguments의 배열을 빌드하여 여러분의 function에 사용할 수 있도록 해줄 것입니다.
ellipsis(...)는 rest parameter과 함께 function의 타입에서도 쓸 수 있습니다.

``` js
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + '' + restOfName.join(' ')
  }

  let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
```


## this and arrow functions
Typescript는 Javascript에서 파생되었기 때문에, Typescript 개발자들은 this를 사용하는 방법과, 언제 그것이 사용되지 않는지를 정확하게 찾는 방법을 알아야합니다.
다행히 Typescript는 부적절하게 this를 사용하는지 여부를 체크해줍니다. 만약 this를 Javascript에서 사용하는 방법을 모를경우, this에 관한 이해(링크) 를 참고하세요. 


Javascript에서, this 변수는 function이 호출될 때 설정되는 변수입니다.

이 변수는 아주 강력하고 유동적인 특징을 가지고있지만, function이 동작하는 context에 대해서 알아야할 필요성이 있습니다.
이부분은 굉장히 헷갈리는데, 특히 function이나 function을 argument로 전달해줄 때 더욱이 그렇습니다.

``` js
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      return function () {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker()

  alert("card: " + pickedCard.card + " of " + pickedCard.suit)
```

> createCardPicker은 function을 리턴하는 function입니다. 만약 이 예제를 실행할경우, error를 반환합니다. createCardPicker에 의해서 생성된 function에서 사용된 this가 deck object대신 window에 설정되기 때문입니다.
This is because/ the this (being used in the function created by createCardPicker) will be set to window instead of our deck object.
우리가 cardPicker()그 자신을 호출하기 때문입니다.

우리는 function을 리턴하기 전에 올바른 this를 연결해줌으로써 고칠 수 있습니다.
이 방법은, 이것이 후에 사용되어짐과는 상관없이, 원본 deck object를 볼 수 있게합니다.
이렇게 하기위해서는, 우리는 function 표기법을 ES6 arrow function을 사용하여 변경할 수 있습니다. Arrow function은 호출된 곳이 아닌 function이 생성된 곳에 this를 캡쳐합니다.

``` js
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      // () => {} this
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit)
```

Typescript는 여러분이 nomplicitThis flag를 컴파일러에게 전달했을경우, 여러분에게 알림을 줍니다. `this.suits[pickedSuit]` 안에있는 this가 any 타입이라는 것을 알려줄 것입니다.

## this parameters
this는 리터럴 object {...} 안에 있는 function으로부터 this가 생성될 경우(상단 예제 참고) 결과값의 type은 any입니다.
이것을 타입 체킹 하기 위해서, 명시적인 this parameter를 제공해야합니다. this parameter는 function의 paramter 리스트 안에서 제일 첫번째로 들어오는 가짜 parameter입니다.

``` js
  function f(this: void) {
    // `this`가 이 단독 function에서 사용할 수 없게 하세요
  }
  
  interface Card {
    suit: string
    card: number
  }

  interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
  }

  let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return () => {
        return { suit: this.suits[pickedSuit], card: pickedCard }
      }
    }
  }
```

> 이제 Typescript가 createCardPicker가 Deck object에서 호출된다는 것을 예상하여, Deck type의 this는 이제, any가 아니므로 에러를 반환하지 않습니다.


## this parameter in callbacks

function에 library(추후에 배울것입니다)를 전달해줄 때, callback에서 this를 사용할 때에도 에러를 만날 수 있습니다.
callback을 호출하는 library는 일반적인 function과 똑같이 호출하는데, this는 undefined일 것입니다.
this parameter를 사용하여 callback의 에러를 제어할 수 있습니다. 첫번째로, library 저작자는 this를 사용한 callback type을 부여할 수 있습니다.

``` js
  😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂
  interface UIElement {
    addClickListner(onclick: (this: void, e: Event) => void): void
  }
  this: void는 addClickEventListner가 onclick이 this type을 요구하지않는 function일 것이라 예상한다는 의미입니다. 두번째로, this를 사용하여 호출 코드를 부여하는 방법입니다.

  ????? 코드를 봐도 a뭔소린지 모르겠어 ㅠㅠ....

  class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
      // oops, used `this` here. using this callback would crash at runtime
      this.info = e.message;
    }
  }

  let h = new Handler();
  uiElement.addClickListener(h.onClickBad); // error!
```

this 할당을 통해, 여러분은 onClickBad가 Handler의 instance에서 호출되어야만 한다는것을 명시적으로 표현할 수 있습니다.
그리고 Typescript는 addClickListner가 this:void를 가진 function을 필요로 한다는 것을 찾을 수 있습니다. 에러를 고치기 위해서는 this의 type을 고쳐야합니다.

``` js
class Handler {
  info: string;
  onClickGood(this: void, e: Event) {
    // can't use `this` here because it's of type void!
    console.log("clicked!");
  }
}

let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

onClickGood가 this type을 void로 설정해두었기 때문에, addClickListener를 전달하는것이 가능합니다.
물론, this.info를 사용할 수 없다는것을 의미하기도 합니다. 둘다 원한다면, arrow function을 사용하면 됩니다.

``` js
class Handler {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}
```

arraw function은 this 밖에서 사용하기 때문에 동작하므로, 항상 this:void를 예상하는 무언가를 넘겨주어야 합니다. 하단에는 arrow function이 Handler type의 object를 생성합니다. Methods는 반면에, 한번만 생성하며 Handler의 프로토타입에 붙어있습니다. 모든 Handler타입의 object사이에서 공유됩니다.



## Overloads

Javascript는 아주 동적인 언어입니다. 하나의 Javascript function이 전달된 arguments의 모양에 따라 전혀 다른 타입의 값을 리턴하는 것은 흔하지 않습니다.

이런 경우는 같은 function을 위해 overloads의 리스트로써 여러개의 function type 을 제공합니다.
이 리스트는 컴파일러가 function 호출을 수행하기 위해서 사용할 것입니다. 어떤 argument를 받아 어떤것을 return 할지 결정하는 overload 리스트를 만들어봅시다.

``` js
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: { suit: string; card: number }[]): number;
  function pickCard(x: number): { suit: string; card: number };
  function pickCard(x: any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
  ];

  let pickedCard1 = myDeck[pickCard(myDeck)];
  alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard(15);
  alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

이러한 변화로, overloads는 우리에게 type 체크가 된 호출을 pickCard function에 전달해줍니다.

컴파일러가 올바른 type check를 하기 위해서는, 비슷한 기본 Javascript와 비슷한 접근을 따라야합니다. overload list와 첫 번째 overfload는 제공된 parameter과함께 function을 호출하는 시도를 합니다? It looks at the overload list and, proceeding with the first overload, attempts to call the function with the provided parameters.
만약 이게 맞는다면, 이 overload를 올바른 overload로서 선택합니다. 구체적으로 커스터마이즈 할 수 있습니다.

`function pickCard(x): any`는 overload list가 아니라는것을 염두해두세요 : 오직 두개의 overload만이 있습니다.

한개는 object고 하나는 number를 받습니다. any type의 paramter를 가지고 pickCard를 호출하면 에러를 반환합니다.


