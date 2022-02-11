# 객체 무한로딩 오류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2cbd6e1f-c177-4dd8-a163-f7b3bf184064/Untitled.png)

객체 무한 참조로 인해 무한로딩이 일어났다. gallerItem의 fk설정을 위한 다대일 매핑에서 발생하였다. 무한로딩을 방지하기 위해 fk 연관관계 설정 시 JsonIgnore 어노테이션으로 json을 null처리할 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a48f16a2-6d5b-4ce3-9107-421e545d1257/Untitled.png)
