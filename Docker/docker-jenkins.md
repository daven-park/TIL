### Docker Jenkins Docker In Docker 방식 무중단 배포

도커로 젠킨스 이미지 파일 받아오기

- `docker pull jenkins/jenkins`

도커로 젠킨스 이미지 파일 실행 (권한 없을 시 sudo 필요)

- `docker run -d -p 9090:8080 -p 50000:50000 --restart=always -v /var/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins -u root jenkins/jenkins:lts-jdk11`
    - docker.sock은 도커 데몬으로 도커 컨테이너와 도커 내부의 컨테이너간의 통신을 위한 볼륨 마운트 설정

젠킨스 비밀번호 확인

- `docker logs 컨테이너 이름`

### Jenkins-Gitlab Webhook (Gitlab에 변동이 발생하면 자동 빌드)

### Jenkins

1. 확인한 비밀번호로 접속 및 계정 생성
2. Jenkins 관리 -> 플러그인 관리 -> Docker Pipeline, Docker plugin 설치
3. 새로운 item -> Freestyle project 생성
4. 소스 코드 관리에서 Git 선택 후 Repository URL 작성과 Github 계정 Credentials Add 후 선택
5. 빌드 유발 - GitHub hook trigger for GITScm polling 선택
6. Build - Excute shell

```docker
cd backend
chmod 777 gradlew
./gradlew clean bootjar
sh dockerbuild.sh

```

### Docker 자동 배포 (도커라이징)

1. backend 폴더 내 [Dockerfile](https://ozofweird.tistory.com/entry/Docker-Docker-Compose%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%AC%B4%EC%A4%91%EB%8B%A8-%EB%B0%B0%ED%8F%AC) 생성 
    
    [spring.profiles.activ참조](https://wonit.tistory.com/501)
    

```
FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=build/libs/arttab-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} arttab.jar
ENTRYPOINT ["java", "-jar","-Dspring.profiles.active=ec2", "arttab.jar"]

```

1. backend 폴더 내 dockerbuild.sh 작성

```
docker build -t arttab./

# 기존 컨테이너 정지 : docker ps -f name=[컨테이너이름] -q | xargs --no-run-if-empty docker container stop
docker ps -f name=arttab  -q | xargs --no-run-if-empty docker container stop

# 기존 컨테이너 삭제 : docker container ls -a -f name=[컨테이너이름] -q | xargs -r docker container rm
docker container ls -a -f name=arttab -q | xargs -r docker container rm

docker run -d -p 8080:8080 --name arttab arttab

```

젠킨스 컨테이너 안에 도커 설치([Docker In Docker 방식](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=isc0304&logNo=222274955992))

- `docker exec -it jenkins bash`
- [참고 영상](https://www.youtube.com/watch?v=BUg2kDfhsks&t=181)

```
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz
```
