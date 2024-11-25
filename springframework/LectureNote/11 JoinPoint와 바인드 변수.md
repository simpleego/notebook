11 JoinPoint와 바인드 변수
=======================
횡단 관심에 해당하는 어드바이스 메소드를 의미 있게 구현하려면      
클라이언트가 호출한 비즈니스 메소드의 정보가 필요하다.(알아야 xml에 기술하여 정의할 수 있으므로)      
        
스프링에서는 이런 다양한 정보들을 이용할 수 있도록 JoinPoint 인터페이스를 제공한다.       
          
# 1. JoinPoint 인터페이스의 메소드
```
Signature getSignature() : 클라이언트가 호출한 메소드의 시그니처 정보가 저장된 Signature 객체 리턴  
Object getTarget() : 클라이언트가 호출한 비즈니스 메소드를 포함하는 비즈니스 객체 리턴
Object[] getArgs() : 클라이언트가 메소드를 호출할 때 넘겨준 인자 목록을 Object 배열로 리턴  
```
이전 챕터에서 Around 어드바이스 메소드를 구현할 때  
사용했던 PoroceedingJoinPoint 인터페이스는 JoinPoint를 상속했다.(인터페이스간의 상속)   
따라서 PoroceedingJoinPoint 인터페이스는 JoinPoint가 가진 메소드를 지원하며,   
proceed() 메소드를 추가해서 사용했다.(기존에 가로챈 메소드{이벤트 동작 원인 메소드})      
    
**여기서 주의할 점은 Before, After Returning, After Throwing, After 어드바이스에서는 JoinPoint를 사용해야 하고,**   
유일하게 Around 어드바이스에서만 ProceedingJoinPoint를 매개변수로 사용해야 한다.  
이는 Around 어드바이스에서만 proceed()메소드가 필요하기 때문이다.(가로 챈 메소드를 호출)   

getSignature() 메소드가 리턴하는 Signature 객체를 이용하면, 호출되는 메소드에 대한 다양한 정보를 얻을 수 있다.   
```
String getName() : 클라이언트가 호출한 메소드 이름 리턴
String toLongString() : 클라이언트가 호출한 메소드의 리턴타입, 이름, 매개변수를 패키지 경로까지 포함하여 리턴 
String toShortString() : 클라이언트가 호출한 메소드 시그니처를 축약한 문자열로 리턴  
```
   
JoinPoint 객체를 사용하려면 단지 **어드바이스 메소드 매개변수로 JoinPoint 매개변수를 선언하면 된다.**       
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;

public class LogAdvice {

	public void printLog(JoinPoint jp) {
		System.out.println("[공통 로그] 비즈니스 로직 수행 전 동작");
	}
}
```
참고로 위의 예시는 JoinPoint 객체를 사용하는 곳은 빈으로 등록된 객체이다.      
         
**JoinPoint는 어드바이스의 종류(5가지)에 따라 사용 방법이 다소 다르다.**   
그렇기에 앞으로 각 어드바이스마다 사용 방법에 대해서 배워보자   
   
***
# 2. Before 어드바이스
**Before 어드바이스는 비즈니스 메소드가 실행되기 전에 동작할 로직을 구현한다.**  
따라서 호출된 메소드 시그니처만 알 수 있으면 다양한 사전 처리 로직을 구현할 수 있다.     
   
**BeforeAdvice**
```
// 어드바이스 클래스 정의
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;

public class BeforeAdvice {
	public void beforeLog(JoinPoint jp) {
		String method = jp.getSignature().getName();
		Object[] args = jp.getArgs();
		
		System.out.println("[사전 처리]" + method + "() 메소드 ARGS 정보 : "+ args[0].toString());
	}
}
```
JoinPoint 객체의 getSignature() 메소드를 이용하면, 클라이언트가 호출한 메소드 이름을 출력할 수 있다.    
그리고 getArgs() 메소드를 통해 인자 목록을 Object 배열로 얻어낼 수 있어서 메소드 호출에 어떤 값들을 사용했는지도 알 수 있다.      
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Wed Nov 06 19:28:36 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[BEFORE]: 비즈니스 메소드 수행 전에 처리할 내용...
[사전 처리]getUser() 메소드 ARGS 정보 : UserVO [id=test, password=test123, name=null, rolenull]
===> JDBC로 getUser() 기능 처리
[AFTER]: 비즈니스 메소드 수행 후에 처리할 내용...
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Wed Nov 06 19:28:36 KST 2019]; root of context hierarchy
```
UserVO 객체가 인자로 전달 되었고 UserVO 객체에 설정된 정보도 확인할 수 있었다.      
   
***
# 3. AfterReturning 어드바이스 
AfterReturning은 비즈니스 메소드가 수행되고 나서, 결과 데이터를 리턴할 때 동작하는 어드바이스이다.       
**따라서 어떤 메소드가 어떤 값을 리턴했는지를 알아야 사후 처리 기능을 다양하게 구현할 수 있다.**       
  
기존에 작성했던 AfterReturningAdvice를 비즈니스 메소드가 리턴한 값을 이용하여 동작하도록 수정한다.  
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;

import com.springbook.biz.user.UserVO;

public class AfterReturningAdvice {
	public void afterReturningLog(JoinPoint jp, Object returnObj) {
		String method = jp.getSignature().getName();
		if(returnObj instanceof UserVO) {
			UserVO user = (UserVO) returnObj;
			if(user.getRole().equals("Admin")) {
				System.out.println(user.getName()+ "로그인(admin)");
			}
		}
		System.out.println("[사후 처리]"+ method + "() 메소드 리턴값 : "+returnObj.toString());
	}
}
```
afterReturningLog() 메소드는 클라이언트가 호출한 비즈니스 메소드 정보를 알아내기 위해서            
JoinPoint 객체를 첫 번째 매개변수로 선언한다.        
그리고 Object 타입의 변수도 두 번째 매개변수로 선언되어 있는데, 이를 '바인드 변수'라고 한다.         
       
바인드 변수는 비즈니스 메소드가 리턴한 결괏값을 바인딩할 목적으로 사용하며,           
어떤 값이 리턴될지 모르기 때문에 Object 타입으로 선언한다.         
      
After Returning 어드바이스 메소드에 JoinPoint만 선언되어 있다면 스프링 설정 파일은 수정하지 않아도 된다.       
하지만 바인드 변수가 추가됐다면 반드시 바인드 변수에 대한 매핑 설정을 스프링 설정 파일에 추가해야 한다.    
   
이때 ```<aop:after-returning>```엘리먼트의 returning 속성을 사용한다.  
```
	<bean id="afterReturning" class="com.springbook.biz.common.AfterReturningAdvice"></bean>
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.*(..))" id="getPointcut"/>
		<aop:aspect ref="afterReturning">
			<aop:after-returning pointcut-ref="getPointcut" method="afterReturningLog" returning="returnObj" />
		</aop:aspect>
	</aop:config>
```
위의 설정은 비즈니스 메소드가 리턴한 결괏값을 returnObj라는 바인드 변수에 바인드하라는 설정이다.   
AfterReturningAdvice의 afterReturningLog() 메소드는 해당 변수를 Object 객체로 받는다.   

**returning 속성은 ```<aop:after-returning> 엘리먼트에서만 사용할 수 있는 속성이며,```  
속성값은 반드시 어드바이스 메소드 매개변수로 선언된 바인드 변수 이름과 같아야 한다.**   

```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Wed Nov 06 20:14:42 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[BEFORE]: 비즈니스 메소드 수행 전에 처리할 내용...
[사전 처리]getUser() 메소드 ARGS 정보 : UserVO [id=test, password=test123, name=null, rolenull]
===> JDBC로 getUser() 기능 처리
관리자로그인(admin)
[사후 처리]getUser() 메소드 리턴값 : UserVO [id=test, password=test123, name=관리자, roleAdmin]
[AFTER]: 비즈니스 메소드 수행 후에 처리할 내용...
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Wed Nov 06 20:14:42 KST 2019]; root of context hierarchy
```
   
***
# 4. After Throwing 어드바이스  
After Throwing은 비즈니스 메소드가 수행되다가 예외가 발생할 때 동작하는 어드바이스이다.    
**따라서 어떤 메소드에서 어떤 예외가 발생했는지를 알아야 한다.     
그래야 발생한 예외의 종류에 따라 정확한 예외 처리를 구현할 수 있을 것이다.**   
  
기존에 작성했던 AfterThrowingAdvice를 수정하여   
예외가 발생한 메소드 이름과 발생한 예외 객체의 메시지를 출력하도록 수정한다.    
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;

public class AfterThrowingAdvice {
	public void execeptionLog(JoinPoint jp, Exception exceptObj) {
		String method = jp.getSignature().getName();
		System.out.println("[예외 처리]"+ method + "() 메소드 수행 중 발생된 예외 메시지 : " + exceptObj.getMessage());
	}
}
```  
exceptionLog() 메소드는 예외가 발생한 메소드 정보를 알아내기 위해서 JoinPoint 객체를 매개변수로 받는다.                
그리고 After Returning 처럼 비즈니스 메소드에서 발생한 예외 객체를 exceptObj 라는 바인드 변수를 통해 받는다.          
바인드 변수는 모든 예외 객체를 바인드할 수 있도록 예외 클래스의 최상위 타입인 Exception으로 선언한다.      
     
After Throwing 어드바이스 메소드에 JoinPoint만 선언되어 있다면 스프링 설정 파일은 수정하지 않아도 된다.    
하지만 바인드 변수가 추가됐다면 반드시 바인드 변수에 대한 매핑 설정을 스프링 설정 파일에 추가해야 한다.    
이때 ```<aop:after-throwing>```엘리먼트의 throwing 속성을 사용한다.  
```
	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	<bean id="afterThrowing" class="com.springbook.biz.common.AfterThrowingAdvice"></bean>
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.*(..))" id="allPointcut"/>
		<aop:aspect ref="afterThrowing">
			<aop:after-throwing pointcut-ref="allPointcut" method="execeptionLog" throwing="exceptObj"/>
		</aop:aspect>
	</aop:config>
```
위의 설정은 비즈니스 메소드에서 발생한 예외 객체를 exceptObj 라는 바인드 변수에 바인드하라는 설정이다.  
```
<aop:after-throwing pointcut-ref="allPointcut" method="execeptionLog" throwing="exceptObj"/>
```
에서의 throwing 속성은 ```<aop:after-throwing>```에서만 사용할 수 있는 속성이며     
**속성값은 어드바이스 메소드 매개변수로 선언된 바인드 변수 이름과 같아야 한다.**     
  
예외 발생시 동작하므로 코드를 살짝 수정해주자 
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
		if (vo.getSeq() == 0) {
			throw new IllegalArgumentException("0번 글은 등록할 수 없습니다.");
		}
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
프로그램을 실행하면 AfterThrowingAdvice 객체의  
exceptionLog() 메소드에서 발생한 예외 객체의 메시지를 출력하고 있는 것을 확인할 수 있다.
   
exceptionLog() 메소드를 구현할 때, 발생하는 예외 객체의 종류에 따라 다음처럼 다양하게 예외 처리를 할 수 있다.  
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sat Nov 16 21:48:42 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[예외 처리]insertBoard() 메소드 수행 중 발생된 예외 메시지 : 0번 글은 등록할 수 없습니다.
Exception in thread "main" java.lang.IllegalArgumentException: 0번 글은 등록할 수 없습니다.
	at com.springbook.biz.board.impl.BoardServiceImpl.insertBoard(BoardServiceImpl.java:20)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
	at java.lang.reflect.Method.invoke(Unknown Source)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:302)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.aop.aspectj.AspectJAfterThrowingAdvice.invoke(AspectJAfterThrowingAdvice.java:58)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:208)
	at com.sun.proxy.$Proxy11.insertBoard(Unknown Source)
	at com.springbook.biz.board.impl.BoardServiceClient.main(BoardServiceClient.java:24)

```
