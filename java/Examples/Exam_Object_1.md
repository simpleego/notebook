# 객체지향-1 연습문제
## 1. 다음과 같은 멤버변수를 갖는 SutdaCard클래스를 정의하시오.

| **타입** | **변수명** |            **설명**           |
|:--------:|:----------:|:-----------------------------:|
| int      | num        | 카드의 숫자(1~10사이의 정수   |
| boolean  | isKwang    | 광(光)이면 true, 아니면 false |

```java
```

## 2. 문제1에서 정의한 StudaCard클래스에 두 개의 생성자와 info()를 추가해서 실행결과와 같은 결과를 얻도록 하시오.
> 실행결과 
```
3
1K
```

```java
class Exercise1 {
    public static void main(String args[]) {
        SutdaCard card1 = new SutdaCard(3, false);
        SutdaCard card2 = new SutdaCard();
        System.out.println(card1.info());
        System.out.println(card2.info());
    }
}

class SutdaCard {
    /*
     * (1) 알맞은 코드를 넣어 완성하시오.
     */
}
```
## 3. 다음과 같은 멤버변수를 갖는 Student클래스를 정의하시오.  
   
| 타입   | 변수명 | 설명     |
|--------|--------|----------|
| String | name   | 학생이름 |
| int    | ban    | 반       |
| int    | no     | 번호     |
| int    | kor    | 국어점수 |
| int    | eng    | 영어점수 |
| int    | math   | 수학점수 |

## 4. 문제3에서 정의한 Student클래스에 다음과 같이 정의된 두 개의 메서드 getTotal()과 getAverage()를 추가하시오.

| **1. 메서드명** |                            **getTotal**                           |
|:----------------:|:------------------------------------------------------------------:|
| 기 능            |  국어(kor), 영어(eng), 수학(math)의 점수를 모두 더해서 반환한다. |
| 반환타입         |  int                                                               |
| 매개변수         |  없음                                                              |


| 2. 메서드명  |  getAverage                                                        |
|--------------|--------------------------------------------------------------------|
| 기 능        |  총점(국어점수+영어점수+수학점수)을 과목수로 나눈 평균을   구한다. |
|              | 소수점 둘째자리에서 반올림할 것.                                   |
| 반환타입     |  float                                                             |
| 매개변수     |  없음                                                              |


```java
class Exercise2 {
    public static void main(String args[]) {
        Student s = new Student();
        s.name = "홍길동";
        s.ban = 1;
        s.no = 1;
        s.kor = 100;
        s.eng = 60;
        s.math = 76;
        System.out.println("이름:" + s.name);
        System.out.println("총점:" + s.getTotal());
        System.out.println("평균:" + s.getAverage());
    }
}

class Student {
    /*
     * (1) 알맞은 코드를 넣어 완성하시오.
     */
}
```
---
> 실행결과
```
이름:홍길동
총점:236
평균:78.7
```
## 5. 다음과 같은 실행결과를 얻도록 Student클래스에 생성자와 info()메서드를 추가하시오.
```java
class Exercise3 {
    public static void main(String args[]) {
        Student s = new Student("홍길동", 1, 1, 100, 60, 76);
        System.out.println(s.info());
    }
}

class Student {
    /*
     * (1) 알맞은 코드를 넣어 완성하시오.
     */
}
```

> 실행결과
```
홍길동,1,1,100,60,76,236,78.7
```

## 6. 두 점의 거리를 계산하는 getDistance()를 완성하시오.
[Hint] 제곱근 계산은 Math.sqrt(double a)를 사용하면 된다

```java
class Exercise4 {
    // 두 점 (x,y)와 (x1,y1)간의 거리를 구한다.
    static double getDistance(int x, int y, int x1, int y1) {
        /*
         * (1) 알맞은 코드를 넣어 완성하시오.
         */
    }
    public static void main(String args[]) {
        System.out.println(getDistance(1, 1, 2, 2));
    }
}
```

> 실행결과
```
두점사이의 거리 : xxx.xx
```

## 7. 문제6에서 작성한 클래스메서드 getDistance()를 MyPoint클래스의 인스턴스메서드로 정의하시오.
```java
class MyPoint {
    int x;
    int y;

    MyPoint(int x, int y) {
        this.x = x;
        this.y = y;
    }
    /*
     * (1) 인스턴스메서드 getDistance를 작성하시오.
     */
}

class Exercise5 {
    public static void main(String args[]) {
        MyPoint p = new MyPoint(1, 1);
        // p(1,1)과 (2,2)의 거리를 구한다.
        System.out.println(p.getDistance(2, 2));
    }
}
```
> 실행결과
```
두점사이의 거리 : xxx.xx
```



       



