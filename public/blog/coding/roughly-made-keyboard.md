```function solution(keymap, targets) {
var answer = [];

const map = new Map();
for (const key of keymap) {
for (let i = 0; i < key.length; i++) {
if (!map.has(key[i]) || i + 1 < map.get(key[i])) {
map.set(key[i], i + 1)
};
}
}

     for (const target of targets) {
    let count = 0;
    for (let i = 0; i < target.length; i++) {
      count += map.get(target[i]);
    }
    answer.push(count || -1);

}
return answer;
}
```

- **대충 만든 자판**
  - **map 객체를 쓰면 이렇게 간단해짐**
  - **for of 문법도 생소하지만 좋다**
  - https://school.programmers.co.kr/learn/courses/30/lessons/160586?language=javascript
