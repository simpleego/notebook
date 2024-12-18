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

4. ㅌㅌ
```java
```

5. ㅌㅌ
```java
```

6. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

1. ㅌㅌ
```java
```

