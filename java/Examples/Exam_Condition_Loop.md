# 조건문과 반복문에 관한 연습문제
1. 1부터 20까지의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하는 프로그램에 알맞은 코드를 작성하시오.
```java
class Exercise4_2 {
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
class Exercise4_3 {
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
class Exercise4_4 {
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
1. ㅓ리너리
```java
```
1. ㅓ리너리
```java
```
