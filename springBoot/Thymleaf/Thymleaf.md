# Thymleaf란
스프링 MVC 패턴에서 뷰 템플릿 엔진(View Template Engine)으로 보통 타임리프(Thymeleaf)가 자주 쓰이며, 스프링 부트에서는 타임리프를 표준 뷰 템플릿 엔진으로 취급하고 있다. 프론트 엔드 엔지니어가 같이 있는 업무 환경에서는 보통 API 방식을 사용하기 때문에 프뷰 템플릿을 사용할 일이 없겠지만, admin 페이지를 만든다거나, 프론트 엔드 엔지니어 없이 혼자 개발해야 하는 환경에서는 뷰 템플릿 엔진을 사용하는게 더 편리할 수 있다. 때문에 1개 정도의 뷰 템플릿 엔진을 간단히 배워두는 것은 크게 어렵지도 않고, 언젠간 도움이 될 것이다.

# 목차
- 타임리프의 특징
- 5가지 기본 표현식
- 자주 쓰는 구문 정리
# 타임리프의 특징
## 내추럴 템플릿  
타임리프의 가장 대표적인 특징은 HTML을 자연스러운 형태로 유지할 수 있는 내츄럴 템플릿(Natural Template)이라는 점이다. JSP를 포함한 다른 뷰 템플릿들은 JSP 파일 자체를 그대로 웹 브라우저에서 열어보면 JSP 소스코드와 HTML이 뒤죽박죽 섞여있기 때문에, 웹 브라우저에서 정상적인 HTML 결과를 확인할 수 없다. 오직 서버를 통해서 JSP가 렌더링 되고 HTML 응답 결과를 받아야 화면을 확인할 수 있다. 반면에 타임리프로 작성된 파일은 해당 파일을 그대로 웹 브라우저에서 열어도 정상적인 HTML 결과를 확인할 수 있다. 때문에 디자이너와 개발자가 동시에 작업하기에 용이하다.
## 서버 사이드 렌더링 지원
타임리프는 Java에서 템플릿을 렌더링하고 완성된 HTML을 브라우저에 전달하는 서버사이드 렌더링(SSR)을 지원한다. 이는 SEO(검색 엔진 최적화)와 브라우저 호환성을 높이는 데 유리한 장점도 있다.

## Spring MVC와의 통합성
타임리프는 Spring MVC와 밀접하게 통합되어 있어, Spring 모델 데이터를 간단히 템플릿에 전달하고 표시할 수 있다. 예를 들어 Spring의 폼 처리, 국제화(i18n), URL 매핑과 같은 기능을 자연스럽게 지원하고 있다.

# 5가지 기본 표현식
| 표기법    | 설명                                 |
|---------|------------------------------------------|
| ${...}  |  변수   표현식(Variable expressions)     |
| *{...}  |  선택 변수 표현식(Selection expressions) |
| #{...}  |  메세지 표현식(Message expressions)      |
| @{...}  |  링크 표현식(Link expressions)           |
| ~{...}  |  프래그먼트 표현식(Fragment expressions) |

${...} : Variable expressions
Variable expressions are OGNL expressions –or Spring EL if you’re integrating Thymeleaf with Spring– executed on the context variables — also called model attributes in Spring jargon.
해석 : 수 표현식은 컨텍스트 변수에서 실행되는 OGNL 표현식(또는 Thymeleaf를 Spring과 통합하는 경우 Spring EL)이며 Spring 전문 용어로 모델 속성이라고도 합니다.
컨트롤러에서 Model 객체에 담아준 데이터를 뷰에서 사용하고 싶을 때, 이 표현식으로 해당 객체에 접근할 수 있다.
예를 들어 아래와 같이 컨트롤러 클래스 안에 코드를 보자.
@Controller
public class MemberController {

    @GetMapping(value = "/member")
    public String member(Model model){

        Long memberId = 1;
        String memberName = "memberA";

        Member member = new Member(memberId, memberName);
        model.addAttribute("member", member);

        return "/member";
    }
}
Model 객체에 "member"라는 이름으로 member 객체를 속성 값으로 추가했다. 이를 타임리프 템플릿에서 그대로 사용할 수 있다.
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <p th:text="${member.id}"></p>
    <p th:text="${member.name}"></p>
</body>
</html>
변수 표현식 내에서 객체의 속성 값에 접근하고자 할 때 스프링 EL(Spring Expression Language)이라는 스프링이 제공하는 표현식을 사용한다. 위와 같이 객체 명에 .(dot)을 사용하면, 프로퍼티 접근법으로 getxxx() 메서드를 호출한다.
스프링 EL은 스프링에서 런타임에 객체의 속성, 메서드, 배열, 컬렉션 등에 접근하거나 조작할 수 있도록 설계한 표현식 언어다. 빈 설정 등에서 사용되는데, 따로 찾아보는걸 권한다.
 
*{...} : Selection expressions
Selection expressions are just like variable expressions, except they will be executed on a previously selected object instead of the whole context variables map.
해석 : 선택 표현식은 전체 컨텍스트 변수 map 대신 이전에 선택한 객체에서 실행된다는 점을 제외하면, 변수 표현식과 같습니다.
사실 ${}와 거의 동일하다고 보면 되는데, 사용하기 위해서는 한 가지 전제 조건이 붙는다. Model 객체에 속성 값으로 다양한 객체가 담겨 있을 때, 하나의 객체를 먼저 지정하면 지정된 객체의 속성 이름만으로 접근할 수 있다.
예시를 보자.
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <div th:object="${member}">
        <p th:text="*{id}"></p>
        <p th:text="*{name}"></p>
    </div>
</body>
</html>
th:object="${member}"로 먼저 어떤 속성 값을 사용할 지 미리 지정했다.
즉, member 컨텍스트 변수를 “선택”했다는 의미로, member.id로 접근하는 것이 아닌 객체 이름을 생략한 id로만 접근할 수 있다.
 
#{...} : Message (i18n) expressions
Message expressions (often called text externalization, internationalization or i18n) allows us to retrieve locale-specific messages from external sources (.properties files), referencing them by a key and (optionally) applying a set of parameters.
해석 : 메시지 표현식(종종 텍스트 외부화, 국제화 또는 i18n이라고 함)을 사용하면 외부 소스(.properties 파일)에서 로케일별 메시지를 검색하여 키로 참조하고 (선택적으로) 매개변수 집합을 적용할 수 있습니다.
Spring에서 국제화(다국어 처리)를 위해 로케일별 message.properties 파일을 만들기도 한다. 이 파일 안에 담겨 있는 메세지 변수를 참조할 때 사용한다고 생각하면 된다.
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<body>
    <div>
        <span th:text="#{welcome.message}"/>
    </div>
</body>
</html>
 
@{...} : Link (URL) expressions
Link expressions are meant to build URLs and add useful context and session info to them (a process usually called URL rewriting).
해석 : 링크 표현식은 URL을 빌드하고 유용한 컨텍스트 및 세션 정보를 URL에 추가하기 위한 것입니다(일반적으로 URL 재작성이라고 하는 프로세스).
링크 처리를 할 때 사용되며, 특히 URL에 쿼리 파라미터를 전달해야 하는 상황에서 좀 더 가독성 좋은 코드를 만들 수 있다.
예를 들어 /order/details이란 URL에 id 값과 type 값을 GET 파라미터로 전달해야 할 때,
<a th:href="@{/order/details(id=${orderId},type=${orderType})}">...</a>
위와 같이 () 안에 key=vaule 형태로 파라미터 값을 추가할 수 있다. 마치 메서드를 호출할 때, 파라미터 값을 전달한다고 생각하면 된다. 
<!-- HTML로 랜더링 후 예시 -->
<!-- orderId = 23, orderType = online -->
<a href="/order/details?id=23;type=online">...</a>
 
또한 URL 경로에 변수 값을 사용하는 path variable 방식도 지원한다. URL에서 변수를 {}로 감싼 다음 변수(key)에 넣을 값(value)을 똑같은 방식으로 전달해 주면 된다.
<a th:href="@{/order/details/{id}(id=${orderId},type=${orderType})}">...</a>
이때, 경로에 포함되어 있는 key 이외의 값들은 쿼리 파라미터 형태로 추가된다.
<!-- HTML로 랜더링 후 예시 -->
<!-- orderId = 23, orderType = online -->
<a href="/myapp/order/details/23?type=online">...</a>
 
~{...} : Fragment expressions
Fragment expressions are an easy way to represent fragments of markup and move them around templates. Thanks to these expressions, fragments can be replicated, passed to other templates as arguments, and so on.
해석 : 프래그먼트 표현식은 마크업의 fragment를 표시하고 템플릿에서 이동하는 쉬운 방법입니다. 이러한 식 덕분에, fragment를 복제하고 인수로 다른 템플릿에 전달할 수 있습니다.
fragment라는 HTML 조각 파일들을 가져올 수 있는 표현 식이다. 보통 특정 부분을 다른 내용으로 변경할 수 있는 th:insert나 th:replace와 같이 사용한다.
<div th:insert="~{/commons :: main}">...</div>
위의 경우 commons라는 파일의 main이라는 fragment를 가져 오겠다는 의미다. 이에 대한 자세한 설명은 아래 자주 쓰는 구문 정리에서 다루겠다.



# 자주 쓰는 구문 정리

텍스트 출력 : th:text
HTML 파일에 텍스트를 출력하는 방법이다.
<p th:text="#{home.welcome}">Welcome !</p>
재밌는 점은 만약 th:text의 값(위의 경우에는 home.welcome)이 null이면 “Welcome !”을 출력하고, null이 아니면 home.welcome 값을 출력하게 된다.
인라인(inline) 표현식
태그 속성을 사용하지 않고 HTML 텍스트에 직접 표현식을 작성할 수 있다.
원래는 아래와 같은 식을
<p>Hello, <span th:text="${session.user.name}">Sebastian</span>!</p>
다음과 같이 바꿀 수 있다.
<p>Hello, [[${session.user.name}]]!</p>
또한 JavaScript나 CSS에서도 인라인 표현식을 사용할 수 있는 방법이 있다.

```js
<script th:inline="javascript">
    ...
    var username = [[${session.user.name}]];
    ...
</script>
```
위와 같이 script 태그 안에 th:inline="javascript" 속성을 추가해 주면 된다.
CSS도 동일하다.
<style th:inline="css">
    .[[${classname}]] {
      text-align: [[${align}]];
    }
</style>
반복문 : th:each

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>이름</th>
            </tr>
        </thead>
        <tbody>
            <tr th:each="member, state : ${members}">
                <td th:text="${state.index}"></td>
                <td th:text="${member.id}"></td>
                <td th:text="${member.name}"></td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```

members라는 객체 리스트를 순회하며 각 객체를 member라는 이름으로 참조해 사용할 수 있다.
또한 부가적으로 사용할 수 있는 상태(state) 객체라는 것이 있다. 위 예제에서는 state라는 변수명으로 지정했는데, 변수명은 크게 상관 없다.  이 상태 객체는 인덱스 번호, 홀수, 짝수 등의 정보를 가지고 있다.


| 속성  | 기능                          |
|--------|-------------------------------|
| index  |  0부터   시작하는 인덱스      |
| count  |  1부터 시작하는 인덱스        |
| size   |  전체 반복 크기               |
| even   |  짝수 번째 반복 여부(boolean) |
| odd    |  홀수 번째 반복 여부(boolean) |
| first  |  첫 번째 반복 여부(boolean)   |
| last   |  마지막 반복 여부(boolean)    |

제어문 : th:if, th:unless, 삼항 연산자
Thymeleaf에서는 if ~ else를 한 묶음으로 처리하지 않고 따로따로 처리한다.
예를 들어 ‘sno 값이 5의 배수일 때만 출력하라’는 구문이다.

```html
<li th:each="dto : ${dtoList}">
    <span th:if="${dto.sno % 5 == 0}" th:text="{dto.sno}"></span>
</li>
```
‘위 조건이 아닐 때(sno 값이 5의 배수가 아닐 때)는 *을 출력하라’는 구문을 아래와 같이 추가할 수 있다.

```html
<li th:each="dto : ${dtoList}">
    <span th:if="${dto.sno % 5 == 0}" th:text="{dto.sno}"></span>
    <span th:unless="${dto.sno % 5 == 0}" th:text="*"></span>
</li>
```
위 두 구문을 삼항 연산자를 활용해 하나의 구문으로 만들 수 있다.

```html
<li th:each="dto : ${dtoList}">
    <span th:text="{dto.sno % 5 == 0 ? dto.sno : '*'}"></span>
</li>
```
위와 같이 삼항 연산자는 표현식 안에 활용할 수 있으므로 훨씬 편리하다.
th:block
별도의 태그가 필요없는 구문으로 개발자가 원하는 속성을 지정할 수 있는 단순한 속성 컨테이너다. 실제 화면에서는 html로 처리되지 않기 때문에 반복문 등을 별도로 처리할 때 많이 사용된다.
위 제어문 예시에서 사용하면 아래와 같다.

```html
<th:block="dto : ${dtoList}">
    <li th:text="{dto.sno % 5 == 0 ? dto.sno : '*'}"></li>
</th:block>
```
랜더링 된 html 결과에는 th:block 태그가 사라져 있다.
레이아웃 처리 : th:insert, th:replace, th:fragment
Thymeleaf에서 레이아웃을 처리하기 위한 기본적인 방법은, 먼저 포함하고 싶은 부분을 fragment로 정의해야 한다.
예를 들어 /templates/fragments/fragment1.html 파일이 아래와 같다고 해보자.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

  <body>
    <div th:fragment="part1">
      <h2>Part 1</h2>
    </div>
    <div th:fragment="part2">
      <h2>Part 2</h2>
    </div>
  </body>
</html>
이를 다른 html 파일에서 fragment1.html 조각들을 가져오는 방법은 아래와 같다.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

    <body>

    <div th:insert="~{/fragments/fragment1 :: part1}"></div>
    <br>
    <div th:replace="~{/fragments/fragment1 :: part2}"></div>

    </body>

</html>
```

위 코드가 랜더링 된 html 파일을 보자.
```html
    <body>
        <div>
            <div>
                <h2>Part 1</h2>
            </div>
        </div>
        <br>
        <div>
            <h2>Part 2</h2>
        </div>
    </body>
```    
th:insert와 th:replace의 차이는 다음과 같다.

th:insert : 바깥쪽 태그는 그대로 유지하면서 새롭게 추가되는 방식
th:replace : 기존 내용을 완전히 대체하는 방식

또한 fragment를 정의하지 않아도 다른 파일의 조각을 불러올 수 있다.
~{::}에서 ::뒤에 CSS 선택자를 이용할 수 있다. 만약 footer.html 파일의 내용 중 아래와 같은 코드가 작성되어 있다면,
<div id="copy-section">
  &copy; 2011 The Good Thymes Virtual Grocery
</div>
CSS 선택자 중 id 속성 값을 가져오는 #을 사용하여 html 조각을 include 할 수 있다.
```html
<body>
  ...

  <div th:insert="~{footer :: #copy-section}"></div>
</body>
```

참고로 fragment 표현식을 사용하는 방법은 아래와 같다.

"~{templatename::selector}" : templatename 파일 안에 있는 Markup Selector 조각을 가져온다.
"~{templatename}" : templatename 파일 전체를 가져온다.
"~{::selector}" or "~{this::selector}" : 현재 파일 안에 있는 Markup Selector 조각을 가져온다.

fragment 표현식에도 파라미터 값을 전달할 수 있다. 리터럴 값, Model 객체도 가능하고, 심지어 파일 조각을 파라미터 값으로 전달할 수 있다.
/templates/fragments/fg2.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <body>
        <div th:fragment="target(first, second)">
            <div th:replace="${first}"></div>
            <div th:replace="${second}"></div>
        </div>
    </body>
</html>
```

위 fg2.html 파일의 fragment를 불러와 보자.
/templates/layout.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <body>
        <th:block th:replace="~{/fragments/fg2 :: target(~{this :: hello}, ~{this :: everyone})}">
            <h2 th:fragment="hello">Hello, </h2>
            <h2 th:fragment="everyone">everyone!</h2>
        <th:block>
    </body>
</html>
```
위 파일의 렌더링 결과를 예측해 보자.
먼저 fg2.html의 target fragment가 layout.html에 include될 것이다.
이때, ${first}가 ~{this :: hello}로, ${second}가 ~{this :: everyone}로 치환된다고 생각하면 좀 편하다.
결과는 아래와 같다.

/templates/layout.html
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <body>
        <div>
            <h2">Hello, </h2>
            <h2>everyone!</h2>
        </div>
    </body>
</html>
```

어떤 파라미터에 값을 전달하고 싶은지 명확하게 지정할 수도 있다.
/templates/layout.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <body>
        <th:block th:replace="~{/fragments/fg2 :: target(second = ~{this :: hello}, first = ~{this :: everyone})}">
            <h2 th:fragment="hello">Hello, </h2>
            <h2 th:fragment="everyone">everyone!</h2>
        <th:block>
    </body>
</html>
```

렌더링 된 /templates/layout.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <body>
        <div>
            <h2">everyone!</h2>
            <h2>Hello, </h2>
        </div>
    </body>
</html>
``` 
# References  

- 코드로 배우는 스프링 부트 웹 프로젝트 - 구멍가게 코딩단  
- Thymeleaf 공식 홈페이지 - Getting started with the Standard dialects in 5 minutes  
- Thymeleaf 공식 홈페이지 - Using Thymeleaf 3.1  

> 출처: https://bnzn2426.tistory.com/140 [보통의 개발자:티스토리]



