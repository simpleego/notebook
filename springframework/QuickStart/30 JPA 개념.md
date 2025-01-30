30 JPA 개념
=======================
우리가 사용하는 대부분 프로그램은    
사용자가 입력한 데이터나 비즈니스 로직 수행결과로 얻은 데이터를 재사용 할 수 있도록 데이터베이스에 저장한다.     
하지만 자바의 객체와 데이터베이스의 테이블이 정확하게 일치하지 않는다.       
따라서 둘 사이를 매핑하기 위해 많은 SQL 구문과 자바 코드가 필요할 수밖에 없다.      
  
ORM은 이렇게 정확하게 일치하지 않는 자바 객체와 테이블 사이를 매핑해준다.  
다시 말하면 ORM은 자바 객체에 저장된 데이터를 테이블의 Row 정보로 저장하고,  
반대로 테이블에 저장된 Row 정보를 자바 객체로 매핑해준다.  
이 과정에서 사용되는 SQL 구문과 자바 코드는 ORM 프레임워크가 자동으로 만들어준다.  
   
우리는 지금까지 스프링 JDBC나 Mybatis를 이용하여 자바 객체와 테이블을 매핑해왔다.   
하지만 어떤 DB 연동 기술이나 프레임워크를 사용하더라도   
SQL 명령어를 자바 클래스나 외부의 XML 파일에 작성해야 했다.       
그리고 이렇게 작성된 SQL은 유지보수 과정에서 지속적으로 수정되며 새로운 SQL이 추가되기도 한다.     
    
ORM 프레임워크의 가장 큰 특징이자 장점은 DB 연동에 필요한 SQL을 자동으로 생성한다는 것이다.    
또한, 이렇게 생성되는 SQL은 DBMS가 변경될 때 자동으로 변경된다.(각 제품에 맞는 쿼리를 작성해준다)  
다만 ORM 환경설정 파일 어딘가에 DBMS가 변경되었다는 것만 수정해주면 된다.   
   
사실 개발자들은 오래전부터   
객체와 테이블 간의 불일치 때문에 발생하는 여러 문제점을 해결하기 위해 다양한 노력을 기울여 왔다.    
그 과정에서 등장한 것이 EJB의 EntityBean 기술이다.    
하지만 EJB의 EntityBean은 기술적 완성도가 높지 않아서 성능이나 복잡한 구현등의 문제로 개발자로부터 외면당했다.  
그러던 중 등장한것이 Hibernate 프레임워크다.  
Hibernate 프레임워크는 완벽한 ORM 프레임워크이며 자바 객체와 테이블의 ROW를 매핑하는 역할을 수행한다.  
   
이렇게 편리한 Hibernate는  
오랜 시간을 거치면서 기능도 추가되고 성능도 향상되어 ORM의 대표 프레임워크가 되었다.    
하지만 Hibernate 말고도 TopLink나 Cocobase 같은 다른 ORM 프레임워크들도 하나씩 등장하기 시작했다.  
그래서 이런 ORM 프레임워크들에 대한 표준화 작업이 필요했고 그런 노력의 결과가 바로 JPA인 것이다.  
    
# 1. JPA의 특징
JPA는 모든 ORM 구현체들의 공통 인터페이스를 제공한다.  
JPA를 JDBC API와 비교하여 이해하면 편하다.     
   
[사진]   
  
JDBC는 특정 DBMS에 종속되지 않는 DB 연동 구현을 지원한다.  
DB 연동 로직을 구현할 때, JDBC API의 인터페이스들을 이용하면    
실질적인 DB 연동 처리는 해당 DBMS의 드라이버 클래스들이 담당하는 구조이다.   
따라서 DBMS가 변경되는 상황에서도 드라이버만 변경하면 JDBC API를 이용하는 애플리케이션은 수정하지 않는다.   
  
결국, 개발 당시에는 MySQL을 사용하다가 실제 서비스가 오픈될 때는 Oracle로 변경할 수도 있다.  
JAP도 JDBC와 마찬가지이다.    
애플리케이션을 구현할 때, JAP API를 이용하면 개발 당시에는 Hibernate를 ORM 프레임워크로 사용하다가   
실제 서비스가 시작될 때는 TopLink로 변경할 수가 있다  
   
***
# 2. JPA 프로젝트 생성   
JPA 프로젝트는 이클립스 JPA 마법사를 이옹해도 되지만,  
JAP project는 추가로 설정해야 하는 것들이 있어서 일단은 Maven 기반으로 프로젝트를 생성하도록 한다,.  
   
1. 이클립스의 [File] -> [New] 메뉴에서 [Maven Project]를 차례로 선택한다.  
2. 변경할 내용이 없으므로 ```<Next>``` 버튼을 클릭한다.   
3. 일단 자바 프로젝트로 생성할 것이므로   
기본인 ```maven-archetype-quickstart```가 선택된 상태에서 ```<Next>``` 버튼을 클릭한다.    
5. 다음은 Maven 프로젝트 관련 설정 화면이다.  
```
Group Id    : com.springbook.biz.board
Artifact Id : JPAProject
Version     : 0.0.1-SNAPSHOT
Package     : com.springbook.biz.board
```
6. 프로젝트가 생성되었을 때 JRE System Library 버전이 ```[J2SE-1.5]```로 기본 설정되어 있다.    
이를 수정하기 위해 JPAProject에서 마우스 오른쪽 버튼을 클릭하여 맨 아래에 있는 ```[Properties]```를 선택한다.  
7. 왼쪽에 ```[Project Facets]``` 탭을 선택하고 ```Convert to faceted form``` 링크를 클릭한다.  
8. 우선 아래에 있는 ```JPA``` 항목을 체크한다.    
그리고 오른쪽에 ```[Runtime]``` 탭에서 ```jdk1.8.0_73```을 체크한 후에    
```<Apply>```,```<OK>``` 버튼을 차례로 클릭하여 설정을 마무리한다.    
9. 그런데 ```<Apply>``` 버튼이 여전히 비활성화 되어있고 ```<Apply>``` 버튼 위에 문장이   
```Further configuration required```로 출력된다면 우선 해당 링크를 클릭한다.    
10. JPA Facet 창이 열리면 JPA Implementation 항목에서  
Type을 ```Disable Library Configuration```으로 선택하고 ```<OK>``` 버튼을 클릭한다.  
11. 이 과정을 거치면 ```<Apply>```와 ```<OK>``` 버튼이 활성화 된다.   
이렇게 Maven Project가 JPA 프로젝트로 변경되었으면 ```src/main/java``` 소스 폴더에   
META-INF 폴더와 그 아래에 JPA 환경 설정 파일인 persistence.xml이 생성된 것을 확인할 수 있다.  
   
***
# 3. JPA 라이브러리 내려받기  
프로젝트에 JPA 관련 라이브러리들을 추가하기 위해서 pom.xml 파일을 수정한다.    
     
**pom.xml**  
```
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.springbook.biz.board</groupId>
	<artifactId>JPAProject</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>JPAProject</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>

	<dependencies>
		<!-- JUNIT -->
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>3.8.1</version>
			<scope>test</scope>
		</dependency>
		<!-- JPA, 하이버네이트 -->
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-entitymanager</artifactId>
			<version>5.1.0.Final</version>
		</dependency>
		<!-- H2 데이터베이스 -->
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<version>1.4.200</version>
		</dependency>
	</dependencies>
</project>
```
이후에 Maven Dependencies에 추가된 라이브러리들을 확인한다.    
   
***
# 4. JPA 시작하기
## 4.1. 엔티티 클래스 매핑  
JPA를 이용하는 간단한 프로젝트를 통해서 JPA를 구성하는 요소들이 어떤 것들이 있는지 확인해보도록 하자.     
  
가장 먼저 할 일은 데이터베이스의 테이블과 매핑될 영속 클래스를 작성하여 매핑 관련 설정을 추가하는 것이다.    
엔티티 클래스를 작성하는데 특별한 제약조건이나 규칙이 있는 것은 아니므로 일반적인 VO 클래스를 만들 때처럼 작성하면 된다.  
하지만 될 수 있으면 이클립스에서 제공하는 JPA Entity 생성 기능을 이용하자  
  
1. ```src/main/java``` 소스 폴더에 생성되어 있는 com.springbook.biz.board 패키지에서  
마우스 오른쪽 버튼을 클릭하여 ```[New]``` -> ```[JPA Entity]```를 선택한다.      
2. Class name 에 ```Board```라고 입력하고 ```<Finish>``` 버튼을 클릭한다.  
 
그러면 ```/META-INF/persistence.xml```파일에 다음과 같이 Board 라는 엔티티 크랠스가 자동으로 등록되는 것을 확인할 수 있다.  

**persistence.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd">
	<persistence-unit name="JPAProject">
		<class>com.springbook.biz.board.Board</class>
	</persistence-unit>
</persistence>
```
이제 엔티티 클래스에 JPA 매핑 관련 어노테이션을 설정한다.  
엔티티 클래스의 모든 멤버변수를 private으로 선언한다.  
특히 일반적인 프로그램에서는 객체를 식별하기 위해서 유일 식별자를 사용하지는 않지만,  
영속 객체가 테이블과 매핑될 때 객체 식별 방법이 필요하므로 유일 식별자를 소유하는 클래스로 작성한다.  

**기존에 생성된 Board.java**
```
package com.springbook.biz.board;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: Board
 *
 */
@Entity

public class Board implements Serializable {

	
	private static final long serialVersionUID = 1L;

	public Board() {
		super();
	}
   
}
```
에러가 나는 기본 적인 상태이다 이제 이를 Board 테이블에 맞춰서 작성해보자  

**Board.java**
```
package com.springbook.biz.board;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name = "BOARD")
public class Board{
	@Id
	@GeneratedValue
	private int seq;
	private String title;
	private String writer;
	private String content;
	@Temporal(TemporalType.DATE)
	private Date regDate = new Date();
	private int cnt;

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public int getCnt() {
		return cnt;
	}

	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	
	@Override
	public String toString() {
		return "BoardVO [seq=" + seq + ", title=" + title + ", writer=" + writer + ", content=" + content + ", regDate="
				+ regDate + ", cnt=" + cnt + "]";
	}
}

```
Board 라는 엔티티 클래스에 설정된 각 어노테이션의 의미는 표 4-1과 같다.  
  
[사진]   
    
```
@Entity : @Entity가 설정된 클래스를 엔티티 클래스라고 하며, @Entity가 붙은 클래스는 테이블과 매핑된다.  
@Table  : 엔티티와 관련된 테이블을 매핑한다. name 속성을 사용하여 Board 테이블과 매핑했는데 생략하면 클래스 이름이 테이블 이름과 매핑된다.  
@Id     : 엔티티 클래스의 필수 어노테이션으로서, 특정 변수를 테이블의 기본 키와 매핑한다. @Id 가 없는 엔티티 클래스는 JPA가 처리하지 못한다.  
@GeneratedValue : @Id가 선언된 필드에 기본키를 자동으로 생성하여 할당할 때 사용한다. 다양한 옵션이 있지만 @GeneratedValue만 사용하면 데이터베이스에 따라서 자동으로 결정된다. 
@Temporal : 날짜 타입의 변수에 선언하여 날짜 타입을 매핑할 때 사용한다. TemporalType의 DATE, TIME, TIMESTAMP 중 하나를 선택할 수 있다.  
```  
매핑할 정보가 없는 나머지 필드들은 자동으로 BOARD 테이블의 동일한 칼럼과 매핑된다.  
  
## 4.2. persistence.xml 파일 작성  
JPA는 persistence.xml 파일을 사용하여 필요한 설정 정보를 관리한다.  
이 설정 파일이 META-INF 폴더 아래에 있으면 설정 없이 JPA가 인식한다.  
  
**persistence.xml**
JPA는 persistence.xml 파일을 사용하여 필요한 설정 정보를 관리한다.   
이 설정 파일이 META-INF 폴더 아래에 있으면 별도의 설정 없이 JPA가 인식한다.  
  
**persistence.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd">
	<persistence-unit name="JPAProject">
		<class>com.springbook.biz.board.Board</class>
		<properties>
			<!-- 필수 속성 -->
			<property name="javax.persistence.jdbc.driver" value="org.h2.Driver"/>
			<property name="javax.persistence.jdbc.user" value="sa"/>
			<property name="javax.persistence.jdbc.password" value=""/>
			<property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"/>	
			<property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
			
			<!-- 옵션 -->
			<property name="hibernate.show_sql" value="true"/>
			<property name="hibernate.format_sql" value="true"/>
			<property name="hibernate.use_sql_comments" value="false"/>
			<property name="hibernate.id.new_generator_mappings" value="true"/>
			<property name="hibernate.hbm2ddl.auto" value="create"/>
		</properties>
	</persistence-unit>
</persistence>
```
persistence.xml 파일은 JPA에서 메인 환경설정 파일이다.  
persistence.xml 파일에는 ```<persistence>```를 루트 엘리먼트로 사용하며, 영속성 유닛이 설정되어 있다.   
영속성 유닛은 연동할 데이터베이스당 하나의 영속성 유닛을 사용한다.  
  
## 4.3. 클라이언트 프로그램 작성  
지금까지 작성된 JPA 관련 모든 설정을 저장하고 이 설정에 기초한 클라이언트 프로그램을 구현해보자  

**BoardServiceClient**
```
package com.springbook.biz.board;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class BoardServiceClient {

	public static void main(String[] args) {
		// EntityManager 생성
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("JPAProject");
		EntityManager em = emf.createEntityManager();

		// Transaction 생성
		EntityTransaction tx = em.getTransaction();

		try {
			// Transaction 시작
			tx.begin();

			Board board = new Board();
			board.setTitle("JPA 제목");
			board.setWriter("관리자");
			board.setContent("JPA 글 등록 잘되네요");

			// 글 등록
			em.persist(board);

			// 글 목록 조회
			String jpql = "select b from Board b order by b.seq desc";
			List<Board> boardList = em.createQuery(jpql, Board.class).getResultList();

			for (Board brd : boardList) {
				System.out.println("--->" + brd.toString());
			}
			// Transaction commit
			tx.commit();
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
		} finally {
			em.close();
		}
		emf.close();
	}

}
```
작성된 클라이언트 프로그램의 구조를 보면  
가장 먼저 영속성 유닛을 이용하여 EntityManagerFactory 객체를 생서앟고 있다.  
JPA를 이용하여 CRUD 기능을 구현하려면 EntityManager 객체를 사용해야 한다.  
그런데 이 EntityManager 객체는 EntityManagerFactory 객체로부터 얻어낼 수 있다.  
  
마지막으로 작성된 BoardServiceClient 프로그램을 실행하고 실행 결과를 확인해보자  

```
Hibernate: 
    drop table BOARD if exists
Hibernate: 
    drop sequence if exists hibernate_sequence
Hibernate: create sequence hibernate_sequence start with 1 increment by 1
Hibernate: 
    create table BOARD (
        seq integer not null,
        cnt integer not null,
        content varchar(255),
        regDate date,
        title varchar(255),
        writer varchar(255),
        primary key (seq)
    )
```
```
Hibernate: 
    insert 
    into
        BOARD
        (cnt, content, regDate, title, writer, seq) 
    values
        (?, ?, ?, ?, ?, ?)
Hibernate: 
    select
        board0_.seq as seq1_0_,
        board0_.cnt as cnt2_0_,
        board0_.content as content3_0_,
        board0_.regDate as regDate4_0_,
        board0_.title as title5_0_,
        board0_.writer as writer6_0_ 
    from
        BOARD board0_ 
    order by
        board0_.seq desc
--->BoardVO [seq=1, title=JPA 제목, writer=관리자, content=JPA 글 등록 잘되네요, regDate=Sun Jan 12 16:35:44 KST 2020, cnt=0]
```
Hibernate를 JPA 구현체로 사용했으므로 실행 결과에는 Hibernate가 출력한 다양한 로그를 확인할 수 있다.    
우선 hibernate_sequence라는 시퀀스를 통해 입력할 게시글의 일련번호를 얻어낸 후, 글 등록을 처리하고 있다.     
이때 INSERT 구문이 자동으로 생성되어 처리되고 있는 것이 확인된다.       
또한, 글 목록 조회와 관련된 SELECT 구문 역시 자동으로 생성되고 있다.    
다만, Alias가 복잡하게 사용되어 모양은 다소 이상해 보이지만 정상적인 SELECT 구문이다.  
  

