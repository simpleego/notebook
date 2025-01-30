31 JPA 환경설정
=======================
대부분 프레임워크는 실행에 필요한 다양한 환경설정을 XML 파일로 처리한다.  
JPA역시 VO 객체와 테이블을 매핑하기 위한 다양한 설정 정보가 필요한데,  
이를 위해 persistence.xml 파일을 환결설정 파일로 사용한다.  
  
persistence.xml 파일은 ```<persistence>```를 루트 엘리먼트로 사용하며,     
영속성 유닛과 관련된 다양한 정보가 설정된다.    
    
# 1. 영속성 유닛 설정
## 1.1. 영속성 유닛 이름 지정
영속성 유닛은 연동할 데이터베이스당 하나씩 등록하며,  
영속성 유닛에 설정된 이름은 나중에 DAO 클래스를 구현할 때 EntityManagerFactory 객체 생성에 사용된다.   

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
```
~생략~
	<persistence-unit name="JPAProject">
~생략~
```

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
```
~ 생략 ~
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("JPAProject");
~ 생략 ~ 
```
JPA를 이용하여 DB 연동을 구현하려면 EntityManager 객체가 필요하다.    
그런데 EntityManager를 얻으려면 EntityManger 객체를 생성하기 위한 공장 기능의 EntityManagerFactory 객체가 필요하다.    
이 EntityManagerFactory를 생성할 때, 영속성 유닛이 사용된다.  
  
## 1.2. 엔티티 클래스 등록  
영속성 유닛 설정에서 가장 먼저 엔티티 클래스를 등록하는데,  
이 엔티티 클래스는 JPA 프로젝트에서 JPA Entity 클래스를 작성하는 순간 자동으로 persistence.xml 파일에 등록된다.    
**persistence.xml**
```
	<persistence-unit name="JPAProject">
		<class>com.springbook.biz.board.Board</class>
 	</persistence-unit>
```
사실 스프링 프레임워크나 J2EE 환경에서 JPA를 사용한다면   
자동으로 엔티티 클래스를 검색하여 처리하는 기능이 제공되므로 엔티티 클래스들을 일일이 등록할 필요는 없다.    
하지만 JPA를 단독으로 사용하는 경우라면 엔티티 클래스를 등록하는 것이 가장 확실한 방법이므로 이 방법을 권장한다.    
  
## 1.3. 영속성 유닛 프로퍼티 설정 
엔티티 클래스를 등록했으면 이제 엔티티 클래스의 영속성 관리에 필요한 프로퍼티들을 설정해야 하는데,  
이중에서 가장 기본이면서 중요한 것이 DB 커넥션 관련 설정이다.  
이 DB 커넥션 정보를 바탕으로 하이버네이트 같은 JPA 구현체가 특정 데이터베이스와 커넥션을 맺을 수 있기 때문이다.  
  
하지만 스프링 프레임워크와 연동할 때는   
데이터소스가 스프링 설정 파일에 등록되어 있으므로 영속성 유닛 설정에서는 제거될 수도이 있다.      
   
**persistence.xml**
```

<!-- 필수 속성 -->
			<property name="javax.persistence.jdbc.driver" value="org.h2.Driver"/>
			<property name="javax.persistence.jdbc.user" value="sa"/>
			<property name="javax.persistence.jdbc.password" value=""/>
			<property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"/>	
				
```
각 프로퍼티의 의미는 아래 표와 같다.  
  
[사진]  
  
```
javax.persistence.jdbc.driver     : JDBC 드라이버 클래스
javax.persistence.jdbc.user       : 데이터베이스 아이디
javax.persistence.jdbc.password   : 데이터베이스 비밀번호
javax.persistence.jdbc.url        : JDBC URL 정보

```
  
## 1.4. Dialect 클래스 설정
ORM 프레임워크의 가장 중요한 특징이자 장점은 애플리케이션 수행에 필요한 SQL 구문을 자동으로 생성한다는 것이다.    
그런데 문제는 이 SQL을 아무리 표준에 따라서 잘 작성한다고 해도 DBMS에 따라서 키 생성 방식도 다르고 지원되는 함수도 조금씩 다르다.  
따라서 DBMS가 변경되면 이런 세세한 부분을 개발자가 적절하게 수정해야 한다.  
    
JPA 는 특정 DBMS에 최적화된 SQL을 제공하기 위해서 DBMS마다 다른 Dialect 클래스를 제공한다.     
Dialect는 사투리 혹은 방언이라는 의미인데, 이 Dialect 클래스가 해당 DBMS에 최적화된 SQL 구문을 생성한다.      
우리는 H2 데이터베이스를 사용하고 있으므로 H2Dialect 클래스를 등록하면 된다.     
```
			<property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
```
이제 DBMS가 변경되는 경우 Dialect 클래스만 변경하면 SQL이 자동으로 변경되어 생성되므로 유지보수는 크게 향상될 것이다.    
Dialect 클래스들의 정확한 위치는 Maven Dependencies에서 hibernate-core-5.1.0.Final.jar 파일이다.  
직접 해당 라이브러리를 확인해보면 알겠지만 현존하는 대부분 관계형 데이터베이스에 해당하는 Dialect 클래스들이 제공된다.  
  
[사진]   
   
```

DB2			: org.hibernate.dialect.DB2Dialect
PostgreSQL		: org.hibernate.dialect.PostgreDialect
MySQL			: org.hibernate.dialect.MySQLDialect
Oracle			: org.hibernate.dialect.OracleDialect
Oracle 9i/10g		: org.hibernate.dialect.Oracle9Dialect
Sybase			: org.hibernate.dialect.SybaseDialect
Microsoft SQL Server	: org.hibernate.dialect.SQLServerDialect
SAP DB			: org.hibernate.dialect.SAPDBDialect
H2			: org.hibernate.dialect.H2Dialect

```
  
## 1.5. JPA 구현체 관련 속성 설정  
마지막으로 하이버네이트 관련 속성 설정이 등장하는데,   
이는 우리가 사용할 JPA 구현체가 하이버네이트 프레임워크이기 때문이다.   

```
			<!-- 옵션 -->
			<property name="hibernate.show_sql" value="true"/>
			<property name="hibernate.format_sql" value="true"/>
			<property name="hibernate.use_sql_comments" value="false"/>
			<property name="hibernate.id.new_generator_mappings" value="true"/>
			<property name="hibernate.hbm2ddl.auto" value="create"/>
```
각 속성의 의미는 아래 표와 같다.
   
[사진]   
    
```
hibernate.show_sql			: 생성된 SQL을 콘솔에 출력한다.
hibernate.format_sql			: SQL을 출력할 때, 일정한 포맷으로 보기 좋게 출력한다.	
hibernate.use_sql_comments		: SQL에 포함된 주석도 같이 출력한다.
hibernate.id.new_generator_mappings	: 새로운 키 생성 전력을 사용한다.  
hibernate.hbm2ddl.auto			: 테이블 생성이나 수정, 삭제 같은 DDL 구문을 자동으로 처리할지를 지정한다.
```
이 중에서 DDL 명령어와 관련된 ```hibernate.hbm2ddl.auto``` 설정이 중요한데,  
속성값으로 아래 표와 같은 것들을 사용할 수 있다.  
  
[사진]  
  
```
create		: 애플리케이션을 실행할 때, 기존 테이블을 삭제하고 엔티티 클래스에 설정된 매핑 설정을 참조하여 새로운 테이블을 생성한다.(DROP -> CREATE)
create-drop	: create 와 같지만 애플리케이션이 종료되기 직전에 생성된 테이블을 삭제한다. (DROP -> CREATE -> DROP)
update 		: 기존에 사용 중인 테이블이 있으면 새 테이블을 생성하지 않고 재사용한다. 만약 엔티티 클래스의 매핑 설정이 변경되면 변경된 내용만 반영한다. (ALTER) 
```
이전에 작업했던 JPAProject를 실행시켜보면 create로 되어 있으므로 기존 테이블을 삭제했다 다시 만드는 것을 알 수 있다.  
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
DDL 자동 생성 기능은 애플리케이션 실행 시점에 테이블이 자동으로 생성되므로 굉장히 편리해 보인다.    
하지만 일반적으로 프로젝트 초기에 데이터 모델링이 마무리되고 나서 비즈니스 컴포넌트 개발로 들어가므로    
이 기능을 사용할 일은 거의 없을 것이다.  
다만 초기에 엔티티 클래스와 테이블 매핑을 연습하는 상황에서는 이 기능을 사용하면 학습에 도움된다.  

다음은 영속성 유닛 관리에 필요한 기본적인 내용이 모두 설정된 persistence.xml 파일이다.
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
   
***
# 2. 엔티티 클래스 기본 매핑
JPA의 기본은 엔티티 클래스를 기반으로 관계형 데이터베이스에 저장된 데이터를 관리하는 것이다.  
엔티티 클래스를 작성하는데 아주 복잡한 규칙은 없다.   
물론 public 클래스로 만들어야 하고, 기본 생성자가 반드시 있어야 하는 등의 제약은 있지만,  
이런 제약은 큰 의미가 없다.    
그냥 ValueObject 처럼 POJO 클래스로 작성하면 된다.  
  
사실 엔티티 매핑에서 가장 복잡하고 중요한 설정은 연관 매핑 설정이다.    
연관 매핑은 JPA에서 가장 복잡하고 중요한 개념이지만 전문적인 지식을 요구하므로      
이번 시간에는 가장 기본적인 엔티티 매핑 정보만 확인하도록 하자     
   
## 2.1. @Entity, @Id
@Entity는 특정 클래스를 JPA가 관리하는 엔티티 클래스로 인식하는 가장 중요한 어노테이션이다.  
엔티티 클래스 선언부 위에 @Entity를 붙이면 JPA가 이 클래스를 엔티티 클래스로 인식하여 관련된 테이블과 자동으로 매핑 처리한다.    

엔티티 클래스와 매핑되는 테이블은 각 ROW를 식별하기 위한 PK 칼럼을 가지고 있다.  
이런 테이블과 매핑되는 엔티티 클래스 역시 PK 칼럼과 매핑될 변수를 가지고 있어야 하며,  
이런 변수를 식별자 필드라고 한다.   
이 식별자 필드는 엔티티 클래스라면 무조건 가지고 있어야 하며 @Id를 이용하여 선언한다.  

**Board 일부**
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
```
@Entity가 추가된 Board 클래스는 BOARD 테이블과 자동으로 매핑된다.  
만약 Board 클래스와 다른 테이블을 매핑하려면 @Table을 사용해야 한다.   
     
## 2.2. @Table
엔티티 클래스를 정의할 때 엔티티 클래스와 매핑되는 테이블 이름을 별도로 지정하지 않으면  
엔티티 클래스 이름과 같은 이름의 테이블이 자동으로 매핑된다.   
  
그러나 실제로는 엔티티 클래스 이름과 테이블 이름이 다른 경우가 발생하는데,   
이때 @Table을 이용하여 매핑되는 테이블 이름을 지정하면 된다.  
  
@Table은 다양한 속성을 가질 수 있으며, 중요한 몇 가지 속성을 정리해보면 아래와 같다.   
    
[사진]     
      
```
name 			: 매핑될 테이블 이름을 지정한다.  
catalog 		: 데이터베이스 카탈로그를 지정한다.  
schema			: 데이터베이스 스키마를 지정한다.  
uniqueContraints	: 결합 unique 제약조건을 지정하며, 여러 개의 칼럼이 결합되어 유일성을 보장해야 하는 경우 사용한다.  
```
다음은 Board 클래스에 @Table을 적용해 본 것이다.  
설명을 위한 예 이므로 실제 Board 클래스에 선언하지 말자  

**예시 Board**
```
import javax.persistence.Table;

@Entity
@Table(name="E_BOARD", uniqueConstraints={@UniqueConstraint(columnNames={"SEQ","WRITER"})})
public class Board implements Serializable{
	@Id
	private int seq;
	private String title;
}
```
위 설정은 Board라는 엔티티클래스가 E_BOARD 테이블과 매핑된다.  
그리고 SEQ와 WRITER 두 개의 컬럼을 결합했을 때 유일한 값만 유지해야 한다.  
       
## 2.3. @Column
@Column은 엔티티 클래스의 변수와 테이블의 칼럼을 매핑할 때 사용한다.  
일반적으로 엔티티 클래스의 변수 이름과 칼럼 이름이 다를 때 사용하며,   
생략하면 기본으로 변수 이름과 칼럼 이름을 동일하게 매핑한다.   
즉, title 변수는 TITLE 칼럼과 자동으로 매핑된다.     

@Column이 지원하는 속성은 매우 다양하지만,   
일반적으로 칼럼 이름 지정에 사용하는 name과 Null 데이터 입력을 방지하는 nullable만 사용한다.  
  
다음 표는 @Column에 사용할 수 있는 다양한 속성들을 정리한 것이다.  
  
[사진]  
  
```
name 		 : 칼럼 이름을 지정한다.(생략시 변수명과 동일하게 매핑) 
unique		 : unique 제약조건을 추가한다. (기본은 false)
nullable	 : null 상태 허용 여부를 지정한다 (기본은 false)
insertable	 : 입력 SQL 명령어를 자동으로 생성할 때 이 칼럼을 포함할 것인지를 지정한다. (기본은 true)  
updatable	 : 수정 SQL 명령어를 자동으로 생성할 때 이 칼럼을 포함할 것인지를 지정한다. (기본은 true)
columnDefinition : 이 칼럼에 대한 DDL 문을 직접 설정한다.  
length		 : 문자열 타입의 칼럼 길이를 지정한다. (기본 255)
precision	 : 숫자 타입의 전체 자릿수를 지정한다. (기본 0)
scale		 : 숫자 타입의 소수점 자릿수를 지정한다. (기본 0)
```
다음은 @Column을 Board 클래스에 적용해본 것이다.  
설명을 위한 예이므로 실제 Board 클래스에 선언하지는 않는다.   
  
**예시 Board**
```
package com.springbook.biz.board;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name = "E_BOARD")
public class Board{
	@Id
	@GeneratedValue
	private int seq;
	@Column(name="BOARD_TITLE", nullable=false, length=30)
	private String title;
	@Column(name="BOARD_WRITER", updatable=false)
	private String writer;
	@Column(name="BOARD_CONTENT", nullable=false)
	private String content;
	@Column(name="BOARD_REG_DATE")
	@Temporal(TemporalType.DATE)
	private Date regDate = new Date();
	@Column(name="BOARD_CNT")
	private int cnt;
```
우선 Board 클래스의 대부분 변수 이름과 BOARD 테이블의 컬럼 이름이 일치하지 않아서 name 속성을 사용했다.     
그리고 title과 content는 Null을 허용하지 않도록 nullable 속성을 사용했으며,     
이 중에서 title에 저장되는 문자 데이터의 길이는 30으로 제한했다.     
그리고 작성자에 해당하는 writer는 수정 SQL 구문을 생성할 때 제외하도록 설정했다.      
    
## 2.4. @GeneratedValue
@GeneratedValue는 @Id로 지정된 식별자 필드에 PK값을 생성하여 저장할 때 사용한다.    
   
**예시 Board**
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
```
@GeneratedValue는 다음과 같은 속성을 설정할 수 있다.  
  
[사진]  
  
```
strategy  : 자동 생성 유형을 지정한다 (GeneratorType 지정)
generator : 이미 생성된 Generator 이름을 지정한다.
```
이 중에서 strategy 는 PK 값 생성 전력을 지정하는 속성으로 매우 중요하다.  
PK 값 생성 전략은 TABLE, SEQUENCE, IDENTITY, AUTO 4가지가 있는데 각각의 의미는 다음과 같다.  
  
```
TABLE 		: Hibernate가 데이터베이스 테이블을 사용하여 PK 값을 생성한다. 따라서 별도의 PK 값 생성을 위한 별도의 테이블 설정이 필요하다  
SEQUENCE	: Sequence Object를 이용하여 PK값을 생성한다. 이 전략은 오라클과 같은 Sequence를 지원하는 데이터베이스에서만 사용할 수있다.   
IDENTITY 	: auto_increment나 IDENTITY를 이용하여 PK 값을 생성한다. 일반적으로 MySQL 같은 데이터베이스를 이용할 때 사용한다.
AUTO		: Hibernate가 사용중인 데이터베이스에 맞게 자동으로 PK 값을 생성한다. 아무런 설정을 하지 않으면 기본값으로 사용한다.
```
    
## 2.5. @Transient  
엔티티 클래스의 변수들은 대부분 테이블의 컬럼과 매핑된다.  
그러나 몇몇 변수는 매핑되는 칼럼이 없거나 아예 매핑에서 제외해야만 하는 경우도 있다.  
@Transient는 엔티티 클래스 내의 특정 변수를 영속 필드에서 제외할 때 사용한다.  
```
package com.springbook.biz.board;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "BOARD")
public class BoardVO {
~ 중략 ~
	@Transient
	private String searchCondition;
	@Transient
	private String searchKeyword;
	@Transient
	private MultipartFile uploadFile;
```
Board 클래스의 searchCondition, searchKeyword, uploadFile 변수는  
BOARD 테이블에서 매핑되는 칼럼이 없을뿐 아니라    
각 변수에 저장된 값을 테이블에 저장할 필요도 없다.    
하지만 아무런 설정을 하지 않으면 JPA는 자동으로 변수에 해당하는 컬럼을 찾아 매핑 처리할 것이다.  
따라서 @Transient를 설정하여 해당 변수를 매핑 대상에서 제외해야 한다.  
    
## 2.6. @Temporal    
@Temporal은 java.util.Date 타입의 날짜 데이터를 매핑할 때 사용한다.  
이때 TemporalType을 이용하면 출력되는 날짜의 형식을 지정할 수 있다.  
    
TemporalType.DATE는 날짜 정보만 출력하고, TemporalType.TIME은 시간정보만 출력한다.  
TemporalType.TIMESTAMP는 날짜와 시간 정보를 모두 출력한다.  
   
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
```
     
***
# 3. JPA API
## 3.1. JPA API 구조  
엔티티 클래스에 기본적인 매핑을 설정했으면 
이제 JPA에서 지원하는 API를 이용하여 데이터베이스 연동을 처리할 수 있다.    
  
애플리케이션에서 JPA를 이용하여 CRUD 기능을 처리하려면 엔티티 관리자 객체를 사용해야 한다.    
그런데 이 EntityManager 객체는 EntityFactory로부터 얻어낸다.  
따라서 JPA를 이용한 애플리케이션의 시작은 EntityManger 객체 생성이라고 할 수 있다.  

다음 그림은 EntityManager를 생성하기 위한 과정을 표현한 것이다.  
  
[그림]  
  
1. Persistence 클래스를 이용하여 영속성 유닛 정보가 저장된 JPA 메인 환경설정 파일을 로딩한다.  
(persistence.xml)  
2. 이 설정 저보를 바탕을 EntityManager를 생성하는 공장 기능의 EntityManagerFactory 객체를 생성한다.  
3. 이제 EntityManagerFactory로부터 필요한 EntityManager를 얻어서 사용하면 된다.  
  
EntityManagerFactory 객체를 생성할 때는 영속성 유닛이 필요하므로  
persistence.xml 파일에 설정한 영속성 유닛 이름을 지정하여 EntityManagerFactory 객체를 생성한다.   
  
윗그림에서는 마치 Persistence가 persistence.xml 파일을 직접 읽어 들이는 것으로 표현했지만,  
실제로는 JPA가 자동으로 META-INF 폴더에 있는 persistence.xml 파일을 로딩한다.    
따라서 XML 파일을 로딩하는 과정은 코드에서 표현되지 않고, 다만 영속성 유닛 이름을 지정하여 해당 설정을 인지할 수 있다. 

**BoardServiceClient 일부**
```
		// EntityManager 생성
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("JPAProject");
		EntityManager em = emf.createEntityManager();
```
EntityManagerFactory 객체로부터 EntityManager 객체를 얻었으면,     
EntityManager를 통해서 EntityTransaction 객체를 얻을 수 있다.     
이 EntityTransaction을 통해 트랜잭션을 제어할 수 있다.    
```
		// Transaction 생성
		EntityTransaction tx = em.getTransaction();
```
아래 표는 EntityManager 객체가 제공하는 CRUD 기능의 메소드들이다.  
  
[사진]  
   
```
persist(Object entity) 					: 엔티티를 영속화 한다.(INSERT)
merge(Object entity) 					: 준영속 상태의 엔티티를 영속화한다.(UPDATE)
remove(Object entity) 					: 영속 상태의 엔티티를 제거한다.(DELETE)
find(Class<T> entityClass, Object entity) 		: 하나의 엔티티를 검색한다.(SELECT ONE)
createQuery(String qlString, Class<T> resultClass) 	: JPQL에 해당하는 엔티티 목록을 검색한다.(SELECT LIST)
```
  
## 3.2. JPA API 사용  
이제는 API에서 제공하는 API를 실제로 사용하는 과정을 살펴보자 (BoardServiceClient)  
   
**BoardServiceClient 일부**   
```
			// Transaction 시작
			tx.begin();

			Board board = new Board();
			board.setTitle("JPA 제목");
			board.setWriter("관리자");
			board.setContent("JPA 글 등록 잘되네요");

			// 글 등록
			em.persist(board);
```
먼저 트랜잭션을 시작하고 엔티티 클래스로 등록된 Board 객체를 생성한 다음, 글 등록에 필요한 값들을 저장한다.       
여기서 중요한 것은 단순히 엔티티 객체를 생성하고 여기에 값을 저장하고 있다고 해서    
이 객체가 BOARD 테이블과 자동으로 매핑되지는 않는다.   

반드시 EntityManager의 persist() 메소드로 엔티티 객체를 영속화해야만 INSERT 작업이 처리된다.  
  
게시글이 등록되었으면 글 목록을 조회하는데,    
이때는 JPQL이라는 JPA 고유의 쿼리 구문을 사용해야한다.     
**즉 글 목록 조회를 원하면 쿼리를 사용하는 것이다.**    
```
			// 글 목록 조회
			String jpql = "select b from Board b order by b.seq desc";
			List<Board> boardList = em.createQuery(jpql, Board.class).getResultList();

			for (Board brd : boardList) {
				System.out.println("--->" + brd.toString());
			}
			// Transaction commit
			tx.commit();
```
JPQL은 기존에 사용하던 SQL과 거의 유사한 문법을 제공하므로 해석하는데 별 어려움이 없다.  
하지만 **검색 대상이 테이블이 아닌 엔티티 객체라서 작성하는데 주의가 필요하다**  
JPQL을 작성하고 실행하면 하이버네이트 같은 JPA 구현체가,    
JPQL을 연동되는 DBMS에 맞게 적절한 SELECT 명령어로 변환한다.   
  
데이터베이스에서 연동 처리 중 예외가 발생한다면 catch 블록에서 트랜잭션을 롤백 처리하면 되고  
finally 블록에서 반드시 EntityManager 를 close() 메소드를 이용하여 닫아야 한다.  
그리고 프로그램이 종료되기 전에 EntityManagerFactory 객체도 close() 메소드로 닫아야 한다.  
```
		} catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
		} finally {
			em.close();
		}
		emf.close();
	}
```
