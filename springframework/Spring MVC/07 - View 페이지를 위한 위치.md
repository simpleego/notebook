# View페이지를 위치 설정
> 반드시 컨트롤러가 우선하여 데이터처리를 하고 그 데이터를 뷰 페이지에 설정하는 순서로 처리된다!!
> 따라서 뷰페이지를 직접적으로 요청할 수 없도록 뷰페이지를 특정 폴더(WEB-INF)에 숨긴다.

![image](viewpage.png)

- ### Controller에서 뷰설정 아래와 같이 수정한다.
``` java
  mv.setViewName("/WEB-INF/view/index.jsp");
```
