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
6. 피보나치(Fibonnaci) 수열(數列)은 앞을 두 수를 더해서 다음 수를 만들어 나가는 수열이다. 예를 들어 앞의 두 수가 1과 1이라면 그 다음 수는 2가 되고 그 다음 수는
1과 2를 더해서 3이 되어서 1,1,2,3,5,8,13,21,... 과 같은 식으로 진행된다. 1과 1부터 시작하는 피보나치수열의 10번째 수는 무엇인지 계산하는 프로그램을 완성하시오.
```java
public class Exercise4_11 {
  public static void main(String[] args) {
    // Fibonnaci 수열의 시작의 첫 두 숫자를 1, 1로 한다.
    int num1 = 1;
    int num2 = 1;
    int num3 = 0; // 세번째 값
    System.out.print(num1+","+num2);
    for (int i = 0 ; i < 8 ; i++ ) {
      num3 = /*        */; // 세번째 값은 첫번째와 두번째 값을 더해서 얻는다.
      System.out.print(","+num3); // 세 번째 수열 출력
      num1 = /*    */; // 두 번째 수열을 첫 번째 값으로 한다.
      num2 = /*    */; // 세 번째 수열을 두 번째 값으로 한다.
    }
  } // end of main
}
```
7. 구구단의 일부분을 다음과 같이 출력하시오.  
![image](https://github.com/user-attachments/assets/2ef298ce-1371-4dc0-9840-acf60efcffca)

```java
public class Exercise7 {
  public static void main(String[] args) {
    for (int i = 1 ; i <= 9 ; i++) {
      for (int j = 1; j <= 3; j++) {
        int x = j+1+(i-1)/3*3;
        int y = i%3==0? 3 : i%3 ;
        if(x > 9) // 9단까지만 출력한다. 이 코드가 없으면 10단까지 출력된다.
          break;
        System.out.print(x+"*"+y+"="+x*y+"\t"); //println이 아님에 주의
      }
      System.out.println();
      if(i%3==0) System.out.println(); //
    }
  } // end of main
}
```
8. 다음은 주어진 문자열(value)이 숫자인지를 판별하는 프로그램이다. 알맞은 코드를 넣어서 프로그램을 완성하시오.
```java
class Exercise8 {
    public static void main(String[] args) {
        String value = "12o34";
        char ch = ' ';
        boolean isNumber = true;
        // 반복문과 charAt(int i)를 이용해서 문자열의 문자를
        // 하나씩 읽어서 검사한다.
        for (int i = 0; i < value.length(); i++) {
            ch = value.charAt(i);
            if (/*           */) {
                isNumber = false;
                break;
            }
        }
        if (isNumber) {
            System.out.println(value + "는 숫자입니다.");
        } else {
            System.out.println(value + "는 숫자가 아닙니다.");
        }
    } // end of main
} // end of classF
```
9. 다음은 숫자맞추기 게임을 작성한 것이다. 1과 100사이의 값을 반복적으로 입력해서 컴퓨터가 생각한 값을 맞추면 게임이 끝난다. 사용자가 값을 입력하면, 컴퓨터는 자신이 생각한 값과 비교해서 결과를 알려준다.  사용자가 컴퓨터가 생각한 숫자를 맞추면 게임이 끝나고 몇 번 만에 숫자를 맞췄는지 알려준다. 알맞은 코드를 넣어 프로그램을 완성하시오.
```java
class Excercise9 {
    public static void main(String[] args) {
        // 1~100사이의 임의의 값을 얻어서 answer에 저장한다.
        int answer = (int) (Math.random() * 100) + 1;
        int input = 0; // 사용자입력을 저장할 공간
        int count = 0; // 시도횟수를 세기위한 변수
        // 화면으로 부터 사용자입력을 받기 위해서 Scanner클래스 사용
        java.util.Scanner s = new java.util.Scanner(System.in);
        do {
            count++;
            System.out.print("1과 100사이의 값을 입력하세요 :");
            input = s.nextInt(); // 입력받은 값을 변수 input에 저장한다.
            if (answer > input) {
                System.out.println("더 큰 수를 입력하세요.");
            } else if (answer < input) {
                System.out.println("더 작은 수를 입력하세요.");
            } else {
                System.out.println("맞췄습니다.");
                System.out.println("시도횟수는 " + count + "번입니다.");
                break; // do-while문을 벗어난다
            }
        } while (true); // 무한반복문
    } // end of main
}
```
10. 다음은 회문수를 구하는 프로그램이다. 회문수(palindrome)란, 숫자를 거꾸로 읽어도 앞으로 읽는 것과 같은 수를 말한다.
    예를 들면 ‘12321’이나 ‘13531’같은 수를 말한다.  알맞은 코드를 넣어서 프로그램을 완성하시오. [Hint] 나머지 연산자를 이용하시오.  
```java
class Exercise10 {
    public static void main(String[] args) {
        int number = 12321;
        int tmp = number;
        int result = 0; // 변수 number를 거꾸로 변환해서 담을 변수
        while (tmp != 0) {
            result = /*                */ // 기존 결과에 10을 곱해서 더한다.
            tmp /= 10;
        }
        if (number == result)
            System.out.println(number + "는 회문수 입니다.");
        else
            System.out.println(number + "는 회문수가 아닙니다.");
    } // main
}
```

1. ㅓ리너리
```java
```

