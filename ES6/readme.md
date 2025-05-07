# ES6 주요 특징 정리
## ① const 와 let 
> const와 let은 모두 JavaScript에서 변수를 선언할 때 사용하는 키워드입니다. 하지만 이 두 키워드에는 중요한 차이점이 있습니다.

🔹 const
변경 불가능: const로 선언한 변수는 한 번 값을 할당하면 이후에 값을 변경할 수 없습니다.

블록 범위 (Block Scope): 중괄호 {} 내부에서만 유효합니다.

초기화 필수: 반드시 선언과 동시에 값을 할당해야 합니다.

```javascript
const pi = 3.14;
pi = 3.1415; // ❌ 오류 발생 (값 변경 불가)
console.log(pi);
```
🔹 let
변경 가능: let으로 선언한 변수는 이후 값을 변경할 수 있습니다.

블록 범위 (Block Scope): 중괄호 {} 내부에서만 유효합니다.

초기화 선택: 선언할 때 값을 할당하지 않아도 됩니다.

```javascript
let count = 0;
count = 1; // ✅ 값 변경 가능
console.log(count);
```

🧐 주요 차이점
| 특징    | const     | let       |
|---------|-----------|-----------|
| 값 변경 | ❌ 불가능  | ✅ 가능    |
| 스코프  | 블록 범위 | 블록 범위 |
| 초기화  | 필수      | 선택      |  

📌 언제 사용해야 할까?

값이 절대 변경되지 않는 경우 → const 사용 (const를 기본적으로 사용하고, 필요한 경우 let으로 변경)

값이 변경될 가능성이 있는 경우 → let 사용


## ② 화살표 함수 (Arrow functions)
### 🚀 자바스크립트의 화살표 함수(Arrow Function) 특징 및 사용법  

화살표 함수는 ES6(ECMAScript 2015)에서 도입된 **짧고 간결한 함수 표현식**입니다. 기존 `function` 키워드를 사용하는 방식보다 코드가 깔끔하며, 특히 **this** 바인딩 방식에서 중요한 차이가 있습니다.

---

## 1️⃣ 기본 문법  
```javascript
// 기본적인 함수 표현식
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5
```
🔹 **매개변수가 하나일 경우** `()` 생략 가능  
```javascript
const square = x => x * x;
console.log(square(4)); // 16
```
🔹 **코드 블록 `{}`을 사용하면 `return` 필요**  
```javascript
const multiply = (a, b) => {
  return a * b;
};
console.log(multiply(3, 4)); // 12
```

---

## 2️⃣ `this` 바인딩 차이점  
화살표 함수는 **자신만의 `this`를 가지지 않으며, 외부 스코프의 `this`를 그대로 사용**합니다.  
```javascript
function traditionalFunction() {
  console.log(this); // 호출되는 방식에 따라 변함
}

const arrowFunction = () => {
  console.log(this); // 외부 스코프의 this를 유지
};

traditionalFunction(); // window 또는 undefined (strict mode)
arrowFunction(); // 외부 스코프의 this를 유지
```

🔹 **예제: 객체에서 this 사용**  
```javascript
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(function () {
      console.log(`Hello, ${this.name}`); // ❌ this는 window(또는 undefined)
    }, 1000);
  }
};

person.greet();
```
화살표 함수를 사용하면 해결됩니다!  
```javascript
const personArrow = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // ✅ this는 personArrow 객체를 유지
    }, 1000);
  }
};

personArrow.greet(); // "Hello, Alice"
```

---

## 3️⃣ `arguments` 객체 없음  
화살표 함수는 자체적인 `arguments` 객체를 생성하지 않습니다.  
```javascript
function traditionalFunc() {
  console.log(arguments); // 정상적으로 arguments 접근 가능
}
traditionalFunc(1, 2, 3);

const arrowFunc = () => {
  console.log(arguments); // ❌ 오류 발생
};
arrowFunc(1, 2, 3);
```
✅ 대신 **rest parameter**(`...args`)를 사용해 해결할 수 있습니다.  
```javascript
const arrowFuncFixed = (...args) => {
  console.log(args);
};
arrowFuncFixed(1, 2, 3); // [1, 2, 3]
```

---

## 4️⃣ 생성자 함수로 사용 불가  
화살표 함수는 `new` 키워드와 함께 **생성자 함수로 사용할 수 없습니다**.  
```javascript
const Person = (name) => {
  this.name = name;
};
// ❌ TypeError: Person is not a constructor
const user = new Person("Bob");
```
👉 **객체를 생성하려면 반드시 `function` 키워드를 사용해야 합니다.**

---

## 5️⃣ **사용하면 좋은 경우 & 사용하지 않아야 할 경우**
✅ **사용하면 좋은 경우**  
- 간단한 콜백 함수 (`map`, `filter`, `reduce` 등과 함께 사용)
- `this`를 유지하고 싶을 때 (객체 메서드 내부의 비동기 함수)
- 간결한 함수 표현이 필요할 때

❌ **사용하지 않아야 할 경우**  
- `this`를 명확하게 다뤄야 하는 경우 (클래스 메서드, 이벤트 핸들러 등)
- `arguments` 객체를 사용해야 하는 경우
- `new` 키워드로 생성해야 하는 경우 (생성자 함수)

---

### 🎯 정리  
| 특징 | 설명 |
|------|------|
| `this` | **외부 스코프의 `this`를 유지** |
| `arguments` | 없음 (대신 `...args` 사용) |
| 코드 표현 | **더 간결하고 직관적** |
| 사용 제한 | `new`와 함께 사용 불가 (생성자 함수 X) |

화살표 함수는 **간결한 표현과 `this` 유지**가 장점이지만, `arguments`를 사용할 수 없고 생성자 함수로 사용할 수 없다는 점을 기억해야 합니다. 

## ③ 템플릿 리터럴 (Template Literals)
### 🚀 자바스크립트의 **템플릿 리터럴** 특징 및 사용법  

템플릿 리터럴(Template Literal)은 ES6에서 도입된 기능으로, 기존의 문자열 연결 방식보다 **더 간결하고 가독성이 좋은 문자열**을 만들 수 있습니다.  

---

## 1️⃣ 기본 문법  
템플릿 리터럴은 **백틱(``` ` ```)**을 사용하여 문자열을 정의합니다.  

```javascript
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, Alice!"
```
✅ **`${}`를 사용해 변수를 문자열 내에서 쉽게 삽입 가능**  

🔹 기존 방식(`+` 연산자 사용)
```javascript
const name = "Alice";
const greeting = "Hello, " + name + "!";
console.log(greeting); // "Hello, Alice!"
```

🔹 템플릿 리터럴 사용 (`${}` 활용)
```javascript
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting); // "Hello, Alice!"
```
✨ **코드가 훨씬 깔끔해지고 가독성이 향상됨!**  

---

## 2️⃣ 다중 행 문자열 (Multi-line String)  
템플릿 리터럴을 사용하면 **줄바꿈을 쉽게 표현**할 수 있습니다.  

🔹 기존 방식 (`\n` 필요)
```javascript
const message = "안녕하세요!\n여러 줄의 문자열을\n작성하고 싶어요.";
console.log(message);
```

🔹 템플릿 리터럴 사용 (백틱 내부에서 줄바꿈 가능)
```javascript
const message = `안녕하세요!
여러 줄의 문자열을
작성하고 싶어요.`;
console.log(message);
```
💡 **템플릿 리터럴을 사용하면 `\n` 없이 간결한 코드 작성 가능!**  

---

## 3️⃣ 표현식 삽입 (Expression Interpolation)  
`${}` 내부에 **변수뿐만 아니라 표현식도 사용 가능**합니다.  
```javascript
const a = 10;
const b = 20;
const result = `합계: ${a + b}`;
console.log(result); // "합계: 30"
```
✔️ **연산이나 함수 호출도 가능**  
```javascript
const getPrice = () => 19900;
const message = `상품 가격은 ${getPrice()}원입니다.`;
console.log(message); // "상품 가격은 19900원입니다."
```

---

## 4️⃣ 중첩 템플릿 리터럴  
템플릿 리터럴은 **중첩된 문자열을 사용할 때도 유용**합니다.  
```javascript
const user = {
  name: "Alice",
  age: 25
};

const userInfo = `사용자 정보:
이름: ${user.name}
나이: ${user.age}세`;

console.log(userInfo);
```

---

## 5️⃣ 태그드 템플릿 (Tagged Template)  
태그드 템플릿을 사용하면 **함수를 활용해 문자열을 조작**할 수 있습니다.  
```javascript
function highlight(strings, value) {
  return `${strings[0]}🎉${value}🎉${strings[1]}`;
}

const message = highlight`오늘의 주인공은 ${"Alice"}입니다!`;
console.log(message); // "오늘의 주인공은 🎉Alice🎉입니다!"
```
🔹 `strings`: 템플릿 문자열의 **고정된 부분**  
🔹 `value`: **삽입된 변수**  

📌 **태그드 템플릿을 활용하면 HTML 렌더링, 다국어 처리, 보안 기능 적용 등 다양한 응용 가능!**  

---

### 🎯 정리  
| 특징 | 설명 |
|------|------|
| 백틱(``` ` ```) 사용 | 더 간결한 문자열 작성 가능 |
| `${}` 표현식 | 변수뿐만 아니라 연산, 함수 호출도 가능 |
| 줄바꿈 지원 | `\n` 없이 자연스러운 다중 행 문자열 생성 가능 |
| 태그드 템플릿 | 문자열을 함수와 함께 조작 가능 |

✨ 템플릿 리터럴을 사용하면 **문자열을 더 직관적으로 작성**할 수 있으며, **가독성과 유지보수성이 크게 향상**됩니다.  


## ④ 기본 매개 변수 (Default parameters)
## ⑤ 배열 및 객체 비구조화 (Array and object destructing)
## ⑥ 가져오기 및 내보내기 (Import and export) 
## ⑦ 프로미스 (Promises) 
## ⑧ 나머지 매개 변수 및 확산 연산자 (Rest parameter and Spread operator) 
## ⑨ 클래스 (Classes)

