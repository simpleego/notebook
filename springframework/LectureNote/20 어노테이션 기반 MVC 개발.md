20 어노테이션 기반 MVC 개발
=======================
스프링은 과도한 XML 설정으로 인한 문제를 해겨하기 위해 어노테이션 기반 설정을 제공한다.    
후에는 이를 이용한 스프링 부트도 출시하여 기존의 스프링 프레임워크가 지향하던 경량 프레임워크를 실현하고자 한다.  
  
SPringMVC도 스프링 설정 파일에 HandlerMapping, Controller, ViewResolver 같은 여러 클래스를 등록해야 하므로  
어노테이션 설정을 최대한 활용하여 XML 설정을 최소화할 필요가 있다.     
     
# 1. 어노테이션 관련 설정 
스프링 MVC에서 어노테이션을 사용하려면  
기존과 마찬가지로 ```<beans>```루트 엘리먼트에 context 네임스페이스를 추가하고  
기존 HandlerMapping, Controller, ViewResolver 의 ```<bean>``` 엘리먼트 대신에  
```<context:component-scan>```엘리먼트를 사용하여 어노테이션을 스캔하여 생성하도록 설정해주자  

**presentation-layer.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.2.xsd">
	<context:component-scan base-package="com.springbook.view"></context:component-scan>

</beans>
```
이때, 모든 Controller 클래스가 스캔 범위에 포함되도록 하고자 ```base-package="com.springbook.view"```설정을 해주자   
또한 ```<bean>``` 엘리먼트를 삭제했기에 ViewResolver를 위해 WEB-INF에 넣어둔 파일들도 webapp 디렉토리로 이동해주자  

## 1.1. @Controller 사용하기
```@Controller```는 해당 객체를 MVC 아키텍처에서 컨트롤러 객체로 인식하도록 해준다.   
```@Controller```는 bean 인스턴스를 생성하는 ```@Component```를 상속받는 Controller 를 위한 기능이 추가된 어노테이션이다.     
즉, 단순히 객체를 생성하는 것 뿐만 아니라 ```DispatcherServlet```이 인식하는 Controller 객체로 만들어준다.  

```@Controller```를 사용하게 되면 큰 장점이 하나 있는데         
기존 Controller 클래스들은 Controller 인터페이스를 구현하여 Controller 클래스 기준을 충족 시켜야 한다.     
**어노테이션 사용전 InsertBoardController**  
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class InsertBoardController implements Controller {
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("글 등록 처리");

		// request.setCharacterEncoding("UTF-8");
		String title = request.getParameter("title");
		String writer = request.getParameter("writer");
		String content = request.getParameter("content");

		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setTitle(title);
		vo.setWriter(writer);
		vo.setContent(content);

		BoardDAO boardDAO = new BoardDAO();
		boardDAO.insertBoard(vo);

		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:getBoardList.do");
		return mav;
	}
}
```
이렇듯 특정 조건을 만족시켜줘야 하는 것은 POJO 스타일의 객체가 아니다.  
그렇기에 복잡한 조건을 충족시켜야 한다는 단점이 있기에 우리는 ```@Controller```를 사용해 이를 간략히 작성할 것이다.  
   
**InsertBoardController**
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

@Controller
public class InsertBoardController  {
	
	public void InsertBoard(HttpServletRequest request) {
		System.out.println("글 등록 처리");

		// request.setCharacterEncoding("UTF-8");
		String title = request.getParameter("title");
		String writer = request.getParameter("writer");
		String content = request.getParameter("content");

		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setTitle(title);
		vo.setWriter(writer);
		vo.setContent(content);

		BoardDAO boardDAO = new BoardDAO();
		boardDAO.insertBoard(vo);
	}
}
```
이제 InsertBoardController 클래스 객체는 스프링 컨테이너가 자동으로 생성하고, Controller 객체로 인식한다.    
가장 중요한 것은 POJO 클래스로 변경되었으므로 메소드 이름과 리턴타입 매개변수를 원하는 형태로 변경할 수 있다.     
  
## 1.2. @RequestMapping 사용하기
```@Controller```를 사용함으로써 객체를 생성하고 Controller로 인식하게 할 수는 있지만  
```/InsertBoard.do```요청에 대해서 ```insertBoard()```메소드가 실행되도록 하지는 않았다.  
앞서 우리는 xml에서의 HandlerMapping 설정을 이용하여 이를 처리햇지만 현재는 이를 삭제했으니  
```@RequestMapping```어노테이션을 메소드위에 기술하여 특정 URL 동작시에 호출할 메소드를 지정할 수 있다.  
```
@RequestMapping(value="/insertBoard.do")
사용할 메소드(){}
```   
  
**InsertBoardController**
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

@Controller
public class InsertBoardController{
	
	@RequestMapping(value = "/insertBoard.do")
	public void InsertBoard(HttpServletRequest request) {
		System.out.println("글 등록 처리");

		// request.setCharacterEncoding("UTF-8");
		String title = request.getParameter("title");
		String writer = request.getParameter("writer");
		String content = request.getParameter("content");

		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setTitle(title);
		vo.setWriter(writer);
		vo.setContent(content);

		BoardDAO boardDAO = new BoardDAO();
		boardDAO.insertBoard(vo);
	}
}
```

## 1.3. 클라이언트 요청 처리 
대부분 Controller는 사용자의 입력 정보를 추출하여 VO 객체에 저장한다.         
그리고 비즈니스 컴포넌트의 메소드를 호출할 때 VO 객체를 인자로 전달한다.        
(위 InsertBoardController와 같다)    
    
사용자 입력 정보는 HttpServletRequest의 getParameter() 메소드를 사용하여 추출한다.      
그렇기에 위의 코드처럼 각각의 파라미터에서의 값을 가져와 이를 사용하는 것인데     
    
사용자가 입력하는 정보가 믾거나 변경되는 상황에서 문제가 생긴다.     
사용자 입력 정보가 많으면 그 만큼의 자바 코드가 필요할 것이고,      
입력 정보가 변결될 때 마다 Controller 클래스는 수정되어야 한다.     
  
우리는 **Command 객체**를 이용하여 이런 문제를 모두 해결할 수 있다.  
(Command 객체는 Controller 메소드 매개변수로 받은 VO 객체라고 보면 된다.)   

InsertBoardController 클래스의 insertBoard() 메소드를 Command 객체를 이용하여 구현한다.  
   
**InsertBoardController**
```  
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

@Controller
public class InsertBoardController{
	
	@RequestMapping(value = "/insertBoard.do")
	public void InsertBoard(BoardVO vo) {
		System.out.println("글 등록 처리");

		BoardDAO boardDAO = new BoardDAO();
		boardDAO.insertBoard(vo);
	}
}
```
insertBoard() 메소드의 매개변수로 사용자가 입력한 값을 매핑할 BoardVO 클래스를 선언하면,     
스프링 컨테이너가 insertBoard() 메소드를 실행할 때 Command 객체를 생성하여 넘겨준다.       
그리고 이때 사용자가 입력한 값들을 Command 객체에 세팅까지 해서 넘겨준다.  
결과적으로 사용자 입력 정보 추출과 VO 객체 생성, 그리고 값 설정을 모두 컨테이너가 자동으로 처리하는 것이다.  
    
   [그림]   
     
1. 서블릿 컨테이너는 클라이언트의 HTTP 요청이 서버에 전달되는 순간 
2. HttpServletRequest 객체를 생성하고 HTTP 프로토콜에 설정된 모든 정보를 추출하여 HttpServletRequest 객체에 저장한다.  
3. 그리고 이 HttpServletRequest 객체를 Service() 메소드를 호출할 때, 인자로 전달해준다.  

Service() 는 스프링 컨테이너에서 만든 DispatcherServlet이 실행하는 메소드이다.  
DispatcherServlet은 해당 request의 getParameter()를 이용하여 값을 저장하고 이를 커멘드 객체에 저장시킨다.  
이때 커멘드 객체의 자료형 기준은 @RequestMapping이 있는 메소드의 매개변수를 기준으로 만들고 할당해주는 것이다.  
  
후에 우리는 이렇게 값을 할당 받은 커멘드 객체만을 인자로 받아서 이를 DAO 처리를 해주면 된다.  
   
서블릿 객체는 서블릿 컨테이너가 생성한다.  
그리고 ```service()``` ```doGet()``` ```doPost()``` 메소드도 서블릿 컨테이너가 호출한다.  
이때 ```service()``` ```doGet()``` ```doPost()```메소드가 정상으로 호출되려면  
HttpServletRequest 와 HttpServletResponse 객체가 필요한데, 이 객체들도 서블릿 컨테이너가 생성해서 넘겨준다.  
결국 service()메소드는 매개변수로 받은 HttpServletRequest 객체를 통해 다양한 요청 처리를 구현할 수 있다.   

이러한 관점을 이제 스프링 컨테이너로 옮겨보자.  
클라이언트가 글 등록 정보를 적절하게 입력하고, 서버에 ```/insertBoard.do``` 요청을 전달하면  
스프링 컨테이너는 @Controller가 붙은 모든 컨트롤러 객체를 생성하고,  
insertBoardController가 가지고 있는 insertBoard() 메소드를 실행한다. 
이때 매개변수에 해당하는 BoardVO 객체를 스프링 컨테이너가 생성하여 전달한다.   

[사진]

1. 매개변수에 해당하는 BoardVO 객체를 생성하고,  
2. 사용자가 입력한 파라미터 값들을 추출하여 BoardVO 객체의 Setter 메소드를 통해 저장한다.  
3. insertBoard() 메소드를 호출할 때, 사용자가 입력값들이 설정된 BoardVO 객체가 인자로 전달된다.  

여기서 중요한 것은 Form 태그 안의 파라미터 이름과 Command 객체의 Setter 메소드 이름이 반드시 일치해야한다.  
즉, 각 파라미터 이름에 해당하는 ```setTitle()``` ```setWrite()```등이 파라미터 이름 title,write 같이 일치해야한다.  



***
# 2. 대주제
> 인용
## 2.1. 소 주제
### 2.1.1. 내용1
```
내용1
```   

***
# 3. 대주제
> 인용
## 3.1. 소 주제
### 3.1.1. 내용1
```
내용1
```
