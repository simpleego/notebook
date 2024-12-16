# 자바 메모리 구조와 사용법

## 도입
  명저로 다시보는 자바와 메모리 1편에서 작성한 것과 같이 좋은 실력을 갖춘 개발자가 되기 위해서 단순히 자기의 코드가 돌아갔다 뿐 아니라 자신의 코드가 컴퓨터 내부에서 어떻게 동작하는지를 이해해야 합니다. 1편에서는 main(), 변수, block, static 변수, 멀티 프로세스, 멀티 쓰레드를 살펴보았습니다. 알고 있는 언어의 동작과 비슷해서 어렵지 않았을 것입니다. 본 글에서는 추상화, 상속, 다형성 코드에 대해서 T 메모리에 어떻게 저장되는지 볼 것입니다.


## 추상화와 T 메모리
```java
public class Mouse {
    public String name;
    public void sing() { }
}
```
> Mouse.java


```java
public class Mouse {
    public static void main(String [] args){
        Mouse mickey = new Mouse();
        mickey.name = "미키";
        mickey = null;
    }
}
```
> MouseDriver.java
![image](https://github.com/user-attachments/assets/f7d621e7-39ef-4d11-aa7e-676d3215ffcb)

- MouseDriver.java의 public static void main(String [] args) 가 실행되기 전 T 메모리 스냅샷은 위의 그림과 같습니다.
- java.lang 패키지와 클래스들이 T 메모리의 스태틱 영역에 배치됩니다.
- 자세히 보면 name에는 변수 저장 공간이 보이지 않고 이름만 존재합니다.
- 객체가 생성되어야만 속성의 값을 저장하기 위한 메모리 공간이 스태틱 영역이 아닌 힙 영역에 할당됩니다.

