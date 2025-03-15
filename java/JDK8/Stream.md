# Stream 이란?
- 자바 8에서 추가된 스트림(Streams)은 컬렉션, 배열 등에 저장된 요소들을 하나씩 참조하면서 코드를 실행할 수 있는 기능입니다.

## ■ 특징
- Stream은 데이터를 담는 저장소는 아니다.
- Stream은 데이터를 변경하지 않는다.
- Stream은 재사용할 수 없다.
- Stream은 각 요소가 1번씩 처리된다.
- Stream은 무제한일 수도 있다. (실시간으로 계속 들어올 수 있음)

 ## ■ Stream API 사용법
Stream API는 데이터.Stream생성().중개연산()...종료연산(); 구조로 사용합니다.  
Stream API가 제공하는 메소드들은 중개형과 종료형으로 나눌 수 있는데, 특징은 아래와 같습니다. 

### ▷ 중개 연산
계속 연산을 추가할 수 있다.
- Stream을 리턴한다.
- Lazy하다. (종료 연산이 오기 전에는 실행하지 않음)
- Stateless / Stateful 오퍼레이션으로 구분할 수 있다. (sorted의 경우 Stateful. 이전 데이터를 참조하기 때문)
- filter, map, limit, skip, sorted ...

### ▷ 종료 연산
- 더 이상 연산을 연결할 수 없다.
- Stream을 리턴하지 않는다.
- collect, allMatch, count, forEach, min, max, ...

즉, 중개 연산은 몇개든 사용을 할 수 있습니다. 아래의 코드로 예제를 들겠습니다.

```java
names.stream().skip(3).map((n) -> {
    System.out.println(n);
    return "success";
});
```
해당 코드는, names에서 중개 연산인 skip과 map을 사용했습니다. skip(3)이 사용되었기 때문에 맨 처음 요소 3개는 무시하고, map을 사용해서 나머지 요소들을 출력했습니다.
하지만, 결과는 아무것도 출력하지 않는데, 이유는 종료 연산이 없기 때문입니다. 

이번에는 종료 연산인 forEach를 추가했습니다.
```java
List<Integer> names = Arrays.asList(1, 2, 3, 4);

names.stream().skip(3).map((n) -> {
    System.out.println(n);
    return "success";
}).forEach(System.out::println);
```
이제 결과가 출력됩니다. 앞서 중개 연산의 특징 중 하나가 Lazy하다고 말씀는데요.  
중개 연산은 종료 연산이 실행되지 않으면, 아무런 작업도 하지 않습니다.  
종료 연산이 실행되면 그제서야 순차적으로 동작하는 구조입니다.  
![image](https://github.com/user-attachments/assets/65ce7741-b8ab-437d-805b-6e9eadfde45b)

중개 연산인 map에서 요소를 출력한 후 "success"를 다음 연산으로 넘겨줬구요. 종료 연산인 forEach에서 받은 "success"를 출력했습니다.
결과가 하나만 나온 이유는 skip이라는 중개 연산에서, 처음 3개의 요소를 제외한 상태의 stream을 다음 연산에게 넘겨줬기 때문입니다.

## ParallelStream
```java
datas.parallelStream().중개연산().종료연산()
```

자바 8은 일반 Stream외에도, ParallelStream을 지원합니다. 
**ParallelStream**은 하는 일은 동일하지만, 데이터를 **병렬로 처리**하기 때문에 대용량 데이터의 경우에는 performance가 더 뛰어나다고 합니다.

다만, 기본적으로 별도의 Thread pool을 사용하는 게 아니라, **Thread pool 1개를 모든 ParrelStream이 공유**하는 구조라서, 내부에서 db 호출 및 HTTP 요청 등의 코드를 실행하면 Thread pool에 **병목**이 발생하므로, **주의**해서 사용해야 합니다.

## 마무리
Stream을 사용하면, 불필요한 for문이나 반복문 없이 높은 가독성으로 반복 처리를 할 수 있습니다.

참고사이트 : https://jaehoney.tistory.com/133
