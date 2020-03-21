# SASS
Css, Sass와 완벽호환되며, Ruby와 node에서 사용 할 수 있다.

## @import 표기법
```
  /* normal CSS */
  @import "themes/blackforest";
  @import "style.sass";
  
  /* Sass */
  @import themes/blackforest
  @import style.sass
```

## @mixin & @include
```
  @mixin reset-list 
    margin: 0;
    padding: 0;
    list-style: none;
  
  p 
    @include reset-list;
```

