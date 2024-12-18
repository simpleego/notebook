# 조건문과 반복문에 관한 연습문제
1. 1부터 20까지의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하는 프로그램에 알맞은 코드를 작성하시오.
```java
class Exercise1 {
  public static void main(String[] args) {
    int sum = 0;
    for(int i=1; i <=20; i++) {
      if(/*     */) //i가 2또는 3의 배수가 아닐 때만 sum에 i를 더한다.
          /*   */   
    }
    System.out.println("sum="+sum);
  } 
}
```
2. 1+(1+2)+(1+2+3)+(1+2+3+4)+...+(1+2+3+...+10)의 결과를 계산하는 프로그램에 알맞은 코드를 작성하시오.
```java
class Exercise2 {
  public static void main(String[] args) {
    int sum = 0;
    int totalSum = 0;
    for(int i=1; i <=10; i++) {
      /*       */;
      /*        */;
    }
    System.out.println("totalSum="+totalSum);
  } // main
}
```
3. 1+(-2)+3+(-4)+... 과 같은 식으로 계속 더해나갔을 때, 몇까지 더해야 총합이 100이상이 되는지 구하는 프로그램에 알맞은 코드를 작성하시오.
```java
class Exercise3 {
  public static void main(String[] args) {
    int sum = 0; // 총합을 저장할 변수
    int s = 1; // 값의 부호를 바꿔주는데 사용할 변수
    int num = 0;

    // 조건식의 값이 true이므로 무한반복문이 된다.
    for(int i=1;true; i++,/*    */) { // 매 반복마다 s의 값은 1, -1, 1, -1...
      num = s * i; // i와 부호(s)를 곱해서 더할 값을 구한다.
      /*     */
      if(sum >=100) // 총합이 100보다 같거나 크면 반복문을 빠져 나간다.
      break;
    }

    System.out.println("num="+num);
    System.out.println("sum="+sum);
  } 
}
```
4. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하는 프로그램을 작성하시오.
```java
class Exercise4 {
public static void main(String[] args) {
  for(int i=1;i<=6;i++)
    for(int j=1;j<=6;j++)
      if(/*    */)
        System.out.println(i+"+"+j+"="+(i+j));
  }
}
```
5. 숫자로 이루어진 문자열 str이 있을 때, 각 자리의 합을 더한 결과를 출력하는 코드를 완성하라. 만일 문자열이 "12345"라면, ‘1+2+3+4+5’의 결과인 15가 출력되
어야 한다. 알맞은 코드를 넣으시오.  [Hint] String클래스의 charAt(int i)을 사용
```java
class Exercise5 {
  public static void main(String[] args) {
    String str = "12345";
    int sum = 0;
    for(int i=0; i < str.length(); i++) {
      /*                  */
    }
    System.out.println("sum="+sum);
  }
}
```
1. ㅓ리너리
```java
```
1. ㅓ리너리
```java
```
1. ㅓ리너리
```java
```
1. ㅓ리너리
```java
```
1. ㅓ리너리
```java
```
1. ㅓ리너리
```java
```

