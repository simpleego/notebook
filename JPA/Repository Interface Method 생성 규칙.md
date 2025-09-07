# Repository Interface Method 생성 규칙
> Spring Data JPA에서는 **메서드 이름만으로도 SQL 쿼리를 자동 생성**할 수 있어요.
> 이를 **Query Method** 기능이라고 하며, 정해진 네이밍 규칙을 따르면 복잡한 조회 로직도 쉽게 구현할 수 있습니다. 

---

### 🔍 기본 구조
```java
findBy + [필드명] + [조건/연산자]
```
- `findBy`: 조회 메서드임을 나타냄
- `[필드명]`: 엔티티의 속성과 정확히 일치해야 함
- `[조건/연산자]`: 다양한 검색 조건을 조합 가능

---

### 🟢 단일 조건 조회
```java
List<User> findByName(String name);
Optional<User> findByEmail(String email);
```
- `SELECT * FROM users WHERE name = ?`
- `SELECT * FROM users WHERE email = ?`

---

### 🔗 복합 조건 (AND / OR)
```java
List<User> findByNameAndAge(String name, int age);
List<User> findByNameOrAge(String name, int age);
```
- `AND`, `OR` 키워드로 조건 결합

---

### 🔢 비교 연산자
```java
List<User> findByAgeGreaterThan(int age);
List<User> findByAgeLessThanEqual(int age);
List<User> findByAgeBetween(int start, int end);
```
- `GreaterThan`, `LessThan`, `Between` 등으로 범위 검색 가능

---

### 🔤 문자열 검색
```java
List<User> findByNameLike(String name);
List<User> findByNameStartingWith(String prefix);
List<User> findByNameEndingWith(String suffix);
List<User> findByNameContaining(String keyword);
```
- `LIKE`, `%값`, `값%`, `%값%` 형태로 부분 검색

---

### 🚫 NULL 처리
```java
List<User> findByEmailIsNull();
List<User> findByEmailIsNotNull();
```

---

### 📐 정렬
```java
List<User> findByAgeOrderByNameAsc();
List<User> findByAgeOrderByNameDesc();
```

---

### 🧩 기타 키워드
- `Top`, `First`: 상위 몇 개만 조회
  ```java
  List<User> findTop3ByAge(int age);
  ```
- `Distinct`: 중복 제거
  ```java
  List<User> findDistinctByName(String name);
  ```

---

이 규칙들을 조합하면 꽤 강력한 쿼리를 메서드 이름만으로 만들 수 있어요. 더 복잡한 조건이 필요할 땐 `@Query` 어노테이션을 사용하거나 `QueryDSL` 같은 도구를 활용할 수도 있죠.

원하는 예제나 엔티티가 있다면, 그에 맞는 메서드도 직접 만들어드릴게요!
