32 스프링과 JPA 연동
=======================
# 1. 스프링과 JPA 연동 기초  
## (1) 프로젝트 변경    
스프링과 JPA를 연동하려면 우선 BoardWeb프로젝트를 JPA 프로젝트로 변환해야 한다.      
     
1. 기존에 사용하던 BoardWeb 프로젝트를 선택하고 마우스 오른쪽 버튼을 클릭한다.      
2. 맨 아래에 있는 [properties]를 클릭하여 Properties창을 띄운다.      
3. 마지막으로 왼쪽의 [project Facets] 선택하여 JPA 항목을 체크한다.        
4. ```<APPLY>```,```<OK>``` 버튼이 활성화 되지 않으면 Futher configuration을 클릭하여     
Disable Library로 전환 시켜주면 활성화가 된다.   
5. ```<APPLY>```,```<OK>``` 버튼을 클릭하면 META-INF에 persistence.xml이 생성된다.  
  
## (2) 라이브러리 내려받기
BoardWeb 프로젝트가 JPA 프로젝트로 변경되었으면,  
이제 pom.xml 파일을 수정하여 SpringORM 라이브러리와 하이버네이트 라이브러리를 내려받는다.  
   
**pom.xml**
```
		<!-- spring-ORM -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>
    
		<!-- JPA, 하이버네이트 -->
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-entitymanager</artifactId>
			<version>5.1.0.Final</version>
		</dependency>
```
내려받기가 마무리되면 Maven Dependencies에서 해당하는 라이브러리를 추가로 확인한다.  
   
## (3) JPA 설정 파일 작성  
JPA 프로젝트는 반드시 영속성 유닛 설정 정보가 저장된 persistence.xml 파일이 필요하다.  
하지만 persistence.xml 파일은 JPAProject에 작성된  파일과 같으므르 해당 파일을 복사해서 재사용하자    
    
**persistence.xml**    
```
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd">
	<persistence-unit name="springboard">
		<class>com.springbook.biz.board.BoardVO</class>
		<properties>
			<!-- 필수 속성 -->	
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
위 설정을 보면 DB 커넥션 관련 설정이 모두 삭제되었다.    
JPA를 스프링과 연동하면 커넥션 정보는 스프링에서 제공하는 데이터소스를 이용하면 된다   

***
# 2. 엔티티 매핑 설정
기존에 사용하던 BoardVO 클래스를 열어서 JPA가 제공하는 어노테이션으로 엔티티 매핑을 설정한다.  
그리고 이전에 SpringMVC 학습에서 XML 변환 처리에 사용했던 JAXB2 어노테이션들은 모두 삭제한다.   
  
**BoardVO**
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

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "BOARD")
public class BoardVO {
	
	@Id
	@GeneratedValue
	private int seq;
	private String title;
	private String writer;
	private String content;
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;
	private int cnt;
	@Transient
	private String searchCondition;
	@Transient
	private String searchKeyword;
	@Transient
	private MultipartFile uploadFile;

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
	
	@JsonIgnore
	public String getSearchCondition() {
		return searchCondition;
	}
	
	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	@JsonIgnore
	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	@JsonIgnore
	public MultipartFile getUploadFile() {
		return uploadFile;
	}

	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}

	@Override
	public String toString() {
		return "BoardVO [seq=" + seq + ", title=" + title + ", writer=" + writer + ", content=" + content + ", regDate="
				+ regDate + ", cnt=" + cnt + "]";
	}
}
```
우선 엔티티 클래스 이름과 테이블 이름이 달라서 클래스 위에 @Table을 추가했다.  
그리고 SEQ 칼럼과 매핑되는 seq 변수에 @Id와 @GeneratedValue를 사용하여 seq 변수를 식별자 필드로 지정함과 동시에  
시퀀스를 이용하여 자동으로 값이 증가하도록 했다.  
   
또한, regDate 변수에는 시간을 제외한 날짜 정보만 저장되도록 @Temporal을 설정했으며,  
searchCondition, searchKeyword, uploadFile 세개의 변수에는 @Transient를 설정하여 영속 필드에서 제외했다.  
   
***
# 3. 스프링과 JPA 연동 설정   
스프링과 JPA를 연동하려면 다음과 같이 2개의 클래스를 스프링 설정 파일에 ```<bean>```등록해야 한다.  
  
**applicationContext.xml**
```
~ 생략 ~ 
	<!-- Spring과 JPA 연동설정 -->
	<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter"></bean>
	
	<!-- 엔티티 매니저 팩토리 생성  -->
	<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
		<property name="dataSource" ref="dataSource"></property>
		<property name="jpaVendorAdapter" ref="jpaVendorAdapter"></property>
	</bean>
~ 생략 ~ 
```
스프링과 JPA 연동을 위해 가장 먼저 등록할 클래스는 JpaVendorAdapter이다.   
JpaVendorAdapter 클래스는 실제로 DB 연동에 사용할 JPA 벤더를 지정할 때 사용하는데,  
우리는 하이버네이트를 JPA 구현체로 사용하고 있으므로    
JpaVendorAdapter 클래스로 HibernateJpaVendorAdapter를 ```<bean>``` 등록하면 된다.  

두번째로 등록할 클래스는 EntityManagerFactoryBean이다.    
우리가 JPA를 이용하여 DAO 클래스를 구현하려면 최종적으로 EntityManager 객체가 필요하다.   
이 EntityManager 객체를 생성하려면 공장 기능의 클래스인 EntityManagerFactoryBean 클래스를  ```<bean>``` 등록해야 한다.  
이때 앞에서 설정한 DataSource 와 JpaVendorAdapter 를 의존성 주입하면 된다.   
  
LocalContainerEntityManagerFactoryBean 클래스를 ```<bean>``` 등록할 때    
영속성 유닛 관련된 설정을 같이 처리할 수도 있다.   
(즉, persistence.xml 말고 applicationContext.xml에 기술해도 된다는 의미)    

**예시 applicationContext.xml**
```
~ 생략 ~ 
	<!-- Spring과 JPA 연동설정 -->
	<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter"></bean>
	
	<!-- 엔티티 매니저 팩토리 생성  -->
	<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
		<property name="dataSource" ref="dataSource"></property>
		<property name="jpaVendorAdapter" ref="jpaVendorAdapter"></property>
		<property name="packagesToScan" value="com.springbook.biz.board"></property>
		<property name="jpaProperties"></property>
	<props>		
		<prop key="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
		<prop key="hibernate.show_sql" value="true"/>
		<prop key="hibernate.format_sql" value="true"/>
		<prop key="hibernate.use_sql_comments" value="false"/>
		<prop key="hibernate.id.new_generator_mappings" value="true"/>
		<prop key="hibernate.hbm2ddl.auto" value="create"/>
	</props>
	</bean>
~ 생략 ~ 
```

***
# 4. 트랜잭션 설정 수정  
우리는 앞에서 트랜잭션 관리를 스프링 컨테이너에 위임할 때,   
DataSourceTransactionManager 클래스를 ```<bean>``` 사용했었다.  
DataSourceTransactionManager 는 SpringJDBC나 Mybatis를 이용하여 DB 연동을 처리할 때 사용하는 트랜잭션 관리자였다.  
  
하지만 이제는 JPA를 이용해서 DB 연동을 처리하고 있으므로 트랜잭션 관리자를 JpaTransactionManager로 변경해야 한다.  
  
**applicationContext.xml**
```
~생략~
	<!-- Transaction 실행 -->
	<bean id="txManager" class="org.springframework.orm.jpa.JpaTransactionManager">
		<property name="entityManagerFactory" ref="entityManagerFactory"></property>
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
~생략~
```
기존에 트랜잭션 설정에서 트랜잭션 관리 어드바이스가 참조하는 트랜잭션 매니져 클래스를  
DataSourceTransactionManager에서 JpaTransactionManager로만 변경한다.   
그리고 JpaTransactionManager가 LocalContainerEntityManagerFactoryBean 객체를 참조하도록 의존성 주입을 설정하면 끝난다.  

***
# 5. DAO 클래스 구현
스프링과 JPA 연동에 필요한 모든 설정을 마무리했으면 이제 JPA 기반의 DAO 클래스만 구현하면 된다.   
JPA를 이용해서 DAO 클래스를 구현할 때는 EntityManager 객체를 사용해야 하는데  
JPAProject에서는 EntityManagerFactory로부터 EntityManager 객체를 직접 얻어냈었다.  
  
하지만 JPA를 단독으로 사용하지 않고 스프링과 연동할 때는  
EntityManagerFactory 에서 EntityManager를 직접 생성하는 것이 아니라  
스프링 컨테이너가 제공하는 EntityManager를 사용해야만 한다.  

다음처럼 EntityManager 객체를 이용하여 BoardDAOJPA 클래스를 추가로 구현해보도록 하자  
  
**BoardDAOJPA**
```
package com.springbook.biz.board.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.springbook.biz.board.BoardVO;

@Repository
public class BoardDAOJPA {
	@PersistenceContext
	private EntityManager em;

	public void insertBoard(BoardVO vo) {
		System.out.println("===> JPA로 insertBoard() 기능처리");
		em.persist(vo);
	}

	public void updateBoard(BoardVO vo) {
		System.out.println("===> JPA로 updateBoard() 기능처리");
		em.merge(vo);
	}

	public void deleteBoard(BoardVO vo) {
		System.out.println("===> JPA로 deleteBoard() 기능처리");
		em.remove(em.find(BoardVO.class, vo.getSeq()));
	}

	public BoardVO getBoard(BoardVO vo) {
		System.out.println("===> JPA로 getBoard() 기능처리");
		return (BoardVO) em.find(BoardVO.class, vo.getSeq());
	}

	public List<BoardVO> getBoardList(BoardVO vo) {

		System.out.println("===> JPA로 getBoardList() 기능처리");
		return em.createQuery("from BoardVO b order by b.seq desc").getResultList();
	}

}
```
@PersistenceContext 는 스프링 컨테이너가 관리하는 EntityManager 객체를 의존성 주입할 때 사용하는 어노테이션이다.   
앞에서 LocalContainerEntityManagerFactorybean 클래스를 ```<bean>``` 등록했던 것을 기억할 것이다.    
스프링 컨테이너는 이 객체를 이용하여     
@PersistenceContext 가 설정된 EntityManager 타입의 변수에 EntityManager 객체를 의존성 주입해준다     
그리고 이렇게 컨테이너로부터 EntityManager 객체를 주입받아서 사용해야만  
컨테이너가 제공하는 트랜잭션 관리를 비롯한 다양한 기능을 사용할 수 있다.   
  
***
# 6. BoardServiceImpl 클래스 수정 및 테스트 
JPA를 이용하는 DAO 클래스를 구현했으면 이제 마지막으로 BoardServiceImpl 클래스에서   
추가된 BoardDAOJPA 클래스로 DB 연동을 처리하면 된다.   
   
**BoardServiceImpl**   
```
package com.springbook.biz.board.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springbook.biz.board.BoardVO;


@Service("boardService")
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardDAOJPA boardDAO;

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
지금까지 수정한 모든 파일을 저장하고 게시판 프로그램을 실행시켜본다.  
실행하기전에 H2 데이터베이스가 구동되어 있는지 확인하고, 톰캣 서버도 재구동한다.  
톰캣 서버가 재구동 되면 다음처럼 시퀀스와 테이블이 삭제되고 다시 만들어질 것이다.  
  
 ```
 Hibernate: 
    drop table if exists BOARD
Hibernate: 
    drop table if exists hibernate_sequence
Hibernate: 
    create table BOARD (
        seq integer not null,
        cnt integer not null,
        content varchar(255),
        regDate datetime,
        title varchar(255),
        writer varchar(255),
        primary key (seq)
    )
Hibernate: 
    create table hibernate_sequence (
        next_val bigint
    )
Hibernate: 
    insert into hibernate_sequence values ( 1 )
INFO : org.springframework.web.context.ContextLoader - Root WebApplicationContext: initialization completed in 8028 ms
 ```
 이제 새 글을 등록하면 시퀀스를 통해 입력할 게시글의 번호를 추출하고 사용자가 입력한 글이 BOARD 테이블에 등록될 것이다.  
 그리고 등록될 글 목록이 화면에 출력되는데,  
 이 과정에서 하이버네이트가 생성한 다양한 SQL 구문을 콘솔을 통해 확인해볼 수 있다.  
   
```
===> JPA로 getBoardList() 기능처리
Hibernate: 
    select
        boardvo0_.seq as seq1_0_,
        boardvo0_.cnt as cnt2_0_,
        boardvo0_.content as content3_0_,
        boardvo0_.regDate as regDate4_0_,
        boardvo0_.title as title5_0_,
        boardvo0_.writer as writer6_0_ 
    from
        BOARD boardvo0_ 
    order by
        boardvo0_.seq desc
```
