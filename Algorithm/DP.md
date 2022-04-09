# 동적 계획법(Dynamic Programming) as DP

> 동적 계획법이란 복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 방법

</br>

# 피보나치 수열

![예시](https://blog.kakaocdn.net/dn/DTOkS/btqGsnHkZ4a/kbhtuAY7fDoPaLzqCMw4l0/img.png)

</br>

## 일반 재귀

```java
public static int fibo(int n){
    if(n <= 1){
        return n;
    }
    return fibo(n-1) + fibo(n-2);
}
```

</br>

![피보나치수열](https://media.vlpt.us/images/chelsea/post/627c053e-8a71-48e7-b0b2-7b8d327963a2/%E1%84%8C%E1%85%A2%E1%84%80%E1%85%B1%E1%84%91%E1%85%B5%E1%84%87%E1%85%A9.gif)

- n의 수가 늘어날수록 처리 과정이 기하 급수적으로 반복된다.

</br>

# 메모이제이션 💥

### 반복되는 동일한 결과를 저장하여 활용하는 방식으로 중복 계산을 줄이는 것 !



</br>

# 접근 방법

1. 전체 문제를 작은 문제로 단순화한다 
2. 재귀적은 구조를 활용할 점화식을 만든다.
3. 작은 문제를 해결한 방법으로 전체 문제를 해결한다

</br>

# Top-Down VS Bottom-Up

## Top-Down

```java
static int[] memo = new int[101]; 
public static int topDown(int n){
    // 기저 상태 초기화
    if(n < 2) return memo[n] = n;
    
    // 값이 존재하면 반환
    if(memo[n] > 0) return memo[n];
    
    memo[n] = topDown(n-1) + topDown(n-2);
    
    return memo[n];
}
```

- memo[n] 부터 memo[0]까지 내려가면서 계산
  
</br>

## Bottom-Up

```java
static int[] memo = new int[101];
public static int bottomUp(int n){
    memo[0] = 0; 
    memo[1] = 1;
    
    for(int i = 2; i <= n; i++){
        memo[i] = memo[i-1] + memo[i-2];
    }
    return memo[n];
}
```

- memo[0]부터 시작하여 반복문을 통해 점화식으로 memo[n]까지 재활용  

</br>

# 동적 계획법 vs 분할 정복

</br>

||동적 계획법|분할 정복|
|------|:---:|---|
|공통점|문제를 작은 단위로 나누어 문제 해결|
|차이점|Memoization기법활용, 상위 문제 재사용|재사용 X|
