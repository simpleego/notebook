# 16 - 레이아웃 페이지 만들기와 Tiles 라이브러리 설정하기
> 분리된 페이지에서 공통페이지를 어느 위치에 삽입할지를 기술한다.
>
## layout.jsp 파일 구성
- taglib 설정
- ```xml
  <%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
  ```
  
- pom.xml 파일 설정
```xml
<dependency>
    <!-- https://mvnrepository.com/artifact/org.apache.tiles/tiles-jsp -->
    <groupId>org.apache.tiles</groupId>
    <artifactId>tiles-jsp</artifactId>
    <version>3.0.8</version>    	
</dependency>
```

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html>
<html>

<body>
	<!-- header 부분 -->
	<tiles:insertAttribute name="header" />

	<!-- --------------------------- <visual> --------------------------------------- -->
	<!-- visual 부분 -->
	<tiles:insertAttribute name="visual" />


	<!-- --------------------------- <body> --------------------------------------- -->
	<div id="body">
		<div class="content-container clearfix">

			<!-- --------------------------- aside --------------------------------------- -->
			<!-- aside 부분 -->
			<tiles:insertAttribute name="aside" />


			<!-- --------------------------- main --------------------------------------- -->
			<tiles:insertAttribute name="body" />
		</div>
	</div>
	<!-- --------------------------- footer --------------------------------------- -->
	<tiles:insertAttribute name="footer" />
</body>

</html>
```
