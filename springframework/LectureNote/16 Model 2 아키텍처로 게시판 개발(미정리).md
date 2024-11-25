16 Model 2 아키텍처로 게시판 개발
=======================
# 1. Model 2 아키텍처 구조
시스템의 규모가 크고 기능이 복잡한 엔터프라이즈 시스템을 개발한다면 Model 1 아키텍처는 적합하지 않다.   
Model 1 아키텍처가 엔터프라이즈 시스템에 적합하지 않은 이유는  
자바 로직과 디자인이 통합되어 유지보수가 어렵기 때문이다.   
디자인이 통합되어 있으면, 자바 로직을 찾기도 힘들고 디자인을 변경할 때도 복잡한 자바 코드들로 인해 어려움을 느낀다.  
   
이런 Model 1 아키텍처의 문제를 해결하기 위해 고안된 웹 개발 모델이 Model 2 아키텍처,   
즉 MVC 아키텍처이고 가장 중요한 특징은 Controller의 등장이며, 이 Controller는 서블릿 클래스를 중심으로 구현된다.   
   
[사진]   
  
Model 2 아키텍처에서는 기존에 JSP가 담당했던 Controller 로직이 별도의 Controller 기능의 서블릿으로 옮겨졌다.     
따라서 기존에 Model 1 아키텍처로 개발한 프로그램에서 JSP 파일에 있는 자바 코드만 Controller로 이동하면     
Model 2 아키텍처가 된다. 결과적으로 Controller 로직이 사라진 JSP에는 View와 관련된 디자인만 남게 되어  
디자이너는 JSP 파일을 관리하고, 자바 개발자는 Controller 와 Model 만 관리하면 된다.  

Model 기능은 VO, DAO 클래스로 자바 개발자가 구현하고 관리한다.  
그리고 View 기능은 디자이너가 JSP 파일로 구현하고 관리한다.  
사실 MVC 아키텍처에서 가장 중요한 부분이 바로 Controller인데,  
이 Controller를 성능과 유지보수의 편의성을 고려하여 잘 만드는 것이 무엇보다 중요하다.  

Controller는 자바 개발자들이 직접 구현할 수도 있지만, MVC 프레임워크가 제공하는 Controller를 사용해도 된다.     
우리가 직접 구현하는 것보다는 MVC 프레임워크에서 제공하는 잘 만들어진 Controller를 사용하는 것이 더 효율적이고 안정적이다.  
문제는 프레임워크가 제공하는 Controller 구조가 너무 복잡하고 어렵다는 점이다.    
그러니 우선 우리는 Controller의 기능을 중점으로 두는 것으로 공부를 진행하자.   
   
***
# 2. Controller 구현하기
## 2.1. 서블릿 생성 및 등록
Controller 기능을 수행하는 서블릿 클래스를 하나 추가하여  
기존의 Model 1 기반으로 개발된 게시판 프로그램을 MVC 아키텍처로 변경하자.  
  
Controller에 해당하는 서블릿 클래스를 구현할 때 이클립스의 기능을 이용하면 좀 더 쉽게 작성할 수 있다.  

1. ```src/main/java``` 에서 오른쪽 버튼으로 ```[New]->[Servlet]```을 선택한다.     
2. 'java package'에 'com.springbook.view.controller'를, 'Class name'에 'DispatcherServlet'을 입력하고 ```<Next>```클릭    
3. 'Name'에 'action'으로 입력하고, 'URL mappings'에 '/action'을 더블 클릭하여 Pattern을 '*.do'로 설정한고 ```<Finish>```클릭  
DispatcherServlet 클래스가 만들어지는 순간 web.xml 파일에 서블릿 관련 설정이 자동으로 추가된다.  

**web.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee https://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	version="2.5">
	<servlet>
		<servlet-name>hello</servlet-name>
		<servlet-class>hello.HelloServlet</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>hello</servlet-name>
		<url-pattern>/hello.do</url-pattern>
	</servlet-mapping>

	<servlet>
		<description></description>
		<display-name>action</display-name>
		<servlet-name>action</servlet-name>
		<servlet-class>com.springbook.view.controller.DispatcherServlet</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>action</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>
</web-app>
```
위 설정은 클라이언트의 모든 ```*.do```요청을 DispatcherServlet 클래스의 객체가 처리한다는 설정이다.    
확장자 '.do'는 얼마든지 다른 이름으로 변경할 수 있다.  

## 2.2. Controller 서블릿 구현  
서블릿 클래스가 만들어질 때 자동으로 추가되는 주석들은 모두 제거하고  
DispatcherServlet 클래스가 Controller 기능을 수행하도록 구현한다.   

**DispatcherServlet**
```
package com.springbook.view.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DispatcherServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DispatcherServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		process(request, response);
	}

	private void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 1. 클라이언트의 요청 path 정보를 추출한다.
		String uri = request.getRequestURI();
		String path = uri.substring(uri.lastIndexOf("/"));
		System.out.println(path);

		// 2. 클라이언트의 요청 path에 따라 적절히 분기처리 한다.
		if (path.equals("/login.do")) {
			System.out.println("로그인 처리");
		} else if (path.equals("/logout.do")) {
			System.out.println("로그아웃 처리");
		} else if (path.equals("/insertBoard.do")) {
			System.out.println("글 등록 처리");
		} else if (path.equals("/updateBoard.do")) {
			System.out.println("글 수정 처리");
		} else if (path.equals("/deleteBoard.do")) {
			System.out.println("글 삭제 처리");
		} else if (path.equals("/getBoard.do")) {
			System.out.println("글 상세 조회 처리");
		} else if (path.equals("/getBoardList.do")) {
			System.out.println("글 목록 검색 처리");
		}
	}
}
```
DispatcherServlet에는 GET 방식 요청을 처리하는 doGet() 메소드와    
POST 방식 요청을 처리하는 doPost() 메소드가 재정의되어 있다.    
하지만 어떤 방식으로 요청하든 process() 메소드를 통해 클라이언트의 요청을 처리한다.  

POST 방식의 요청에 대해서 doPost() 메소드가 호출되는데, 이때 한글이 깨지지 않도록 인코딩 처리를 추가한다.   
이제 글 등록, 글 수정 작업에서 한글 데이터가 깨지는 일은 발생하지 않는다.   
  
그리고 무엇보다 인코딩 작업을 DispatcherServlet 클래스에서 일괄 처리하므로 인코딩을 변경할 때는  
DispatcherServlet 클래스만 수정하면 된다.  

DispatcherServlet에서 가장 중요한 process() 메소드에서는 가장 먼저 클라이언트의 요청 URI로부터 path 정보를 추출하고 있는데,  
이때 추출된 path는 URI 문자열에서 마지막 ```/xxx.do```문자열이다.   
그리고 추출된 path 문자열에 따라서 복잡한 분기 처리 로직이 실행된다.   
   
이제 작성된 DispatcherServlet을 저장하고 서버를 재구동한 다음,  
브라우저의 URL 검색 창에 다음의 URL을 차례로 요청해보자 .  
```
http://localhost:8080/BoardWeb/login.do
http://localhost:8080/BoardWeb/logout.do
http://localhost:8080/BoardWeb/insertBoard.do
http://localhost:8080/BoardWeb/updateBoard.do
http://localhost:8080/BoardWeb/deleteBoard.do
http://localhost:8080/BoardWeb/getBoard.do
http://localhost:8080/BoardWeb/getBoardList.do
```
**결과**
```
/login.do
로그인 처리
/logout.do
로그아웃 처리
/insertBoard.do
글 등록 처리
/updateBoard.do
글 수정 처리
/deleteBoard.do
글 삭제 처리
/getBoard.do
글 상세 조회 처리
/getBoardList.do
글 목록 검색 처리
```
  
***
# 3. 로그인 기능 구현하기  
로그인 기능을 MVC로 변환하려면 login.jsp 파일의 ```<form>```엘리먼트의 action 속성값을 login.do로 수정한다.   
```*.do```형태의 요청에 대해서만 DispatcherServlet이 동작하기 때문이다.   
**login.jsp**
```
~ 생략 ~
<form action="login.do" method="post">
<table border="1" cellpadding="0" cellspacing="0">
	<tr>
		<td bgcolor="orange">아이디</td>
		<td><input type="text" name="id"></td>
	</tr>
~ 생략 ~	
```
그리고 login_proc.jsp 파일에 있는 모든 자바 로직을 복사하여 DistPatcherServlet에 추가한다.   
이때 요청 path가 ```/login.do```일 때 실행되는 영역에 소스를 복사하면 된다.   

**DistpatcherServlet**
```
~ 생략 ~
	private void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 1. 클라이언트의 요청 path 정보를 추출한다.
		String uri = request.getRequestURI();
		String path = uri.substring(uri.lastIndexOf("/"));
		System.out.println(path);

		// 2. 클라이언트의 요청 path에 따라 적절히 분기처리 한다.
		if (path.equals("/login.do")) {
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
			if(user != null){
				response.sendRedirect("getBoardList.jsp");
			} else {
				response.sendRedirect("login.jsp");
			}
			
		} else if (path.equals("/logout.do")) {
			System.out.println("로그아웃 처리");
		} else if (path.equals("/insertBoard.do")) {
			System.out.println("글 등록 처리");
		} else if (path.equals("/updateBoard.do")) {
			System.out.println("글 수정 처리");
		} else if (path.equals("/deleteBoard.do")) {
			System.out.println("글 삭제 처리");
		} else if (path.equals("/getBoard.do")) {
			System.out.println("글 상세 조회 처리");
		} else if (path.equals("/getBoardList.do")) {
			System.out.println("글 목록 검색 처리");
		}
	}
}
```
login_proc.jsp 파일에서 자바 코드를 가져오고 추가로 작성할 코드는 없다.   
다만 클래스에대한 import 선언을 추가해주자 (```<ctrl>+<shift>+<O>``` 단축키를 사용해도 좋다)     
     
로그인 기능을 구현했으니 login.jsp 파일을 실행하여 로그인에 성공했을 때 글 목록 화면이 실행되는지 확인한다.  
  
***
# 4. 글 목록 검색 기능 구현하기   
MVC 구조로 변형하는 데 가장 중요한 기능이 바로 글 목록 검색 기능이다.  
우선 기존에 목록 화면을 처리했던 getBoardList.jsp 파일에서    
Controller 로직에 해당하는 자바 코드를 DispatcherServlet으로 복사한다.   
이때 요청 path가 ```/getBoardList.do```일 때 실행되는 영역에 소스를 복사하면 된다.   

**DistpatcherServlet**
```
~ 생략 ~

		} else if (path.equals("/logout.do")) {
			System.out.println("로그아웃 처리");
		} else if (path.equals("/insertBoard.do")) {
			System.out.println("글 등록 처리");
		} else if (path.equals("/updateBoard.do")) {
			System.out.println("글 수정 처리");
		} else if (path.equals("/deleteBoard.do")) {
			System.out.println("글 삭제 처리");
		} else if (path.equals("/getBoard.do")) {
			System.out.println("글 상세 조회 처리");
		} else if (path.equals("/getBoardList.do")) {
			System.out.println("글 목록 검색 처리");
			// 1. 사용자 입력 정보 추출(검색 기능은 나중에 구현)
			// 2. DB 연동처리
			BoardVO vo = new BoardVO();
			BoardDAO boardDAO = new BoardDAO();
			List<BoardVO> boardList = boardDAO.getBoardList(vo);
			
			// 3. 검색 결과를 세션에 저장하고 목록 화면으로 이동한다.  
			HttpSession session = request.getSession();
			session.setAttribute("boardList", boardList);
			response.sendRedirect("getBoardList.jsp");
		}
	}
}
```
위 소스는 리다이렉트되는 getBoardList.jsp 화면에서 검색 결과를 출력하기 위해 세션 객체를 사용했다.   
사실 검색 결과를 JSP에 공유하기 위해 세션에 저장하는 것은 문제가 있다.   
세션은 브라우저당 서버 메모리에 하나씩 유지되는 객체이므로 사용자가 많을수록 많은 세션이 생성되고,  
세션에 정보가 많이 저장될수록 서버 입장에서는 부담스러울 수밖에 없다.      
      
따라서 검색 결과는 세션이 아닌 HttpServletRequest 객체에 저장하여 공유해야 한다.   
HttpServletRequest 객체는 클라리언트가 서버에 요청을 전송할 때마다    
매번 새롭게 생성되며, 응답 메시지가 브라우저에 전송되면 바로 삭제되는 1회성 객체이므로  
공유할 데이터를 HttpServletRequest에 저장하면 서버에는 전혀 부담되지 않는다.  

하지만 우선 코드의 간결함을 유지하기 위해서 세션을 사용했으니 이를 이해바란다.(나중에 바꿀 예정)   
이제 getBoardList.jsp 파일은 글 목록을 검색하는 자바 코드 대신에 세션에 저장된 글 목록을 꺼내서 출력하도록 수정해야 한다.   

**getBoardList.jsp**
```
<%@page import="java.util.List"%>
<%@page import="com.springbook.biz.board.impl.BoardDAO"%>
<%@page import="com.springbook.biz.BoardVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
	List<BoardVO> boardList = (List)session.getAttribute("boardList");
%>

~ 생략 ~
```
getBoardList.jsp 파일은 이제 직접 DB 연동을 처리하지 않는다.   
getBoardList.jsp 파일에 있었던 자바 코드는 Controller인 DispatcherServlet 클래스로 이동했으며,  
getBoardList.jsp는 단지 세션에 저장된 글 목록을 꺼내서 출력하는 기능만 제공할 뿐이다.  
따라서 브라우저에서 getBoardList.jsp 파일을 직접 요청하거나  
login.jsp 파일을 실행하여 로그인에 성공하면 오류 화면이 출력된다.   

검색 결과를 세션에 저장해야 하므로 반드시 브라우저는 ```/getBoardList.do```로 요청해야 한다.  
브라우저에서 ```getBoardList.do```요청을 했을 때 실행되는 순서를 그림으로 살펴보면 이해가 쉬울 것이다.   
   
![KakaoTalk_20191126_202017183](https://user-images.githubusercontent.com/50267433/69625626-54a74100-108a-11ea-9ba4-bbb6835ca50a.jpg)   
  
따라서 글 목록 화면을 출력하려면 getBoardList.jsp 파일을 직접 요청하지 않고 getBoardLsit.do를 요청해야한다.    
그리고 로그인에 성공했을 때도 글 목록을 정상으로 출력하려면 getbBoardLsit.jsp가 아니라  
```/getBoardLsit.do```로 리다이렉트 해야한다.    

**DispatcherServlet**
```
	private void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 1. 클라이언트의 요청 path 정보를 추출한다.
		String uri = request.getRequestURI();
		String path = uri.substring(uri.lastIndexOf("/"));
		System.out.println(path);

		// 2. 클라이언트의 요청 path에 따라 적절히 분기처리 한다.
		if (path.equals("/login.do")) {
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
			if(user != null){
				response.sendRedirect("getBoardList.do");
			} else {
				response.sendRedirect("login.jsp");
			}
			
		} else if (path.equals("/logout.do")) {
			System.out.println("로그아웃 처리");
		} else if (path.equals("/insertBoard.do")) {
			System.out.println("글 등록 처리");
		} else if (path.equals("/updateBoard.do")) {
			System.out.println("글 수정 처리");
		} else if (path.equals("/deleteBoard.do")) {
			System.out.println("글 삭제 처리");
		} else if (path.equals("/getBoard.do")) {
			System.out.println("글 상세 조회 처리");
		} else if (path.equals("/getBoardList.do")) {
			System.out.println("글 목록 검색 처리");
			// 1. 사용자 입력 정보 추출(검색 기능은 나중에 구현)
			// 2. DB 연동처리
			BoardVO vo = new BoardVO();
			BoardDAO boardDAO = new BoardDAO();
			List<BoardVO> boardList = boardDAO.getBoardList(vo);
			
			// 3. 검색 결과를 세션에 저장하고 목록 화면으로 이동한다.  
			HttpSession session = request.getSession();
			session.setAttribute("boardList", boardList);
			response.sendRedirect("getBoardList.jsp");
		}

	}
```
     
***
# 5. 글 상세 보기 기능 구현하기  
글 목록 화면에서 게시글 제목을 클릭하면 글 상세 화면이 출력됐었다.  
이제는 상세 화면도 MVC 아키텍처로 변환해보자.  
먼저 getBoardList.jsp 파일을 열어서 게시글 제목에 설정된 하이퍼링크를 수정한다.     
   
**getBoardList.jsp**
```
~ 생략 ~
			<%
				for(BoardVO board : boardList){
			%>
			<tr>
				<td><%= board.getSeq() %></td>
				<td align="left"><a
					href="getBoard.do?seq=<%= board.getSeq() %>"> <%=board.getTitle() %></a></td>
				<td><%= board.getWriter() %></td>
				<td><%= board.getRegDate() %></td>
				<td><%= board.getCnt() %></td>
			</tr>
			<%		
				}
			%>
		</table>
		<br> <a href="insertBoard.jsp">새글 등록</a>
	</center>
</body>
</html>
```
기존에는 getBoard.jsp 파일로 바로 링크를 걸었다면  
이제는 게시글의 상세 정보를 검색할 수 있도록 getBoard.do 링크를 수정해야한다.  
  
getBoard.jsp 파일에 있던 자바 코드를 DistpatcherServlet 클래스에 ```/getBoard.do```분기 처리 부분에 복사한다.  
    
**DispatcherServlet**
```
~ 생략 ~
		} else if (path.equals("/getBoard.do")) {
			System.out.println("글 상세 조회 처리");
			
			// 1. 검색할 게시글 번호 추출
			String seq = request.getParameter("seq");

			// 2. DB 연동 처리
			BoardVO vo = new BoardVO();
			vo.setSeq(Integer.parseInt(seq));

			BoardDAO boardDAO = new BoardDAO();
			BoardVO board = boardDAO.getBoard(vo);
			
			// 3. 응답 화면 구성
			HttpSession session = request.getSession();
			session.setAttribute("board", board);
			response.sendRedirect("getBoard.jsp");
			
		} 
~ 생략 ~		
```
글 상세 조회는 글 목록 검색 기능과 비슷하다.  
따라서 검색 결과를 getBoard.jsp 파일에 공유하기 위해서  
세션에 저장하고 getBoard.jsp 파일을 리다이렉트한다.   
   
이제 세션에 저장된 검색 결과를 getBoard.jsp 파일에서 출력한다.  

**getBoard.jsp**
```
<%@page import="com.springbook.biz.board.impl.BoardDAO"%>
<%@page import="com.springbook.biz.BoardVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
	BoardVO board = (BoardVO)session.getAttribute("board");
%>

~ 생략 ~ 
```  
   
***
# 6. 글 등록 기능 구현하기    
글 등록 기능을 MVC로 변환하려면 가장 먼저 insertBoard.jsp 파일을 수정한다.        
```<form>```엘리먼트의 action 속성값을 ```insertBoard.do```로 수정한다.     

**insertBoard.jsp**
```
~ 생략 ~

		<h1>글 등록</h1>
		<a href="logout_proc.jsp">Log-out</a>
		<hr>
		<form action="insertBoard.do" method="post">
			<table border="1" cellpadding="0" cellspacing="0">
				<tr>
					<td bgcolor="orange" width="70">제목</td>
					<td align="left"><input name="title" type="text" /></td>
				</tr>
~ 생략 ~
```
그리고 insertBoard_proc.jsp 파일에 있던 자바 코드를 복사하여 DispatcherServlet 클래스의  
```insertBoard.do``` 분기 처리 부분으로 이동한다.  

**DispatcherServlet**
```
~ 생략 ~ 
		} else if (path.equals("/insertBoard.do")) {
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
			response.sendRedirect("getBoardList.do");
~ 생략 ~
```
여기에서 주의할 점은 등록 작업이 성공하면 반드시 getBoardList.do 를 다시 요청해야 한다는 것이다.      
만약 등록 작업이 성공한 상태에서 getBoardList.jsp 화면으로 이동하면 getBoardList.jsp는 등록 전,      
세션에 저장된 글 목록을 또다시 출력할 것이다.  (do 로 다시 Dispatcher 처리를 해주어야한다.)     
     
따라서 등록, 수정, 삭제, 작업 이후에는 반드시 getBoardList.do 를 다시 요청해서 세션에 저장된 글 목록을 갱신해야한다.     
그리고 한글 인코딩과 관련된 자바 코드는 주석 처리하거나 삭제해도 된다.     
왜냐하면 DispatcherServlet의 doPost() 메소드가 일괄적으로 한글 인코딩을 처리해주기 때문이다.        
이는 수정 기능과 검색 기능 모두에 해당한다.      
   
***
# 7. 글 수정 기능 구현하기  
글 수정 기능을 MVC로 변환하려면 getBoard.jsp 파일에서    
```<form>``` 태그의 action 속성값을 updateBoard.do로 수정하여 구현한다.    

**getBoard.jsp**
```
~ 생략 ~
		<h1>글 상세</h1>
		<a href="logout_proc.jsp">Log-out</a>
		<hr>
		<form action="updateBoard.do" method="post">
			<input name="seq" type="hidden" value="<%= board.getSeq() %>" />
			<table border="1" cellpadding="0" cellspacing="0">
				<tr>
					<td bgcolor="orange" width="70">제목</td>
					<td align="left"><input name="title" type="text"
						value="<%=board.getTitle()%>" /></td>
				</tr>

~ 생략 ~
```
그리고 updateBoard_proc.jsp 파일에 있던 자바코드를 복사하여     
DispatcherServlet 클래스의 updateBoard.do 분기 처리로 이동한다.    

**DispatcherServlet**
```
~ 생략 ~	
		} else if (path.equals("/updateBoard.do")) {
			System.out.println("글 수정 처리");
			// 1. 사용자 입력 정보 추출 
			
			request.setCharacterEncoding("UTF-8");
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
			response.sendRedirect("getBoardList.do");

~ 생략 ~
```
글 수정 작업이 처리된 후에도 반드시 ```/getBoardList.do```를 리다이렉트하여 세션에 저장된 글 목록을 갱신한다.  
그리고 글 등록과 마찬가지로 한글 인코딩은 DispatcherServlet의 doPost() 메소드에서 처리되므로 주석 처리하거나 삭제한다.  
   
***
# 8. 글 삭제 기능 구현하기  
글 삭제 기능을 MVC로 변환하려면 가장 먼저 getBoard.jsp 파일에서 글 삭제 관련 링크를  
```deleteBoard.do```로 수정한다. 그리고 글 목록 링크도 ```getBoardLsit.do```로 함께 수정한다.  

**getBoard.jsp**
```
~ 생략 ~
		</form>
		<hr>
		<a href="insertBoard.jsp">글 등록</a>&nbsp;&nbsp;&nbsp; 
		<a href="deleteBoard.do?seq=<%= board.getSeq() %>">글 삭제</a> 
		<a href="getBoardList.do">글 목록</a>&nbsp;&nbsp;&nbsp;
	</center>
</body>
</html>
```
그리고 deleteBoard_proc.jsp 파일에 있던 자바 코드를 복사하여 DispatcherServlet 클래스의   
deleteBoard.do 분기 처리 부분으로 이동한다.  

**DispatcherSerlvet**
```
~ 생략 ~
		} else if (path.equals("/deleteBoard.do")) {
			System.out.println("글 삭제 처리");
			// 1. 사용자 입력 정보 추출 
			
			request.setCharacterEncoding("UTF-8");
			String seq = request.getParameter("seq");
			
			
			// 2. DB 연동 처리
			BoardVO vo = new BoardVO();
			vo.setSeq(Integer.parseInt(seq));
			
			BoardDAO boardDAO = new BoardDAO();
			boardDAO.deleteBoard(vo);
			
			// 3. 화면 네비게이션
			response.sendRedirect("getBoardList.do");
		} else if (path.equals("/getBoard.do")) {
~ 생략 ~
```
글 삭제 작업이 처리된 후에도 반드시 getBoardList.do 를 호출하여 세션에 저장된 글 목록을 갱신한다.  
   
***
# 9. 로그아웃 기능 구현하기  
로그아웃 기능을 MVC로 변환하려면 우선 모든 페이지에서 logout_proc.jsp 라는 링크를 모두 logout.do 링크로 수정해야한다.    
```
~ 생략 ~ 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 목록</title>
</head>
<body>
	<center>
		<h1>글 목록</h1>
		<h3>
			테스트님 환영합니다...<a href="logout.do">Log-out</a>
		</h3>
~ 생략 ~ 
```   
이밖에 getBoard.jsp와 insertBoard.jsp 파일에서도 logout_proc.jsp 라는     
링크를 모두 logout.do 링크로 수정하자.   
그리고 로그아웃 처리를 담당했던 logout_proc.jsp 파일의 자바 코드를    
DispatcherServlet 클래스의 logout.do 분기 처리 부분으로 이동한다.       
   
**DispatcherServlet**
```
		} else if (path.equals("/logout.do")) {
			System.out.println("로그아웃 처리");
			// 1. 브라우저와 연결된 세션 객체를 강제 종료한다.  
			HttpSession session = request.getSession();
			session.invalidate();

			// 2. 세션 종료 후, 메인 화면으로 이동한다.   
			response.sendRedirect("login.jsp");
		} else if (path.equals("/insertBoard.do")) {
```
이제 게시판과 관련된 모든 기능이 MVC 구조로 수정되었다.     
그림 3-7은 지금까지 작업한 파일들이 MVC 아키텍처에서 어느 부분에 해당하는지 보여준다.       
     
먼저 Model 기능의 VO,DAO 클래스는 재사용되었고,     
DispatcherServlet이라는 Controller 기능의 서블릿 클래스가 추가되었다.    
가장 큰 변화는 View 기능의 JSP 파일인데, 우선 Controller 기능의 자바 로직을 DispatcherSerlvet 클래스로 이동했다.     
따라서 xxx_proc.jsp 파일들은 모두 삭제해도 된다.    
그리고 getBoard.jsp 와 getBoardList.jsp 파일에서도 Controller 자바 로직은 사라진 상태다.     
즉, MVC 아키텍처를 적용한 결과 JSP에서 Controller 로직에 해당하는 자바 코드는 모두 제거되었다.  
  
물론 여전히 세션에 저장된 데이터를 꺼내는 코드와 for 루프 같은 자바 코드가     
getBoard.jsp 와 getBoardList.jsp 파일에 남아있다.      
하지만 이런 코드를 Controller 로직이라고는 하지 않으므로 큰 의미는 없다.     
그리고 실제로 이런 자바 코드들은 EL 과 JSTL을 이용하면 모두 제거할 수 있다.    
다시 한 번 강조하지만 Controller 로직은 사용자 입력 정보 추출, Model을 이용한 DB 연동처리,    
화면 내비게이션에 해당하는 자바 코드를 의미한다.     
