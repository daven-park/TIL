# Spring Boot와 Security 사용시 Swagger2를 추가했을 때 오류가 발생했다.

### Spring Boot 버전 2.6.2가 Swagger2의 버전가 충돌이 일어나 발생하는 버그였다.

```
Failed to start bean 'documentationPluginsBootstrapper'; nested exception is java.lang.NullPointerException
```

- build.gradle에서 SpringBoot 버전을 2.4.2로 변경하였더니 해결되었다 😀

## 참고 링크

- [링크 1](https://ldne.tistory.com/332)
- [링크 2](https://stackoverflow.com/questions/40241843/failed-to-start-bean-documentationpluginsbootstrapper-in-spring-data-rest)
