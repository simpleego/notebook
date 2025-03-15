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

### 중개 연산
계속 연산을 추가할 수 있다.
- Stream을 리턴한다.
- Lazy하다. (종료 연산이 오기 전에는 실행하지 않음)
- Stateless / Stateful 오퍼레이션으로 구분할 수 있다. (sorted의 경우 Stateful. 이전 데이터를 참조하기 때문)
- filter, map, limit, skip, sorted ...

### 종료 연산
- 더 이상 연산을 연결할 수 없다.
- Stream을 리턴하지 않는다.
- collect, allMatch, count, forEach, min, max, ...



