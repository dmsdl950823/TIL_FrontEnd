## Module
webpack, babel등을 이용하여 module 사용 가능


#### export
```
// location.js
export function log(data){
    console.log(data);
};

// default 는 '기본'으로 내보낸다는 뜻
export default function log2(data) {  ...  }
```
    
#### import
```
// export시 {객체}로 넘어오기 때문에 {} 사용 
import { log1 } from './location';
// export default는 기본이기때문에 따로 처리를 하지 않아도 됨
import log2 from './location';

log1('my first data');
```
    
