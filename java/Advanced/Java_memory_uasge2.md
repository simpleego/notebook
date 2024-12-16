# 자바 메모리 구조와 사용법

## 도입
1편에서는 main(), 변수, block, static 변수, 멀티 프로세스, 멀티 쓰레드를 살펴보았습니다.  
본 글에서는 추상화, 상속, 다형성 코드에 대해서 T 메모리에 어떻게 저장되는지 볼 것입니다.


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
![image](https://github.com/user-attachments/assets/6e83bf47-b14c-4d6f-9ad4-543d24ef3d03)

- 객체 변수 mickey가 Mouse 객체에 대한 참조 변수입니다.
- 객체 변수 mickey가 Mouse 객체의 주소(포인터)를 가지고 있다는 것을 화살표로 표현합니다.
![image](https://github.com/user-attachments/assets/32256b52-4f4b-4401-a441-9398c4e7266d)
- mickey = null이 실행되면 객체 참조 변수 mickey가 더 이상 힙 영역에 존재하는 Mouse 객체를 참조하지 않습니다.
- 가비지 컬렉터가 아무도 참조해 주지 않는 Mouse 객체를 쓰레기로 인지하고 수거해 갑니다.
- 가비지 컬랙터가 다녀간 T 메모리 상태는 위의 그림과 같습니다.

## 상속과 T 메모리

```java
public class Animal {
    public String name;
 
    public void showName(){
        System.out.println("안녕 나는 %s야.", name );
    }
}
```
[Animal.java]

```java
public class Penguin extends Animal {
    public String habitat;
 
    public void showHabitat(){
        System.out.printf("%s는 $s에 살아", name, habitat);
    }
}
```
[Penguin.java]

```java 
public class Driver {
    public static void main(String [] args){
        Penguin pororo = new Penguin();
 
        pororo.name = "뽀로로";
        poeoeo.habitat = "남극";
 
        pororo.showName();
        pororo.showHabitat();
 
        Animal pingu = new Penguin();
        pingu.name = "핑구";
        //pingu.habitat = "EBS";
 
        pingu.showName();
        //pingu.showHabitat();
    }
}
```
[Driver.java]



  

