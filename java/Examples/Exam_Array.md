# 배열에 관한 연습문제

1. 배열 arr에 담긴 모든 값을 더하는 프로그램을 완성하시오.
```java
class Exercise1 {
    public static void main(String[] args) {
        int[] arr = { 10, 20, 30, 40, 50 };
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            /*      */;
        }
        System.out.println("sum=" + sum);
    }
}
```

2. 2차원 배열 arr2에 담긴 모든 값의 총합과 평균을 구하는 프로그램을 완성하시오.
```java
class Exercise2 {
    public static void main(String[] args) {
        int[][] arr = {
                { 5, 5, 5, 5, 5 },
                { 10, 10, 10, 10, 10 },
                { 20, 20, 20, 20, 20 },
                { 30, 30, 30, 30, 30 }
        };
        int total = 0;
        float average = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                /*             */
            }
        }
        average = total / /*                 */
        System.out.println("totat=" + total);
        System.out.println("average=" + average);
    } // end of main
} // end of class
```

3. 다음은 1과 9사이의 중복되지 않은 숫자로 이루어진 3자리 숫자를 만들어내는 프로그램이다. 알맞은 코드를 넣어서 프로그램을 완성하시오.
```java
class Exercise3 {
    public static void main(String[] args) {
        int[] ballArr = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        int[] ball3 = new int[3];
        // 배열 ballArr의 임의의 요소 2개를 골라서 위치를 바꾼다. 20번 반복
        for (int x = 0; x < 20; x++) {
            int i = (int) (Math.random() * ballArr.length);
            int j = (int) (Math.random() * ballArr.length);
            int tmp = 0;

            /*
              ...
                           */
        }
        // 배열 ballArr의 앞에서 3개의 수를 배열 ball3로 복사한다.
        System.arraycopy(ballArr, 0, ball3, 0, 3);
        for (int i = 0; i < ball3.length; i++) {
            System.out.print(ball3[i]);
        }
    } // end of main
} // end of class
```

4. 다음은 거스름돈을 몇 개의 동전으로 지불할 수 있는지를 계산하는 문제이다. 변수 money의 금액을 동전으로 바꾸었을 때 각각 몇 개의 동전이 필요한지 계산해서 출력하라.
   단, 가능한 한 적은 수의 동전으로 거슬러 주어야한다. 알맞은 코드를 넣어서 프로그램을 완성하시오.
```java
class Exercise4 {
    public static void main(String args[]) {
        // 큰 금액의 동전을 우선적으로 거슬러 줘야한다.
        int[] coinUnit = { 500, 100, 50, 10 };
        int money = 2680;
        System.out.println("money=" + money);
        for (int i = 0; i < coinUnit.length; i++) {
            System.out.println(coinUnit[i] + "원: " + /*                */);
            money = /*                  */;
        }
    } // main
}
```

5. 문제 5-6에 동전의 개수를 추가한 프로그램이다. 커맨드라인으로부터 거슬러 줄 금액을 입력받아 계산한다.
   보유한 동전의 개수로 거스름돈을 지불할 수 없으면, ‘거스름돈이 부족합니다.’라고 출력하고 종료한다. 지불할 돈이 충분히 있으면,  
   거스름돈을 지불한 만큼 가진 돈에서 빼고 남은 동전의 개수를 화면에 출력한다.  알맞은 코드를 넣어서 프로그램을 완성하시오.
```java
class Exercise5 {
    public static void main(String args[]) {
        if (args.length != 1) {
            System.out.println("USAGE: java Exercise5_7 3120");
            System.exit(0);
        }
        // 문자열을 숫자로 변환한다. 입력한 값이 숫자가 아닐 경우 예외가 발생한다.
        int money = Integer.parseInt(args[0]);
        System.out.println("money=" + money);
        int[] coinUnit = { 500, 100, 50, 10 }; // 동전의 단위
        int[] coin = { 5, 5, 5, 5 }; // 단위별 동전의 개수
        for (int i = 0; i < coinUnit.length; i++) {
            int coinNum = 0;
            // 1. 금액(money)을 동전단위로 나눠서 필요한 동전의 개수(coinNum)를 구한다.
            coinNum = money / coinUnit[i];
            // 2. 배열 coin에서 coinNum만큼의 동전을 뺀다.
            // (만일 충분한 동전이 없다면 배열 coin에 있는 만큼만 뺀다.)
            if (coin[i] >= coinNum) {
                coin[i] -= coinNum;
            } else {
                coinNum = coin[i];
                coin[i] = 0;
            }
            // 3. 금액에서 동전의 개수(coinNum)와 동전단위를 곱한 값을 뺀다.
            money -= coinNum * coinUnit[i];
            System.out.println(coinUnit[i] + "원: " + coinNum);
        }
        if (money > 0) {
            System.out.println("거스름돈이 부족합니다.");
            System.exit(0); // 프로그램을 종료한다.
        }
        System.out.println("=남은 동전의 개수 =");
        for (int i = 0; i < coinUnit.length; i++) {
            System.out.println(coinUnit[i] + "원:" + coin[i]);
        }
    } // main
}
```

6. 다음은 배열 answer에 담긴 데이터를 읽고 각 숫자의 개수를 세어서 개수만큼 ‘*’을 찍어서 그래프를 그리는 프로그램이다. 알맞은 코드를 넣어서 완성하시오.
> 실행결과
```
    3***
    2**
    2**
    4****
```
```java
class Exercise6 {
    public static void main(String[] args) {
        int[] answer = { 1, 4, 4, 3, 1, 4, 4, 2, 1, 3, 2 };
        int[] counter = new int[4];
        for (int i = 0; i < answer.length; i++) {
            counter[ /*        */ ]++;
        }
        for (int i = 0; i < counter.length; i++) {
            System.out.print(counter[i]);
            for (int j = 0; j < counter[i]; j++) {
                System.out.print("*"); // counter[i]의 값 만큼 ‘*’을 찍는다.
            }
            System.out.println();
        }
    } // end of main
} // end of class
```

7. 주어진 배열을 시계방향으로 90도 회전시켜서 출력하는 프로그램을 완성하시오.
```
**
**
*****
*****
****
****
**
**
**
```

```java
class Exercise7 {
    public static void main(String[] args) {
        char[][] star = {
                { '*', '*', ' ', ' ', ' ' },
                { '*', '*', ' ', ' ', ' ' },
                { '*', '*', '*', '*', '*' },
                { '*', '*', '*', '*', '*' }
        };
        char[][] result = new char[star[0].length][star.length];
        for (int i = 0; i < star.length; i++) {
            for (int j = 0; j < star[i].length; j++) {
                System.out.print(star[i][j]);
            }
            System.out.println();
        }
        System.out.println();
        for (int i = 0; i < star.length; i++) {
            for (int j = 0; j < star[i].length; j++) {
                int x = j;
                int y = star.length - 1 - i;
                result[x][y] = star[i][j];
            }
        }
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[i].length; j++) {
                System.out.print(result[i][j]);
            }
            System.out.println();
        }
    } // end of main
} // end of class
```

8. 다음은 알파벳과 숫자를 아래에 주어진 암호표로 암호화하는 프로그램이다.  알맞은 코드를 넣어서 완성하시오.
   ![image](https://github.com/user-attachments/assets/a3b852a4-f2de-4006-b7e6-7538a3332b15)

```java
class Exercise8 {
    public static void main(String[] args) {
        char[] abcCode = { '`', '~', '!', '@', '#', '$', '%', '^', '&', '*',
                '(', ')', '-', '_', '+', '=', '|', '[', ']', '{',
                '}', ';', ':', ',', '.', '/' };
        // 0 1 2 3 4 5 6 7 8 9
        char[] numCode = { 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p' };
        String src = "abc123";
        String result = "";
        // 문자열 src의 문자를 charAt()으로 하나씩 읽어서 변환 후 result에 저장
        for (int i = 0; i < src.length(); i++) {
            char ch = src.charAt(i);
            if ('a' <= ch && ch <= 'z') {
                result += abcCode[ch - 'a'];
            } else if ('0' <= ch && ch <= '9') {
                result += numCode[ch - '0'];
            }
        }
        System.out.println("src:" + src);
        System.out.println("result:" + result);
    } // end of main
} // end of class
```
> 실행결과
```
src:abc123
result:`~!wer
```

9. 주어진 2차원 배열의 데이터보다 가로와 세로로 1이 더 큰 배열을 생성해서 배열의 행과 열의 마지막 요소에 각 열과 행의 총합을 저장하고 출력하는 프로그램이다.
    알맞은 코드를 넣어서 완성하시오.( 각 컬럼별 총점을 구한다.)
```java
class Exercise9 {
    public static void main(String[] args) {
        int[][] score = {
                { 60, 90, 80 },
                { 20, 20, 20 },
                { 30, 30, 30 },
                { 40, 40, 40 },
                { 50, 50, 50 }
        };
        int[][] result = new int[score.length + 1][score[0].length + 1];
        for (int i = 0; i < score.length; i++) {
            for (int j = 0; j < score[i].length; j++) {
                result[i][j] = score[i][j];
                result[i][score[0].length] += result[i][j];
                result[score.length][j] += result[i][j];
                result[score.length][score[0].length] += result[i][j];
            }
        }
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result[i].length; j++) {
                System.out.printf("%4d", result[i][j]);
            }
            System.out.println();
        }
    } // main
}
```

10. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

