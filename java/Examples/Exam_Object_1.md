# 객체지향-1 연습문제
1. 다음과 같은 멤버변수를 갖는 SutdaCard클래스를 정의하시오.
![image](https://github.com/user-attachments/assets/1200792c-8ca0-4276-9d55-e617432a5108)

```java
```

2. 문제1에서 정의한 StudaCard클래스에 두 개의 생성자와 info()를 추가해서 실행결과와 같은 결과를 얻도록 하시오.
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
3. 다음과 같은 멤버변수를 갖는 Student클래스를 정의하시오.  
   
| 타입   | 변수명 | 설명     |
|--------|--------|----------|
| String | name   | 학생이름 |
| int    | ban    | 반       |
| int    | no     | 번호     |
| int    | kor    | 국어점수 |
| int    | eng    | 영어점수 |
| int    | math   | 수학점수 |

4. 문제3에서 정의한 Student클래스에 다음과 같이 정의된 두 개의 메서드 getTotal()과 getAverage()를 추가하시오.

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


