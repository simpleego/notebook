# 12 - Detail 컨트롤러 추가와 View 페이지 집중화의 필요성
### URL 매핑 설정 추가
```xml
 <bean id="/notice/detail" class="com.simple.web.controller.notice.DetailController" />
```
### Detail Controller 코드 작성
```java

	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mv = new ModelAndView("notice/detail");
		//mv.addObject("data","아녕 친구양 Spring MVC~~ ");
		//mv.setViewName("/WEB-INF/view/notice/list.jsp");  // 이것도 또하나의 요청이다.--> 다시 web.xml에서 요청을 검색한다.
		
		return mv;	
	}
}
```
> 모든 페이지의 html 확장자를 변경해야 하는 불편한 점이 있으므로
> 공통적인 페이지를 분리하여 이를 구조화하여 사용할 수 있도록 한다.
