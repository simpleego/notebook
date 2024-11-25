29 스프링과 Mybatis 연동
=======================
Mybatis 프레임워크는 Ibatis에서 파생되었으므로 Mybatis의 전체적인 구조는 Ibatis와 매우 유사하다.  
심지어 XML 설정 파일들과 자바 API 까지도 Ibatis와 거의 유사하다.    
   
하지만 Mybatis 는 스프링 프레임워크와의 연동 부분에서 Ibatis와 다른데  
이번 학습에서는 스프링과 Mybatis의 연동 부분을 중점으로 살펴보고자 한다.   
그리고 지금부터 진행하는 모든 학습은 이전 시간에 사용했던 MybatisProject가 아닌   
BoardWeb 프로젝트에서 진행할 것이다.

# 1. 라이브러리 내려받기 
스프링과 Ibatis 프레임워크를 연동할 때는 스프링 쪽에서 Ibatis 연동을 위한 API를 지원했다.  
다음은 스프링 프레임워크에서 제공하는 Ibatis 연동에 사용되는 클래스들이다.   
   
```java
org.springframework.orm.ibatis.SqlMapClientFactoryBean
org.springframework.orm.ibatis.SqlMapClientTemplate
```
그러나 Mybatis는 스프링 쪽에서 연동에 필요한 API를 제공하지 않으며,  
오히려 Mybatis에서 스프링 연동에 필요한 API를 제공한다.  
따라서 스프링과 Mybatis를 연동하려면 Mybatis에서 제공하는 다음과 같은 클래스들을 이용해서 연동해야한다.  
```java
org.mybatis.spring.SqlSessionFactoryBean
org.mybatis.spring.SqlSessionTemplate
```
스프링과 Mybatis 연동에 필요한 라이브러리들을 내려 받으려면 pom.xml 파일에 ```<dependency>```를 추가한다.  
   
**pom.xml**  
```
~ 생략 ~
		<!-- Mybatis -->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.3.1</version>
		</dependency>
		<!-- Mybatis Spring-->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis-spring</artifactId>
			<version>1.2.4</version>
		</dependency>
~ 생략 ~
```
mybatis-3.3.1.jar 파일은 순수하게 Mybatis 관련 라이브러리고,     
mybatis-spring-1.2.4.jar 파일은 Mybatis와 스프링을 연동하기 위해 사용하는 라이브러리다.     
     
**주의 사항**   
```
		<!-- Ibatis -->
		<dependency>
			<groupId>org.apache.ibatis</groupId>
			<artifactId>ibatis-core</artifactId>
			<version>3.0</version>
		</dependency>
		<!-- Mybatis Spring-->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis-spring</artifactId>
			<version>1.2.4</version>
		</dependency>
```
위 두가지를 같이 사용할 경울 충돌이 일어나서 오류를 범하게 된다.    
그래서 이 두가지를 같이 사용하지 안하도록 조심하자   

***
# 2. Mybatis 설정 파일 복사 및 수정 
스프링과 Mybatis를 연동하려면 Mybatis 메인 환경설정 파일인 sql-map-config.xml과  
SQL 명령어들이 저장되어 있는 Mapper 파일이 필요하다.   
따라서 MybatisProject에서 작성했던 XML 설정 파일들을 복사하여 BoardWeb 프로젝트의 ```src/main/resources```소스 폴더에 추가한다.  
     
이 중에서 Mybatis 메인 환경설정 파일인 ```sql-map-config.xml```을 열어서 데이터소스 관련 설정을 삭제한다.    
   
**sql-map-config.xml**
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<typeAliases>
		<typeAlias type="com.springbook.biz.BoardVO" alias="board"></typeAlias>
	</typeAliases>
	<mappers>
		<mapper resource="mappings/board-mapping.xml" />
	</mappers>
</configuration>
```
데이터 소스는 스프링 프레임워크에서 이미 등록하여 사용하고 있었다.  
그리고 이 데이터 소스는 DB 연동뿐만 아니라 트랜잭션 처리처럼 다양한 곳에서 사영할 수 있으므로   
Mybatis 설정이 아닌 스프링 설정 파일에서 제공하는 것이 맞다.(applicationContext.xml)   
그리고 SQL 명령어가 저장된 Mapper XML 파일은 수정 없이 그대로 재사용하면 된다.   
   
***
# 3. 스프링 연동 설정   
스프링 Mybatis를 연동하려면 우선 스프링 설정 파일에 SqlSessionFactoryBean 클래스를 Bean 등록해야한다.    
그래야 SqlSessionFactoryBean 객체로부터 DB 연동 구현에 사용한 SqlSession 객체를 얻을 수 있다.  
  
**applicationContext.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.2.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.2.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.2.xsd">

	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	<context:property-placeholder location="classpath:config/database.properties"/>
	
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="org.h2.Driver"/>
		<property name="url" value="jdbc:h2:tcp://localhost/~/test" />
		<property name="username" value="sa"/>
		<property name="password" value=""/>
	</bean>
	<!-- SqlSessionFactoryBean 생성 -->
	<bean id="sessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"/>
		<property name="configLocation" value="classpath:sql-map-config.xml" />
	</bean>
	<!-- Spring JDBC 설정 -->
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
		<property name="dataSource" ref="dataSource"/>
	</bean>
	<!-- Transaction 실행 -->
	<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource" ref="dataSource"></property>
	</bean>
	<tx:advice id="txAdvice" transaction-manager="txManager">
		<tx:attributes>
			<tx:method name="get*" read-only="true"/>
			<tx:method name="*"/>
		</tx:attributes>
	</tx:advice>
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*(..))" id="txPointcut"/>
		<aop:advisor pointcut-ref="txPointcut" advice-ref="txAdvice"/>
	</aop:config>
</beans>
```
MybatisProject에서는 SqlSession 객체를 얻기 위해 SqlSessionFactoryBean 클래스를 유틸리티 클래스로 직접 구현했었다.   
하지만 이 클래스를 Mybatis에서 제공하므로 굳이 작성할 필요 없이 스프링 설정 파일에 ```<bean>``` 등록하면 된다.  
  
SqlSessionFactoryBean 객체가 SqlSession 객체를 생산하려면 반드시 DataSource와 SQLMapper 정보가 필요하다.  
따라서 앞에 등록된 DataSource를 Setter 인젝션으로 참조하고,  
SQL Mapper가 등록된 sql-map-config.xml 파일도 Setter 인젝션으로 설정해야 한다.    
그래야 ```<Bean>``` 등록된 SqlSessionFactoryBean이 SqlSessionFactory 객체를 생성할 수 있다.  
   
***
# 4. DAO 클래스 구현-방법1
Mybatis를 이용하여 DAO 클래스를 구현하는 방법은 2가지이다.   
이 중에 첫 번째는 SqlSessionDaoSupport 클래스를 상속하여 구현하는 것이다.  

**BoardDAOMybatis**
```
package com.springbook.biz.board.impl;


import java.util.List;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.springbook.biz.BoardVO;

@Repository
public class BoardDAOybatis extends SqlSessionDaoSupport {
	
	@Autowired
	public void setSeqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}

	public void insertBoard(BoardVO vo) {
		getSqlSession().insert("BoardDAO.insertBoard", vo);
		getSqlSession().commit();
	}

	public void updateBoard(BoardVO vo) {
		getSqlSession().update("BoardDAO.updateBoard", vo);
		getSqlSession().commit();
	}

	public void deleteBoard(BoardVO vo) {
		getSqlSession().delete("BoardDAO.deleteBoard", vo);
		getSqlSession().commit();
	}

	public BoardVO getBoard(BoardVO vo) {
		return (BoardVO)getSqlSession().selectOne("BoardDAO.getBoard", vo);
	}

	public List<BoardVO> getBoardList(BoardVO vo) {
		return getSqlSession().selectList("BoardDAO.getBoardList", vo);
	}
}
```
SqlSessionDaoSupport 클래스를 상속한 후에 가장 먼저 한 작업이 setSqlSessionFactory() 메소드를 재정의 한 것이다.
  
재정의한 setSqlSessionFactory() 메소드 위에 @Autowired를 붙였는데 이렇게 하면   
스프링 컨테이너가 setSqlSessionFactory() 메소드를 자동으로 호출한다.    
이때, 스프링 설정 파일에 ```<bean>``` 등록된 SqlSessionFactoryBean 객체를 인자로 받아  
부모인 SqlSessionDaoSupport에 setSqlSessionFactory() 메소드로 설정해준다.  
  
이렇게 해야 SqlSessionDaoSupport 클래스로부터 상속된 getSqlSession() 메소드를 호출하여 SqlSession 객체를 리턴받을 수 있다.  
이제 SqlSession 객체의 CRUD 관련 메소드를 이용하여 DB 연동을 처리하면 된다.  

```
public void insertBoard(BoardVO vo){
	System.out.println("===> Mybatis로 insertBoard() 기능 처리");
	getSqlSession().insert("BoardDAO.insertBoard", vo);
}
```
   
***
# 5. DAO 클래스 구현-방법2
Mybatis를 이용하여 DAO 클래스를 구현하는 2번재 방법은 SqlSessionTemplate 클래스를 ```<bean>``` 등록하여 사용하는 것이다.  
스프링 설정 파일에서 SqlSessionTemplate 클래스를 SqlSesionFactoryBean 아래에 ```<bean>``` 등록한다.    
    
**applicationContext.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.2.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.2.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.2.xsd">

	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	<context:property-placeholder location="classpath:config/database.properties"/>
	
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="org.h2.Driver"/>
		<property name="url" value="jdbc:h2:tcp://localhost/~/test" />
		<property name="username" value="sa"/>
		<property name="password" value=""/>
	</bean>
	
	<!-- SqlSessionFactoryBean 생성1 
	<bean id="sessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"/>
		<property name="configLocation" value="classpath:sql-map-config.xml" />
	</bean>
	-->
	
	<!-- Spring과 Mybatis 연동 설정 -->
	<bean id="sqlSession" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"/>
		<property name="configLocation" value="classpath:sql-map-config.xml" />
	</bean>
	
	<!-- SqlSessionTemplate 생성 -->
	<bean class="org.mybatis.spring.SqlSessionTemplate">
		<constructor-arg ref="sqlSession"></constructor-arg>
	</bean>
	
	<!-- Spring JDBC 설정 -->
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
		<property name="dataSource" ref="dataSource"/>
	</bean>
	
	<!-- Transaction 실행 -->
	<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource" ref="dataSource"></property>
	</bean>
	
	<tx:advice id="txAdvice" transaction-manager="txManager">
		<tx:attributes>
			<tx:method name="get*" read-only="true"/>
			<tx:method name="*"/>
		</tx:attributes>
	</tx:advice>
	
	<aop:config>
		<aop:pointcut expression="execution(* com.springbook.biz..*(..))" id="txPointcut"/>
		<aop:advisor pointcut-ref="txPointcut" advice-ref="txAdvice"/>
	</aop:config>
	
</beans>
```   
여기서 중요한 것은 SqlSessionTemplate 클래스에는 Setter 메소드가 없어서 Setter 인젝션 할 수 없다는 것이다.  
따라서 생성자 메소드를 이용한 Constructor 주입으로 처리할 수 밖에 없다.  
그리고 나서 DAO 클래스를 구현할 때, SqlSessionTemplate 객체를  
```@Autowired```를 이용하여 의존성 주입 처리하면 SqlSessionTemplate 객체로 DB 연동 로직을 처리할 수 있다.  
  
**BoardDAOMybatis**
```
package com.springbook.biz.board.impl;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.springbook.biz.BoardVO;

@Repository
public class BoardDAOMybatis {
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public void insertBoard(BoardVO vo) {
		mybatis.insert("BoardDAO.insertBoard", vo);
		mybatis.commit();
	}

	public void updateBoard(BoardVO vo) {
		mybatis.update("BoardDAO.updateBoard", vo);
		mybatis.commit();
	}

	public void deleteBoard(BoardVO vo) {
		mybatis.delete("BoardDAO.deleteBoard", vo);
		mybatis.commit();
	}

	public BoardVO getBoard(BoardVO vo) {
		return (BoardVO)mybatis.selectOne("BoardDAO.getBoard", vo);
	}

	public List<BoardVO> getBoardList(BoardVO vo) {
		return mybatis.selectList("BoardDAO.getBoardList", vo);
	}
}
```

***
# 6. Mybatis 연동 테스트
BoardDAOMybatis 객체를 의존성 주입할 수 있도록  
BoardServiceImpl 클래스를 다음과 같이 수정하고 테스트 클라이언트 프로그램을 실행하여 결과를 확인한다.  
    
**BoardServiceImpl**
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springbook.biz.BoardVO;


@Service("boardService")
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardDAOmybatis boardDAO;

	public void insertBoard(BoardVO vo) {
		boardDAO.insertBoard(vo); 
	}

	public void updateBoard(BoardVO vo) {
		boardDAO.updateBoard(vo);
	}

	public void deleteBoard(BoardVO vo) {
		boardDAO.deleteBoard(vo);
	}

	public BoardVO getBoard(BoardVO vo) {
		return boardDAO.getBoard(vo);
	}

	public List<BoardVO> getBoardList(BoardVO vo) {
		return boardDAO.getBoardList(vo);
	}
}
```
이때, src/test/java 소스 폴더에 있는 BoardServiceClient 프로그램을 실행하여 테스트 할 수도 있고,  
index.jsp 파일을 실행하여 웹 어플리케이션으로 테스트할 수도 있다.    

***
# 7. Dynamic SQL으로 검색 처리  
Mybatis는 SQL의 재사용성과 유연성을 향상하고자 Dynamic SQL을 지원한다.   
Dynamic SQL을 사용하면 조건에 따라 다양한 쿼리를 데이터베이스에 전송할 수 있다.  
  
## (1) Dynamic SQL 적용 전  
예를 통해 Dynamic SQL의 필요성을 확인하고 적용도 해보자.   
만약 현재 상태에서 검색 기능을 추가한다고 하면 우선 다음과 같이 2개의 검색 관련 쿼리가 필요할 것이다.  
   
**board-mapping.xml**  
```
~ 생략 ~
	<select id="getBoardList_T" resultMap="boardResult">
		<![CDATA[
		SELECT *
		FROM BOARD
		WHERE TITLE LIKE '%'||#{searchKeyword}||'%'
		ORDER BY SEQ DESC
		]]>
	</select>
	
	<select id="getBoardList_C" resultMap="boardResult">
		<![CDATA[
		SELECT *
		FROM BOARD
		WHERE CONTENT LIKE '%'||#{searchKeyword}||'%'
		ORDER BY SEQ DESC
		]]>
	</select>
~ 생략 ~
```
제목 검색과 내용 검색을 처리하기 위한 2개의 쿼리를 등록했으면,  
이제 DAO 클래스 getBoardList() 메소드에 검색 조건에 따른 분기 처리 로직을 추가한다.  
  
**BoardDAOMybatis**
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.springbook.biz.board.BoardVO;

@Repository
public class BoardDAOMybatis{
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public void insertBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� insertBoard() ��� ó��");
		mybatis.insert("BoardDAO.insertBoard", vo);
	}

	public void updateBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� updateBoard() ��� ó��");
		mybatis.update("BoardDAO.updateBoard", vo);
	}

	public void deleteBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� deleteBoard() ��� ó��");
		mybatis.delete("BoardDAO.deleteBoard", vo);
	}

	public BoardVO getBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� getBoard() ��� ó��");
		return (BoardVO) mybatis.selectOne("BoardDAO.getBoard", vo);
	}

	public List<BoardVO> getBoardList(BoardVO vo) {
		System.out.println("===> Mybatis�� getBoardList() ��� ó��");
		if(vo.getSearchCondition().equals("TITLE")) {
			return mybatis.selectList("BoardDAO.getBoardList_T", vo);
		} else if(vo.getSearchCondition().equals("CONTENT")) {
			return mybatis.selectList("BoardDAO.getBoardList_C", vo);
		} 
		return null;
	}
}
```
이제 수정된 파일들을 저장하고 index.jsp 파일을 실행한 후,    
글 목록 화면에서 검색 기능을 실행해보면 정상적으로 실행될 것이다.      
하지만 이런 방식으로 검색 기능을 구현한다면      
이후에 추가되는 검색 조건에 대해서 비슷한 SQL 구문들을 반복해서 작성해야 할 것이고,       
이는 결국 유지보수의 어려움으로 이어질 것이다.         
그리고 DAO 클래스의 메소드 역시 검색 관련 SQL 구문의 개수만큼 분기 처리 로직을 추가해야 하므로     
SQL이 추가될 때마다 DAO 클래스도 수정해야 한다.    
  
## (2) Dynamic SQL 적용 후  
이런 SQL의 중복 문제를 해결하기 위해 Mybatis에서는 Dynamic SQL을 지원한다.  
Dynamic SQL을 이용하여 이런 문제가 어떻게 해결되는지 테스트 해보자.  

**board-mapping.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="BoardDAO">

	<resultMap id="boardResult" type="board">
		<id property="seq" column="SEQ" />
		<result property="title" column="TITLE" />
		<result property="writer" column="WRITER" />
		<result property="content" column="CONTENT" />
		<result property="regDate" column="REGDATE" />
		<result property="cnt" column="CNT" />
	</resultMap>
	
	<insert id="insertBoard" parameterType="board">
		<![CDATA[
		INSERT INTO BOARD(SEQ, TITLE, WRITER, CONTENT)
		VALUES((SELECT NVL(MAX(SEQ), 0) + 1 FROM BOARD),
		#{title}, #{writer}, #{content})
		]]>
	</insert>
	
	<update id="updateBoard">
		<![CDATA[
		UPDATE BOARD SET
		TITLE = #{title},
		CONTENT = #{content}
		WHERE SEQ = #{seq}
		]]>
	</update>
	
	<delete id="deleteBoard">
		<![CDATA[
		DELETE BOARD
		WHERE SEQ = #{seq}
		]]>
	</delete>
	
	<select id="getBoard" resultType="board">
		<![CDATA[
		SELECT *
		FROM BOARD
		WHERE SEQ = #{seq}
		]]>
	</select>
	
	<select id="getBoardList" resultMap="boardResult">
		<![CDATA[
		SELECT *
		FROM BOARD
		WHERE 1 = 1 
		<if test="searchCondition == 'TITLE'">
			AND TITLE LIKE '%'||#{searchKeyword}||'%'
		</if>
		<if test="searchCondition == 'CONTENT'">
			AND CONTENT LIKE '%'||#{searchKeyword}||'%'
		</if>
		ORDER BY SEQ DESC
		]]>
	</select>
<!-- 	
	<select id="getBoardList_T" resultMap="boardResult">
		<![CDATA[
		SELECT *
		FROM BOARD
		WHERE TITLE LIKE '%'||#{searchKeyword}||'%'
		ORDER BY SEQ DESC
		]]>
	</select>
	
	<select id="getBoardList_C" resultMap="boardResult">
		<![CDATA[
		SELECT *
		FROM BOARD
		WHERE CONTENT LIKE '%'||#{searchKeyword}||'%'
		ORDER BY SEQ DESC
		]]>
	</select>
 -->	
</mapper>
```
수정된 SQL 구문을 보면 ```<if>```라는 동적 요소를 사용하여 조건에 따른 분기 처리를 하고 있다.  
만약 searchCondition 변숫값이 ```TITLE```을 가지고 있으면 제목 검색에 해당하는 조건이 추가되고  
```CONTENT```라는 값을 가지고 있으면 내용 검색에 해당하는 조건이 추가되어 실행된다.   
이렇게 동적 엘리먼트를 이용하여 SQL을 처리할 수 있으므로 검색과 관련된 쿼리는 하나만 있으면 된다.    
    
**BoardDAOMybatis**
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.springbook.biz.board.BoardVO;

@Repository
public class BoardDAOMybatis{
	
	@Autowired
	private SqlSessionTemplate mybatis;

	public void insertBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� insertBoard() ��� ó��");
		mybatis.insert("BoardDAO.insertBoard", vo);
	}

	public void updateBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� updateBoard() ��� ó��");
		mybatis.update("BoardDAO.updateBoard", vo);
	}

	public void deleteBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� deleteBoard() ��� ó��");
		mybatis.delete("BoardDAO.deleteBoard", vo);
	}

	public BoardVO getBoard(BoardVO vo) {
		System.out.println("===> Mybatis�� getBoard() ��� ó��");
		return (BoardVO) mybatis.selectOne("BoardDAO.getBoard", vo);
	}

	public List<BoardVO> getBoardList(BoardVO vo) {
		System.out.println("===> Mybatis�� getBoardList() ��� ó��");
		return mybatis.selectList("BoardDAO.getBoardList", vo);
	}
	/*
	  	public List<BoardVO> getBoardList(BoardVO vo) {
		System.out.println("===> Mybatis�� getBoardList() ��� ó��");
		if(vo.getSearchCondition().equals("TITLE")) {
			return mybatis.selectList("BoardDAO.getBoardList_T", vo);
		} else if(vo.getSearchCondition().equals("CONTENT")) {
			return mybatis.selectList("BoardDAO.getBoardList_C", vo);
		} 
		return null;
	}
	 */
}
```
그리고 당연히 이 SQL을 이용하여  
검색 관련 DB 연동 로직을 처리하는 BoardDAOMybatis 클래스의 메소드 역시 원래의 코드를 유지할 수 있다.   
이 코드는 새로운 검색 조건이 추가된다 하더라도 수정할 필요가 없다.  
따라서 유지보수는 좀 더 편해질 것이다.  

