AOP 용어 및 기본 설정
=======================
# 1. AOP 용어 정리  
## 1.1. 조인포인트
조인포인트는 클라이언트가 호출하는 모든 비즈니스 메소드로서,  
BoardServiceImpl이나 UserServiceImpl 클래스의 모든 클래스를 조인포인트라고 생각하면 된다.    
(인터페이스를 기준으로 해당하는 모든 비즈니스 메소드를 실행하는 중간 역할 클래스)    
  
조인포인트를 '포인트컷 대상' 또는 '포인트컷 후보'라고도 하는데,  
이는 조인포인트 중에서 포인트컷이 선택되기 때문이다.  
  
## 1.2. 포인트컷
클라이언트가 호출하는 모든 비즈니스 메소드가 조인포인트라면,  
포인트컷은 필터링된 조인포인트를 의미한다.       
  
트랜잭션을 처리하는 공통 기능을 만들었다고 가정시  
이 횡단 관심 기능은 등록, 수정, 삭제 기능의 비즈니스 메소드에 대해서는 당연히 동작해야하지만,    
검색 기능의 메소드에 대해서는 트랜잭션과 무관하므로 동작할 필요가 없다.   
  
수많은 비즈니스 메소드 중에서 우리가 원하는 특정 메소드에서만  
횡단 관심에 해당하는 공통기능을 수행시키기 위해서 포인트컷이 필요하다.   
     
포인트컷을 이용하면 메소드가 포함된 클래스와 패키지는 물론이고  
메소드 시그니처까지 정확하게 지정할 수 있다.  
  
```
	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	
	<bean id="log" class="com.springbook.biz.common.Log4jAdvice"></bean>
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.*(..))" id="allPointcut"/>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.get*(..))" id="getPointcut"/>
		
		<aop:aspect ref="log">
			<aop:before pointcut-ref="getPointcut" method="printLogging"/>
		</aop:aspect>
	</aop:config>
```
포인트컷은 ```<aop:pointcut>```엘리먼트로 선언하며,  
id 속성으로 포인트컷을 식별하기 위한 유일한 문자열을 선언한다.  
이 id 가 나중에 포인트컷을 참조할 때 사용된다.   
   
**중요한 것은 expression 속성인데,**  
이 값을 어떻게 설정하느냐에 따라 필터링되는 메소드가 달라진다.    
```
<aop:pointcut id="getPointcut" expression="execution(* com.springbook.biz..*Impl.get*(..))" />
      
*                       : 리턴 타입 
com.springbook.biz.     : 패키지 경로 
*Impl                   : 클래스명 
get*(..)                : 메소드명 및 매개변수

중간 마다 나오는 점은 각 범위를 구분해주는 구분 점이라고 생각하면 된다.  
```
이제 위의 설정을 기준으로 ```BoardServiceClient```클래스를 실행시켜보겠다.  
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Mon Nov 04 20:02:27 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
===> JDBC로 insertBoard() 기능 처리
[공통 로그-Log4j] 비즈니스 로직 수행 전 동작
===> JDBC로 getBoardList()기능 처리
---> BoardVO [seq=5, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-04, cnt=0]
---> BoardVO [seq=4, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=3, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=2, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-01, cnt=0]
---> BoardVO [seq=1, title=가입인사, writer=관리자, content=잘 부탁드립니다..., regDate=2019-10-27, cnt=0]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Mon Nov 04 20:02:27 KST 2019]; root of context hierarchy
```
**결론**    
클래스마다 사용되는 공통기능인 횡단관심에서도  
어떠한 클래스에서는 특정메소드를 사용하지 않을 경우가 있다.  
그럴 경우 포인트컷을 이용하여 사용하려는 메소드만을 정의시켜서 사용하게 끔 하는 것이다.  
즉, 불필요한 메소드의 호출을 방지하고자 사용하는 것이다.    
(클래스를 직접 실행시켜보면 우선 Impl내의 모든 메소드에 반응은 하지만 실질적으로 호출하지는 않는다.)     
       
## 1.3. 어드바이스
어드바이스는 횡단 관심에 해당하는 공통 기능의 코드를 의미하며, 독립된 클래스와 메소드로 작성된다.       
그리고 어드바이스로 구현된 메소드가 언제 동작할지 스프링 설정 파일을 통해서 지정할 수 있다.       
  
예를 들면 트랜잭션 관리 기능의 어드바이스 메소드가 있다고 가정시에  
이 메소드들은 비즈니스 로직 수행 후에 트랜잭션 커밋 또는 롤백을 처리하는 것이 가장 이상적이다.   
(이전에 한다면 아무런 의미없이 동작하는 것이기에 이러한 언제 동작할지를 지정하는 것이 중요하다.)   
   
**핵심**   
스프링에서는 어드바이스의 동작 시점을 5가지로 구분할 수 있다.    
```
before			 : 비즈니스 메소드 실행 전에 동작
after 		 	 : 비즈니스 메소드 실행 후에 동작

after-returning		 : 비즈니스 메소드 실행 후에 동작
after-throwing		 : 비즈니스 메소드 실행 후에 동작
around			 : 비즈니스 메소드 실행 후에 동작	
```
기존의 ```applicationContext.xml```에서 ```before -> after```로 바꾸자
```
	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	
	<bean id="log" class="com.springbook.biz.common.Log4jAdvice"></bean>
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.*(..))" id="allPointcut"/>
		<aop:pointcut expression="execution(* com.springbook.biz..*Impl.get*(..))" id="getPointcut"/>
		
		<aop:aspect ref="log">
			<aop:after pointcut-ref="getPointcut" method="printLogging"/>
		</aop:aspect>
	</aop:config>
```
**결과**
```
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from class path resource [applicationContext.xml]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Refreshing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Mon Nov 04 20:23:00 KST 2019]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
===> JDBC로 insertBoard() 기능 처리
===> JDBC로 getBoardList()기능 처리
[공통 로그-Log4j] 비즈니스 로직 수행 전 동작
---> BoardVO [seq=6, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-04, cnt=0]
---> BoardVO [seq=5, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-04, cnt=0]
---> BoardVO [seq=4, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=3, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-02, cnt=0]
---> BoardVO [seq=2, title=임시 제목, writer=홍길동, content=임시 내용.........., regDate=2019-11-01, cnt=0]
---> BoardVO [seq=1, title=가입인사, writer=관리자, content=잘 부탁드립니다..., regDate=2019-10-27, cnt=0]
INFO : org.springframework.context.support.GenericXmlApplicationContext - Closing org.springframework.context.support.GenericXmlApplicationContext@782830e: startup date [Mon Nov 04 20:23:00 KST 2019]; root of context hierarchy
```
```[공통 로그-Log4j] 비즈니스 로직 수행 전 동작``` 의 위치가 바뀐 것을 알 수가 있다.      
after가 되었으니 해당 메소드를 호출한 후에 출력이 되는 것이다.     
   
## 1.4. 위빙
위빙은 포인트컷으로 지정한 핵심 관심 메소드가 호출될 때,  
어드바이스에 해당하는 **횡단 관심 메소드가 삽입되는 과정**을 의미한다.    
  
이 위빙을 통해서 비즈니스 메소드를 수정하지 않고도 횡단 관심에 해당하는 기능을 추가하거나 변경할 수 있다.  
  
**위빙을 처리하는 방식**    
  
* 컴파일타임 위빙  
* 로딩타임 위빙  
* 런타임 위빙   
  
스프링에서는 **런타임 위빙만을 지원한다.**  

## 1.5. 애스팩트 또는 어드바이저   
AOP의 핵심은 바로 애스팩트이다.  
애스팩트는 포인트컷과 어드바이스의 결합으로서,  
어떤 포인트컷 메소드에 대해서 어떤 어드바이스 메소드를 실행할지 결정한다.   
**이 애스팩트 설정에 따라 AOP의 동작 방식이 결정되므로 AOP 용어 중 가장 중요한 개념이라 할 수 있다.**     
![KakaoTalk_20191104_222611620](https://user-images.githubusercontent.com/50267433/68124258-45811780-ff52-11e9-8f52-6cc5e9771a8e.jpg)

  
1. getPointcut 포인트컷이 호출될 때(포인트컷 메소드 expression->get*인 메소드들)    
2. log 라는 어드바이스 객체의  
3. method="printLog" 즉 printLog가 실행되고  
4. 메소드 동작 시점이 before 즉 포인트컷이 실행되기 이전에 printLog()가 실행된다.   
  
애스팩트를 설정할 때는 ```<aop:aspect>``` 엘리먼트를 사용하는데,  
가끔 ```<aop:aspect>```대신에 ```<aop:advisor>```를 사용하는 경우가 있다.   
대표적인 상황이 트랜잭션 설정에서 사용한다.   
  
종합하자면 애스팩트와 어드바이저가 같은 의미의 용어를 나타내는 것이다.   
  
## 1.6. AOP 용어 종합

![KakaoTalk_20191104_223639173](https://user-images.githubusercontent.com/50267433/68124857-a65d1f80-ff53-11e9-8e77-33fd360a2bb6.jpg)

1. 사용자는 시스템을 사용하면서 자연스럽게 비즈니스 컴포넌트의 여러 조인포인트를 호출하게 된다.   
2. 이때 특정 포인트컷으로 지정한 메소드가 호출되는 순간,  
3. 어드바이스 객체의 어드바이스 메소드가 호출된다.  
4. 이 어드바이스 메소드의 동작 시점을 5가지로 지정할 수 있으며,  
5. 포인트컷으로 지정한 메소드가 호출될때, 어드바이스 메소드를 삽입하도록 하는 설정을 애스팩트라고 한다.  
6. 이 애스팩트 설정에 따라 위빙이 처리된다.  

***
# 2. AOP 엘리먼트
스프링은 AOP관련 설정을 XML 방식과 어노테이션 방식으로 지원한다.    
우선 XML 설정 방식에 대해서 배우고 어노테이션 설정을 보도록 하자    
  
## 2.1. ```<aop:config>```엘리멘트  
AOP 설정에서 ```<aop:config>```는 루트 엘리먼트이다.   
**스프링 설정 파일 내에 ```<aop:config>```엘리먼트는 여러 번 사용할 수 있으며**   
```<aop:config>```하위에는 ```<aop:pointcut>```,```<aop:aspect>```엘리먼트가 위치할 수 있다.  
   
![KakaoTalk_20191104_224705788](https://user-images.githubusercontent.com/50267433/68125524-246df600-ff55-11e9-8f3d-051fe42d6cc3.jpg)
     
## 2.2. ```<aop:pointcut>```엘리멘트
```<aop:pointcut>```엘리먼트는 포인트컷을 지정하기 위해 사용하며,  
```<aop:config>```의 자식이나 ```<aop:aspect>```의 자식 엘리먼트로 사용할 수 있다.   
그러나 ```<aop:aspect>```하위에 설정된 포인트컷은 해당 ```<aop:aspect>```에서만 사용할 수 있다.  
   
```<aop:pointcut>```은 여러 개 정의할 수 있으며,  
유일한 아이디를 할당하여 애스팩트를 설정할 때 포인트컷을 참조하는 용도로 사용한다.  

![KakaoTalk_20191104_225744621](https://user-images.githubusercontent.com/50267433/68126197-96930a80-ff56-11e9-9faa-c17e6b252f5d.jpg)
  
allPointcut이라는 포인트컷은 com.springbook.biz 패키지로 시작하는 클래스 중에서   
이름이 Impl로 끝나는 클래스의 모든 메소드를 포인트컷으로 설정하고 있다.   
  
그리고 애스팩트 설정에서 ```<aop:before>``` 엘리먼트의 pointcut-ref 속성으로 포인트컷을 참조하고 있다.    

## 2.3. ```<aop:aspect>```엘리멘트  
애스팩트는 ```<aop:aspect>```엘리먼트로 설정하며,    
핵심 관심에 해당하는 포인트컷 메소드와 횡단 관심에 해당하는 어드바이스 메소드를 결합하기 위해 사용한다.     
애스팩트를 어떻게 설정하느냐에 따럿 위빙 결과가 달라지므로 AOP에서 가장 중요한 설정이라 할 수 있다.  

![KakaoTalk_20191105_204857422](https://user-images.githubusercontent.com/50267433/68205510-dec13400-000d-11ea-9d26-58b70a1ca906.jpg)

1. getPointcut으로 설정한 포인트컷 메소드가 호출될 때   
2. log라는 어드바이스 객체의 
3. printLog() 메소드가 실행되고  
4. 이때 printLog() 동작 시점이 ```<aop:before>```라는 내용의 설정이다.  

## 2.4. ```<aop:advisor>```엘리멘트  
```<aop:advisor>```엘리먼트는 포인트컷과 어드바이스를 결합한다는 점에서 애스팩트와 같은 기능을 한다.  
하지만 트랜잭션 설정 같은 몇몇 특수한 경우는 애스팩트가 아닌 어드바이저를 사용해야 한다.  
  
AOP 설정에서 애스팩트를 사용하려면 어드바이스의 아이디와 메소드 이름을 알아야 한다.  
![KakaoTalk_20191105_205900329](https://user-images.githubusercontent.com/50267433/68206071-2bf1d580-000f-11ea-9e58-6108a40cf75e.jpg)     
그러나 만약 어드바이스 객체의 아이디를 모르거나 메소드 이름을 확인할 수 없을 때는 애스팩트를 설정할 수 없다.    
   
**트랜잭션**   
다음은 트랜잭션 처리 관련 설정이 포함된 스프링 설정 파일이다.  
핵심은 **관리 어드바이스 설정인데,** 이 어드바이스의 아이디는 txAdvice로 설정했다.  
하지만 문제는 이 어드바이스의 메소드 이름을 확인할 수 없다는 것이다.  
```
<!-- Transaction 설정 -->   
<bean id="txManager" class="org.springframework.orm.jpa.JpaTransactionManager">
	<property name="entityManagerFactory" ref="entityManagerFactory"></property>
<bean>
<tx:advice id="txAdvice" transaction-manager="txManager">
	<tx:attributes>
		<tx:method name="get" read-only="true">
	<tx:attributes>
</tx:advice>

<aop:config>
	<aop:pointcut id="allPointcut" expression="execution(*com.springbook.biz..*Impl.*(..))"/>
	
	<aop:advisor pointcut-ref="allPointcut" advice-ref="txAdvice"/>
</aop:config>	
```   
스프링 컨테이너는   
설정 파일에 등록된 ```<rx:advice>```엘리먼트를 해석하여 트랜잭션 기능의 어드바이스 객체를 메모리에 생성한다.  
그리고 ```<rx:advice>```를 설정했느냐에 따라서 생성되는 어드바이스의 기본 동작 방식은 달라진다.   
  
문제는 이렇게 생성된 어드바이스의 아이디는 확인되지만 메소드 이름은 확인할 방법이 없다.  
이럴 때는 ```<aop:aspect>```를 쓰지 못하므로 ```<aop:advisor>```엘리먼트를 사용해야 한다.     

***
# 3. 포인트컷 표현식   
포인트컷을 이용하면 어드바이스 메소드가 적용될 비즈니스 메소드를 정확하게 필터링할 수 있는데,     
이때 다양한 포인트컷 표현식을 사용할 수 있다.  
포인트컷 표현식은 메소드처럼 생긴 execution 명시자를 이용하며,    
execution 명시자 안에 포인트컷 표현식을 기술한다.    

![KakaoTalk_20191105_215853814](https://user-images.githubusercontent.com/50267433/68209876-b0485680-0017-11ea-886b-87e494cd4cd1.jpg)


![KakaoTalk_20191105_215953318](https://user-images.githubusercontent.com/50267433/68209902-bb02eb80-0017-11ea-99a9-96551fb7272d.jpg)
