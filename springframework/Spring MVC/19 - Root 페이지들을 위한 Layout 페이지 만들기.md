# 19 - Root 페이지들을 위한 Layout 페이지 만들기

## 1. index 페이지 생성
> index.jsp.내용을 복사하여 view->inc-->폴더에  layout.jsp파일을로 파일명을 변경하여 붙여넣기 한다
> 페이지의 body내용을 잘라내기 한다.
## 2. layout.jsp tiles 구성
```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>   
<!DOCTYPE html>
<html>
<head>
    <title>코딩 전문가를 만들기 위한 온라인 강의 시스템</title>
    <meta charset="UTF-8">
    <title>공지사항목록</title>

    <link href="/css/layout.css" type="text/css" rel="stylesheet" />
    <link href="/css/index.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <!-- header 부분 -->
	<tiles:insertAttribute name="header" /> 
    <!-- --------------------------- <body> --------------------------------------- -->
	<tiles:insertAttribute name="body" />
<!-- ------------------- <footer> --------------------------------------- -->
    <tiles:insertAttribute name="footer" />
</body>
</html>
```

## 3. tiles.xml 파일 설정
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE tiles-definitions PUBLIC
       "-//Apache Software Foundation//DTD Tiles Configuration 3.0//EN"
       "http://tiles.apache.org/dtds/tiles-config_3_0.dtd">
<tiles-definitions>
<definition name="root.*" template="/WEB-INF/view/inc/layout.jsp">
    <put-attribute name="title" value="공지사항" />
    <put-attribute name="header" value="/WEB-INF/view/inc/header.jsp" />
    <put-attribute name="body" value="/WEB-INF/view/{1}.jsp" />
    <put-attribute name="footer" value="/WEB-INF/view/inc/footer.jsp" />
  </definition>  

  <definition name="notice.*" template="/WEB-INF/view/customer/inc/layout.jsp">
    <put-attribute name="title" value="공지사항" />
    <put-attribute name="header" value="/WEB-INF/view/inc/header.jsp" />
    <put-attribute name="visual" value="/WEB-INF/view/customer/inc/visual.jsp" />    
    <put-attribute name="aside" value="/WEB-INF/view/customer/inc/aside.jsp" />
    <put-attribute name="body" value="/WEB-INF/view/customer/notice/{1}.jsp" />
    <put-attribute name="footer" value="/WEB-INF/view/inc/footer.jsp" />
  </definition>    
</tiles-definitions>
```
> 각각의 페이별로 접근할 수 있도록 root.*로 요청 명칭을 정한다.
>
## IndexController에서 뷰요청을 수정
```java
@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {				
    ModelAndView mv = new ModelAndView("root.index");
    //ModelAndView mv = new ModelAndView("index");
		mv.addObject("data","아녕 친구양 Spring MVC~~ ");
		//mv.setViewName("/WEB-INF/view/index.jsp");  // 이것도 또하나의 요청이다.--> 다시 web.xml에서 요청을 검색한다.		
		return mv;		
	}
```
