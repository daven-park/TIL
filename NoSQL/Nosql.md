# NoSQL의 종류별 특징

## NoSQL 장점

- 스키마가 없어 유연하다.
- 필요 형식을 정하여 데이터를 저장하고 읽을 수 있다.
- DB가 모든 읽기 / 쓰기 요청 처리 가능

</br>

## 단점

- 오히려 유연성때문에 데이터 구조 결정이 어려울 수 있다.
- 데이터가 여러 컬렉션에 중복되어 있어 수정(update)시 모든 컬렉션에서 수행해야함

</br>

## 언제 써야할까? 😮

- 정확한 데이터 구조가 정해지지 않았거나, 변경 / 확장될 수 있는 경우
- 데이터를 변경보다 읽기 처리만 하는 경우
- 데이터베이스를 수평으로 확장해야 하는 경우 ( 막대한 양의 데이터 처리 )

</br>

## NoSQL의 종류

</br>

<p align="center"><img src="https://media.vlpt.us/images/swhan9404/post/84eaf9cc-6fca-4685-93ce-cf4694f04ae9/image-20210813104126757.png" alt="msa" width="500"/></p>

</br>

### Key-Value

```
키와 값으로 이루어져 저장, 조회에 충실한 DB
```

</br>

<p align="center"><img src="https://media.vlpt.us/images/swhan9404/post/94339d29-8b28-466b-8e7b-808b9f79379a/image.png" alt="msa" width="400"/></p>

</br>

- 기본적인 key-value 패턴으로 하나의 묶음으로 저장되는 구조
- Key 안에 (column, value)형태의 필드 (key는 unique한 값)
- 모든 데이터 타입이 허용되기 때문에 검증 로직을 철저하게
- 테이블간 조인을 고려하지 않음 (제약조건 고려 X)

</br>

> 주로 장바구니 같은 일시적 속성 추적, 모바일 앱용 데이터 정보와 구성 정보, </br> 이미지나 오디오 파일 같은 대용량 객체 저장시 사용

- Redis, Riak, Berkely, DynamoDB

</br>

### Document

```
DB의 값을 문서로 저장하는 계층적 트리 데이터 방식(XML, JSON, BSON)
```

</br>

<p align="center"><img src="https://media.vlpt.us/images/swhan9404/post/00351296-cd50-4467-84a3-4ca36fbfd2d4/image.png" alt="msa" width="600"/></p>

</br>

- 집합적 데이터 모델 : RDB에서 여러개 테이블 데이터를 하나의 Document에 모을 수 있다.
- Document 내에 Field 정의 (key : value)
  - key에 대한 값은 Document가 될 수 있다 (Embedded Document)
- 트랜지션이 원자적으로 이루어짐
- 데이터를 여러 서버에 분산 저장 가능, 복제 회복 가능한 형태 ➡ 장애 대응 유리

</br>

> 로깅시스템, 인터넷 상거래 시스템, SNS 서비스 사용에 적합하다.

- MongoDB, Azure Cosmos DB, CouchDB, MarkLogic, OrientDB

</br>

### Wide Columnar

```
자동 장애 극복 지원. Master 장애시 Slave가 Master로 역할 전환
 = 컬럼의 이름과 포맷은 테이블의 로우마다 "다를 수 있다.
```

- MongoDB에서는 primary, secondary로 부름
- 쓰기는 Master, 읽기는 Master, slave 모두 가능

</br>

<p align="center"><img src="https://media.vlpt.us/images/hanblueblue/post/49172185-eb40-4555-b078-8b7916148d92/image.png" alt="msa" width="500"/></p>


</br>
<p align="center"><img src="https://media.vlpt.us/images/hanblueblue/post/1ab12c52-c4f9-4fdc-a273-194000706244/image.png" alt="msa" width="500"/></p>

</br>

- 행마다 키와 해당값을 저장할 때 각각 다른값의 다른 수의 스키마를 가질 수 있다. ➡ 사용자 이름(key)에 해당하는 값에 스키마들이 각각 다르다.
- Wide Column Database는 대량의 데이터의 압축, 분산처리, 집계처리 또는 쿼리 동작 속도, 확장성이 뛰어남

- Cassandra, HBase, Google BigTable, Vertica, Druid, Accumulo, HyperTable

</br>

### Graph

```
데이터를 노드로, 관계를 엣지로 표현하는 그래프 형식의 데이터베이스
```

</br>


<p align="center"><img src="https://media.vlpt.us/images/hanblueblue/post/4f8e6404-915b-4dc8-8b79-29ac88a6d0a2/image.png" alt="msa" width="500"/></p>

- 노드 : 추적 대상이되는 실체 = 레코드
- 엣지 : (=그래프 or 관계) 노드를 다른 노드에 연결하는 선, 관계를 표현
- 프로퍼티 : 노드의 정보

</br>
<p align="center"><img src="그래프.jpg" alt="msa" width="500"/></p>

</br>

- RDBMS보다 퍼포먼스가 좋고 유연하며 유지보수에 용이함.

> SNS, Network Diagram 등에 사용

- Neo4j, Blazegraph, OrientDB, AgensGraph
