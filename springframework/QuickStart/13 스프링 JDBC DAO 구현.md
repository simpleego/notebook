13 스프링 JDBC DAO 구현
=======================
# 1. 첫 번째 방법 : JdbcDaoSupport 클래스 상속  
첫 번째 방법은 JdbcDaoSupport 클래스를 상속하는 방법이다.     
    
**BoardDAOSpring**
```
package com.springbook.biz.board.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.springbook.biz.BoardVO;
import com.springbook.biz.common.JDBCUtil;

@Repository
public class BoardDAOSpring extends JdbcDaoSupport {

	private final String BOARD_INSERT = "INSERT INTO board(seq, title, writer, content) "
			+ "VALUES((SELECT nvl(max(seq),0)+1 FROM board),?,?,?);"; // AUTOINCREMENT 기능 직접 추가 nvl(인자1, 인자2) 인자1이 null일
																		// 경우 인자2를 사용하겠다는 뜻
	private final String BOARD_UPDATE = "UPDATE BOARD SET title=?, content=? WHERE seq=?;";
	private final String BOARD_DELETE = "DELETE BOARD WHERE seq=?;";
	private final String BOARD_GET = "SELECT * FROM board WHERE seq=?;";
	private final String BOARD_LIST = "SELECT * FROM board ORDER BY seq DESC;";

	@Autowired
	public void setSuperDataSource(DataSource dataSource) {
		super.setDataSource(dataSource);
	}

	public void insertBoard(BoardVO vo) {
		System.out.println("===> JDBC로 insertBoard() 기능 처리");
		getJdbcTemplate().update(BOARD_INSERT, vo.getTitle(), vo.getWriter(), vo.getContent());
	}

	public void updateBoard(BoardVO vo) {
		System.out.println("===> JDBC로 updateBoard() 기능 처리");
		getJdbcTemplate().update(BOARD_UPDATE, vo.getTitle(), vo.getContent(), vo.getSeq());

	}

	public void deleteBoard(BoardVO vo) {
		System.out.println("===> JDBC로 deleteBoard() 기능 처리");
		getJdbcTemplate().update(BOARD_DELETE, vo.getSeq());
	}

	public BoardVO getBoard(BoardVO vo) {
		System.out.println("===> JDBC로 getBoard() 기능 처리");
		Object[] args = { vo.getSeq() };
		return getJdbcTemplate().queryForObject(BOARD_GET, args, new BoardRowmapper());

	}

	public List<BoardVO> getBoardList(BoardVO vo) {
		System.out.println("===> JDBC로 getBoardList()기능 처리");
		return getJdbcTemplate().query(BOARD_GET, new BoardRowmapper());
	}

}

class BoardRowmapper implements RowMapper<BoardVO> {
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
DAO 클래스를 구현할 때, JdbcDaoSupport 클래스를 부모 클래스로 지정하면 ```getJdbcTemplate()``` 메소드를 상속받을 수 있다.    
그리고 ```getJdbcTemplate()```를 호출하면 JdbcTemplate 객체가 리턴되어 모든 메소드를 JdbcTemplate 객체로 구현할 수 있다.  
  
그런데 문제는 ```getJdbcTemplate()``` 메소드가 JdbcTemplate 객체를 리턴하려면 DataSource 객체를 가지고 있어야한다.  
따라서 부모 클래스인 JdbcDaoSupport 에 ```setDataSource()```메소드를 호출하여 데이터소스 객체를 의존성 주입해야 한다.   

```
@Autowired
public void setSuperDataSource(DataSource dataSource) {
	super.setDataSource(dataSource);
}
```
```@Autowired``` 어노테이션은 주로 변수 위에 선언하는데 메소드 위에 선언해도 동작한다.     
메소드 위에 ```@Autowired```를 붙이면 해당 메소드를 스프링 컨테이너가 자동으로 해출해주며,     
이때 메소드 매개변수 타입을 확인하고 해당 타입의 객체가 메모리에 존재하면 그 객체를 인자로 전달해준다.
   
***
# 2. 두 번째 방법 JdbcTemplate 클래스 ```<bean>```등록, 의존성 주입  
DAO 클래스에서 JdbcTemplate 객체를 얻는 두 번째 방법은       
Jdbctempalte 클래스를 ```<bean>```등록하고, 의존성 주입으로 처리하는 것이다.      
일반적으로 이러한 방법을 주로 사용한다.   
  
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
	<context:property-placeholder location="classpath:config/database.properties"/>
	<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
	
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
		<property name="driverClassName" value="${jdbc.driver}"/>
		<property name="url" value="${jdbc.url}" />
		<property name="username" value="${jdbc.username}"/>
		<property name="password" value="${jdbc.password}"/>
	</bean>
	
	<!-- Spring JDBC 설정 -->
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
		<property name="dataSource" ref="dataSource"/>
	</bean>
</beans>
```
**BoardDAOSpring**
```
package com.springbook.biz.board.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.springbook.biz.BoardVO;


//DAO(Data Access Object)
@Repository
public class BoardDAOSpring {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	// SQL 명령어들
	private final String BOARD_INSERT = "insert into board(seq, title, writer, content) values((select nvl(max(seq), 0)+1 from board),?,?,?)";
	private final String BOARD_UPDATE = "update board set title=?, content=? where seq=?";
	private final String BOARD_DELETE = "delete board where seq=?";
	private final String BOARD_GET = "select * from board where seq=?";
	private final String BOARD_LIST = "select * from board order by seq desc";

	// CRUD 기능의 메소드 구현
	// 글 등록
	public void insertBoard(BoardVO vo) {
		System.out.println("===> Spring JDBC로 insertBoard() 기능 처리");
		jdbcTemplate.update(BOARD_INSERT, vo.getTitle(), vo.getWriter(), vo.getContent());
	}

	// 글 수정
	public void updateBoard(BoardVO vo) {
		System.out.println("===> Spring JDBC로 updateBoard() 기능 처리");
		jdbcTemplate.update(BOARD_UPDATE, vo.getTitle(), vo.getContent(), vo.getSeq());
	}

	// 글 삭제
	public void deleteBoard(BoardVO vo) {
		System.out.println("===> Spring JDBC로 deleteBoard() 기능 처리");
		jdbcTemplate.update(BOARD_DELETE, vo.getSeq());
	}

	// 글 상세 조회
	public BoardVO getBoard(BoardVO vo) {
		System.out.println("===> Spring JDBC로 getBoard() 기능 처리");
		Object[] args = { vo.getSeq() };
		return jdbcTemplate.queryForObject(BOARD_GET, args, new BoardRowmapper());
	}

	// 글 목록 조회
	public List<BoardVO> getBoardList(BoardVO vo) {
		System.out.println("===> Spring JDBC로 getBoardList() 기능 처리");
		return jdbcTemplate.query(BOARD_LIST, new BoardRowmapper());
	}
}


class BoardRowmapper implements RowMapper<BoardVO> {
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
extends JdbcDaoSupport 를 제외하고 이를 대신하여 Autowired로 JdbcTemplate 변수를 얻어 사용한다.   
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
	private BoardDAOSpring boardDAO;

	public void insertBoard(BoardVO vo) {
		boardDAO.insertBoard(vo); // 100번 글 등록 성공
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
JdbcDaoSupport 클래스를 상속하여 구현하는 것보다 좀 더 깔끔해진 것을 확인할 수 있다. 
