SpringMVC 적용
=======================
우선 ```Spring MVC``` 패턴을 적용하기 위해서 기존 17장에서의 ```Controller``` 관련 파일들을 모두 삭제하자  
기존 Contoller들은 ```Model``` 처리를 한 후 이동할 ```View``` 페이지의 경로를 ```String```으로 반환하여 해당 경로로 이동 시켰다.  

Spring 에서 제공하는 ```Controller```도 이와 비슷하지만 ```String```이 아닌 ```ModelAndView```를 리턴한다.
따라서 우리가 작성한 모든 ```Controller``` 에서 ```handleRequest()``` 메소드의 리턴타입을 ```String```에서 ```ModelAndView```로 변경만 해주면 된다. 


# 1. 로그인 기능 구현
## 1.1. LoginController 구현
로그인 기능은 기존에 작성한 LoginControoler 클래스를 다음과 같이 수정한다.   
   
**LoginController.java**
```
package com.springbook.view.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.user.UserVO;
import com.springbook.biz.user.impl.UserDAO;

public class LoginController implements Controller {
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("로그인 처리");

		// 1. 사용자 입력 정보 추출
		String id = request.getParameter("id");
		String password = request.getParameter("password");

		// 2. DB 연동 처리
		UserVO vo = new UserVO();
		vo.setId(id);
		vo.setPassword(password);

		UserDAO userDAO = new UserDAO();
		UserVO user = userDAO.getUser(vo);

		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		if (user != null) {
			mav.setViewName("getBoardList.do");
		} else {
			mav.setViewName("login.jsp");
		}
		return mav;
	}
}
```
리턴 타입을 ModelAndView로 수정을 하고,  
화면 네비게이션에서 로그인 성공과 실패일 때 실행될 각 화면 정보를 ModelAndView 객체에 저장하여 리턴한다.    
     
## 1.2. HandlerMapping 등록    
작성된 LoginController 가 클라이언트의 ```"/login.do"'''요청에 대해서 동작하게 하려면 스프링 설정파일인     
presentation-layer.xml에 HanlderMapping 과 LoginController를 ```<bean>``` 등록해야 한다.     
   
**presentation-layer.xml**   
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!-- HandlerMapping 등록 -->
	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="mappings">
			<props>
				<prop key="/login.do">login</prop>
			</props>
		</property>
	</bean>
	
	<!-- Controller 등록 -->
	<bean id="login" class="com.springbook.view.user.LoginController"></bean>
</beans>	
```
위 설정에서 SimpleUrlHandlerMapping 객체는 Setter 인젝션을 통해 Properties 타입의 컬렉션 객체를 의존성 주입하고 있다.  
그리고 의존성 주입된 Properties 컬렉션에는 ```/login.do``` 경로 요청에 대해 아이디가 login인 객체가 매핑되어 있다.  
그리고 LoginController 클래스를 ```<bean>```등록하는데, 반드시 SimpleUrlHandlerMapping에서 ```/login.do``` 킷값으로    
매핑한 값과 같은 아이디로 등록해야 한다.  
  
사실 SimpleUrlHandlerMapping의 기능은 우리가 직접 구현한 HandlerMapping과 같다. 
우리가 직접 구현한 HandlerMapping 도 Properties 대신 HashMap 객체를 이용한 것만 제외하면  
스프링의 SimpleUrlHandlerMapping과 같은 기능을 제공한다.   

***
# 3. 글 목록 검색 기능 구현
## 3.1. GetBoardListController 구현
글 목록을 출력하기 위해서 기존에 사용하던 GetBoardListController 클래스를 수정한다.
**GetBoardListController**
```
package com.springbook.view.board;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
// import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class GetBoardListController implements Controller {

	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("글 목록 검색 처리");
		
		// 1. 사용자 입력 정보 추출(검색 기능은 나중에 구현)
		// 2. DB 연동처리
		BoardVO vo = new BoardVO();
		BoardDAO boardDAO = new BoardDAO();
		List<BoardVO> boardList = boardDAO.getBoardList(vo);
		
		// 3. 검색 결과를 세션에 저장하고 목록 화면으로 이동한다.  
		ModelAndView mav = new ModelAndView();
		mav.addObject("boardList", boardList); //모델 정보 입력
		mav.setViewName("getBoardList.jsp"); // 뷰 정보 입력
		
		return mav;
	/*
		HttpSession session = request.getSession();
		session.setAttribute("boardList", boardList);
		return "getBoardList.jsp";
	*/	
	}
}
```
여기서 중요한 것은 검색 결과를 세션이 아닌 ModelAndView 객체에 저장하고 있다는 점이다.     
세션이라는 것은 클라이언트 브라우저 하나당 하나씩 서버 메모리에 생성되어      
클라이언트의 상태정보를 유지하기 위해서 사용한다.   
  
따라서 세션에 많은 정보가 저장되면 될수록 서버에 부담을 줄 수 밖에 없다.  
   
결국, 검색 결과는 세션이 아닌 HttpServletRequest 객체에 저장하는 것이 맞다.  
HttpServletRequest는 클라이언트의 요청으로 생성됐다가 응답 메시지가 클라이언트로 전송되면 자동으로 삭제되는 일회성 객체이다.  
따라서 검색 겨로가를 세션이 아닌 HttpServletRequest 객체에 저장하여 공유하면 서버에 부담을 주지 않고도 데이터를 공유할 수 있다.  

**하지만**  
GetBoardListController는 검색 결과를 HttpSession도 아니고 HttpServletRequest도 아닌 ModelAndView에 저장하고 있다.    
ModelAndView 는 클래스 이름에서 알 수 있듯이 Model과 View 정보를 모두 저장하여 리턴할 때 사용한다.  
   
DispatcherServlet은 Controller가 리턴한 ModelAndView 객체에서 Model 정보를 추출한 다음   
HttpServletRequest 객체에 검색 결과에 해당하는 Model 정보를 저장하여 JSP로 포워딩한다.  
따라서 JSP 파일에서는 검색 결과를 세션이 아닌 HttpServletRequest로 부터 꺼내 쓸 수 있다.  
   
## 3.2. HandlerMapping 등록  
이제 GetBoardListController 객체가 ```/getBoardList.do```요청에 동작할 수 있도록,   
SimpleUrlHandlerMapping에 매핑 정보를 추가하면 된다.  

**presentation-layer.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!-- HandlerMapping 등록 -->
	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="mappings">
			<props>
				<prop key="/login.do">login</prop>
				<prop key="/getBoardList.do">getBoardList</prop>
			</props>
		</property>
	</bean>
	
	<!-- Controller 등록 -->
	<bean id="login" class="com.springbook.view.user.LoginController"></bean>
	<bean id="getBoardList" class="com.springbook.view.board.GetBoardListController"></bean>

</beans>
```
1. 클라이언트로부터 ```/getBoardList.do```요청을 전송하면 DispatcherServlet이 요청을 받고, 
2. SimpleUrlHandlerMapping을 통해 요청을 처리할 GetBoardListController를 검색한다.  
3. DispatcherServlet은 검색된 GetBoardListController를 실행하여 요청을 처리한다.
4. GetBoardListController는 검색 결과인 ```List<BoardVO>```와 getBoardList.jsp 이름을 ModelAndView객체에 저장하여 리턴한다.
5. DispatcherServlet은 ModelAndView로부터 View 정보를 추출하고 ViewResolver를 이용하여 응답으로 사용할 getBoardList.jsp를 검색한다.
6. DispatcherServlet은 getBoardList.jsp를 실행하여 글 목록 화면을 전송한다.  
   
***
# 4. 글 상세 조회 기능 구현
## 4.1. GetBoardController 구현   
게시글 상세 조회 기능을 구현하기 위해서 GetBoardCotroller를 다음과 같이 수정한다.   

**GetBoardController**
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class GetBoardController implements Controller {
	
@Override
public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
	System.out.println("글 상세 조회 처리");
	
	// 1. 검색할 게시글 번호 추출
	String seq = request.getParameter("seq");

	// 2. DB 연동 처리
	BoardVO vo = new BoardVO();
	vo.setSeq(Integer.parseInt(seq));

	BoardDAO boardDAO = new BoardDAO();
	BoardVO board = boardDAO.getBoard(vo);
	
	// 3. 응답 화면 구성
/*
	HttpSession session = request.getSession();
	session.setAttribute("board", board);
	return "getBoard";
*/
	ModelAndView mav = new ModelAndView();
	mav.addObject("board", board);
	mav.setViewName("getBoard.jsp");
	return mav ; 
	}
}
```
## 4.2. HandlerMapping 등록  
**presentation-layer.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!-- HandlerMapping 등록 -->
	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="mappings">
			<props>
				<prop key="/login.do">login</prop>
				<prop key="/getBoardList.do">getBoardList</prop>
				<prop key="/getBoard.do">getBoard</prop>
			</props>
		</property>
	</bean>
	
	<!-- Controller 등록 -->
	<bean id="login" class="com.springbook.view.user.LoginController"></bean>
	<bean id="getBoardList" class="com.springbook.view.board.GetBoardListController"></bean>
	<bean id="getBoard" class="com.springbook.view.board.GetBoardController"></bean>

</beans>
```
   
***
# 5. 글 등록 기능 구현하기
## 5.1. InsertBoardController 구현  
InsertBoardController 클래스를 수정한다.    
   
**InsertBoardController**
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
		mav.setViewName("getBoardList.do");
		return mav;
	}
}
```
## 5.2. HandlerMapping 등록  
반복적인 과정을 거치니 다음에 할 동작까지 한번에 정의하겠다.   
**presentation-layer.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!-- HandlerMapping 등록 -->
	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="mappings">
			<props>
				<prop key="/login.do">login</prop>
				<prop key="/logout.do">logout</prop>
				<prop key="/getBoardList.do">getBoardList</prop>
				<prop key="/getBoard.do">getBoard</prop>
				<prop key="/insertBoard.do">insertBoard</prop>
				<prop key="/updateBoard.do">updateBoard</prop>
				<prop key="/deleteBoard.do">deleteBoard</prop>
			</props>
		</property>
	</bean>
	
	<!-- Controller 등록 -->
	<bean id="login" class="com.springbook.view.user.LoginController"></bean>
	<bean id="logout" class="com.springbook.view.user.LogoutController"></bean>
	<bean id="getBoardList" class="com.springbook.view.board.GetBoardListController"></bean>
	<bean id="getBoard" class="com.springbook.view.board.GetBoardController"></bean>
	<bean id="insertBoard" class="com.springbook.view.board.InsertBoardController"></bean>
	<bean id="updateBoard" class="com.springbook.view.board.UpdateBoardController"></bean>
	<bean id="deleteBoard" class="com.springbook.view.board.DeleteBoardController"></bean>

</beans>
```
   
***
# 6. 글 수정 기능 구현하기
## 6.1. UpdateBoardController 구현  
**UpdateBoardController**
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class UpdateBoardController implements Controller{
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
	
		System.out.println("글 수정 처리");
		// 1. 사용자 입력 정보 추출 
		
		// request.setCharacterEncoding("UTF-8");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String seq = request.getParameter("seq");
		
		
		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setTitle(title);
		vo.setContent(content);
		vo.setSeq(Integer.parseInt(seq));
		
		BoardDAO boardDAO = new BoardDAO();
		boardDAO.updateBoard(vo);
		
		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		mav.setViewName("getBoardList.do");
		return mav;
	}
}
```
   
***
# 7. 글 삭제 기능 구현하기
## 7.1. DeleteBoardController 구현  
**DeleteBoardController**
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class DeleteBoardController implements Controller {
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("글 삭제 처리");
		
		// 1. 사용자 입력 정보 추출 
		//request.setCharacterEncoding("UTF-8");
		String seq = request.getParameter("seq");
		
		
		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setSeq(Integer.parseInt(seq));
		
		BoardDAO boardDAO = new BoardDAO();
		boardDAO.deleteBoard(vo);
		
		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		mav.setViewName("getBoardList.do");
		return mav;
	}
}
```
     
***
# 8. 로그아웃 기능 구현하기
## 8.1. LogoutController 구현  
**LogoutController**
```
package com.springbook.view.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;


public class LogoutController implements Controller{

@Override
public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
	System.out.println("로그아웃 처리");
	// 1. 브라우저와 연결된 세션 객체를 강제 종료한다.  
	HttpSession session = request.getSession();
	session.invalidate();

	// 2. 세션 종료 후, 메인 화면으로 이동한다.   
	ModelAndView mav = new ModelAndView();
	mav.setViewName("login.jsp");
	return mav;
	}
}
```     
   
***
# 9. ViewResolver 활용하기
우리는 스프링 설정 파일인 presentation-layer.xml에  
HandlerMapping, Controller 클래스들을 ```<bean>```등록하여 
Spring 컨테이너가 객체를 생성하도록 하였다.   
  
그런데 아직 적용하지 않은 한가지 요소가 있는데 바로 ViewResolver 이다.      
ViewResolver를 이용하면 클라이언트로부터의 직접적인 JSP 호출을 차단할 수 있어서     
대부분 웹 프로젝트에서 ViewResolver 사용은 거의 필수이다.     
ViewResolver 역시 여러가지가 있지만 JSP를 View로 사용하는 경우에는 InternalResourceViewResolver를 사용한다.     

우선 클라이언트 브라우저에서 JSP 파일을 직접 호출하면 어떤 문제가 발생하는지 확인해보자  
게시글 목록 화면을 제공하는 getBoardList.jsp 파일을 브라우저에서 직접 호출하면 오류는 발생하지 않지만
**아무 데이터도 출력되지 않는다.**   
   
글 목록 화면에 아무런 데이터도 출력되지 않는 것은 getBoardList.jsp 파일이 실행되기 전에  
게시글 목록을 검색하는 GetBoardListController가 실행되지 않았기 때문이다.   
**따라서 사용자가 getBoardList.jsp 파일을 직접 호출하면,  
에러가 발생하고 GetBoardListController부터 실행할 수 있도록 적절히 제어해야 하는데,**    
이때 ViewResolver를 이용하면 된다.  
   
## 9.1. ViewResolver 적용  
먼저 ```/WEB-INF/board```폴더를 생성하고,  
기존에 사용했던 목록 화면과 상세 화면에 해당하는 getBoardList.jsp와 getBoard.jsp 파일을 이동시킨다.  
   
[사진]     
   
WEB-INF 폴더는 절대 브라우저에서 접근할 수 없다.  
이제 WEB-INF 폴더로 이동한 JSP 파일들은 절대 클라이언트 브라우저에서 접근할 수 없다.  
하지만 InternalResourceViewResolver를 다음과 같이 설정하면 WEB-INF 폴더에 있는 JSP 파일을 View 화면으로 사용할 수 있다.  
결과적으로 직접적인 JSP 호출을 차단하게 된다.  

**presentation-layer.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!-- HandlerMapping 등록 -->
	<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="mappings">
			<props>
				<prop key="/login.do">login</prop>
				<prop key="/logout.do">logout</prop>
				<prop key="/getBoardList.do">getBoardList</prop>
				<prop key="/getBoard.do">getBoard</prop>
				<prop key="/insertBoard.do">insertBoard</prop>
				<prop key="/updateBoard.do">updateBoard</prop>
				<prop key="/deleteBoard.do">deleteBoard</prop>
			</props>
		</property>
	</bean>
	
	<!-- Controller 등록 -->
	<bean id="login" class="com.springbook.view.user.LoginController"></bean>
	<bean id="logout" class="com.springbook.view.user.LogoutController"></bean>
	<bean id="getBoardList" class="com.springbook.view.board.GetBoardListController"></bean>
	<bean id="getBoard" class="com.springbook.view.board.GetBoardController"></bean>
	<bean id="insertBoard" class="com.springbook.view.board.InsertBoardController"></bean>
	<bean id="updateBoard" class="com.springbook.view.board.UpdateBoardController"></bean>
	<bean id="deleteBoard" class="com.springbook.view.board.DeleteBoardController"></bean>
	
	<!-- ViewResolver -->
	<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/WEB-INF/board/"></property>
		<property name="suffix" value=".jsp"></property>
	</bean>
</beans>
```
다시 로그인 기능을 실행해보면 이전까지 잘 실행되던 프로그램이 실행되지 않을 것이다.  
만약 로그인에 실패하면 ```/WEB-INF/board/login.jsp.jsp```파일을 실행하고,
로그인에 성공하면 ```/WEB-INF/board/getBoardList.do.jsp```라는 파일을 실행하기 때문이다.    

## 9.2. Controller 수정
ViewResolver를 적용했을 때, ModelAndView 객체에 저장되는 View 이름은 ViewResolver 설정을 고려하여 등록해야 한다.  
따라서 앞에서 작성한 LoginController 클래스의 화면 네비게이션 코드를 다음처럼 수정한다.  
   
**LoginController**
```
package com.springbook.view.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.user.UserVO;
import com.springbook.biz.user.impl.UserDAO;

public class LoginController implements Controller {
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("로그인 처리");

		// 1. 사용자 입력 정보 추출
		String id = request.getParameter("id");
		String password = request.getParameter("password");

		// 2. DB 연동 처리
		UserVO vo = new UserVO();
		vo.setId(id);
		vo.setPassword(password);

		UserDAO userDAO = new UserDAO();
		UserVO user = userDAO.getUser(vo);

		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		if (user != null) {
			mav.setViewName("redirect:getBoardList.do");
		} else {
			mav.setViewName("redirect:login.jsp");
		}
		return mav;
	}
}
```
로그인에 성공하거나 실패했을 때 View 이름앞에 ```redirect:```을 붙여서 지정해야 한다.   
이렇게 하면 ViewResolver가 설정되어 있더라도 이를 무시하고 리다이렉트한다.   
그리고 로그인에 성공했을 때 실행되는 GetBoardListController에서는 확장자 ```.jsp``` 를 제거해야 한다.

**GetBoardListController**
```
package com.springbook.view.board;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
// import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class GetBoardListController implements Controller {

	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("글 목록 검색 처리");
		
		// 1. 사용자 입력 정보 추출(검색 기능은 나중에 구현)
		// 2. DB 연동처리
		BoardVO vo = new BoardVO();
		BoardDAO boardDAO = new BoardDAO();
		List<BoardVO> boardList = boardDAO.getBoardList(vo);
		
		// 3. 검색 결과를 세션에 저장하고 목록 화면으로 이동한다.  
		ModelAndView mav = new ModelAndView();
		mav.addObject("boardList", boardList); //모델 정보 입력
		mav.setViewName("getBoardList"); // 뷰 정보 입력
		
		return mav;
	/*
		HttpSession session = request.getSession();
		session.setAttribute("boardList", boardList);
		return "getBoardList.jsp";
	*/	
	}
}
```
게시글 목록을 검색하고 나면 getBoardList.jsp 파일이 실행되어야 한다.   
이때 확장자 ```.jsp```를 생략하면 ViewResolver가 접두사와 접미사를 적절히 할당하여  
```/WEB-INF/board/gegtBoardList.jsp```파일을 실행한다.    
  
결국, InternalResourceViewResolver를 등록했을 때는 모든 View 이름에서 확장자 ```.jsp```를 제거해야 한다.  
그리고 확장자가 ```.do```인 요청은 앞에 ```redirect:```을 붙여서 ViewResolver가 동작하지 않도록 해야한다.  
  
상세 정보를 출력하는 GetBoardController 클래스도 View 이름을 getBoard로만 설정하면 된다.    
   
**getBoardController**
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class GetBoardController implements Controller {
	
@Override
public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
	System.out.println("글 상세 조회 처리");
	
	// 1. 검색할 게시글 번호 추출
	String seq = request.getParameter("seq");

	// 2. DB 연동 처리
	BoardVO vo = new BoardVO();
	vo.setSeq(Integer.parseInt(seq));

	BoardDAO boardDAO = new BoardDAO();
	BoardVO board = boardDAO.getBoard(vo);
	
	// 3. 응답 화면 구성
/*
	HttpSession session = request.getSession();
	session.setAttribute("board", board);
	return "getBoard";
*/
	ModelAndView mav = new ModelAndView();
	mav.addObject("board", board);
	mav.setViewName("getBoard");
	return mav ; 
	}
}
```
InsertBoardController, UpdateBoardController, DeleteBoardController 클래스는  
모두 ```redirect:getBoardList.do```를 View 이름으로 설정하면 된다.           
  
**InsertBoardController**
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
   
**UpdateBoardController**   
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class UpdateBoardController implements Controller{
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
	
		System.out.println("글 수정 처리");
		// 1. 사용자 입력 정보 추출 
		
		// request.setCharacterEncoding("UTF-8");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String seq = request.getParameter("seq");
		
		
		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setTitle(title);
		vo.setContent(content);
		vo.setSeq(Integer.parseInt(seq));
		
		BoardDAO boardDAO = new BoardDAO();
		boardDAO.updateBoard(vo);
		
		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:getBoardList.do");
		return mav;
	}
}
```
   
**DeleteBoardController**   
```
package com.springbook.view.board;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class DeleteBoardController implements Controller {
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("글 삭제 처리");
		
		// 1. 사용자 입력 정보 추출 
		//request.setCharacterEncoding("UTF-8");
		String seq = request.getParameter("seq");
		
		
		// 2. DB 연동 처리
		BoardVO vo = new BoardVO();
		vo.setSeq(Integer.parseInt(seq));
		
		BoardDAO boardDAO = new BoardDAO();
		boardDAO.deleteBoard(vo);
		
		// 3. 화면 네비게이션
		ModelAndView mav = new ModelAndView();
		mav.setViewName("redirect:getBoardList.do");
		return mav;
	}
}
```
마지막으로 LogoutController는 로그아웃 처리 후에 로그인 화면으로 이동할 수 있도록 login.jsp 화면으로 넘기면 된다.   
**LogoutController**
```
package com.springbook.view.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;


public class LogoutController implements Controller{

@Override
public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
	System.out.println("로그아웃 처리");
	// 1. 브라우저와 연결된 세션 객체를 강제 종료한다.  
	HttpSession session = request.getSession();
	session.invalidate();

	// 2. 세션 종료 후, 메인 화면으로 이동한다.   
	ModelAndView mav = new ModelAndView();
	mav.setViewName("redirect:login.jsp");
	return mav;
	}
}
```
