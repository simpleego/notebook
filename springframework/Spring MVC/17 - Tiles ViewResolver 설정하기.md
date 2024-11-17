#  17 - Tiles ViewResolver 설정하기
> tiles 설정에 기술된 *.jsp 파일을 찾아주는 역할을 하는 추가적인 뷰 설정이 필요하다.
> 
## ViewResolver 추가 설정
```xml
<bean class="org.springframework.web.servlet.view.UrlBasedViewResolver">
  <property name="viewClass" value="org.springframework.web.servlet.view.tiles3.TilesView"/>
  <property name="order" value="1"/>
</bean>

<bean class="org.springframework.web.servlet.view.tiles3.TilesConfigurer">
  <property name="definitions" value="/WEB-INF/tiles.xml"/>
</bean>
```

## 에러 처리
```
 java.lang.NoClassDefFoundError: javax/servlet/jsp/jstl/core/Config
```
> jstl 관련 클래스가 없으므로 관련 설정을 추가한다.
```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
```
