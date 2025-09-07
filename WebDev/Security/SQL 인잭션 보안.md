# SQL 인잭션 보안
> 코드는 Spring Data JPA에서 **사용자 정의 쿼리**를 작성할 때 사용하는 `@Query` 애너테이션과 **파라미터 바인딩**을 활용한 예제입니다.

---

## 🔍 코드 분석

```java
@Query("SELECT u FROM User u WHERE u.email = :email")
User findByEmail(@Param("email") String email);
```

### 1. `@Query("SELECT u FROM User u WHERE u.email = :email")`
- **JPQL(Java Persistence Query Language)**을 사용한 쿼리입니다.
- JPQL은 SQL과 유사하지만, **테이블이 아닌 엔티티 객체(User)**를 대상으로 작동합니다.
- `u`는 `User` 엔티티의 별칭(alias)이고, `u.email`은 해당 객체의 `email` 필드를 의미합니다.
- `:email`은 **이름 기반 파라미터 바인딩**을 위한 자리 표시자입니다.

### 2. `@Param("email") String email`
- `:email`에 바인딩될 실제 값입니다.
- `@Param("email")`은 메서드 파라미터와 JPQL의 `:email`을 연결해주는 역할을 합니다.
- 이 방식은 **SQL 인젝션 방지에 매우 효과적**입니다. 왜냐하면 JPA가 내부적으로 Prepared Statement를 사용해 값을 안전하게 삽입하기 때문이에요.

---

## 🛡️ 왜 인젝션 방지가 되는가?

SQL 인젝션은 사용자가 입력한 값이 쿼리문에 직접 삽입되어 악의적인 SQL이 실행되는 공격입니다. 예를 들어:

```sql
SELECT * FROM users WHERE email = 'abc@example.com' OR '1'='1'
```

이런 식으로 조건을 조작할 수 있죠. 하지만 JPA에서는 아래처럼 **파라미터 바인딩**을 통해 값을 안전하게 처리합니다:

```sql
SELECT u FROM User u WHERE u.email = ?
```

그리고 `?` 자리에 값이 **Escape 처리된 후** 들어가기 때문에, 쿼리 구조 자체가 변경되지 않습니다.

---

## 🧠 이름 기반 vs 위치 기반 바인딩

| 방식 | 예시 | 특징 |
|------|------|------|
| 이름 기반 | `:email` → `@Param("email")` | ✅ 가독성 좋고 유지보수 쉬움 |
| 위치 기반 | `?1` → 첫 번째 파라미터 | ❌ 순서 변경 시 오류 발생 가능 |

> Spring에서는 **이름 기반 바인딩**을 권장합니다.

---

## ✨ 실전 팁

- `@Query`는 복잡한 조건, 조인, 서브쿼리 등 기본 메서드로 처리하기 어려운 경우에 매우 유용합니다.
- `@Query`는 기본적으로 **JPQL**을 사용하지만, `nativeQuery = true`를 설정하면 **SQL**도 직접 사용할 수 있어요:
  ```java
  @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
  User findByEmailNative(@Param("email") String email);
  ```

---

이 방식은 단순하면서도 강력한 보안과 유연성을 제공합니다.
