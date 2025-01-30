08 스프링 AOP
=======================
비즈니스 컴포넌트 개발에서 가장 중요한 두가지 원칙은  
1. 낮은 결합도 (IoC)
2. 높은 응집도 (AOP)
를 유지하는 것이다.      
      
스프링의 **의존성 주입 IoC**을 이용하면     
비즈니스 컴포넌트가 구성하는 객체들의 결합도를 떨어뜨릴 수 있어서 의존 관계를 쉽게 변경할 수 있다.        
      
# 1. AOP 이해하기
엔터프라이즈 애플리케이션의 메소드들은 대부분 복잡한 코드들로 구성되어 있다.  
이 중에서 **핵심 비즈니스 로직은 몇 줄 안되고**  
주로 **로깅이나 예외, 트랜잭션 처리 같은 부가적인 코드가 대부분이다.**   
이런 부가적인 코드들로 인해서 비즈니스 메소드의 복잡도는 증가하고 결국 개발자를 지치게 한다.   
  
그렇다고 이러한 코드들을 삭제하거나 소홀히 해서는 절대 안 된다.     
중요한 점은 **비즈니스 메소드마다 이런 부가적인 코드들을 매번 반복해야 한다는 것이다.**   
**AOP는 이러한 부가적인 공통 코드들을 효율적으로 관리하는데 주목한다.**   
   
**AOP**를 이해하는데 가장 중요한 핵심 개념이 바로 **관심분리**이다.     
* 횡단 관심 : AOP에서 메소드마다 공통으로 등장하는 로깅이나 예외, 트랜잭션 처리 같은 코드들      
* 핵심 관심 : 사용자의 요청에 따라 실제로 수행되는 핵심 비즈니스 로직      
  
만약 이 두 관심을 완벽하게 분리할 수 있다면,  
구현하는 메소드에는 실제 비즈니스 로직만으로 구성할 수 있으므로 더욱 간결하고 응집도 높은 코드를 유지할 수 있다.     
하지만 기존의 OOP 언어에서는 횡단 관심에 해당하는 공통 코드를 완벽하게 독립적인 모듈로 분리해내기가 어렵다.         
     
**LogAdvice**
```
package com.springbook.biz.common;

public class LogAdvice {

	public void printLog() {
		System.out.println("[공통 로그] 비즈니스 로직 수행 전 동작");
	}
}
```
**BoardService**
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springbook.biz.BoardVO;
import com.springbook.biz.common.LogAdvice;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	@Autowired
	private BoardDAO boardDAO;
	private LogAdvice log;
	
	public BoardServiceImpl() {
		log = new LogAdvice();
	}
	
	@Override
	public void insertBoard(BoardVO vo) {
		log.printLog();
		boardDAO.insertBoard(vo);
	}

	@Override
	public void updateBoard(BoardVO vo) {
		log.printLog();
		boardDAO.updateBoard(vo);
	}

	@Override
	public void deleteBoard(BoardVO vo) {
		log.printLog();
		boardDAO.deleteBoard(vo);
	}

	@Override
	public BoardVO getBoard(BoardVO vo) {
		log.printLog();
		return boardDAO.getBoard(vo);
	}

	@Override
	public List<BoardVO> getBoardList(BoardVO vo) {
		log.printLog();
		return boardDAO.getBoardList(vo);
	}
}
```
BoardServiceImpl 객체가 생성될 때, 생성자에서 LogAdvice 객체도 같이 생성한다.  
그리고 각 비즈니스 메소드에서 비즈니스 로직을 수행하기 전에  
LogAdvice의 printLog()메소드를 호출하기만 하면 된다.  
이후에 공통 기능을 수정할 때는 LogAdvice 클래스의 printLog() 메소드만 수정하면 되므로 관리가 편해졌다고 할 수 있다.   
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@69222c14: startup date [Sat Nov 02 14:36:51 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
===> JDBC로 getUser() 기능 처리
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@69222c14: startup date [Sat Nov 02 14:36:51 KST 2019]; root of context hierarchy
```
그러나 이렇게 작성된 프로그램은 BoardServiceImpl 클래스와 LogAdvice 객체가 소스코드에서 강하게 결합되어 있어서, 
LogAdvice 클래스를 **다른 클래스로 변경해야 하거나**      
공통 기능에 해당하는 printLog() 메소드의 **시그니처(식별자)가 변경되는 상황에서는 유연하게 대처할 수 없다.**      
   
**가정**  
기존의 LogAdvice 클래스의 성능이 떨어져서 이를 대체할 ```Log4jAdvice```클래스를 생성한다.    
메소드의 이름도 printLogging()으로 변경한다.       
  
**Log4jAdvice**  
```
package com.springbook.biz.common;

public class Log4jAdvice {
	public void printLogging() {
		System.out.println("[공통 로그-Log4j] 비즈니스 로직 수행 전 동작");
	}
}
```
**BoardService**
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springbook.biz.BoardVO;
import com.springbook.biz.common.Log4jAdvice;
import com.springbook.biz.common.LogAdvice;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	@Autowired
	private BoardDAO boardDAO;
	private Log4jAdvice log;
	
	public BoardServiceImpl() {
		log = new Log4jAdvice();
	}
	
	@Override
	public void insertBoard(BoardVO vo) {
		log.printLogging();
		boardDAO.insertBoard(vo);
	}

	@Override
	public void updateBoard(BoardVO vo) {
		log.printLogging();
		boardDAO.updateBoard(vo);
	}

	@Override
	public void deleteBoard(BoardVO vo) {
		log.printLogging();
		boardDAO.deleteBoard(vo);
	}

	@Override
	public BoardVO getBoard(BoardVO vo) {
		log.printLogging();
		return boardDAO.getBoard(vo);
	}

	@Override
	public List<BoardVO> getBoardList(BoardVO vo) {
		log.printLogging();
		return boardDAO.getBoardList(vo);
	}
}
```
결국 Advice 클래스가 LogAdvice 에서 Log4jAdvice로 바뀌는 순간 BoardServiceImpl 클래스의 생성자를 수정하고,  
그리고 printLog()가 printLogging() 메소드로 변경되었으므로 printLog()를 호출했던 모든 메소드를 수정해야 한다.  
  
정리하자면, OOP처럼 모듈화가 뛰어난 언어를 사용하여 개발하더라도    
공통 모듈에 해당하는 Advice 클래스 객체를 생성하고 공통 메소드를 호출하는 코드가 비즈니스 메소드에 있다면  
핵심 관심과 횡단 관심을 완벽하게 분리할 수는 없다.    
하지만 스프링의 AOP는 이런 OOP의 한계를 극복할 수 있도록 도와준다.  
   
***
# 2. AOP 시작하기  
## 2.1. 비즈니스 클래스 수정  
**BoardServiceImpl 클래스를 원래의 상태로 되돌린다.**   
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springbook.biz.BoardVO;
import com.springbook.biz.common.Log4jAdvice;
import com.springbook.biz.common.LogAdvice;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	@Autowired
	private BoardDAO boardDAO;

	@Override
	public void insertBoard(BoardVO vo) {
		boardDAO.insertBoard(vo);
	}

	@Override
	public void updateBoard(BoardVO vo) {
		boardDAO.updateBoard(vo);
	}

	@Override
	public void deleteBoard(BoardVO vo) {
		boardDAO.deleteBoard(vo);
	}

	@Override
	public BoardVO getBoard(BoardVO vo) {
		return boardDAO.getBoard(vo);
	}

	@Override
	public List<BoardVO> getBoardList(BoardVO vo) {
		return boardDAO.getBoardList(vo);
	}

}
```
이제 BoardServiceImpl 클래스는    
**LogAdvice 나 Log4jADvice와는 아무런 상관이 없는 클래스가 되었다.**   
## 2.2. AOP 라이브러리 추가    
본격적으로 AOP를 적용하기 위해서   
우선 BoardWeb 프로젝트에 있는 pom.xml 파일을 수정하여 AOP 관련 라이브러리를 추가한다.   
```
		<!-- AOP 관련 라이브러리 AspectJ -->
		<dependency>
			<groupId>org.aspectj</groupId>
			<artifactId>aspectjrt</artifactId>
			<version>${org.aspect-version}</version>
		</dependency>
		<dependency>
			<groupId>org.aspectj</groupId>
			<artifactId>aspectjweaver</artifactId>
			<version>1.8.8</version>
		</dependency>
```
## 2.3. 네임스페이스 추가 및 AOP 설정
AOP 설정을 추가하려면 AOP에서 제공하는 엘리먼트들을 사용해야 한다.  
따라서 스프링 설정 파일 applicationContext.xml 에서 ```[NameSpeace]``` 탭을 클릭하고  
**aop 네임스페이스를 추가한다.**  
  
그리고 아래 코드와 같이 작성을 해주자  
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.2.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.2.xsd">

	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	
	<bean id="log" class="com.springbook.biz.common.LogAdvice"></bean>
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.*(..))" id="allPointcut"/>
		
		<aop:aspect ref="log">
			<aop:before pointcut-ref="allPointcut" method="printLog"/>
		</aop:aspect>
	</aop:config>

</beans>
```   
무슨 말인지 아직 모르지만 일단 작성하고 차근히 알아보자   
## 2.4. 테스트 및 결과 확인   
이제 BoardServiceClient 프로그램을 실행하여 insertBoard()와 getBoardList() 메소드가 호출될 때     
LogAdvice 클래스의 pringLog() 메소드가 실행되는지 확인하면 된다.     
  
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sat Nov 02 16:47:23 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[공통 로그] 비즈니스 로직 수행 전 동작
===> JDBC로 insertBoard() 기능 처리
[공통 로그] 비즈니스 로직 수행 전 동작
===> JDBC로 getBoardList()기능 처리
---> BoardVO [seq=3, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=2, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-01, cnt=0]
---> BoardVO [seq=1, title=가입인사, writer=관리자, content=잘 부탁드립니다..., regDate=2019-10-27, cnt=0]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sat Nov 02 16:47:23 KST 2019]; root of context hierarchy
``` 
만약 LogAdvice를 Log4JAdvice로 교체하고 싶으면 어떻게 하면 될까?  
당연히 BoardServiceImpl은 수정하지 않는다.  
다만, 스프링 설정 파일의 AOP 설정만 다음과 같이 수정하면 끝난다.  
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.2.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.2.xsd">

	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	
	<bean id="log" class="com.springbook.biz.common.Log4jAdvice"></bean> <!-- 여기 수정 -->
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.*(..))" id="allPointcut"/>
		
		<aop:aspect ref="log">
			<aop:before pointcut-ref="allPointcut" method="printLogging"/> <!-- 여기 수정 -->
		</aop:aspect>
	</aop:config>

</beans>
```
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sat Nov 02 16:50:25 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[공통 로그-Log4j] 비즈니스 로직 수행 전 동작
===> JDBC로 insertBoard() 기능 처리
[공통 로그-Log4j] 비즈니스 로직 수행 전 동작
===> JDBC로 getBoardList()기능 처리
---> BoardVO [seq=4, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=3, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=2, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-01, cnt=0]
---> BoardVO [seq=1, title=가입인사, writer=관리자, content=잘 부탁드립니다..., regDate=2019-10-27, cnt=0]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sat Nov 02 16:50:25 KST 2019]; root of context hierarchy
```
스프링의 AOP는 클라이언트가 핵심 관심에 해당하는 비즈니스 메소드를 호출할 때,     
횡단 관심에 해당하는 메소드를 적절하게 실행해준다.     
이때, 핵심 관심 메소드와 횡단 관심 메소드 사이에서 소스상의 결합은 발생하지 않으며,    
이것이 우리가 AOP를 사용하는 주된 목적이다.  

