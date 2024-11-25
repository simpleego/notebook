# Spring + Thymeleaf 설정 시작
[출처] [Thymeleaf] Spring + Thymeleaf 설정 시작|작성자 토토아빠

## [Thymeleaf의 강점]

- 서버상에서 동작하지 않아도 된다.
- 전체적인 마크업 구조를 흐트려트리지 않는다.

>  체크해야 하는 부분은 3가지 입니다 !
### 1. 환경설정
> JDK1.6 / eclipse luna / window 7 / maven

### 1. 라이브러리 설정(pom.xml)
> 우선 Thymeleaf 를 사용하기 위해서 pom.xml에 아래와 같이 추가해줍니다!
```xml
<!-- thymeleaf -->
<dependency>
  <groupId>org.thymeleaf</groupId>
  <artifactId>thymeleaf-spring3</artifactId>
  <version>2.0.14</version>
  <scope>compile</scope>
</dependency>
<dependency>
  <groupId>org.thymeleaf</groupId>
  <artifactId>thymeleaf</artifactId>
  <version>2.0.14</version>
  <scope>compile</scope>
</dependency>
```

### 2. ViewResolver 설정(dispatcher-servlet.xml)

> 기존의 jsp기반의 viewResolver 설정을 아래와 같이 수정한다.
```xml
<bean id="jspViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver"> 
  <property name="prefix" value="/WEB-INF/views/" />
  <property name="suffix" value=".jsp" />
</bean>
```
> Thymeleaf 설정 
```xml 
<bean id="templateResolver"
class="org.thymeleaf.templateresolver.ServletContextTemplateResolver">
  <property name="prefix" value="/WEB-INF/views/" />
  <property name="suffix" value=".html" />
  <property name="templateMode" value="HTML5" />
  <property name="cacheable" value="false" />
</bean>
<bean id="templateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
  <property name="templateResolver" ref="templateResolver" />
</bean>
<bean class="org.thymeleaf.spring3.view.ThymeleafViewResolver">
  <property name="characterEncoding" value="UTF-8" />
  <property name="templateEngine" ref="templateEngine" />
</bean>
```

### 3. view 페이지에서 Thymleaf 사용
> html파일에서 네임스페이스 설정 후 사용한다.
> 
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="utf-8" />
<title>Insert title here</title>
</head>
<body> 
<h1>Thymeleaf tutorial - Answer for exercise 1: bean values</h1>
  <h2>Product information</h2>
    <dl>
        <dt>Product name</dt>
        <dd th:text="${bbs.title}">Red chair</dd>
        <dt>Product price</dt>
        <dd th:text="${bbs.tot_cnt}">Red chair</dd>
        <dt>Product available from</dt>    
    </dl>
</body>
</html>
```
> Thymeleaf을 사용하는 html 파일입니다 .
> 
> htm 태그의 속성으로 xml Name Space 설정을 한다.

```html
<html xmlns:th="http://www.thymeleaf.org">
```
> 컨트롤러 부분에서 
```java
@RequestMapping(value="/test.do")
    public String login(Model model,String auth)throws Exception{
        CommonBoardDto bbs=new CommonBoardDto();
        bbs.setTitle("title1");
        bbs.setTot_cnt("123");
        model.addAttribute("auth", auth);
        model.addAttribute("bbs", bbs);
        return "test";
    }
```

이처럼 요청을 하여 페이지가 넘어가면 정상적으로 화면이 출력이 되는 것을 확인할 수 있습니다.

아래 사이트를 참조하였습니다.
https://blog.naver.com/software705/220930543921
