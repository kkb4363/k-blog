# HTML & CSS

## HTML

### contenteditable

- span 이나 div , p 태그 등에서 text를 클릭 시 수정할 수 있게 해주는 놈이다

## CSS

### 텍스트 줄바꿈

```1
white-space:nowrap
or
word-break:break-all
```

### flex 줄바꿈

```1
display:flex
flex-wrap:wrap
```

### rem & em

```1
rem은 html body의 font-size를 따름.
html body의 기본 font-size는 16px이므로 2rem -> 32px

em은 부모 요소의 font-size를 따름
div style={{fontSize:'24px'}}
	div style ={{fontSize:'3em'}}
		-> 24의 3배인 72px

그러나 padding, margin일 땐 다름.
rem은 여전히 html의 font-size를 따르지만, em은 자기의 font-size에 따라 반영된다.
div style={{fontSize:'12px', padding:'1em', margin:'1em'}}
	-> padding, margin -> 12px
```
