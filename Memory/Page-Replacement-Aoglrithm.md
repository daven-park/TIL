## 가상메모리

- 물리 메모리 크기의 한계를 극복하기 위한 기술
- 프로세스 전체가 메모리에 올라오지 않더라도 실행 가능하도록 하는 기법



<br/>

## 요구 페이징(Demand paging)

- 프로세스의 주소 공간을 메모리에 적재하는 기법
- 어떤 페이지가 메모리에 존재하는지 여부를 판별하기 위해 **valid-invalid bit(유효-무효비트)**를 사용하여 페이지 테이블에 존재 여부 표시

![유효무효비트](https://velog.velcdn.com/images%2Flcy960729%2Fpost%2Fd06a8f42-967d-4f18-bc4f-77a00fba9bc8%2Fimage.png)

***📌 Frame : 물리 메모리를 일정한 크기로 나눈 블록. Page는 가상 메모리***

<br/>

- CPU가 참조하려는 페이지가 현재 메모리에 올라와 있지 않아 유효무효비트가 무효로 세팅되어 있는 경우 **페이지 부재**라고 한다.

> 페이지 부재(Page Fault) : CPU가 접근하려는 페이지가 메모리에 없는 상황


<br/>

## 페이지 부재시 동작 과정

![페이지 부재](https://s3.ap-south-1.amazonaws.com/s3.studytonight.com/tutorials/uploads/pictures/1609227978-71449.png)

1. 필요한 페이지가 페이지테이블에 없는 경우 페이지 테이블에서 유효-무효 비트를 확인
2. 유효-무효 비트가 0이라면 MMU가 페이지 부재 트랩 발생. CPU 제어권 커널로 전환, OS 페이지 부재 처리 루틴 호출 후 처리
3. 메모리에 있는 페이지 중 하나를 페이지 임시 보관소인 backing store에 보낸다(page-out), 
4. 비어있는 새로운 페이지를 메모리에 올린다(page-in). 만약 비어있는 프레임이 없다면 **페이지 교체 알고리즘**을 통해 물리적 메모리에 있는 프레임 하나를 스왑영역으로 보내버린 후 비어있는 프레임을 사용한다.
5. 페이지 테이블에서 해당 페이지의 유무효 비트를 유효로 설정하고 프로세스를 ready-queue로 이동시킨다.
6. 다시 CPU를 할당받았을 때, PCB에 있던 값을 복원하여 중단된 명령 수행한다. 이후 마치 항상 메모리에 있었던 것처럼 페이지에 접근 가능


<br/>

## 페이지 교체

- 위 4번과 같이 물리 메모리에 빈 프레임이 존재하지 않을 때, 가상 메모리에 올라와 있는 페이지중 하나를 디스크로 쫗아내 빈 공간을 확보하고 새로운 페이지를 메모리에 올리는 과정
- 교체된 페이지는 희생양 페이지(victim page)라고 한다.
- 희생양 페이지는 CPU에 수정되지 않은 페이지를 고르기 위해 modified bit를 추가하여 최대한 수정되지 않은 페이지를 선택한다.

<br/>

# 페이지 교체 알고리즘

- OPT(Optimal) - 최적 페이지 교체
- FIFO(First In First Out)
- LRU(Least Recently Used)
- LFU(Least Frequently Used)
- MFU(Most Frequently Used)
- NUR(Not Used Recently)
- SCR(Second Chance Replacement)
- Clock

<br/>

## OPT(Optimal) - 최적 알고리즘

- 앞으로 가장 오래 사용되지 않을 페이지를 교체하는 알고리즘

![opt](https://miro.medium.com/max/1400/1*MHoq4CVbRsKyXwycQanhnA.png)

- 프로세스가 미리 사용될 페이지를 알아내어 필요없는 페이지부터 교체한다.
- 가장 페이지 교체 수가 적다.
- 이상적인 방식이나 실제로 구현 불가능한 방식

## FIFO

- 가장 오래된 페이지를 교체하는 알고리즘
- 각 페이지가 올라온 시간을 페이지에 기록하거나 순서를 큐에 저장하는 방식

![fifo](https://miro.medium.com/max/1400/1*PisBTTZmXb2ZLHix7RdBCQ.png)

- 이해가 쉽고 구현이 간단
- 필요한 페이지가 전 단계에서 교체되는 등 비효율적인 상황 발생 가능성

<br/>

## LRU(Least Recently Used)

- 가장 오래 사용되지 않은 페이지 교체 알고리즘
- 최적 알고리즘의 방식과 비슷한 효과를 낼 수 있는 알고리즘
- 페이지가 사용될 시간을 미리 알고 예측하여 가장 오래 사용되지 않은 페이지 교체하는 방식

![lru](https://miro.medium.com/max/1400/1*2KmdY3wX68yaZnF6MwwTqg.png)

- 운영체제에서 많이 채택되는 알고리즘

<br/>

#### 📌 계수 기반 페이지 교체 알고리즘 ➡ 현재까지 참조된 횟수를 카운팅하는 알고리즘 (LFU, MFU)


## LFU(Least Frequently Used)

- 참조 횟수가 가장 작은 페이지 교체 알고리즘
- 교체 대상이 많으면 가장 오래 사용되지 않은 페이지(LRU)로 교체

![lfu](https://miro.medium.com/max/1400/1*nIY4ek2yu3jsND7na4AF-Q.png)

***📌 초기에 한 페이지를 집중적으로 참조했을 시 문제 발생 가능***

![lfu2](https://miro.medium.com/max/1400/1*mBZHbLoadaZEfTMkbhcJQQ.png)

<br/>

## MFU(Most Frequntly Used)

- 참조 횟수가 가장 많은 페이지 교체 알고리즘
- 참조 횟수가 적은 페이지를 최근 사용된 것으로 판단하여 앞으로 사용 가능성이 높다고 판단

![mfu](https://miro.medium.com/max/1400/1*e5lca52SoQeiDmy4CvykIA.png)

<br/>

## NUR(Not Used Recently)

- 최근 미사용 페이지 교체 알고리즘
- LRU, LFU의 불필요한 공간 낭비 문제 해결 알고리즘
- 참조비트와 변경비트를 통해 미래를 추정한다.
    - 참조비트 : 페이지 접근(read/execute) 시 1
    - 변경비트 : 페이지 변경(write/append) 시 1

![비트](https://yansigit.github.io/posts/%ed%8e%98%ec%9d%b4%ec%a7%80-%ea%b5%90%ec%b2%b4-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98/Untitled%208.png)

- 참조비트가 0인 페이지를 찾고, 없으면 변경비트가 0인 페이지 찾음
- 같은 비트 페이지라면 무작위 선정

![NUR](https://yansigit.github.io/posts/%ed%8e%98%ec%9d%b4%ec%a7%80-%ea%b5%90%ec%b2%b4-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98/Untitled%209.png)

<br/>

## SCR(Second Chance Replacement)

- FIFO 처럼 큐를 사용
- 페이지 부재 없이 성공할 경우 해당 페이지를 제외시키거나 큐의 맨뒤로 이동
- 큐의 맨 뒤로 이동시켜 한번의 기회를 더 주는 방식

![SCR](https://yansigit.github.io/posts/%ed%8e%98%ec%9d%b4%ec%a7%80-%ea%b5%90%ec%b2%b4-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98/Untitled%2010.png)

<br/>

## Clock

- SCR과 다르게 원형 큐를 사용하는 방식
- 스왑 영역으로 옮길 대상 페이지를 가리키는 포인터 사용
- 포인터가 맨 바닥으로 내려가면 다음 순서는 큐의 처음을 가리킨다.

![시계](https://yansigit.github.io/posts/%ed%8e%98%ec%9d%b4%ec%a7%80-%ea%b5%90%ec%b2%b4-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98/Untitled%2012.png)

- SCR에 참조 비트가 추가되어 있음.
- 대상 페이지 포인터는 메모리가 꽉차면 쫓겨날 페이지를 가리킨다.


<br/>
<br/>



# 참고 사이트

- [Page Fault in Operating System](https://www.studytonight.com/operating-system/page-fault-in-operating-system)
- [운영체제페이지교체알고리즘](https://yansigit.github.io/blog/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%90%EC%B2%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/)
- [페이지 교체 알고리즘](https://steady-coding.tistory.com/526)