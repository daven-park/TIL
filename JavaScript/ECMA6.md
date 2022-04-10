# Ecma 6

## Arrow Func

```javascript
const function func() {
    console.log('function');
}
```

```javascript
const func = () => {
    console.log('arrow function');
}
```
## 특징

- 함수 본연의 기능을 잘 표현할 수 있기 때문에 사용한다.
- 재사용성을 고려할 수 있다.
- 입출력 기능을 만들 때 사용한다.
- 파라미터 개수에 따라 괄호 생략

### 제한점

- this나 super에 대한 바인딩이 없고, methods로 사용 X
- new.target 키워드 없음
- 생성자 사용 X

## Promise 정식 지원

```javascript
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```

- Promise 객체를 생성하여 비동기 방식으로 사용
- then, catch를 통해 실행 결과와 오류를 받아 사용