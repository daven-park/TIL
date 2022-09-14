# 뮤텍스(Mutex) & 세마포어(Semaphore)

### 📌 임계영역(Critical Section)

- 연산이 이루어지는 공간
- 프로세스에 한번의 여러 자원 점유 불가로 쓰레드 사용
- 여러 프로세스가 동시에 동일 자원을 참조하여 값이 오염될 가능성이 있는 영역

<br/>



## 뮤텍스(Mutex)

- 공유된 자원의 데이터 혹은 임계영역 등에 **하나**의 프로세스 혹은 쓰레드가 접근하는 것을 막아주는 역할
- 동기화 대상 **하나**
- 권한을 소유한 프로세스나 쓰레드만이 공유 자원 접근 가능


![뮤텍스](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile23.uf.tistory.com%2Fimage%2F2115764F581B6D5F3208C0)

![mu2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcvk7nh%2FbtrjvSw2BoX%2FZfh0o0VsZrMmAOi6PxLvg0%2Fimg.png)

<br/>

### 단점

- 교착상태(Deadlock)
- 상호배제(Mutual Exclusion)


## 세마포어(Semaphore)

- 공유된 자원의 임계영역등에 **여러** 프로세스나 쓰레드 접근을 막아줌
- 동기화 대상이 **하나 이상**
- 공통으로 관리하는 key등의 값을 이용해


![세마포](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile23.uf.tistory.com%2Fimage%2F23386C4F581B6D5E0CFDAB)
![세마포2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcvk7nh%2FbtrjvSw2BoX%2FZfh0o0VsZrMmAOi6PxLvg0%2Fimg.png)

<br/>

