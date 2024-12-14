# 자바 다형성

> 다형성은 객체 지향 프로그래밍의 중요한 개념입니다. 단순히 하나 이상의 형태를 의미합니다.
즉, 동일한 엔티티(method 또는 operator 또는 object)는 다른 시나리오에서 다른 작업을 수행 할 수 있습니다.

예) Java 다형성

```java
class Polygon {
  // method to render a shape
  public void render() {
    System.out.println("Rendering Polygon...");
  }
}

class Square extends Polygon {
  // renders Square
  public void render() {
    System.out.println("Rendering Square...");
  }
}

class Circle extends Polygon {
  // renders circle
  public void render() {
    System.out.println("Rendering Circle...");
  }
}

class Main {
  public static void main(String[] args) {    
    // create an object of Square
    Square s1 = new Square();
    s1.render();

    // create an object of Circle
    Circle c1 = new Circle();
    c1.render();
  }
}
```
> output
```java
Rendering Square...
Rendering Circle...
```
> 위의 예에서 다각형 수퍼 클래스를 만들었습니다. 다각형두 개의 서브 클래스 : 정사각형과 원, render() 메서드 사용을 알려준다.
render() 메서드의 주요 목적 모양을 렌더링하는 것입니다. 그러나 정사각형을 렌더링하는 프로세스는 원을 렌더링하는 프로세스와 다르다.
따라서 render() 메서드은 다른 클래스에서 다르게 작동합니다. 따라서  render()메서드는 다형성을 구현하는 것입니다.

## 왜 다형성인가?
다형성은 일관된 코드를 만들 수 있습니다. 이전 예제에서 다른 메서드를 만들 수도 있습니다. renderSquare() 과 renderCircle() 등의 메서드는 아무런 문제없이 잘 동작합니다. 그러나 모든 형태에 대해 일일히 다른 메서드을 만들어야합니다. 이런 방식은 코드 일관성을 유지할 수 없다.

이러한 문제를 해결하기 위해 Java의 다형성을 사용하면 단일 메서드를 만들 수 있고, render() 객체의 형태에 따라 다르게 동작합니다.

*Note:*
```
print()메서드는 다형성의 예이다. char, int, string등과 같은 다양한 유형의 데이터 값을 인쇄하는 데 사용됩니다 
```
  
다음과 같은 Java Method로 다형성을 구현 할 수 있다.  
1. Method Overriding
2. Method Overloading
3. Operator Overloading

## 1. Java 메서드 재정의
Java의 상속에서 동일한 메서드가 수퍼 클래스와 서브 클래스 모두에 존재하는 경우, 그런 다음 서브 클래스의 메서드는 수퍼 클래스의 동일한 메서드보다 우선합니다. 이것을 '**메서드 재정의**' 라고합니다.

이 경우 수퍼 클래스에서 동일한 메서드를 수행하고, 서브 클래스에서 다른 작업을 수행합니다.

## 예제 1 : 메서드 재정의를 사용한 다형성
```java
class Language {
  public void displayInfo() {
    System.out.println("Common English Language");
  }
}

class Java extends Language {
  @Override
  public void displayInfo() {
    System.out.println("Java Programming Language");
  }
}

class Main {
  public static void main(String[] args) {
    // create an object of Java class
    Java j1 = new Java();
    j1.displayInfo();

    // create an object of Language class
    Language l1 = new Language();
    l1.displayInfo();
  }
}
```

> **output :**
```java
Java Programming Language
Common English Language
```

자바 프로그래밍 언어
공통 영어
위의 예에서 이름이 지정된 수퍼 클래스를 만들었습니다. 언어그리고 명명 된 서브 클래스 자바. 여기, 메서드 displayInfo() 둘 다 존재한다 언어과 자바.

의 사용 displayInfo() 정보를 인쇄하는 것입니다. 그러나 다른 정보를 인쇄하고 있습니다. 언어과 자바.

메서드를 호출하는 데 사용 된 객체를 기반으로 해당 정보가 인쇄됩니다.

l1 객체를 사용하여 호출 할 때 j1 객체를 사용할 때 Java 프로그래밍 언어를 인쇄 할 때 displayInfo () 메서드는 공통 영어를 인쇄합니다
자바 다형성의 작업
노트: 호출되는 메서드은 프로그램 실행 중에 결정됩니다. 따라서 메서드 재정의는 런타임 다형성.

2. Java 메서드 오버로드
Java 클래스에서는 매개 변수가 다른 경우 동일한 이름의 메서드를 작성할 수 있습니다. 예를 들어

void func() { ... }
void func(int a) { ... }
float func(double a) { ... }
float func(int a, float b) { ... }
이를 Java에서 메서드 오버로드라고합니다. 여기서 동일한 메서드는 매개 변수를 기반으로 다른 작업을 수행합니다.

## 예제 3) 메서드 과부하를 사용한 다형성
```java
class Pattern {
  // method without parameter
  public void display() {
    for (int i = 0; i < 10; i++) {
      System.out.print("*");
    }
  }
  // method with single parameter
  public void display(char symbol) {
    for (int i = 0; i < 10; i++) {
      System.out.print(symbol);
    }
  }
}

class Main {
  public static void main(String[] args) {
    Pattern d1 = new Pattern();
    // call method without any argument
    d1.display();
    System.out.println("\n");
    // call method with a single argument
    d1.display('#');
  }
}
```

> output
```
**********

##########
```


![image](https://github.com/user-attachments/assets/422a27e1-f12b-4408-ba0d-38915616a237)

########
위의 예에서 우리는라는 클래스를 만들었습니다. 무늬. 클래스에는 이름이 지정된 메서드가 포함됩니다 display() 과부하 상태입니다.

// method with no arguments
display() {...}

// method with a single char type argument
display(char symbol) {...}
여기, 주요 기능 display() 패턴을 인쇄하는 것입니다. 그러나 전달 된 인수를 기반으로이 메서드는 다른 작업을 수행합니다.

패턴을 인쇄 *인수가 전달되지 않거나
단일 인 경우 매개 변수의 패턴을 인쇄합니다. char type 인수가 전달됩니다.
노트: 호출되는 메서드은 컴파일러에 의해 결정됩니다. 따라서 컴파일 타임 다형성이라고도합니다.

삼. Java 운영자 과부하
Java의 일부 연산자는 다른 피연산자와 다르게 동작합니다. 예를 들어

+ 연산자는 숫자 추가뿐만 아니라 현 연결 및
같은 연산자 &, |, ! 논리적이고 비트 단위로 작동하기 위해 과부하됩니다.
작업자 과부하를 사용하여 다형성을 달성하는 메서드을 살펴 보겠습니다.

그만큼 + 연산자는 두 개의 엔티티를 추가하는 데 사용됩니다. 그러나 Java에서는 + 운영자는 두 가지 작업을 수행합니다.

1. 언제 + 숫자 (정수 및 부동 소수점 숫자)와 함께 사용되며 수학적 추가를 수행합니다. 예를 들어

int a = 5;
int b = 6;

// + with numbers
int sum = a + b;  // Output = 11
2. 우리가 사용할 때 + 문자열이있는 연산자는 문자열 연결을 수행합니다 (두 문자열에 합류). 예를 들어

String first = "Java ";
String second = "Programming";

// + with strings
name = first + second;  // Output = Java Programming
여기, 우리는 + 운영자는 Java로 과부하되어 두 가지 작업을 수행합니다. 더하기 과 연결.

노트: C ++과 같은 언어에서는 연산자가 다른 피연산자에 대해 다르게 작동하도록 정의 할 수 있습니다. 그러나 Java는 사용자 정의 운영자 과부하를 지원하지 않습니다.

다형성 변수
ᅡ 가변 다른 조건에서 다른 값을 나타내는 경우 다형성이라고합니다.

객체 변수 (인스턴스 변수)는 Java에서 다형성 변수의 동작을 나타냅니다. 클래스의 객체 변수는 해당 클래스의 객체뿐만 아니라 해당 클래스의 객체를 참조 할 수 있기 때문입니다.

예 : 다형성 변수
class ProgrammingLanguage {
  public void display() {
    System.out.println("I am Programming Language.");
  }
}

class Java extends ProgrammingLanguage {
  @Override
  public void display() {
    System.out.println("I am Object-Oriented Programming Language.");
  }
}

class Main {
  public static void main(String[] args) {

    // declare an object variable
    ProgrammingLanguage pl;

    // create object of ProgrammingLanguage
    pl = new ProgrammingLanguage();
    pl.display();

    // create object of Java class
    pl = new Java();
    pl.display();
  }
}
코드 실행
산출물:

프로그래밍 언어입니다.
저는 객체 지향 프로그래밍 언어입니다.
위의 예제에서 객체 변수를 만들었습니다. pl의 프로그래밍 언어수업. 여기, pl다형성 변수입니다. 왜냐하면

진술서 pl = new ProgrammingLanguage(), pl의 대상을 참조 프로그래밍 언어수업.
그리고 성명서에서 pl = new Java(), pl의 대상을 참조 자바수업.
