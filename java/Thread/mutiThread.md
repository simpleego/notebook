# 다중쓰레드 예제
> 10개의 쓰레드가 각각의 시험점수를 합산한다.
> 10개의 쓰레드 합산이 끝나면 각각의 쓰레드가 구한 합계를 모두 합한다.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class NumberTask implements Callable<Integer> {
    private static final Random random = new Random();
    private final int id;

    public NumberTask(int id) {
        this.id = id;
    }

    @Override
    public Integer call() {
        List<Integer> numbers = new ArrayList<>();
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            int number = random.nextInt(100) + 1;  // 1부터 100 사이의 랜덤한 정수
            numbers.add(number);
            sum += number;
        }
        // 랜덤한 시간 동안 sleep (0~1000 밀리초 사이)
        try {
            Thread.sleep(random.nextInt(1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // 쓰레드의 랜덤한 정수 출력
        System.out.println("Thread " + id + " generated numbers: " + numbers + " Sum: " + sum);
        return sum;
    }
}

public class MultiThreadAdder {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        // 10개의 쓰레드를 생성하기 위해 ExecutorService 사용
        ExecutorService executor = Executors.newFixedThreadPool(10);
        List<Future<Integer>> results = new ArrayList<>();

        // NumberTask 인스턴스를 생성하여 실행
        for (int i = 0; i < 10; i++) {
            Callable<Integer> task = new NumberTask(i + 1);
            results.add(executor.submit(task));
        }

        // 모든 쓰레드의 결과를 합산
        int totalSum = 0;
        for (Future<Integer> result : results) {
            totalSum += result.get();
        }

        // ExecutorService 종료
        executor.shutdown();

        // 총합 출력
        System.out.println("모든 쓰레드가 구한 합의 총합: " + totalSum);
    }
}
```

