# 자료형에 관련된 문제

1. 아래는 변수 num의 값 중에서 백의 자리 이하를 버리는 코드이다. 만일 변수 num의 값이 ‘456’이라면 ‘400’이 되고, ‘111’이라면 ‘100’이 된다. 알맞은 코드를 넣으시오.

```java
public class Exercise1 {
  public static void main(String[] args) {
  int num = 456;
  System.out.println(/*  답안 코드는 여기에   */);
  }
}
```

2. 아래는 변수 num의 값 중에서 일의 자리를 1로 바꾸는 코드이다. 만일 변수 num의 값이 333이라면 331이 되고, 777이라면 771이 된다. 알맞은 코드를 넣으시오.
```java
class Exercise2 {
  public static void main(String[] args) {
  int num = 333;
  System.out.println(/*  답안 코드는 여기에   */);
  }
}
```
3.  아래는 화씨(Fahrenheit)를 섭씨(Celcius)로 변환하는 코드이다. 변환공식이 'C=5/9 × (F - 32)'라고 할 때, 알맞은 코드를 넣으시오.
단, 변환 결과값은 소수점 셋째자리에서 반올림해야한다.(Math.round()를 사용하지 않고 처리할 것)
```java
class Exercise3 {
  public static void main(String[] args) {
    int fahrenheit = 100;
    float celcius = (int)((5/9f *  /*                          */;
    System.out.println("Fahrenheit:"+fahrenheit);
    System.out.println("Celcius:"+celcius);
  }
}
```
4. 다음은 문자형 변수 ch가 영문자(대문자 또는 소문자)이거나 숫자일 때만 변수 b의 값이 true가 되도록 하는 코드이다. 알맞은 코드를 넣으시오.
```java
class Exercise4 {
  public static void main(String[] args) {
    char ch = 'z';
    boolean b = /*                            */;
    System.out.println(b);
  }
}
```

5. 다음은 대문자를 소문자로 변경하는 코드인데, 문자 ch에 저장된 문자가 대문자인 경우에만 소문자로 변경한다. 문자코드는 소문자가 대문자보다 32만큼 더 크다.
예를들어 'A‘의 코드는 65이고 ’a'의 코드는 97이다. (1)~(2)에 알맞은 코드를 넣으시오.
```java
class Exercise5 {
  public static void main(String[] args) {
    char ch = 'A';
    char lowerCase = (1) ? (2): ch ;
    System.out.println("ch:"+ch);
    System.out.println("ch to lowerCase:"+lowerCase);
  }
}
