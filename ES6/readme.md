# ES6 주요 특징 정리
## ① const 와 let 
const와 let은 모두 JavaScript에서 변수를 선언할 때 사용하는 키워드입니다. 하지만 이 두 키워드에는 중요한 차이점이 있습니다.

🔹 const
변경 불가능: const로 선언한 변수는 한 번 값을 할당하면 이후에 값을 변경할 수 없습니다.

블록 범위 (Block Scope): 중괄호 {} 내부에서만 유효합니다.

초기화 필수: 반드시 선언과 동시에 값을 할당해야 합니다.

```javascript
javascript
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
특징	const	let
값 변경	❌ 불가능	✅ 가능
스코프	블록 범위	블록 범위
초기화	필수	선택
📌 언제 사용해야 할까?

값이 절대 변경되지 않는 경우 → const 사용 (const를 기본적으로 사용하고, 필요한 경우 let으로 변경)

값이 변경될 가능성이 있는 경우 → let 사용
## ② 화살표 함수 (Arrow functions)
## ③ 템플릿 리터럴 (Template Literals)
## ④ 기본 매개 변수 (Default parameters)
## ⑤ 배열 및 객체 비구조화 (Array and object destructing)
## ⑥ 가져오기 및 내보내기 (Import and export) 
## ⑦ 프로미스 (Promises) 
## ⑧ 나머지 매개 변수 및 확산 연산자 (Rest parameter and Spread operator) 
## ⑨ 클래스 (Classes)

