# 스프링프레임워크 과련 이미지 모음

## 1. Summary of Software Framework of TERASOLUNA Server Framework for Java (5.x)

![image](https://github.com/user-attachments/assets/9e4684dc-e851-4dc3-b2e5-0defcd687aa8)

## 2. Main Structural Elements of Software Framework
![image](https://github.com/user-attachments/assets/09f389b7-3036-4beb-9801-ceea89901141)

## 3. Container overview( https://docs.spring.io/spring-framework/docs/4.1.9.RELEASE/spring-framework-reference/html/beans.html )
![image](https://github.com/user-attachments/assets/7d0b6fab-56ee-49bb-9170-61af17029c51)

## 3. For information about using other forms of metadata with the Spring container, see:
- XML based configureration metadata.
- Annotation-based configuration: Spring 2.5 introduced support for annotation-based configuration metadata.
- Java-based configuration: Starting with Spring 3.0, many features provided by the Spring JavaConfig project became part of the core Spring Framework. Thus you can define beans external to your application classes by using Java rather than XML files. To use these new features, see the @Configuration, @Bean, @Import and @DependsOn annotations.

## 4. The following example shows the basic structure of XML-based configuration metadata:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```

### 4.1 Instantiating a container
```xml
ApplicationContext context =
    new ClassPathXmlApplicationContext(new String[] {"services.xml", "daos.xml"});
```






