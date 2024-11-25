27 Mybatis 프레임워크 시작하기
=======================
Mybatis는 원래 Apache에서 Ibatis라는 이름의 프레임워크로 탄생하였으나,     
2010년에 Ibatis가 Apache에서 탈퇴하여 Google로 넘어가면서 이름이 Mybatis로 변경되었다.      
Mybatis는 Ibatis로 부터 파생되어서 기본 개념과 문법은 Ibatis와 거의 유사하다.    

# 1. Mybatis 프레임워크 특징  
Mybatis 프레임워크의 가장 중요한 특징을 2가지로 정리하자면      
    
1. 한두줄의 자바 코드로 DB 연동을 처리한다는 것이며   
2. 둘째는 SQL 명령어를 자바 코드에서 분리하여 XML 파일에 따로 관리하는 것이다.      
    
이 두가지가 기존에 우리가 사용하던 JDBC 기반의 DB연동을 어떻게 개선하는지 살펴보자.       
  
**BoardDAO**
```
package com.springbook.biz.board.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.springbook.biz.BoardVO;
import com.springbook.biz.common.JDBCUtil;

@Repository("boardDAO")
public class BoardDAO  {
	// JDBC 관련 변수
	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;

	private final String BOARD_LIST = "SELECT * FROM board ORDER BY seq DESC;";
	public List<BoardVO> getBoardList(BoardVO vo) {
		System.out.println("===> JDBC로 getBoardList()기능 처리");
		List<BoardVO> boardList = new ArrayList<BoardVO>();
		try {
			conn = JDBCUtil.getConnection();
			if(vo.getSearchCondition().equals("TITLE")) {
				pstmt = conn.prepareStatement(BOARD_LIST_T);
			} else if(vo.getSearchCondition().equals("CONTENT")) {
				pstmt = conn.prepareStatement(BOARD_LIST_C);
			}
			pstmt.setString(1, vo.getSearchKeyword());
			rs = pstmt.executeQuery();
			while (rs.next()) {
				BoardVO board = new BoardVO();
				board.setSeq(rs.getInt("SEQ"));
				board.setTitle(rs.getString("TITLE"));
				board.setWriter(rs.getString("WRITER"));
				board.setContent(rs.getString("CONTENT"));
				board.setRegDate(rs.getDate("REGDATE"));
				board.setCnt(rs.getInt("CNT"));
				boardList.add(board);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCUtil.close(rs, pstmt, conn);
		}
		return boardList;
	}
}
```
위 코드는 JDBCUtil 클래스를 이용하여 DB 커넥션 획득과 해제 작업을 처리해서 그나마 코드가 간결해졌지만  
JDBCUtil 클래스가 없었다면 더 많은 자바 코드가 필요했을 것이다.   
  
사실 유지보수 관점에서 보면 DB 연동에 사용된 복잡한 자바 코드는 더 이상 중요하지 않다.    
개발자는 실행되는 SQL만 관리하면 되며, Mybatis는 개발자가 이 SQL 관리에만 집중할 수 있도록 도와준다.   

다음은 Mybatis로 변경한 코드이다.  

**BookDAO**
```
public class BoardDAO(){
  public List<BoardVO> getBoardList(BoardVO vo) {
    SqlSession mybatis = SqlSessionFactoryBean.getSqlSessionInstance();
    return mybatis.selectList("BoardDAO.getBoardList",vo);
  }
}
```
Mybatis는 XML 파일에 저장된 SQL 명령어를 대신 실행하고 실행 결과를 VO 같은 자바 객체에 자동으로 매핑까지 해준다.  
그래서 Mybatis 프레임워크를 데이터 맵퍼라고 부른다.  
결국 Mybatis프레임워크를 이용하여 DB 연동을 처리하면 대부분 한두 줄의 자바 코드만으로도 원하는 DB 연동 로직을 처리할 수 있게 된다.  

Mybatis의 2번째 특징은 Java 코드에서 SQL 구문을 분리하는 것이다.  
만약 SQL 명령어가 DAO 같은 자바 클래스에 저장되면 SQL 명령어만 수정하는 상황에서도 자바 클래스를 다시 컴파일해야한다.  
그리고 SQL 명령어들을 한 곳에 모아서 관리하기도 쉽지 않다.  
     
결국, SQL 명령어에 대한 통합 관리를 위해서라도 자바 소스에서 SQL을 분리하는 것은 매우 중요하다.  
  
다음은 SQL을 별도의 XML 파일에 작성한 것이다.  
**board-mapping.xml**
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
			 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper>
	<select id="getBoardList" resultType="board">
		select * from board
		where title like '%'||#{searchKeyword}||'%'
		order by seq desc
	</select>
</mapper>			 
```
구체적인 문법을 원한다면 별도의 교재나 Mybatis 홈페이지를 이용하자  

***
# 2. JAVA ORM Plugin 설치  
스프링을 구현을 위해 STS 플러그인을 설치했던 것과 마찬가지로  
Mybatis 역시 Java ORM이라는 플러그인 프로그램이 있어서   
이 플러그인을 사용하면 Mybatis와 관련된 복잡한 XML 설정 파일들을 자동으로 만들고 관리할 수 있다.  

1. [HELP] -> [Eclipse Marketplace] 메뉴를 선택한다.  
2. 검색창에 "ORM"입력후 ENTER 나 [GO]버튼 클릭   
3. Java ORM 플러그인을 찾아 ```<Install>``` 버튼을 클릭하여 설치 진행  

***
# 3. 프로젝트 생성
Mybatis 프레임워크의 구조와 개념을 이해하기 위해 Mybatis만으로 간단한 CRUD 기능을 테스트해보자  
사실 Mybatis를 스프링과 연동하지 않고 단독으로 사용하는 것은 여러 가지로 불편한 점이 많다.  
하지만 Mybatis의 구조와 기능 이해에 집중하기 위해서 간단한 프로젝트를 Mybatis만으로 수행해보는 것이 도움된다.  

나머지는 교재를 참고.........

**pom.xml**
```
		<!-- H2 데이터베이스 -->
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<version>1.4.200</version>
		</dependency>

		<!-- Mybatis -->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.3.1</version>
		</dependency>
		<!-- Ibatis -->
		<dependency>
			<groupId>org.apache.ibatis</groupId>
			<artifactId>ibatis-core</artifactId>
			<version>3.0</version>
		</dependency>
```

***
# 4. VO 클래스 작성
XML 파일에 저장된 SQL 명령어에 사용자가 입력한 값들을 전달하고 실행 결과를 매핑할 VO 클래스를 작성한다.  
기존에 게시판 프로그램에서 사용한 BoardVO 클래스와 같으므로 복사해서 사용해도 된다.  

**BoardVO**
```
package com.springbook.biz;

import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

import org.springframework.web.multipart.MultipartFile;

public class BoardVO {

	private int seq;
	private String title;
	private String writer;
	private String content;
	private Date regDate;
	private int cnt;

	private String searchCondition;

	private String searchKeyword;

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

	public String getSearchCondition() {
		return searchCondition;
	}

	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

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
   
***
# 5. VO 클래스 작성
설정하는게 조금 있는데 이는 교재를 보면서 하도록 하자...  
   
**board-mapping**
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="BoardDAO">

	<insert id="insertBoard">
		INSERT INTO board(seq, title, writer, content) VALUES((select nvl(max(seq), 0)+1 from board),#{title},#{writer},#{content})
	</insert>

	<update id="updateBoard">
		UPDATE board SET title=#{title}, content=#{content} WHERE seq=#{seq}
	</update>

	<delete id="deleteBoard">
		DELETE board WHERE seq = #{seq}
	</delete>

	<select id="getBoard" resultType="board">
		SELECT * FROM board WHERE seq=#{seq}
	</select>
		
	<select id="getBoardList" resultType="board">
		SELECT * FROM board
		WHERE title LIKE '%'||#{searchKeyword}||'%'
		order by seq desc
	</select>
</mapper>
```
SQL Mapper 파일은 ```<mapper>```를 루트 엘리먼트로 사용한다.  
그리고 ```<insert>```, ```<update>```, ```<delete>```, ```<select>``` 엘리먼트를 이용하여 필요한 SQL 구문들을 등록한다.  
기존에 BoardDAO 클래스에서 사용했던 SQL 구문을 그대로 등록하여 재사용하면 되므로 기본 설정 자체는 그리 복잡하지 않다.  
   
***
# 6 Mybatis 환경설정 파일  
Mybatis 환경설정 파일도 JavaORM 플러그인을 사용하면 자동으로 생성할 수 있다.  

1. MybatisProject를 선택하고 [New]->[Other] 메뉴를 선택한다.  
2. Mybatis Configuration XML 을 선택한 후 [NEXT] 클릭한다.   
3. Mybatis Configuration name 에 생성할 파일 이름을 입력하고 ```[FINISH]``` 버튼을 클릭한다.    
4. Mybatis 메인 설정 파일 이름은 일반적으로 ```sql-map-config.xml```을 사용한다.  
5. 생성된 ```sql-map-config.xml``` 와 ```db.properties```를 src/main/resource 소스 폴더로 이동한다.    
  
파일들을 이동했으면, 먼저 데이터베이스 커넥션 관리 프로퍼티 정보가 등록되어 있는 db.properties 파일을 수정한다.    
db.properties 파일에는 MySQL 데이터베이스 연동을 위한 프로퍼티 정보가 설정되어 있으므로 H2 데이터베이스 관련 정보로 수정한다.  

**db.properties**
```
jdbc.driverClassName=org.h2.Driver
jdbc.url=jdbc:h2:tcp://localhost/~/test
jdbc.username=sa
jdbc.password=
```
그리고 Mybatis 메인 환경설정 파일인 ```sql-map-config.xml``` 역시 기본적인 내용이 설정되어 있는데,  
이 역시 정확한 설정을 제공하는 것이 아닌, 전체 설정의 기본 틀만 제공한다.    
따라서 다음과 같이 관련 정보를 정확하게 반영하여 수정해야 한다.  

**sql-map-config.xml**
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<properties resource="db.properties" />
	<typeAliases>
		<typeAlias type="com.springbook.biz.BoardVO" alias="board"></typeAlias>
	</typeAliases>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="${jdbc.driverClassName}" />
				<property name="url" value="${jdbc.url}" />
				<property name="username" value="${jdbc.username}" />
				<property name="password" value="${jdbc.password}" />
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="mappings/board-mapping.xml" />
	</mappers>
</configuration>
```
```<properties>``` 엘리먼트는 XML 설정에서 사용할 프로퍼티를 선언하거나 외부 프로퍼티 파일을 참조할 때 사용한다.   
이렇게 선언된 프로퍼티는 ```${프로퍼티 이름}```으로 참조하여 사용할 수 있다.   
  
```<typeAliases>``` 엘리먼트는 ```<typeAlias>```를 여러개 가질 수 있으며,  
```<typeAlias>``` 엘리먼트를 이용하여 특정 클래스의 별칭(Alias)을 선언할 수 있다.     
  
이 Alias는 SQL 명령어들이 저장되는 SqlMapper에서 사용할 수 있으며,     
이를 통해서 Sql Mapping 파일의 크기를 줄여주기도 하고 설정을 간단히 처리할 수도 있다.    
   
현재는 BoardVO 클래스에 대한 Alias만 board로 설정한 상태이다.    
  
Mybatis는 특정 DBMS로부터 커넥션을 획득하고 DB 연동을 처리하기 위해서 반드시 DataSource 정보가 필요하다.   
```<environments>``` 엘리먼트에는 다양한 설정을 추가할 수 있지만,   
현재는 가장 중요한 DataSource 설정만 작성하였고 H2 데이터베이스 연동을 위한 설정으로 수정했다.  
  
마지막으로 ```<mappers>``` 엘리먼트는 여러 ```<mapper>```를 가질 수 있으며,  
이 ```<mapper>```를 이용하여 SQL 명령어들이 저장된 SQL 파일들을 등록할 수 있다.    
   
***
# 7. SqlSession 객체 생성하기  
지금까지 복잡한 Mybatis 관련 설정 파일들을 작성했는데  
사실 Mybatis를 처음 접하는 개발자에게는 이런 설정이 잘 이해도 안 되고 특별한 장점을 느끼지도 못할 것이다.  
이것은 아직 SQL을 외부 XML 파일에 따로 저장하는 것 정도만 처리했기 때문이다.   
  
이제는 이 Mybatis 관련 설정을 기반으로 DAO 클래스를 구현해보도록 하자.   
그러면 Mybatis의 장점을 더욱 확실히 느낄 수 있을 것이다.   
  
Mybatis를 이용하여 DAO를 구현하려면 SqlSession 객체가 필요하다.    
그런데 이 SqlSession 객체 얻으러면 SqlSessionFactory 객체가 필요하다.     
따라서 DAO 클래스를 구현하기에 앞서 SqlSessionFactory 객체를 생성하는 유틸리티 클래스를 작성해야 한다.  
   
**SqlSessionFactoryBean**
```
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
위 소스에서 가장 중요한 핵심 코드는 두 줄이다.  
우선 Mybatis 메인 설정 파일인 sql-map-config.xml 파일로부터 설정 정보를 읽어 들이기 위한 입력 스트림을 생성해야 한다.  
그리고 나서 입력 스트림을 통해 sql-map-config.xml 파일을 읽어 SqlSessionFactory 객체를 생성한다.     

```
Reader reader = Resources.getResourceAsReader("sql-map-config.xml");
SessionFactory = new SqlSessionFactoryBuilder().build(reader);
```
getSqlSessionInstance() 메소드는 SqlSessionFactory 객체로부터 SqlSession 객체를 얻어내어 리턴하는 메소드이다.  
이제 이 메소드를 이용하여 SqlSession 객체가 필요한 DAO 클래스를 구현하면 된다.  
   
***
# 8. DAO 클래스 작성  
   
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
BoardDAO 클래스는 생성자에서 SqlSessionFactoryBean을 이용하여 SqlSession 객체를 얻어내고 있다.  
그리고 이 SqlSession 객체의 메소드를 이용하여 CRUD 기능의 메소드를 모두 구현하고 있다.  
   
구현된 각 메소드를 보면 두 개의 정보가 인자로 전달되고 있는데,  
1번째 인자는 실행될 SQL의 id 정보이다.  
이때 SQL Mpper 선언된 네임스페이스와 아이디를 조합하여 아이디를 저장해야 한다.  
그리고 두 번째 인자는 parameterType 속성으로 지정된 파라미터 객체이다.  
등록, 수정, 삭제는 각각 insert(), update(), delete() 메소드로 처리하며,  
단 건 조회, 목록 조회는 selectOne(), selectList() 메소드로 처리한다.  
   
***
# 9. 테스트 클라이언트 작성 및 실행  
다음은 BoardDAO 클래스의 메소드를 테스트하는 클라이언트 프로그램이다.  
```src/test/java```소스 폴더에 클라이언트 프로그램을 작성하고 실행해본다.   
  
**BoardServiceClient**
```
package com.springbook.biz.board;

import java.sql.SQLException;
import java.util.List;

import com.springbook.biz.BoardVO;
import com.springbook.biz.board.impl.BoardDAO;

public class BoardServiceClient {
	public static void main(String[] args) throws SQLException {
		BoardDAO boardDAO = new BoardDAO();
		
		BoardVO vo = new BoardVO();
		vo.setTitle("myBatis 제목");
		vo.setWriter("홍길동");
		vo.setContent("myBatis 내용입니다...");
		boardDAO.insertBoard(vo);
		
		vo.setSearchCondition("TITLE");
		vo.setSearchKeyword("");
		List<BoardVO> boardList = boardDAO.getBoardList(vo);
		for(BoardVO board : boardList) {
			System.out.println("--->" + board.toString());
		}
	}
}
```
작성된 클라이언트 프로그램을 실행했을 때, 글 등록 성공 후에 글 목록 화면이 출력될 것이다.  
콘솔에 출력된 실행 결과 로그 메시지들을 살펴보면 어떤 SQL 명령어들이 실행되고 있고   
실행 시에 어떤 파라미터값들이 SQL에 바인딩되었는지 알 수 있다.  
그리고 실행 결과 정보도 간단하게 출력해준다.  

```
--->BoardVO [seq=8, title=myBatis 제목, writer=홍길동, content=myBatis 내용입니다..., regDate=Wed Jan 08 00:00:00 KST 2020, cnt=0]
--->BoardVO [seq=7, title=, writer=, content=, regDate=Sun Dec 29 00:00:00 KST 2019, cnt=0]
--->BoardVO [seq=6, title=asd, writer=asd, content=sad, regDate=Sun Dec 29 00:00:00 KST 2019, cnt=0]
--->BoardVO [seq=5, title=asd, writer=sad, content=sad, regDate=Sun Dec 29 00:00:00 KST 2019, cnt=0]
--->BoardVO [seq=4, title=asd, writer=sad, content=sad, regDate=Sun Dec 29 00:00:00 KST 2019, cnt=0]
--->BoardVO [seq=3, title=asd, writer=asd, content=asd, regDate=Sun Dec 29 00:00:00 KST 2019, cnt=0]
--->BoardVO [seq=2, title=, writer=, content=, regDate=Sun Dec 29 00:00:00 KST 2019, cnt=0]
--->BoardVO [seq=1, title=제목2, writer=작성자1, content=내용123, regDate=Sat Dec 28 00:00:00 KST 2019, cnt=0]
```
