12 어노테이션 기반 AOP
=======================
XML 기반 설정과 어노테이션 기반 설정을 적절히 혼합하여 사용하면 객체들을 효율적으로 관리할 수 있다.   
   
# 1. 어노테이션 기반 AOP 설정
## 1.1. 어노테이션 사용을 위한 스프링 설정 
AOP를 어노테이션으로 설정하려면 ```<aop:aspectj-autoproxy>```엘리먼트를 선언해야 한다.  
**applicationContext.xml**
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

	<context:component-scan base-package="com.springbook.biz">
  </context:component-scan>
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
</beans>
```
```<aop:aspectj-autoproxy>```를 선언하면 스프링 컨테이너는 AOP 관련 어노테이션들을 인식하고 용도에 맞게 처리해준다.   

AOP 관련 어노테이션들은 어드바이스 클래스에 설정한다.   
그리고 어드바이스 클래스에 선언된 어노테이션들을 스프링 컨테이너가 처리하게 하려면,  
**반드시 어드바이스 객체가 생성되어 있어야 한다.**
   
그렇기에 어드바이스 클래스는 반드시 ```<bean>```이나 ```@Service```를 이용하여 객체를 등록해주어야 한다.     

## 1.2. 포인트컷 설정
어노테이션 설정으로도 포인트컷을 설정할 수 있다.
어노테이션 설정으로 포인트컷을 선언할 때는 ```@Pointcut```을 사용하며,   
하나의 어드바이스 클래스 안에 여러 개의 포인트컷을 선언할 수 있다.  
따라서 여러 포인트컷을 식별하기 위한 식별자가 필요한데, 이때 참조 메소드를 이용한다.   
  
참조 메소드는 메소드 몸체가 비어있는, 즉 구현 로직이 없는 메소드이다.    
따라서 어떤 기능 처리를 목적으로 하지 않고 단순히 포인트컷을 식별하는 이름으로만 사용된다.  
참고로 식별을 한다는 것을 해당 메소드를 기준으로 AOP 순서를 지정하게끔 한다는 것이다.

**LogAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Pointcut;

public class LogAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointcut() {}
	
	@Pointcut("execution(* com.springbook.biz..*Impl.get*(..))")
	public void getPointcut() {}
	
	public void printLog(JoinPoint jp) {
		System.out.println("[공통 로그] 비즈니스 로직 수행 전 동작");
	}
}
```
위 소스는 ```allPointcut()```과 ```getPointcut()``` 메소드 위에   
각각 ```@Pointcut```을 이용하여 두 개의 포인트컷을 선언했다.   
그러면 이후에 이 포인트컷을 참조할 때, ```@Pointcut```이 붙은 참조 메소드를 이용하여 특정 포인트컷을 지정할 수 있다.   


## 1.3. 어드바이스 설정
어드바이스 클래스에는 어드바이스 메소드가 구현되어 있다.(비즈니스 메소드에 따라 동작하는)     
우리는 이 어드바이스 메소드가 언제 동작할지 결정하여 관련된 어노테이션을 메소드위에 설정해주면 된다.      
어드바이스의 동작 시점 어노테이션은 XML 설정과 마찬가지로 5가지가 제공된다.  
   
이때 반드시 어드바이스 메소드가 결합될 포인트컷을 참조해야 한다.  
포인트컷을 참조하는 방법은 어드바이스 어노테이션 뒤에 괄호를 추가하고 포인트컷 참조 메소드를 지정하면 된다.   
   
**LogAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

public class LogAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointCut() {}
	
	@Pointcut("execution(* com.springbook.biz..*Impl.get*(..))")
	public void getPointCut() {}
	
	@Before("allPointcut()")
	public void printLog(JoinPoint jp) {
		System.out.println("[공통 로그] 비즈니스 로직 수행 전 동작");
	}
}
```
위 설정은 ```allPointcut()``` 참조 메소드로 지정한 비즈니스 메소드가 호출될 때,  
어드바이스 메소드인 ```printLog()``` 메소드가 ```Before``` 형태로 동작하도록 설정한 것이다.  
하지만 위 코드도 아직 애스팩트 설정을 안해주었기에 완벽한 코드라고 할 수 없다.(위빙이 안된다.)   

**어드바이스 동작 시점 어노테이션**
```
@Before           : 비즈니스 메소드 실행 전에 동작  
@AfterReturning   : 비즈니스 메소드가 성공적으로 리턴되면 동작
@AfterThrowing    : 비즈니스 메소드 실행 중 예외가 발생하면 동작 
@After            : 비즈니스 메소드가 실행된 후, 무조건 실행
@Around           : 호출 자체를 가로채 비즈니스 메소드 실행 전후에 처리할 로직을 삽입할 수 있음
```

## 1.4. 애스팩트 설정
AOP 설정에서 가장 중요한 애스팩트는 ```@Aspect```를 이용하여 설정한다.    
애스팩트는 용어 정리 시간에 살펴봤듯이 포인트컷과 어드바이스의 결합이다.   
따라서 ```@Aspect```가 설정된 애스팩트 객체에는 반드시 포인트컷과 어드바이스를 결합하는 설정이 있어야 한다.  
   
**LogAdvice**
``` 
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

@Service
@Aspect // Aspect = Pointcut + Advice
public class LogAdvice {
/////////////////////// 포인트 컷 ///////////////////////	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointCut() {}
/////////////////////// 어드바이스 ///////////////////////	
	@Before("allPointcut()")
	public void printLog(JoinPoint jp) {
		System.out.println("[공통 로그] 비즈니스 로직 수행 전 동작");
	}
}
```
```@Aspect```처리를 함으로써 이제 위빙이 처리가 된다.  
   
***
# 2. 어드바이스 동작 시점
## 2.1. Before 어드바이스
Before 어드바이스는 비즈니스 메소드가 실행되기 전에 공통으로 처리할 작업을 위해 사용한다.   
앞에서 작성한 BeforeAdvice 클래스에 관련된 어노테이션을 추가한다.  
     
**BeforeAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

@Service
@Aspect
public class BeforeAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointcut() {}
	
	@Before("allPointcut()")
	public void beforeLog(JoinPoint jp) {
		String method = jp.getSignature().getName();
		Object[] args = jp.getArgs();
		
		System.out.println("[사전 처리]" + method + "() 메소드 ARGS 정보 : "+ args[0].toString());
	}
}
```   
실행에 앞서 LogAdvice의 내용들은 지워주자
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 19:59:20 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[사전 처리]getUser() 메소드 ARGS 정보 : UserVO [id=test, password=test123, name=null, role=null]
===> JDBC로 getUser() 기능 처리
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 19:59:20 KST 2019]; root of context hierarchy
```  

## 2.2. After Returning 어드바이스
After Returning 어드바이스는 비즈니스 메소드가 리턴한 결과 데이터를 다른 용도로 처리할 때 사용한다.      
     
**AfterReturningAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

import com.springbook.biz.user.UserVO;

@Service
@Aspect
public class AfterReturningAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.get*(..))")
	public void allPointcut() {}
	
	@AfterReturning(pointcut="allPointcut()",returning="returnObj")
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
```AfterReturningAdvice```는 기존 XML 방식에서와 마찬가지로 returning 을 이용해서 바인드 변수를 선언해준다.  
바인드 변수는 비즈니스 메소드에서 return 되는 객체를 저장하여 이를 다시 어드바이스 메소드에 넣어준다.    
그리고 실행하기 전에 ```BeforeAdvice```은 주석처리를 진행해주도록 하자    
   
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:06:36 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
===> JDBC로 getUser() 기능 처리
관리자로그인(admin)
[사후 처리]getUser() 메소드 리턴값 : UserVO [id=test, password=test123, name=관리자, role=Admin]
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:06:36 KST 2019]; root of context hierarchy
```

## 2.3. After Throwing 어드바이스
After Throwing 어드바이스는 비즈니스 메소드 실행 도중에 예외가 발생했을 때,      
공통적인 예외처리 로직을 제공할 목적으로 사용하는 어드바이스이다.    
      
**AfterThrowingAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

@Service
@Aspect
public class AfterThrowingAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointcut() {}
	
	@AfterThrowing(pointcut="allPointcut()", throwing="exceptObj")
	public void execeptionLog(JoinPoint jp, Exception exceptObj) {
		String method = jp.getSignature().getName();
		System.out.println(method + "() 메소드 수행 중 예외 발생!");
		
		if(exceptObj instanceof IllegalArgumentException) {
			System.out.println("부적합한 값이 입력되었습니다.");
		} else if(exceptObj instanceof NumberFormatException) {
			System.out.println("숫자 형식의 값이 아닙니다.");
		} else if(exceptObj instanceof Exception) {
			System.out.println("문제가 발생했습니다.");
		}
	}
}
```
```AfterThrowingAdvice```는 기존 XML 방식에서와 마찬가지로 throwing 을 이용해서 바인드 변수를 선언해준다.  
바인드 변수는 비즈니스 메소드에서 예외객체를 저장하여 이를 다시 어드바이스 메소드에 넣어준다.    
그리고 실행하기 전에 ```AfterReturning```은 주석처리를 진행해주도록 하자      
     
그리고 예외 상황을 알아야 하기에 Board 관련 클래스들을 사용할 것이다.    
   
**BoardServiceImpl**
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
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:15:48 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
insertBoard() 메소드 수행 중 예외 발생!
부적합한 값이 입력되었습니다.
Exception in thread "main" java.lang.IllegalArgumentException: 0번 글은 등록할 수 없습니다.
	at com.springbook.biz.board.impl.BoardServiceImpl.insertBoard(BoardServiceImpl.java:25)
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
	at com.sun.proxy.$Proxy14.insertBoard(Unknown Source)
	at com.springbook.biz.board.impl.BoardServiceClient.main(BoardServiceClient.java:24)

```
  
## 2.4. After 어드바이스
```AfterAdvice```는 예외 발생 여부에 상관 없이 무조건 수행되는 어드바이스이다.  

**AfterAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

@Service
@Aspect
public class AfterAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointcut() {}
	
	@After("allPointcut()")
	public void finallyLog() {
		System.out.println("[사후 처리] 비즈니스 로직 수행 후 무조건 동작");
	}
}
```
실행하기 전에 ```AfterThrowing```은 주석처리를 진행해주도록 하자      
   
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:28:06 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[사후 처리] 비즈니스 로직 수행 후 무조건 동작
Exception in thread "main" java.lang.IllegalArgumentException: 0번 글은 등록할 수 없습니다.
	at com.springbook.biz.board.impl.BoardServiceImpl.insertBoard(BoardServiceImpl.java:20)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
	at java.lang.reflect.Method.invoke(Unknown Source)
	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:302)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:190)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:157)
	at org.springframework.aop.aspectj.AspectJAfterAdvice.invoke(AspectJAfterAdvice.java:43)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:92)
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:179)
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:208)
	at com.sun.proxy.$Proxy14.insertBoard(Unknown Source)
	at com.springbook.biz.board.impl.BoardServiceClient.main(BoardServiceClient.java:24)
```
After 어드바이스는 에러가 발생해도 무조건적으로 실행된다. 
      
## 2.5. Around 어드바이스
Around 어드바이스는 하나의 어드바이스로 사전, 사후 처리를 모두 해결하고자 할 때 사용한다.  
   
**AroundAdvice**
```
package com.springbook.biz.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

@Service
@Aspect
public class AroundAdvice {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointcut() {}
	
	@Around("allPointcut()")
	public Object aroundLog(ProceedingJoinPoint pjp) throws Throwable {
		String method = pjp.getSignature().getName();
		
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		
		Object obj = pjp.proceed();
		
		stopWatch.stop();
		System.out.println(method+"() 메소드 수행에 걸린 시간 : "+stopWatch.getTotalTimeMillis()+"(ms)초");
		return obj;
	}
}
```
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:36:18 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
===> JDBC로 getUser() 기능 처리
getUser() 메소드 수행에 걸린 시간 : 152(ms)초
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:36:18 KST 2019]; root of context hierarchy
```

## 2.6. 외부 Pointcut 참조하기  
XML 설정으로 포인트컷을 관리했을 때는 스프링 설정 파일에 포인트컷을 여러개 등록했다.  
하지만 어노테이션 설정으로 변경하고부터는 어드바이스 클래스마다 포인트컷 설정이 포함되면서,  
비슷하거나 같은 포인트컷이 반복 선언되는 문제가 발생한다.  
  
스프링은 이런 문제를 해결하고자 포인트컷을 외부에 독립된 클래스에 따로 설정하도록 한다.  

**PointcutCommon**
```
package com.springbook.biz.common;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

@Aspect
public class PointcutCommon {
	
	@Pointcut("execution(* com.springbook.biz..*Impl.*(..))")
	public void allPointcut() {}
	
	@Pointcut("execution(* com.springbook.biz..*Impl.get*(..))")
	public void getPointcut() {}
}
```
**우리는 이제 Advice 클래스에서 ```@동작어드바이스()```에서 PointcutCommon을 추가한 메소드로 기술해주면 된다.**   

**Before 어드바이스**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

@Service
@Aspect
public class BeforeAdvice {

	@Before("PointcutCommon.allPointcut()")
	public void beforeLog(JoinPoint jp) {
		String method = jp.getSignature().getName();
		Object[] args = jp.getArgs();
		
		System.out.println("[사전 처리]" + method + "() 메소드 ARGS 정보 : "+ args[0].toString());
	}
}
```
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:49:05 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
[사전 처리]getUser() 메소드 ARGS 정보 : UserVO [id=test, password=test123, name=null, role=null]
===> JDBC로 getUser() 기능 처리
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:49:05 KST 2019]; root of context hierarchy
```
**AfterReturning 어드바이스**
```
package com.springbook.biz.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Service;

import com.springbook.biz.user.UserVO;

@Service
@Aspect
public class AfterReturningAdvice {

	@AfterReturning(pointcut="PointcutCommon.allPointcut()",returning="returnObj")
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
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:50:33 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
===> JDBC로 getUser() 기능 처리
관리자로그인(admin)
[사후 처리]getUser() 메소드 리턴값 : UserVO [id=test, password=test123, name=관리자, role=Admin]
관리자님 환영합니다.
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Sun Nov 17 20:50:33 KST 2019]; root of context hierarchy
```
