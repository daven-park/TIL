#Servlet JSP

초기 설정
```
서버 톰캣 - 9.0  생성 → 톰캣 폴더 설정 → 서버 생성

overview 설정창 → server Locations → use custom location → server path server-work  폴더로 변경 → http 포트 8000으로 변경

Dynamic web project 생성 → next 2번 → generate web.xml deployment descrptor체크
```
### Framework

- 스트러츠
- Spring - EJB의 어려움을 해결하기 위해 나온 것
    - MVC(Model View Control)
        - 서블릿 - 최초의 컨트롤러
- 스트러츠2

EJB - 은행권에서만 사용함

Client Side

- 클라이언트 브라우저에서 실행하는 프로그램
- HTML, CSS, javascript, image ..

Server Side

- 서버에서 실행하고 결과를 내려준다. (json, xml, html, plain)
- 서블릿, JSP

사용자에서 URL로 서버에 리소스를 요청하면 서버단에서 리소스를 문자열로 보내준다 - Client side Program

Servlet은 결과를 text, json, xml, html등의 결과물로 변환하여 보내준다- Server Side Program

Client에서 요청한 것이 Servlet이라면 Servlet 파일(Test01_XML)을 찾아서 해석하고 실행하고 결과 전송 - 해석하는 기능하는 것 ⇒(Servlet, JSP Container/ Engine)

Tomcat → 서버 + Engine

Loadbalancing

# 서블릿 사용하기

1. 서블릿이 되기 위한 규칙
    1. 서블릿(Servlet-인터페이스) 타입이어야 한다.
    2. Servlet (Interface) -> GenericServlet(Abstract Class) -> HttpServlet(Abstract Class)
    3. 사용자가 브라우저에서 서블릿을 호출하기 위해서 서블릿에 URL을 설정한다.

       서블릿에 URL을 설정하는 2가지 방식
        - XML 활용
        - Annotation 활용(3버전 이후부터 가능)

       Servlet 인터페이스 상속받기

       5가지 메소드

        - destroy
            - 메모리에서 삭제시 실행
            - 코드가 변경되거나 할때 이전 메모리 삭제시 필요
        - init
            - 최초 호출시 한번만 실행
        - service
            - 호출마다 실행
            - 작업처리


init + service + destroy ⇒ 생명주기 메소드

사용자가 서버에게 Aservlet을 요청한다면

1. Aservlet이 메모리에 있는지 체크
2. 있으면 메모리 실행하고 결과 전송 / 없으면 servlet을 찾아 객체 생성 → 실행 → 결과 전송

init 메모리 생성될 떄 한번 실행됨

Servlet 재정의에서 불필요한 메서드 재정의를 줄이기 위해서 GenericServlet 추상 클래스가 있다

GenericServlet은 service메서드만 재정의하면 된다.

web.xml에 servlet 태크 생성 → servlet-name, servlet-class 태그 생성

url ⇒ [http://localhost:8000/프로젝트명/url-pattern](http://localhost:8000/프로젝트명/url-pattern) 등록한 이름

```xml
<servlet>
<!-- 논리적인 이름으로 누군가 사용할 때 찾을 수 있는 구분자로 사용 -->
<servlet-name>Test02_XML</servlet-name>
<servlet-class>com.ssafy.basic.Test02_XML</servlet-class>
</servlet>
```

```xml
<servlet-mapping>
    <servlet-name>Test02_XML</servlet-name>
    <url-pattern>/basic/test02</url-pattern>
</servlet-mapping>
```

# Annotation

@Webservlet : xml의 servlet태그부분 대체 () 안에 url 다음 경로 설정

```java
@WebServlet("/basic/test02")
public class Test03_Annotation extends GenericServlet {
	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		System.out.println("매번 처리되는 부분이다.. 이부분이 개발자가 주로 작성하는 메서드");
	}
}
```

Servlet - 인터페이스

GenericServlet - 추상

HttpServlet - 추상, http프로토콜 구현(get/ post)

service( ServletRequest - 요청. ServletResponse - 응답)

라이프사이클은 무조건 Servlet이 붙은 요청 응답

HTTPServlet ⇒ service(SR, SR) → service(HSR, HSR) → 사용자 요청

사용자 요청 ( get ) → doGet(HSR, HSR)

사용자 요청 ( post ) → doPost(HSR, HSR)

MyServlet에서 service를 재정의 할 경우 doGet을 호출하는 메서드가 없기 때문에 에러가 나지 않는다.

### 내장객체 ( 9개 )

공유되어 사용됨

- Request → MVC 공유영역
- PageContext → 내 페이지만
- Session →
- Application → 공유범위 제일 넓음

그 외

- Response
- Out
- Page
- Config
- Exception

