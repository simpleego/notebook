# 18 - Tiles 설정에 Wildcard 이용하기
> 타일즈 설정에서 비효율적인 설정을 보완해 준다.
## 타일즈 관련 사이트
- https://tiles.apache.org/framework/tutorial/advanced/wildcard.html
```xml
Multiple stars such as in '*/*'
Let's now consider another case. As you can see, the sample below uses 2 stars '*'.

<definition name="bank/*/*" template="/layout.jsp">
    <put-attribute name="header" value="/header.jsp"/>
    <put-attribute name="body"   value="/{1}-{2}.jsp"/>
</definition>

** 정규식을 사용한 방법
<definition name="REGEXP:test\.definition(.*)\.message(.*)" template="/layout{1}.jsp">
    <put-attribute name="title"  value="This definition has a message: {2}."/>
    <put-attribute name="header" value="/header.jsp"/>
    <put-attribute name="body"   value="/body.jsp"/>
</definition>
```
