# 방화벽

## 방화벽이란 ?

- 들어오고 나가는 네트워크 트래픽을 모니터링하고 제어하는 네트워크 보안 시스템
- 내부 네트와크와 외부 네트워크를 나누는 벽으로 데이터의 **허용, 거부, 검열, 수정** 등의 기능으로 구성

![방화벽](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FctNB7H%2FbtrqmIN3mLu%2FYKNKtxCM9HcgIigZLhUYj0%2Fimg.png)


<br/>

## 게이트웨이

- 한 네트워크에서 다른 네트워크로 이동하기 위해 거쳐가는 지점
- 하위 계층(1 ~ 3)에서 라우터가 역할 수행
- 상위 계층(4 ~ 7)에서 프로토콜 간의 특수 변환 담당

<br/>
<br/>


# 방화벽의 기능

## 1. 접근 통제(Access Control)

- 허용되지 않은 외부 네트워크에서의 접근을 통제하는 기능
  - 패킹 필터링, 프록시 방식 등

<br/>

## 2. 인증(Authentication)
  
- 메시지 인증 
  - VPN과 같은 신뢰 가능 통신선을 통해 전송되는 메시지 신뢰성 보장
- 사용자 인증
  - 방화벽을 통과하는 트래픽의 사용자를 증명하는 기능
  - OTP, 토큰기반 인증, 패스워드 인증
- 클라이언트 인증
  - 모바일 사용자처럼 특수한 경우에 접속을 요구하는 호스트에 대해 인가된 호스트인지 호가인

<br/>

## 3. 감사 및 로그 기능(Audition / Logging)

- 정책 설정 및 변경, 관리자 접근, 네트워크 트래픽 허용 또는 차단 관련 접송 정보 로깅

<br/>

## 4. 프라이버시 보호(Privacy Protection)

- 이중 DNS(Dual Domain Name System), 프록시(Proxy), NAT기능 등을 제공함으로서 내부와 외부 간의 **중개자 역할**을 통해 내부 네트워크 정보 유출 방지


<br/>

## 5. 서비스 통제(Service Control)

- 위험성이 존재하는 서비스를 필터링함으로서 내부 호스트의 취약점 감소

<br/>

## 6. 데이터 암호화(Data Encryption)

- 다른 방화벽까지 전송되는 **데이터 암호화**하여 전송, VPN의 기능 이용


<br/>
<br/>


# 방화벽 동작 방식

## 1. 패킷 필터링(Packet Filtering)

- **1세대 방화벽**
- **데이터링크 계층**에서 네트워크 계층으로 전달되는 패킷을 가로채서 해당 패킷안의 IP와 포트를 검색하여 정의된 보안 규칙에 따라 서비스의 접근 허용 여부 결정
- 가장 기초적인 방화벽 방식으로, 네트워크 계층, 전송 계층에서 동작하는 방식
- 빠른 속도, 낮은 레이어 동작으로 기존 애플리케이셔놔 연동 용이
- 강력한 로깅 기능 및 사용자 인증 불가능
- 패킷 데이터를 활용한 공격 차단 불가

![패킷](https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDNfMjM4/MDAxNTAxNzY4Mjc4NTU0.U0K8g2fdaw8jdUVZmXN3FG8B78Tl3fnoNwkx7lLrw-Mg.iBdDMSEibdOJUrPUuycn0sbDgH5-zkAivSCQe4CUzmgg.PNG.wnrjsxo/stateless_packet_firewall.png?type=w800)

<br/>

## 2. 상태 추적(Stateful Inspection)

- **2세대 방화벽**
- 패킷 필터링 방식의 내부 데이터를 이용한 공격 취약성 보안
- **네트워크 계층**에서 패킷을 처리하면서도 프로토콜 상태 정보를 유지하여 프로토콜 특성에 따른 변화를 동적으로 대응
- 기존 패킹 필터링 기능에 Session 추적 기능을 추가하여 네트워크 서비스 순서 추적, 순서에 위배되는 패킷 모두 차단
- 모든 통신 채널 추적 가능, UDP와 RPC 패킷 추적 가능
- 상태 목록에 Dos나 DDos 공격으로 인한 거짓 정보가 가득 차면, 장비 일시적 중단 가능성
- 재구동시 현재 연결에 대한 모든 정보 손실.
  
![상태추적](https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDRfMjg2/MDAxNTAxODQzNDA3NjI2.nb8Dx09EfYusVUUXkJfkwQXMjFomi_vbKOEDjAkBXGQg.JpZkACDEe6szDt4ZmYfQVfLjsxnS8Vv5Ew9JxrD1bQwg.GIF.wnrjsxo/0102d.gif?type=w800)


<br/>

## 3. 어플리케이션 게이트웨이(Application Gateway)

- 3세대 방화벽
- **어플리케이션 계층**까지 동작하여 통과하는 패킷의 헤더 안의 Data 영역까지도 체크하여 통제
- 서비스별로 프록시(proxy)가 구동되어 각 서비스 요청에 대하여 방화벽 접근 규칙 적용과 연결 대신하는 역할
- 패킷 필터링보다 높은 보안 설정 가능, 일회용 패스워드를 이용한 사용자 인증 제공
- Session에 대한 정보 추적, Content Security 가능
- 네트워크에 많은 부하, 하드웨어 의존적
- 미리 정의된 어플리케이션만 수용 가능

![어플리케이션](https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDRfMjQ4/MDAxNTAxODM5NTEyMTE0.ZJfxShXTG05pAlzNCpllNEOkf57wu4Ws6xm9DPUOGO8g.in6vAaoAAcnLGDK9MCOeJmaAOTSr-1A-n1_EgwU_58og.PNG.wnrjsxo/application_gateway.png?type=w800)

<br/>

## 4. 서킷 게이트웨이(Circuit Gateway)

- **세션 계층과 어플리케이션 계층 사이**에서 접근 제어
- 사용자측 PC에는 방화벽 대표 프록시와 통신하기 위해 수정된 클라이언트 프로그램 필요
- 대표 프록시 이용으로 어느 서비스 프로토콜도 방화벽 적용 가능
- 수정된 프로그램 사용자도 별도 인증 절차 필요 x
- 업데이트 시, 수정된 클라이언트 프로그램 배포 또는 수정 필요

![서킷](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FM8bPP%2FbtrqmpIqiRf%2FLMbDxKcYGK5TG3UFu742R1%2Fimg.png)

<br/>

## 5. 하이브리드 방식

- 패킷 필터링과 어플리케이션 방식을 합친 방식
- 패킷 필터링을 통해 어플리케이션 방식의 단점인 다양한 응용 서비스 수용
- 내부 보안 정책 및 어플리케이션 등에 맞춰 선택적인 보안 설정 가능
- 여러 유형의 방화벽 특징 혼합을 통해 활용 범위 넓음
- 관리 복잡, 전문 네트워크 컨설팅 필요 


<br/>
<br/>

# 방화벽 구축 방법

## 1. 스크리닝 라우터

- 네트워크에서 사용하는 통신 프로토콜의 형태, 시작점 주소와 목적지 주소, 틍신 프로토콜의 제어필드, 포트 번호를 분석하여 내부망과 외부망 사이의 패킷 트래픽을 허가 및 거절하는 라우터

![스크리닝 라우터](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXaKME%2FbtqxLVNBjSk%2F9EKquBMYSqjEFv8CvQK5f1%2Fimg.jpg)

<br/>

## 2. Bastion 호스트

- 로깅, 모니터링, 접근제어 등의 일반적인 방화벽 기능을 하는 방화벽 구조
- 

<br/>
<br/>


# 방화벽의 한계점

## 1. 악성 소프트웨어 침투 방어에 대한 한계

- 패킷 IP 주소와 포트 번호로 접근을 제어하므로 바이러스, 웜, XSS 코드와 같이 문서 또는 프로그램 내부에 포함된 악성 소프트웨어를 방어하는데 한계점을 지닌다.
- 두 네트워크 사이에 존재함으로써 높은 트래픽을 처리해야 하므로, 큰 오버헤드를 감수하면서 데이터 내용을 검사하면 네트워크 대역폭의 큰 손실을 가져올 수 있기 때문

<br/>

## 2. 악의적인 내부 사용자의 공격에 대한 한계

- 내부 사용자가 방화벽을 통과하는 통신 선로 대신 셀룰러 망이나 사설 통신 선로를 이용하여 통신한다면 공격자가 방화벽을 우회하여 내부 네트워크로 접속할 수 있는 경우, 내부자가 막을 방법이 없다.

<br/>

## 3. 새로운 공격에 대한 한계

- 방화벽은 예측된 접속에 대한 규칙만을 방어하므로 새로운 형태의 공격에 능동적으로 대처하기 어렵다.