# Memory
> CPU가 직접 접근 가능한 일종의 데이터 저장장치
  
  </br>

# 주소 바인딩

- 프로그램이 알고있는 주소를 실제 메모리 주소와 매핑하는 것

## 주소 바인딩 시점

- 컴파일 시간
    - 프로그램 내부 주소와 물리적 주소가 동일

</br>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb1P4ah%2FbtquOqoqqEn%2F01xyoxVckbfNu5q809Y6rk%2Fimg.png
" alt="msa" width="600"/></p>

</br>

- 적재 시간
    - 프로그램을 메모리에 로딩할 때 상대 주소에 할당
- 단점
  - 멀티프로그래밍이 가능하나 명령어들로 인해 메모리 로딩 시간 증가

</br>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4Tiz7%2FbtqC9xsWJaH%2FLRg2xR4hkDgNh9G825Zxwk%2Fimg.png
" alt="msa" width="600"/></p>


</br>

- 실행 시간
    - 변경된 주소로 할당하기 위해 하드웨어로 변환 -> MMU

</br>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbJV8Hx%2FbtqC6k9zobX%2FqwGWyIS277W4ewGNkb4LQK%2Fimg.png
" alt="msa" width="600"/></p>

</br>

## MMU(memory Management Unit)

</br>

> 컴퓨터 시스템에서 프로세스의 논리 주소를 실제 메모리의 물리 주소로 변환

</br>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdGS2qq%2FbtqAJwDhpJK%2FoPVkHdYvn3aSi7PL7luuZ1%2Fimg.png
" alt="msa" width="600"/></p>

</br>

- 더 빠른 메모리 주소 참조 방법의 필요성 

</br>

# 메모리 관리 기법

- 스와핑 (Swapping)

- 연속 메모리 할당 (Contiguous memory allocation)

- 페이징 (Paging)

- 세그멘테이션 (Segmentation)

## 스와핑

</br>

- CPU에서 시행되지 않는 프로세스 즉 ready상태이거나 waiting상태에 있는 프로세스들 중 일부를 메모리 안에 보관하지 않고 하드디스크 같은 저장장치에 보관

</br>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbjcOad%2FbtqAKiki52t%2FH1pMQi4JAo3QAdVaHqSVW1%2Fimg.png
" alt="msa" width="500"/></p>



# 참고

- https://jhnyang.tistory.com/133
- https://goodmilktea.tistory.com/30?category=816729