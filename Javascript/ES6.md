## Module
webpack, babel등을 이용하여 module 사용 가능

#### export
다른 스크립트 내에서 사용하기 위해서는 export를 해주어야함
```
// location.js
export function log(data){
    console.log(data);
};

// default 는 '기본'으로 내보낸다는 뜻
export default function log2(data) {  ...  }

// class
export class MyLogger {
    constructor(props) {
        this.lectures = ['java', 'iOS'];
    }
    
    getLectures() {
        return this.lectures;
    }
}

// const/let 은 export default와 함께 쓸 수 없다
export const log3 = () => { ... }  // 방법 1.
const log3 = () => { ... } // 방법 2.
export default log3;

```
    
#### import
스크립트에 파일을 불러올때 사용
```
// export시 {객체}로 넘어오기 때문에 {} 사용 
import { log1, MyLogger } from './location';

// export default는 기본이기때문에 따로 처리를 하지 않아도 됨
import log2 from './location';

log1('my first data');

const logger = new MyLogger();
log1(logger.getLectures());
```
    






