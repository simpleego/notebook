13 스프링 JDBC 
=======================
# 1. JDBCTemplate 클래스
JdbcTemplate은 GoF 디자인 패턴 중 템플릿 메소드 패턴이 적용된 클래스이다.    
템플릿 메소드 패턴은 복잡하고 반복되는 알고리즘을 캡슐화해서 재사용하는 패턴으로 정의할 수 있다.  
    
탬플릿 메소드 패턴을 이용하면 반복해서 사용되는 알고리즘을 템플릿 메소드로 캡슐화할 수 있어서  
JDBC처럼 코딩 순서가 정형화된 기술에서 유용하게 사용할 수 있다.  
따라서 반복되는 DB 연동 로직은 JdbcTemplate 클래스의 템플릿 메소드가 제공하고,  
개발자는 달라지는 SQL 구문과 설정값만 신경쓰면 된다.  

JdbcTemplate은 JDBC의 반복적인 코드를 제거하기 위해 제공하는 클래스이다.  
따라서 DAO 클래스에서는 
JdbcTemplate 클래스가 제공하는 템플릿 메소드를 호출하여 DB 연동을 간단하게 처리할 수 있다.  
그러면 JdbcTemplate 클래스는 내부적으로 JDBC API를 이용하여 실제 DB 연동 작업을 처리한다.   
   
***
# 2. 스프링 JDBC 설정
## 2.1. 라이브러리 추가    
스프링 JDBC를 이용하려면 BoardWeb 프로젝트에 있는 pom.xml 파일에 DBCP 관련 ```<depencency>``` 설정을 추가해야 한다.     
     
**pom.xml**
```		<!-- jdbc -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>
		<!-- DBCP -->
		<dependency>
			<groupId>commons-dbcp</groupId>
			<artifactId>commons-dbcp</artifactId>
			<version>1.4</version>
		</dependency>		
```   
## 2.2. DataSource 설정  
JdbcTemplate 클래스가 JDBC API를 이용하여 DB 연동을 처리하려면 반드시 데이터베이스로부터 커넥션을 얻어야한다.  
따라서 JdbcTemplate 객체가 사용할 DataSource를 ```<bean>```등록하여 스프링 컨테이너가 생성하도록 해야한다.  
DataSource 설정은 스프링뿐만 아니라 트랜잭션 처리나 mybatis연동, JPA 연동에서도 사용된다.  

**applicationContext.xml**
```
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="org.h2.Driver"/>
		<property name="url" value="jdbc:h2:tcp://localhost/~/test" />
		<property name="username" value="sa"/>
		<property name="password" value=""/>
	</bean>
```
일반적으로 많이 사용하는 BasicDataSource 로 등록을 해주었고  
```<property>```를 통한 Setter 메소드들에 값을 전달해 주었다.  
그리고 객체가 삭제되기전에 연결해주를 위한 ```close()```메소드를 지정해주었다.  
  
## 2.3. 프로퍼티 파일을 활용한 DataSource 설정  
PropertyPlaceHolderConfigurer를 이용하면 외부의 프로퍼티 파일을 참조하여 DataSource를 설정할 수 있다.    
실습을 위해 ```src/main/resources```소스 폴더에 config 폴더를 생성하고     
config 폴더에 database.properties 파일을 작성한다.    
   
**database.properties**
```
jdbc.driver=org.h2.Driver
jdbc.url=jdbc:h2:tcp://localhost/~/test
jdbc.username=sa
jdbc.password=
```
이제 Properties 파일에 설정된 프로퍼티들을 이용하여 DataSource를 설정하려면 
```<context:property-placeholder>```엘리먼트를 사용한다.    
    
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

	<context:component-scan base-package="com.springbook.biz"></context:component-scan>
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
	
  <context:property-placeholder location="classpath:config/database.properties"/>
  <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="${jdbc.driver}"/>
		<property name="url" value="${jdbc.url}" />
		<property name="username" value="${jdbc.username}"/>
		<property name="password" value="${jdbc.password}"/>
	</bean>

</beans>
```
프로퍼티를 사용하려면 ``` <context:property-placeholder>``` 엘리먼트로 프로퍼티 파일의 위치를 등록해야 한다.  
그리고 ```${}```구문을 이요6ㅇ하여 프로퍼티 이름을 지정하면 프로퍼티 값으로 치환되어 실행된다.    
   
***
# 3. JdbcTemplate 메소드 
스프링 JDBC를 위한 기본 설정이 마무리됐으면 이제 JdbcTemplate 객체를 이용하여 DB 연동을 간단하게 처리할 수 있다.  
  
## 3.1. update() 메소드
CRUD 구문을 처리하려면 jdbcTemplate 클래스의 update() 메소드를 사용한다.  
upload() 메소드의 사용법은 쿼리문에 ```?```에 값을 설정하는 방식에 따라 크게 2가지 형태가 있다.
     
**1번째 방법(? 수만큼 파라미터에 값 넣어주기)**   
```
jdbcTemplate.update("쿼리문", 파라미터들....)
______________________________________________________
public void updateBoard(boardVO vo){
  String BOARD_UPDATE = "update board set title=? , content=?, where seq=?";
  int cnt = jdbcTemplate.update(BOARD_UPDATE, vo.getTitle(), vo.getContent(), vo.getSeq());
}
```
**1번째 방법(? 수만큼의 파라미터를 Object 배열로 만들어 한번에 넣어주기)**   
```
jdbcTemplate.update("쿼리문", 배열들)
______________________________________________________
public void updateBoard(boardVO vo){
  String BOARD_UPDATE = "update board set title=? , content=?, where seq=?";
  Object[] args = {vo.getTitle(), vo.getContent(), vo.getSeq()};
  int cnt = jdbcTemplate.update(BOARD_UPDATE, args);
}
```
  
## 3.2. queryForInt() 메소드
SELECT 구문으로 검색된 정숫값을 리턴받으려면 queryForInt() 메소드를 사용한다.  
매개변수를 사용하는 것은 ```?```를 사용하는 것이니 주로 ```WHERE```구문에 사용할 데이터를 넘겨준다.   
```
int queryForInt(String sql)
int queryForInt(String sql, Object... args)
int queryForInt(String sql, Object[] args)
______________________________________________________
public int getBoardTotalCount(BoardVO vo){
  String BOARD_TOT_COUNT = "SELECT COUNT(*) FROM board";
  int count = jdbcTemplate.queryForInt(BOARD_TOT_COUNT);
  System.out.println("전체 게시글 수 : " + count + "건");
}
```

## 3.3. queryForObject() 메소드
queryForObject() 메소드는 SELECT 구문의 실행 결과를 특정 자바 객체로 매핑하여 리턴받을 때 사용한다.  
queryForObject() 메소드는 검색 결과가 없거나 검색 결과가 두 개 이상이면 예외를 발생시킨다.      
  
그리고 중요한 것은 검색 결과를 자바 객체로 매핑할 RowMapper 객체를 반드시 지정해야 한다.    
```
Object queryForObject(String sql)
Object queryForObject(String sql, RowMapper<T> rowMapper)
Object queryForObject(String sql, Object[] args, RowMapper<T> rowMapper)
______________________________________________________
public BoardVO getBoardTotalCount(BoardVO vo){
  String BOARD_GET = "SELECT * FROM board WHERE seq=?";
  Object[] args = {vo.getSeq()};
  return jdbcTemplate.queryForObject(BOARD_GET, args, new BoardRowMapper());
}
```
검색 결과를 특정 VO 객체에 매핑하여 리턴하려면 RowMapper 인터페이스를 구현한 RowMapper 클래스가 필요하다.  
결국, RowMapper 클래스는 테이블당 하나씩은 필요하다는 말이다.  
RowMapper 인터페이스에는 mapRow() 메소드가 있어서 검색 결과로 얻어낸 Row 정보를  
어떤 VO 에 어떻게 매핑할 것인지를 구현해주면 된다.  

**BoardRowMapper**
```
package com.springbook.biz.board.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.springbook.biz.BoardVO;

public class BoardRowMapper implements RowMapper<BoardVO>{
	
	@Override
	public BoardVO mapRow(ResultSet rs, int rowNum) throws SQLException {
		BoardVO board = new BoardVO();
		board.setSeq(rs.getInt("SEQ"));
		board.setTitle(rs.getString("TITLE"));
		board.setWriter(rs.getString("WRITER"));
		board.setContent(rs.getString("CONTENT"));
		board.setRegDate(rs.getDate("REGDATE"));
		board.setCnt(rs.getInt("CNT"));
		return board;
	}
}
```
RowMapper 객체를 queryForObject() 메소드의 매개변수로 넘겨주면,    
스프링 컨테이너는 SQL 구문을 수행한 후 자동으로 RowMapper 객체의 mapRow() 메소드를 호출한다.    
매개변수의 인자도 알아서 넣어준다.      
   
## 3.4. query() 메소드     
queryForObject() 가 SELECT 문으로 객체 하나를 검색할 때 사용하는 메소드라면,  
query() 메소드는 SELECT 문의 실행 결과가 목록일 때 사용한다.  
기본 사용법은 queryForObject()메소드와 같다.  
따라서 query() 메소드에서도 검색 결과를 VO 객체에 매핑하려면 RowMapper 객체를 사용한다.  
```
List query(String sql)
List query(String sql, RowMapper<T> rowMapper)
List query(String sql, Object[] args, RowMapper<T> rowMapper)
______________________________________________________
public List<BoardVO> getBoardList(BoardVO vo){
  String BOARD_LIST = "SELECT * FROM board ORDER BY seq DESC";
  return jdbcTemplate.query(BOARD_GET, args, new BoardRowMapper());
}
```
query() 메소드가 실행되면 여러 건의 ROW 정보가 검색되며,    
검색된 데이터 ROW 수만큼 RowMapper 객체의 mapRow() 메소드가 실행된다.      
그리고 이렇게 ROW 정보가 매핑된 VO 객체 여러 개가 List 컬렉션에 저장되어 리턴된다.   
   
