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

![image](https://github.com/user-attachments/assets/71051d0d-38ec-40ad-97cd-a8f13b35e8e8)

- Penguin 클래스의 인스턴스만 힙 영역에 생기는 것이 아니라 Animal 클래스의 인스턴스도 함께 힙 영역에 생깁니다.
- 그림에서는 생략되었지만 모든 클래스의 최상위 클래스인 Object 클래스의 인스턴스도 함께 생성됩니다.
- pingu 객체 참조 변수가 가리키고 있는 것은 Penguin 인스턴스가 아닌 Animal 인스턴스입니다.
- pingu 객체 참조 변수는 사실 펭귄이지만 동물이라는 것만 인식하고 있습니다.
- 따라서 pingu 객체 참조 변수는 habitat 속성과 showHabitat() 메서드를 사용할 수 없습니다.

## 다형성과 T 메모리
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
 
    // 오버 라이딩 - 재정의: 상위 클래스의 메서드와 같은 메서드 이름, 같은 인자 리스트
    public void showName(){
        System.out.println("내 이름은 비밀입니다.");
    }
 
    // 오버로딩 - 중복정의: 같은 메서드 이름, 다른 인자 리스트
    public void showName(String yourName){
        System.out.println("%s 안녕, 나는 $s라고 해.", yourName, name);
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
        pororo.showName("초보람보");
        pororo.showHabitat();
 
        Animal pingu = new Penguin();
        pingu.name = "핑구";
        pingu.showName();
    }
}
```
[Driver.java]

```
어머 내 이름은 알아서 뭐하게요?
초보람보 안녕, 나는 뽀로로라고 해
뽀로로는 남극에 살아
어머 내이름은 알아서 뭐하게요?
```
> [실행결과]
> 위의 코드 실행 결과는 위와 같습니다.
![image](https://github.com/user-attachments/assets/34440017-48b1-4f8f-8750-4e04152e9f73)

- pororo.showName(); 부분을 실행하면 Animal 객체에 있는 showName() 메서드는 Penguin 객체에 있는 showName() 메서드에 의해 재정의, 즉 가려졌기에 Penguin 객체에서 재정의한 showName() 메서드가 호출됩니다.
- T 메모리에서 주의해야 할 것은 pingu 객체 참조 변수는 타입이 Animal 타입이라는 것입니다.
- Animal 객체의 showName()은 Penguin 객체의 showName()에 의해 가려져 있습니다. 따라서 17번째 줄의 pingu.showName() 메서드를 실행하면 Animal 객체에 정의된 showName() 메서드가 아닌 Penguin 객체에 의해 정의된 showName() 메서드가 실행됩니다.
- 상위 클래스 타입의 객체 참조 변수를 사용하더라도 하위 클래스에서 오버라이딩(재정의)한 메서드가 호출됩니다.
