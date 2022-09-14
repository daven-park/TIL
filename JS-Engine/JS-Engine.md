# 자바스크립트 엔진 V8


[1. 자바스크립트 엔진을 알아보기 전에](#자바스크립트-엔진을-알아보기-전에)

[2. 자바스크립트 엔진](#자바스크립트-엔진)

1. V8에 대해서

<br/>
<br/>

# 자바스크립트 엔진을 알아보기 전에 !


## 인터프리터? 컴파일러?

- 인터프리터
  - 라인 단위로 읽고 실행시키는 방식
  - 실행시간은 오래 걸림
  - 메모리 효율성이 좋음
  - 실행 후에 오류를 확인할 수 있음
- 컴파일러
  - 프로그램 전체를 스캔하여 모두 기계어로 번역하는 방식
  - 초기 스캔 후 파일이 생성되면 실행 속도가 빨라짐
  - 메모리 효율성이 좋지 않음
  - 한번에 읽고 실행하기 때문에 실행 전에 오류 추적 가능

<br/>

## JIT 컴파일러(동적 번역)

> 인터프리터의 느린 속도를 보완하기 위해 인터프리터언어인 JS를 실행하는 시점에 바이트 코드를 기계어로 번역하는 컴파일 기법

![jit](https://mblogthumb-phinf.pstatic.net/MjAyMDA0MThfMTY1/MDAxNTg3MTQzNjQ1MDQ5.IwPlNSJ1lUKfqGQVe_7O_J9Jv9Btj1_kRoqAVFgy9PEg.TEEVd1XIQGRVx6Nw4xB4IIHZl2554jdx1Sq__P7NpCUg.PNG.z1004man/jit(1).png?type=w800)


- 장점 
  - 실행 시간에 컴파일할지를 결정하는 것
  - 최적화를 일부 적용할 수 있는 점
- 단점
  - profiling data(동적 언어 정보)로 인한 오버헤드 발생으로 효과가 없을 수 있음

<br/>

📌 IR(Intermediate Representation) => 중간 표현 형식 
- IR = Byte Code + Profiling data(변수, 함수 정보)


## Adaptive JITC - V8 CrankShaft

> JIT의 단점을 보완하기 위한 확장된 JIT 컴파일러

![ajit](https://image.toast.com/aaaadh/real/2016/techblog/crankshaft.png)

- Runtime Profiler가 함수 호출 빈도를 측정해 JITC와 인터프리터 방식을 결정
- but, 동적 타입의 방식에 따라 비효율적일 수 있음

<br/>
<br/>

# 자바스크립트 엔진


### JS 엔진 동작 원리

![jseng](https://mblogthumb-phinf.pstatic.net/MjAyMDA0MThfNTUg/MDAxNTg3MTQyMzY5OTcx.xpGj2lsGfE6ciPeEVdlw_XdGsKFY_BN52MQZ7nf9OPYg.d87nQyrvet5bg-MPmBUVWNe-HaLGb0l9XbibhtCnbxIg.PNG.z1004man/pipleline.png?type=w800)

<br/>

### AST(Abstract Syntax Tree)

- 파싱을 통한 소스 코드 구조화 작업

```javascript
function hello (name) {
  return 'Hello,' + name;
}


{
  type: 'FunctionDeclaration',
  name: 'hello'
  arguments: [
    {
      type: 'Variable',
      name: 'name'
    }
  ]
  // ...
}
```

- 함수명, 타입 등의 정보를 구조화하여 컴퓨터가 이해하기 쉽게 변경

<br/>

### [자바스크립트 엔진 동작 원리](https://www.betterweb.or.kr/blog/%EB%88%88%EC%97%90-%EB%B3%B4%EC%9D%B4%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%97%94%EC%A7%84-%EB%8F%99%EC%9E%91%EC%9B%90%EB%A6%AC/)

![jsen](https://www.betterweb.or.kr/wp-content/uploads/2020/01/js_main_image.png)



<br/>
<br/>


### 자바스크립트 구성 요소

![jsengsub](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-runtime.png)

- JS 엔진 구성 요소
  - Call Stack
  - Memory Heap
  - Task Queue


<br/>

### Call Stack

> 함수나 변수의 정보를 저장하는 공간으로 함수를 실행하는 과정에서 스택에 푸시와 팝을 통해 처리하는 자료구조

![cs](https://blog.kakaocdn.net/dn/dGHdbV/btqCwXUuShJ/YSyxf5lDEHoRUdkF3LA67K/img.gif) 

<br/>

### Memory Heap

> 동적으로 생성된 객체가 메모리에 할당되는 위치

<br/>

### Task Queue

> 처리할 메세지 목록, 실행할 콜백 함수 리스트로 이벤트나 http요청, 비동기 콜백 함수를 콜백 큐에 푸시한다


<br/>
<br/>

# V8 엔진

> 구글에서 제작한 Chrome, Node.js에서 사용되는 자바스크립트 엔진

![c+](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRmKLy%2FbtqHAokHzrH%2FktR8upqsKjL5kQ8rZpdNJ0%2Fimg.png)

- 일반적인 인터프리터 형식이 아닌 `바이트코드`로 컴파일하고 실행하는 방식

<br/>

### 5.9 버전 이하의 V8 엔진 구조

- 5.9 버전 이하의 V8은 Full-codegen을 이용하여 파싱된 js코드를 변형 없이 직접 머신코드로 번역하였음.
- 이때까지 중간 바이트 코드를 사용하지 않아 인터프리터가 필요하지 않음.
- 초기 V8은 TurboFan과 Ignition만을 이용하려 하였으나, 성능이 떨어져 Crankshaft와 같은 컴파일러와 함께 사용되었으며 복잡한 구조를 가졌음

![5.9](https://4.bp.blogspot.com/-1vuHT9oH0N0/XEQNRr8CTGI/AAAAAAAAUqU/rgpmStr-HWoWwhKw7rOzj60ueSzdgLuVwCLcBGAs/s1600/ignition-pipeline.png)

- Full-codegen : 간단하고 빠른 컴파일러, 상대적으로 느린 머신 코드 생성
- Crankshaft : JIT 컴파일러로 최적화된 코드 생산
- Ignition : JS코드를 바이트코드로 변환하는 인터프리터
- TurboFan : 최적화 담당 컴파일러. Profiler의 데이터를 통해 기준에 맞는 코드를 가져와 최적화시키는 역할

<br/>

## Ignition

> JS코드를 바이트코드로 변환하는 인터프리터


```javascript
function hello(name) {
  return "Hello," + name;
}
console.log(hello("changhyun"));
```

- 해당 파일을 `$ node --print-bytecode test.js`로 실행시키면 
바이트코드로 <br/>인터프리팅되는지 확인할 수 있다.


```
16505 E> 0xd9d80ae32f6 @    0 : a7                StackCheck 
16516 S> 0xd9d80ae32f7 @    1 : 1b 3e             LdaImmutableCurrentContextSlot [62]
16528 E> 0xd9d80ae32f9 @    3 : ac 00             ThrowReferenceErrorIfHole [0]
16527 E> 0xd9d80ae32fb @    5 : 2a 02 00          LdaKeyedProperty <this>, [0]
         0xd9d80ae32fe @    8 : 26 fb             Star r0
16537 E> 0xd9d80ae3300 @   10 : 28 fb 01 02       LdaNamedProperty r0, [1], [2]
         0xd9d80ae3304 @   14 : 97 04             JumpIfToBooleanTrue [4] (0xd9d80ae3308 @ 18)
         0xd9d80ae3306 @   16 : 12 02             LdaConstant [2]
16548 S> 0xd9d80ae3308 @   18 : ab                Return 
```

[📌 Star r0와 같은 명령어들이 궁금하다면](https://bumkeyy.gitbook.io/bumkeyy-code/javascript/understanding-v8s-bytecode)

<br/>

## TurboFan 최적화 기법

### 1. 인라이닝



### 현재의 V8 엔진 구조



![현재](https://miro.medium.com/max/700/1*FrYgZk-HCP8eiaX8Gd3ojw.png)


<br/>

### V8 엔진의 동작 과정

![엔진동작](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcK7wiK%2FbtqHujdwY3X%2FztPVFaMOwKT3tl9PXfKU5K%2Fimg.png)