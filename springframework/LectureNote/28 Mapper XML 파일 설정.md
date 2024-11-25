28 Mapper XML 파일 설정
=======================
# 1. SQL MapperXML 기본 설정  
## 1.1. Mybatis 구조  
  
[사진]  
  
우선 SqlMapConfig.xml 파일은 Mybatis 메인 환경 설정 파일이다. 
Mybatis는 이 파일을 읽어 들여 어떤 DBMS와 커넥션을 맺을지, 어떤 SQL Mapper XML 파일들이 등록되어 있는지 알 수 있다.     
   
Mybatis는 SqlMap.xml 파일에 등록된 각 SQL 명령어들을 Map 구조로 저장하여 관리한다.    
각 SQL 명령어는 고유한 아이디 값을 가지고 있으므로 특정 아이디로 등록된 SQL을 실행할 수 있다.    
그리고 SQL이 실행될 때 필요한 값들은 Input 형태의 데이터로 할당하고,    
실행된 SQL이 SELECT 구문일 때는 output 형태의 데이터로 리턴한다.  

## 1.2. Mapper XML 파일 구조  
Mybatis 프레임워크에서 가장 중요한 파일은 SQL 명령어들이 저장되는 SQL Mapper XML파일이다.   
SQL Mapper는 ```<mapper>```를 루트 엘리먼트로 가지는 XML 파일이다.  
     
[사진]      
      
Mapper 파일 구조를 살펴보면 가장 먼저 DTD 선언이 등장하고, 그 밑에 ```<mapper>``` 루트 엘리먼트가 선언된다.        
```<mapper>``` 엘리먼트는 namespace 속성을 가지는데, 이 네임스페이스를 이용하여 더 쉽게 유일한 SQL 아이디를 만들 수 있다.     
네임스페이스가 지정된 Mapper SQL을 DAO 클래스에서 참조할 때는 네임스페이스와 SQL의 아이디를 결합하여 참조해야 한다.      

**Mapper XML**
```
<mapper namespace="BoardDAO">
  <delete id="deleteBoard">
    delete board where seq=#{seq}
  </delete>
</mapper>
```
  
**DAO 클래스**
```
public void deleteBoard(BoardVO vo){
  mybatis.delete("BoardDAO.deleteBoard",vo)
}
여기서 BoardDAO는 현재 클래스를 의미하는 것이 아닌  
XML <mapper>의 네임스페이스를 의미 deleteBoard도 마찬가지  
```
Mapper 파일에 SQL 명령어들을 등록할 때는 SQL 구문의 종류에 따라 적절한 엘리먼트를 사용한다.  
INSERT 구문은 ```<insert>``` 엘리먼트를,  
SELECT 구문은 ```<select>``` 엘리먼트를 사용하는 식이다.  
이때, 각 엘리먼트에서 사용할 수 있는 속성들이 다르므로 그 의미와 용도를 이해해야 한다.     

## 1.3. ```<select>``` 엘리먼트  
```<select>``` 엘리먼트는 데이터를 조회하는 SELECT 구문을 작성할 때 사용한다.    
```<select>``` 엘리먼트에는 parameterType과 resultType 속성을 사용할 수 있다.    
  
**Mapper XML**
```
<mapper namespace="BoardDAO">
  <select id="getBoard" parameterType="board" resultType="board">
    select * from board where seq=#{seq}
  </select>
  <select id="getBoardList" parameterType="board" resultType="board">
    select * from board 
    where title like '%'||#{searchKeyword}||'%'
    order by seq desc
  </select>
</mapper>
```
  
### (1) id 속성  
```<select>``` 엘리먼트에 선언된 id 속성은 필수 속성으로,      
반드시 전체 Mapper 파일들 내에서 유일한 아이디를 등록해야 한다.       
       
그래야 나중에 DAO 클래스에서 특정 아이디로 등록된 SQL을 실행할 수 있다.   
이 id 속성과 관련하여 살펴볼 것이 루트 엘리먼트인 ```<mapper>```이다.    
   
```<mapper>``` 엘리먼트에 설정된 네임스페이스는  
```<mapper>``` 엘리먼트 안에서 선언된 여러 아이디를 하나의 네임스페이스로 묶을 수 있다.    
   
예를 들어,  
다음 두 파일에 선언된 ```getTotalCount```라는 아이디는 네임스페이스가 다르므로 다른 아이디로 처리될 수 있다.           
  
**board-mapping.xml**
```
<mapper namespace="BoardDAO">
  <select id="getTotalCount" resultType="int">
    select count(*) from board
  </select>
</mapper>
```
  
**user-mapping.xml**
```
<mapper namespace="UserDAO">
  <select id="getTotalCount" resultType="int">
    select count(*) from users
  </select>
</mapper>
```  
  
### (2) parameterType 속성  
Mapper 파일에 등록된 SQL을 실행하려면 SQL 실행에 필요한 데이터를 외부로부터 받아야한다.  
이때 사용하는 속성이 parameterType 속성이다.    
parameterType 속성값으로는 일반적으로 기본형이나 VO 형태의 클래스를 지정한다.    
```
<insert id="insertBoard" parameterType="com.springbook.biz.board.BoardVO">
  insert into board(seq, title, writer, content)
  values ((select nvl(max(seq), 0)+1 from board), #{title}, #{writer}, #{content})
</insert>
```
이때 Mybatis 메인 설정 파일(sql-map-config.xml)에 등록된      
```<typeAlias>```의 Alias를 사용하면 설정을 더 간결하게 처리할 수 있다.  

**sql-map-config.xml**
```
<typeAliases>
  <typeAlias alias="board" type="com.springbook.biz.board.BoardVO"/>
</typeAliases>
```
**board-mapping.xml**
```
<select id="getBoard" parameterType="board" resultType="board">
  select * form board where seq = #{seq}
</select>
```

alias는 import 와 비슷하게 클래스의 전체경로를 사용하는 것을 줄이기 위해 사용한다.         
  
parameterType으로 지정된 클래스에는 사용자가 입력한 값들을 저장할 여러 변수가 있다.    
변수들을 이용하여 SQL 구문에 사용자가 입력값들을 설정하는데 이때, ```#{변수명}``` 표현을 사용한다.    
그리고 중요한 건 parameterType 속성은 생략할 수 있으며 대부분 생략한다.  
       
### (3) resultType 속성  
검색 관련 SQL 구문이 실행되면 ResultSet이 리턴되며,  
ResultSet에 저장된 검색 결과를 어떤 자바 객체에 매핑할지 지정해야 하는데,  
이때 사용하는 것이 resultType 속성이다. (즉 어떤 자료형으로 반환할지)   

**sql-map-config.xml**
```
<typeAliases>
  <typeAlias alias="board" type="com.springbook.biz.board.BoardVO"/>
</typeAliases>
```
**board-mapping.xml**
```
<select id="getBoard" parameterType="board" resultType="board">
  select * form board where seq = #{seq}
</select>
```
resultType 속성값으로도 Alias 를 사용할 수 있는데,   
만약 resultType 속성값으로 위와 같이 board를 사용했다면    
SELECT 실행 결과를 BoardVO 객체에 매핑하여 리턴하라는 의미이다.    
   
resultType 속성은 당연히 쿼리 명령어가 등록되는 ```<select>``` 엘리먼트에서만 사용할 수 있으며,  
parameterType 속성과 달리 ```<select>``` 엘리먼트에서 절대 생략할 수 없는 속성이다.     
다만 resultType 속성 대신에 나중에 살펴볼 resultMap 속성을 사용할 수 는 있다.  
       
### (4) ```<insert>``` 엘리먼트   
```<insert>``` 엘리먼트는 데이터베이스에 데이터를 삽입하는 INSERT 구문을 작성하는 요소이다.     
**Mapper XML**  
```
<insert id="insertBoard" parameterType="board">
  insert into board(seq, title, writer, content)
  values(#{seq}, #{title}, #{writer}, #{content})
</insert>
```
```<insert>``` 구문은 자식 요소로 ```<selectKey>``` 엘리먼트를 가질 수 있다.  
대부분 관계형 데이터베이스에서는 기본 키 필드의 자동 생성을 지원하는데,  
Mybatis에서는 ```<insert>```요소의 자식 요소인 ```<selectKey>```요소를 사용하여 생성된 키를 쉽게 가져올 수 있는 방법을 제공한다.
```
<insert id="insertBoard" parameterType="board">
  <selectKey KeyProperty="seq" resultType="int">
    select board_seq.nextval as seq from dual
  </selectKey>
  insert into board(seq, title, writer, content)
  values(#{seq}, #{title}, #{writer}, #{content})
</insert>
```
이 설정은 ```BOARD_SEQ```라는 시퀸스로부터 유일한 킷값을 얻어내어 글 등록에서 일련번호 값으로 사용하는 설정이다.  
       
### (5) ```<update>``` 엘리먼트   
```<update>``` 엘리먼트는 데이터를 수정할 때 사용되는 UPDATE 구문을 작성하는 요소이다.  
**Mapper XML**  
```
<mapper namespace="Board">
<update id="updateBoard" parameterType="board">
  update board set title=#{title}, content=#{content}
  where seq=#{seq}
</update>
</mapper>
```
       
### (6) ```<delete>``` 엘리먼트   
```<delete>``` 엘리먼트는 데이터를 삭제할 때 사용되는 DELETE 구문을 작성하는 요소이다.     
**Mapper XML**  
```
<mapper namespace="Board">
<delete id="deleteBoard" parameterType="board">
  delete board where seq=#{seq}
</delete>
</mapper>
```
   
***
# 2. SQL Mapper XML 추가 설정
## 2.1. resultMap 속성 사용
검색 결과를 특정 자바 객체에 매핑하여 리턴하기 위해서 parameterType 속성을 사용한다.    
그러나 검색 결과를 parameterType 속성으로 매핑할 수 없는 매핑할 수 없는 몇몇 사례가 있다.  
예를 들어, 검색 쿼리가 단순 테이블 조회가 아닌 JOIN 구문을 포함할 때는   
검색 결과를 정확하게 하나의 자바나 객체로 매핑할 수 없다.  
또는 검색된 테이블의 칼럼 이름과 매핑에 사용될 자바 객체의 변수 이름이 다를 때에   
검색 결과가 정확하게 자바 객체로 매핑되지 않는다.  
(반대로 생각하면 컬럼 이름과 자바 객체의 변수 이름이 같아야 된다는...)  
    
이럴 때 resultMap 속성을 사용하여 처리하면 된다.   
  
resultMap 속성을 사용하려면 먼저 ```<resultMap>```엘리 먼트를 사용하여 매핑 규칙을 지정해야 한다.  
```
<mapper namespace="Board">
<resultMap id="boardResult" type="board">
  <id property="seq" column="SEQ" />
  <result property="title" column="TITLE" />
  <result property="writer" column="WRITER" />
  <result property="content" column="CONTENT" />
  <result property="regDate" column="REGDATE" />
  <result property="cnt" column="CNT" />
</resultMap>

<select id="getBoardList" parameterType="board" resultMap="boardResult">
  select * from board
  where title like '%'||#{searchKeyword}||'%'
  order by seq desc
</select>  
</mapper>
```
위 설정에서는 boardResult라는 아이디로 ```<resultMap>```을 설정했다.   
```<resultMap>``` 설정은 PK에 해당하는 SEQ 컬럼만 ```<id>``` 엘리먼트를 사용했고,   
나머지는 ```<result>``` 엘리먼트를 이용하여 검색 결과로 얻어낸 컬럼의 값과 BoardVO 객체의 변수를 매핑하고 있다.  
이렇게 설정된 ```<resultMap>```을 getBoardList로 등록된 쿼리에서 resultMap 속성으로 참조하고 있다.    

## 2.2. CDATA Section 사용  
만약 SQL 구문 내에 ```<``` (비교 연산자) 기호를 사용한다면 에러가 발생한다.  
  
이는 XML 파서 XML 파일을 처리할 때 ```<```를 연산자가 아닌 태그의 시작으로 처리하기 때문이다.  
결국 Mapper 파일에 등록된 SQL 구문에서는 ```<```, ```>```같은 기호를 사용하면 에러가 발생한다.  
하지만 다음처럼 CDATA Section으로 SQL 구문을 감싸주면 에러는 사라진다.  
```
<![CDATA][
내용
]]>
```
**Mapper xml**
```
<select id="getBoard" resultType="board">
<![CDATA][
select * 
from board
where seq <= #{seq}
]]>
</select>
```
CDATA Section은 Mybatis와는 상관없는 XML 고유의 문법으로서,  
CDATA 영역에 작성된 데이터는 단순한 문자 데이터이므로 XML 파서가 해석하지 않도록 한다.  
결국, CDATA Section 안에 작성된 데이터는 XML 파서가 처리하지 않고 
데이터베이스에 그대로 전달하므로 문제가 발생하지 않는다.     
따라서 지금 당장은 아니더라도 나중에 ```<```, ```>```를 연산자로 사용할 것을 대비해    
모든 SQL 구문을 CDATA Section으로 처리하는 것이다.    

## 2.3. SQL 대문자로 설정하기  
Mapper 파일에 등록되는 SQL 구문은 일반적으로 대문자로 작성한다.  
사실 SQL 구문은 대소문자를 구분하지 않는다.  
따라서 어떻게 작성하든 상관없다.   
하짐나 파라미터들을 바인딩할 때 대부분 컬럼명과 변수명이 같으므로  
SQL 구문이 조금이라도 복잡해지면 이 둘을 구분하기가 쉽지 않다.    
따라서 SQL은 모두 대문자로 표현하여 좀 더 식별성을 높인다.   
   
예시)  
```
<update id="updateBoard">
  update board set
    title = #{title},
    content = #{content}
  where seq = #{seq}  
</update>
```
```
<update id="updateBoard">
  UPDATE BOARD SET
    TITLE = #{title},
    CONTENT = #{content}
  WHERE SEQ = #{seq}  
</update>
```
지금까지 살펴본 내용들이 모두 반영된 최종 Mapper 파일은 다음과 같다.  
**board-mapping.xml**
```
<?xml version="1.0" encoding="UTF-8" ?>
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
			VALUES ((SELECT NVL(MAX(SEQ), 0)+1 FROM BOARD), 
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
			DELETE BOARD WHERE SEQ=#{seq}
		]]>
	</delete>
	<select id="getBoard" resultType="board">
		<![CDATA[
			SELECT * 
			FROM BOARD
			WHERE SEQ 
			
		<= #{seq}
		]]>
	</select>
	<select id="getBoardList" parameterType="board"
		resultMap="boardResult">
		<![CDATA[
			SELECT * FROM BOARD
			WHERE TITLE LIKE '%'||#{searchKeyword}||'%'
			ORDER BY SEQ DESC
		]]>
	</select>
</mapper>
```
  
***
# 3. Mybatis JAVA API
## 3.1. SqlSessionFactoryBuilder 클래스  
Mybatis Mapper 설정이 끝났으면 이제 남은 직업은 Mybatis 프레임워크에서 제공하난 API를 이용해서 dAO 클래스를 구현하는 것이다.  
Mybatis로 DAO 클래스의 CRUD 메소드를 구현하려면 Mybatis에서 제공하는 SqlSession 객체를 사용해야 한다.  
그런데 SqlSession 객체는 SqlSessionFactory로부터 얻어야 하므로 가장 먼저 해야할 직업은 SqlSessionFactory 객체를 생성하는 일이다.  
   
SqlSesssionFactory 객체를 생성하려면 SqlSessionFactoryBuilder()의 build() 메소드를 이용하는데,  
build() 메소드는 Mybatis 설정 파일(sql-map-config.xml)을 로딩하여 SqlSessionFactory 객체를 생성한다.  
  
그리고 sql-map-config.xml 파일을 로딩하려면 입력 스트림인 Reader 객체가 필요하다.  
Reader 객체는 Resources 클래스의 getResourceAsReader() 메소드를 사용하여 얻어낼 수 있다.  
다음은 SqlSessionFactory 객체를 생성하는 데 사용된 자바 코드이다.  

```java
Reader reader = Resources.getResourceAsReader("sql-map-config.xml");
SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(reader);
```
  
## 3.2. SqlSessionFactory 클래스 
SqlSessionFactorysms 이름에서 알 수 있듯이 SqlSession 객체에 대한 공장 역할을 수행한다.  
SqlSessionFactory 객체는 openSession() 이라는 메소드를 제공하며  
이 메소드를 이용해서 SqlSession 객체를 얻을 수 있다.    
이렇게 얻어낸 SqlSession 객체를 통해 글 등록 기능등을 처리할 수 있다.   

```java
SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(reader);
SqlSession session = sessionFactory.openSession();
session.insert("BoardDAO.insertBoard", vo);
```

## 3.3. 유틸리티 클래스 작성  
Mybatis를 사용하여 DB 연동을 간단하게 처리하려면 최종적으로 Mybatis가 제공하는 SqlSession 객체를 사용해야 한다.  
따라서 모든 DAO 클래스에서 좀 더 쉽게 SqlSession 객체를 획득할 수 있도록 공통으로 제공할 유틸리티 클래스를 만드는 것이다.  

**SqlSessionFactoryBean**

```java
package com.springbook.biz.util;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlSessionFactoryBean {
	private static SqlSessionFactory sessionFactory = null;
	static {
		try {
			if (sessionFactory == null) {
				Reader reader = Resources.getResourceAsReader("sql-map-config.xml");
				sessionFactory = new SqlSessionFactoryBuilder().build(reader);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static SqlSession getSqlSessionInstance() {
		return sessionFactory.openSession();
	}
}
```
물론 지금 이런 유틸리티 클래스르 우리가 직접 작성하지만,  
나중에 Mybatis를 스프링과 연동할 때는 스프링 프레임워크에서 제공하는 클래스를 사용하면 된다.  
  
## 3.4. SqlSession 객체  
SqlSession 객체는 Mapper XML에 등록된 SQL을 실행하기 위한 다양한 API를 제공한다.  
  
### (1) selectOne() 메소드  
selectOne() 메소드는 오직 하나의 데이터를 검색하는 SQL 구문을 실행할 때 사용한다.  
따라서 getBoard() 같은 단 건 조회용 메소드를 구현할 때 사용할 수 있다.    
  
쿼리가 한 개의 레코드만 리턴되는지를 검사하므로 만약 쿼리의 수행 결과로 두 개 이상의 레코드가 리턴될 때는 예외가 발생한다.  

```java
public Object selectOne(String statement)
public Object selectOne(String statement, Object Parameter)
```
selectOne() 메소드의 statement 매개변수는 MapperXML 파일에 등록된 SQL의 아이디이다.  
이때, SQL의 아이디를 네임스페이스와 결합하여 지정해야 한다.  
그리고 실행될 SQL 구문에서 사용할 파라미터 정보를 두 번째 인자로 지정하면 된다.  
  
**반환형이 Object 이므로 형변환 시키는 것이 좋다**
```java
	public BoardVO getBoard(BoardVO vo) {
		return (BoardVO)mybatis.selectOne("BoardDAO.getBoard", vo);
	}
```

### (2) selectList() 메소드
selectList() 메소드는 여러 개의 데이터가 검색되는 SQL 구문을 실행할 때 사용한다.  
매개변수의 의미는 selectOne() 메소드와 같다.  

```java
public List selectList(String statement)
public List selectList(String statement, Object Parameter)
```
**반환형이 List 인데 이는 List<?>를 의미하므로 알맞게 형변환 시켜서 값을 저장하는 것이 좋다**  
```java
public List<BoardVO> getBoardList(BoardVO vo) {
		return mybatis.selectList("BoardDAO.getBoardList", vo);
	}
```   
  
### (3) insert(), update(), delete() 메소드   
insert(), update(), delete() 메소드는 각각 INSERT, UPDATE, DELETE SQL 구문을 실행할 때 사용한다.  
각각의 메소드는 실행된 SQL 구문으로 인해 몇 건의 데이터가 처리되었는지를 리턴한다.  
  
```java
public int insert(String statement, Object parameter)
public int update(String statement, Object parameter) throws SQLException
public int delete(String statement, Object parameter) throws SQLException
```
다음은 SqlSession 객체를 이용하여 구현한 BoardDAO 클래스의 전체 소스다.  
   
**BoardDAO**
```
package com.springbook.biz.board.impl;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.springbook.biz.BoardVO;
import com.springbook.biz.util.SqlSessionFactoryBean;

@Repository("boardDAO")
public class BoardDAO {
	
	private SqlSession mybatis;
	public BoardDAO() {
		mybatis = SqlSessionFactoryBean.getSqlSessionInstance();
	}
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
