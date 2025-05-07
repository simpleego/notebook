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
### 🚀 자바스크립트의 **기본 매개변수 (Default Parameters)** 특징 및 예제

기본 매개변수는 **함수를 호출할 때 인수를 제공하지 않았을 경우, 기본값을 설정하는 기능**입니다. ES6(ECMAScript 2015)에서 도입되었으며, **더 간결하고 안전한 코드 작성**이 가능합니다.

---

## 1️⃣ 기본 문법  
기본 매개변수는 함수 정의 시 **매개변수에 기본값을 설정**할 수 있습니다.

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet("Alice"); // "Hello, Alice!"
greet(); // "Hello, Guest!" (기본값 적용)
```
✅ **함수 호출 시 값이 전달되지 않으면, 기본값 사용!**  

---

## 2️⃣ 여러 개의 기본 매개변수 설정  
```javascript
function introduce(name = "Unknown", age = 0) {
  console.log(`이름: ${name}, 나이: ${age}`);
}

introduce("Bob", 25); // "이름: Bob, 나이: 25"
introduce("Alice"); // "이름: Alice, 나이: 0"
introduce(); // "이름: Unknown, 나이: 0"
```
💡 **여러 개의 기본값을 설정하면 더 유연한 함수 작성 가능!**

---

## 3️⃣ 기본 매개변수와 `undefined`  
기본값은 **매개변수가 `undefined`일 때만 적용**됩니다.  
```javascript
function multiply(a, b = 2) {
  return a * b;
}

console.log(multiply(5, 3)); // 15 (b에 값 전달됨)
console.log(multiply(5, undefined)); // 10 (b에 기본값 적용)
console.log(multiply(5, null)); // 0 (null은 기본값 적용되지 않음)
```
🔹 `undefined`인 경우에만 기본값이 사용되며, `null`은 기본값으로 대체되지 않음!  

---

## 4️⃣ 기본값을 함수 호출 결과로 설정  
기본값에 함수 호출 결과를 사용할 수도 있습니다.  
```javascript
function getDefaultValue() {
  return 42;
}

function calculate(value = getDefaultValue()) {
  console.log(`결과: ${value}`);
}

calculate(); // "결과: 42" (기본값으로 함수 호출 결과 사용)
calculate(100); // "결과: 100"
```
✅ **동적 기본값 설정 가능!**

---

## 5️⃣ 기본 매개변수와 나머지 매개변수(`...rest`)  
기본 매개변수와 **나머지 매개변수**(`...rest`)를 함께 사용할 수도 있습니다.  
```javascript
function sum(x = 0, ...numbers) {
  return numbers.reduce((acc, num) => acc + num, x);
}

console.log(sum()); // 0 (아무 값도 전달되지 않음)
console.log(sum(10, 20, 30)); // 60
console.log(sum(undefined, 5, 5)); // 10 (기본값 적용)
```
📌 **첫 번째 매개변수에 기본값을 설정하고, 나머지 값을 배열로 처리 가능!**

---

### 🎯 정리  
| 특징 | 설명 |
|------|------|
| 기본값 설정 | 함수 호출 시 값이 없으면 자동 적용 |
| `undefined` 처리 | `undefined`인 경우 기본값 사용 (`null`은 적용되지 않음) |
| 동적 기본값 | 기본값을 함수 호출 결과로 설정 가능 |
| 나머지 매개변수와 함께 사용 | 기본값과 `...rest`를 조합하여 활용 가능 |

✨ **기본 매개변수를 활용하면 더 안전하고 유연한 함수 작성이 가능**하며, **예외 처리 로직을 줄여 가독성을 높일 수 있습니다!**  

더 궁금한 점이 있으면 언제든지 질문하세요! 🚀😃

## ⑤ 배열 및 객체 비구조화 (Array and object destructing)
### 🚀 자바스크립트의 **배열 및 객체 비구조화 할당 (Destructuring Assignment)** 특징 및 예제  

비구조화 할당은 **배열이나 객체에서 필요한 값을 손쉽게 추출하는 문법**으로, ES6(ECMAScript 2015)에서 도입되었습니다. 이 문법을 활용하면 코드가 더 간결해지고 가독성이 향상됩니다.  

---

## 1️⃣ 배열 비구조화 할당 (Array Destructuring)  
배열의 각 요소를 **변수에 쉽게 할당**할 수 있습니다.  

```javascript
const numbers = [1, 2, 3];

const [first, second, third] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(third); // 3
```
✅ **배열의 요소를 개별 변수에 할당 가능!**  

---

### 🌟 일부 요소만 추출하기  
필요한 요소만 선택적으로 가져올 수도 있습니다.  

```javascript
const numbers = [10, 20, 30, 40];

const [first, , third] = numbers;

console.log(first); // 10
console.log(third); // 30
```
🔹 **쉼표(`,`)를 사용하여 특정 인덱스의 값만 추출 가능!**  

---

### 🌟 기본값 설정하기  
배열 요소가 `undefined`일 경우 기본값을 설정할 수도 있습니다.  
```javascript
const [x = 5, y = 10] = [1];
console.log(x); // 1
console.log(y); // 10 (기본값 적용)
```
📌 **기본값을 설정하면 예외 처리 없이 안전한 코드 작성 가능!**  

---

### 🌟 나머지 요소(`...rest`) 활용하기  
나머지 요소를 배열로 저장할 수도 있습니다.  
```javascript
const [first, ...rest] = [100, 200, 300, 400];

console.log(first); // 100
console.log(rest);  // [200, 300, 400]
```
🔹 **남은 요소를 `...rest`를 사용해 배열로 담을 수 있음!**  

---

## 2️⃣ 객체 비구조화 할당 (Object Destructuring)  
객체의 속성을 **손쉽게 변수에 할당**할 수 있습니다.  
```javascript
const user = { name: "Alice", age: 25 };

const { name, age } = user;

console.log(name); // "Alice"
console.log(age); // 25
```
✨ **객체에서 필요한 속성만 간결하게 추출 가능!**  

---

### 🌟 변수명 변경하기  
추출한 값을 **다른 변수명으로 저장**할 수도 있습니다.  
```javascript
const user = { fullName: "Alice", years: 25 };

const { fullName: name, years: age } = user;

console.log(name); // "Alice"
console.log(age); // 25
```
💡 **객체의 키 이름과 다른 변수명을 사용할 수 있음!**  

---

### 🌟 기본값 설정하기  
객체 속성이 없는 경우 기본값을 설정할 수 있습니다.  
```javascript
const user = { name: "Bob" };

const { name, age = 30 } = user;

console.log(name); // "Bob"
console.log(age); // 30 (기본값 적용)
```
📌 **객체 속성이 없을 때 안전한 값 설정 가능!**  

---

### 🌟 나머지 속성(`...rest`) 활용하기  
나머지 속성을 객체로 저장할 수도 있습니다.  
```javascript
const user = { id: 1, name: "Charlie", age: 28, country: "Korea" };

const { id, name, ...details } = user;

console.log(id); // 1
console.log(name); // "Charlie"
console.log(details); // { age: 28, country: "Korea" }
```
🔹 **객체의 일부 속성만 추출하고, 나머지를 새로운 객체로 저장 가능!**  

---

## 3️⃣ 함수에서 비구조화 할당 활용하기  
함수의 매개변수에서 **비구조화 할당을 사용하면 더욱 깔끔한 코드 작성 가능**  
```javascript
function displayUser({ name, age }) {
  console.log(`이름: ${name}, 나이: ${age}`);
}

const user = { name: "Daisy", age: 27 };

displayUser(user); // "이름: Daisy, 나이: 27"
```
✅ **객체를 함수에 전달할 때, 필요한 속성만 추출 가능!**  

---

### 🎯 정리  
| 특징 | 설명 |
|------|------|
| 배열 비구조화 | 배열 요소를 개별 변수로 쉽게 추출 가능 |
| 객체 비구조화 | 객체 속성을 변수로 간결하게 할당 가능 |
| 기본값 설정 | `undefined`인 경우 안전한 값 적용 가능 |
| 나머지 요소(`...rest`) | 남은 값들을 배열 또는 객체로 저장 가능 |
| 함수 매개변수 활용 | 함수 내에서 속성 추출 가능 |

✨ 비구조화 할당을 사용하면 **더 직관적이고 효율적인 코드 작성**이 가능하며, **객체와 배열을 다루는 작업을 간결하게 처리할 수 있습니다!**  


## ⑥ 가져오기 및 내보내기 (Import and export) 
### 🚀 자바스크립트 **`import` & `export`** 특징 및 사용법  

`import`와 `export`는 ES6(ECMAScript 2015)에서 도입된 **모듈 시스템**으로, 코드의 구조를 개선하고 유지보수를 쉽게 할 수 있도록 돕습니다. 이를 활용하면 **코드를 여러 파일로 분리하고 필요한 부분만 가져와 사용할 수 있습니다.**  

---

## 1️⃣ `export` – 모듈 내보내기  

### 🔹 **기본 내보내기 (`export default`)**  
모듈에서 **단일 값을 내보낼 때** 사용합니다.  
```javascript
// math.js
export default function add(a, b) {
  return a + b;
}
```
🔹 다른 파일에서 가져올 때, 이름을 변경할 수도 있습니다.  
```javascript
// app.js
import sum from "./math.js"; // `sum`으로 변경 가능

console.log(sum(10, 5)); // 15
```
✅ **기본 내보내기(`export default`)는 하나의 모듈에서 하나만 사용 가능!**  

---

### 🔹 **개별 내보내기 (`export`)**  
여러 개의 함수나 변수를 내보낼 때 사용합니다.  
```javascript
// utils.js
export function multiply(a, b) {
  return a * b;
}

export const PI = 3.1415;
```
🔹 가져올 때 **중괄호 `{}`**를 사용해야 합니다.  
```javascript
// app.js
import { multiply, PI } from "./utils.js";

console.log(multiply(4, 5)); // 20
console.log(PI); // 3.1415
```

📌 **여러 개의 값 내보내고 가져올 때 개별 `export` 사용!**  

---

## 2️⃣ `import` – 모듈 가져오기  

### 🔹 **모든 내보낸 값을 한 번에 가져오기 (`import * as`)**  
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```
🔹 `*`를 사용해 **전체 모듈을 객체처럼 가져올 수 있음**  
```javascript
// app.js
import * as math from "./math.js";

console.log(math.add(5, 3)); // 8
console.log(math.subtract(10, 6)); // 4
```
📌 **모든 모듈을 `math` 객체로 불러와 사용 가능!**  

---

### 🔹 **이름 변경해서 가져오기 (`import { as }`)**  
```javascript
// constants.js
export const MAX_USERS = 100;
export const MIN_USERS = 1;
```
🔹 **사용할 때 이름을 변경할 수 있음**  
```javascript
// app.js
import { MAX_USERS as MAX, MIN_USERS as MIN } from "./constants.js";

console.log(MAX); // 100
console.log(MIN); // 1
```
📌 **모듈 이름을 변경해서 가져올 수 있어 코드 가독성 향상!**  

---

## 3️⃣ `export`와 `import`의 활용  

### 🔹 **모듈을 구조화하여 유지보수 용이**  
```javascript
// userService.js
export function getUser(id) {
  return { id, name: "Alice" };
}

export function deleteUser(id) {
  return `User ${id} deleted`;
}
```
```javascript
// app.js
import { getUser, deleteUser } from "./userService.js";

console.log(getUser(1)); // { id: 1, name: "Alice" }
console.log(deleteUser(1)); // "User 1 deleted"
```

✅ **코드를 여러 파일로 분리하면 관리가 쉬워지고 가독성이 향상됨!**  

---

### 🎯 정리  
| 기능 | 설명 |
|------|------|
| `export default` | 모듈에서 단일 값 내보내기 (가져올 때 이름 변경 가능) |
| `export` | 여러 개의 값 내보내기 (가져올 때 `{}` 사용) |
| `import * as name` | 모든 모듈을 한 번에 가져오기 |
| `import { name as alias }` | 모듈 이름 변경해서 가져오기 |

✨ **모듈 시스템을 활용하면 코드의 유지보수가 쉬워지고 재사용성이 높아집니다!**  

## ⑦ 프로미스 (Promises) 
### 🚀 자바스크립트 **Promises** 특징 및 사용법  

`Promise`는 **비동기 작업의 결과를 처리하는 객체**로, ES6(ECMAScript 2015)에서 도입되었습니다. 이를 활용하면 **콜백 지옥(Callback Hell)을 해결**하고, 비동기 코드를 더 가독성 있게 작성할 수 있습니다.  

---

## 1️⃣ `Promise`의 기본 개념  
`Promise`는 **비동기 작업이 완료되었는지 여부를 추적**합니다.  
```javascript
const promise = new Promise((resolve, reject) => {
  // 비동기 작업 실행 (예: 데이터 요청)
  let success = true;

  if (success) {
    resolve("✅ 작업 성공!");
  } else {
    reject("❌ 작업 실패!");
  }
});

promise
  .then(result => console.log(result)) // 성공 시 실행
  .catch(error => console.error(error)) // 실패 시 실행
  .finally(() => console.log("🎉 작업 완료!")); // 항상 실행
```
✨ **`resolve()`가 호출되면 `.then()`, `reject()`가 호출되면 `.catch()` 실행!**  

---

## 2️⃣ `Promise`의 상태  
`Promise`는 **세 가지 상태**를 가집니다.  
| 상태 | 설명 |
|------|------|
| **Pending** | 작업 진행 중 (초기 상태) |
| **Fulfilled** | 작업 성공 (`resolve()` 호출) |
| **Rejected** | 작업 실패 (`reject()` 호출) |

📌 `.finally()`는 성공/실패와 관계없이 항상 실행됨!  

---

## 3️⃣ `then()`, `catch()`, `finally()`  
🔹 **비동기 결과를 처리하는 체이닝(chaining)** 방식  
```javascript
const asyncTask = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("✅ 데이터 로드 완료!");
  }, 2000);
});

asyncTask
  .then(data => console.log(data)) // "✅ 데이터 로드 완료!"
  .catch(error => console.error(error))
  .finally(() => console.log("🎉 작업 종료!"));
```

✅ **`.then()`으로 성공 처리, `.catch()`로 오류 처리, `.finally()`로 정리 작업 수행!**  

---

## 4️⃣ `Promise.all()` – 여러 작업 동시에 실행  
여러 개의 `Promise`를 동시에 실행하고, **모두 완료될 때 처리**  
```javascript
const task1 = new Promise(resolve => setTimeout(() => resolve("🚀 첫 번째 작업 완료!"), 1000));
const task2 = new Promise(resolve => setTimeout(() => resolve("🔥 두 번째 작업 완료!"), 2000));

Promise.all([task1, task2]).then(results => {
  console.log(results); // ["🚀 첫 번째 작업 완료!", "🔥 두 번째 작업 완료!"]
});
```
✅ **모든 `Promise`가 완료되면 결과 배열을 반환!**  

---

## 5️⃣ `Promise.race()` – 가장 빠른 작업만 처리  
가장 먼저 완료되는 `Promise`의 결과를 반환  
```javascript
const taskA = new Promise(resolve => setTimeout(() => resolve("🐢 느린 작업"), 3000));
const taskB = new Promise(resolve => setTimeout(() => resolve("⚡ 빠른 작업"), 1000));

Promise.race([taskA, taskB]).then(result => {
  console.log(result); // "⚡ 빠른 작업"
});
```
✅ **먼저 완료된 `Promise`의 결과만 반환!**  

---

## 6️⃣ `async/await` – `Promise`를 더 쉽게 사용하기  
`async/await`를 사용하면 `Promise`를 **더 직관적으로 처리**할 수 있습니다.  
```javascript
function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve("🌟 데이터 가져오기 성공!"), 2000));
}

async function getData() {
  const data = await fetchData(); // Promise의 결과를 기다림
  console.log(data);
}

getData(); // "🌟 데이터 가져오기 성공!"
```
✅ **`await`을 사용하면 `Promise`의 결과를 기다리고, 코드가 동기적으로 실행되는 것처럼 보이게 됨!**  

---

### 🎯 정리  
| 기능 | 설명 |
|------|------|
| `Promise` | 비동기 작업을 처리하는 객체 |
| `resolve()` | 작업 성공 |
| `reject()` | 작업 실패 |
| `.then()` | 성공 결과 처리 |
| `.catch()` | 오류 처리 |
| `.finally()` | 항상 실행되는 코드 |
| `Promise.all()` | 모든 `Promise`가 완료될 때 실행 |
| `Promise.race()` | 가장 빠른 `Promise` 결과만 반환 |
| `async/await` | `Promise`를 더 직관적으로 사용 가능 |

✨ `Promise`를 활용하면 **비동기 코드의 가독성을 높이고 예외 처리를 쉽게 할 수 있습니다!**  

## ⑧ 나머지 매개 변수 및 확산 연산자 (Rest parameter and Spread operator) 
### 🚀 자바스크립트 **Rest Parameter & Spread Operator** 특징 및 사용법  

**Rest Parameter (`...`)**와 **Spread Operator (`...`)**는 ES6(ECMAScript 2015)에서 도입된 문법으로, 배열이나 객체를 더 **유연하게 다루는 기능**을 제공합니다.  

---

## 1️⃣ **Spread Operator (`...`)** – 값 펼치기  

Spread Operator는 **배열 또는 객체의 요소를 개별 값으로 펼칠 때** 사용됩니다.  

### 🔹 **배열 확장 (복사 및 결합)**
```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers); // [1, 2, 3, 4, 5]
```
✅ **기존 배열을 복사하고 새로운 요소를 추가할 수 있음!**  

---

### 🔹 **객체 확장 (복사 및 결합)**  
```javascript
const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, country: "Korea" };

console.log(updatedUser); // { name: "Alice", age: 25, country: "Korea" }
```
✅ **객체를 복사하면서 새로운 속성 추가 가능!**  

---

### 🔹 **함수 호출 시 요소 펼치기**
```javascript
function sum(a, b, c) {
  return a + b + c;
}

const values = [10, 20, 30];

console.log(sum(...values)); // 60
```
📌 **배열을 개별 인수로 펼쳐서 함수에 전달 가능!**  

---

## 2️⃣ **Rest Parameter (`...`)** – 나머지 값을 배열로 저장  

Rest Parameter는 **함수의 매개변수에서 여러 값을 배열로 수집할 때** 사용됩니다.  

### 🔹 **함수에서 가변 인자 처리**
```javascript
function sumAll(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sumAll(10, 20, 30, 40)); // 100
```
✅ **남은 모든 값을 배열로 모아서 처리 가능!**  

---

### 🔹 **배열 비구조화 할당과 함께 사용**
```javascript
const [first, second, ...rest] = [100, 200, 300, 400, 500];

console.log(first); // 100
console.log(second); // 200
console.log(rest); // [300, 400, 500]
```
📌 **첫 번째, 두 번째 값만 추출하고 나머지는 배열에 저장 가능!**  

---

### 🔹 **객체 비구조화 할당과 함께 사용**
```javascript
const user = { id: 1, name: "Bob", age: 30, country: "Japan" };

const { id, name, ...details } = user;

console.log(id); // 1
console.log(name); // "Bob"
console.log(details); // { age: 30, country: "Japan" }
```
✅ **일부 속성만 추출하고 나머지는 새로운 객체에 저장 가능!**  

---

## 3️⃣ **Spread vs Rest 차이점**  

| 기능 | 설명 |
|------|------|
| **Spread (`...`)** | 배열/객체를 펼쳐서 새로운 값 생성 |
| **Rest (`...`)** | 나머지 값을 배열/객체로 수집 |

📌 **Spread은 값을 확장하고, Rest는 값을 수집하는 역할!**  

---

### 🎯 정리  
✨ **Spread Operator (`...`)**  
- 배열 및 객체의 요소를 펼쳐서 확장 가능  
- 함수 호출 시 배열 요소를 개별 인수로 전달 가능  

✨ **Rest Parameter (`...`)**  
- 함수 매개변수에서 여러 값을 배열로 수집 가능  
- 배열 및 객체 비구조화 할당에서 나머지 요소 저장 가능  

👉 **Spread과 Rest를 활용하면 코드가 더 깔끔하고 유지보수가 쉬워집니다!** 🚀  

## ⑨ 클래스 (Classes)
### 🚀 자바스크립트 **`class`** 특징 및 사용법  

ES6(ECMAScript 2015)에서 도입된 `class`는 객체를 정의하는 더 **직관적인 문법**을 제공합니다. 기존 `prototype` 기반 상속보다 **더 깔끔하고 유지보수하기 쉬운 방식**으로 클래스를 작성할 수 있습니다.  

---

## 1️⃣ **클래스 선언 및 기본 문법**  

클래스는 `class` 키워드를 사용하여 정의하며, `constructor` 메서드를 포함합니다.  

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`안녕하세요! 저는 ${this.name}이고, ${this.age}살입니다.`);
  }
}

const user = new Person("Alice", 25);
user.greet(); // "안녕하세요! 저는 Alice이고, 25살입니다."
```
✅ **클래스는 `new` 키워드로 인스턴스를 생성할 수 있습니다!**  

---

## 2️⃣ **클래스의 메서드 추가**  

클래스 내부에서 여러 개의 **메서드**를 정의할 수 있습니다.  

```javascript
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this.result;
  }

  subtract(value) {
    this.result -= value;
    return this.result;
  }
}

const calc = new Calculator();
console.log(calc.add(10)); // 10
console.log(calc.subtract(5)); // 5
```
📌 **클래스 내부에서 여러 메서드를 정의하여 기능을 확장할 수 있습니다!**  

---

## 3️⃣ **클래스 상속 (`extends`)**  

클래스는 `extends`를 사용하여 **다른 클래스의 기능을 상속**할 수 있습니다.  

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name}이(가) 소리를 냅니다.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("🐶 멍멍!");
  }
}

const dog = new Dog("Charlie");
dog.speak(); // "Charlie이(가) 소리를 냅니다."
dog.bark();  // "🐶 멍멍!"
```
✅ **`extends`를 사용하면 기존 클래스의 기능을 확장할 수 있습니다!**  

---

## 4️⃣ **`super` 키워드 – 부모 클래스의 메서드 호출**  

`super` 키워드를 사용하면 부모 클래스의 생성자 또는 메서드를 호출할 수 있습니다.  

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name}이(가) 소리를 냅니다.`);
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name); // 부모 클래스의 생성자 호출
    this.color = color;
  }

  info() {
    console.log(`🐱 이름: ${this.name}, 색상: ${this.color}`);
  }
}

const cat = new Cat("Milo", "White");
cat.speak(); // "Milo이(가) 소리를 냅니다."
cat.info();  // "🐱 이름: Milo, 색상: White"
```
📌 **`super()`를 사용하면 부모 클래스의 속성을 효율적으로 상속할 수 있습니다!**  

---

## 5️⃣ **정적 메서드 (`static`)**  

`static` 키워드를 사용하면 **클래스 인스턴스 없이 호출 가능한 메서드**를 정의할 수 있습니다.  

```javascript
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(10, 5)); // 15
```
✅ **`static` 메서드는 클래스 자체에서 호출 가능하며 인스턴스를 생성할 필요가 없습니다!**  

---

## 6️⃣ **Getter & Setter**  

Getter와 Setter를 활용하면 **속성 값을 안전하게 관리할 수 있습니다.**  

```javascript
class User {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    console.log(`이름을 변경: ${newName}`);
    this._name = newName;
  }
}

const user = new User("Alice", 25);
console.log(user.name); // "Alice"

user.name = "Bob"; // "이름을 변경: Bob"
console.log(user.name); // "Bob"
```
📌 **`get`과 `set`을 활용하면 클래스의 속성을 더 안전하게 제어할 수 있습니다!**  

---

### 🎯 정리  
| 기능 | 설명 |
|------|------|
| `class` | 객체를 더 깔끔하게 정의하는 문법 |
| `constructor` | 클래스의 생성자 메서드 |
| `extends` | 클래스를 상속하여 기능 확장 |
| `super` | 부모 클래스의 생성자 또는 메서드 호출 |
| `static` | 인스턴스 없이 호출 가능한 정적 메서드 |
| `get` & `set` | 속성을 안전하게 관리하는 메서드 |

✨ 클래스를 사용하면 **객체 지향 방식으로 더욱 구조화된 코드 작성**이 가능하며, **재사용성과 유지보수성이 향상됩니다!** 🚀  
