# Ajax 요청 예제 정리(Todo 데이터)
좋아요! 바닐라 자바스크립트를 사용하여 `XMLHttpRequest` 또는 `fetch API`를 이용해 **JSONPlaceholder** 사이트의 **TODO 데이터**를 가져오고, 이를 HTML에 출력하는 예제를 작성해볼게요. 🚀  

---

### **📝 예제 설명**  
1️⃣ **JSONPlaceholder API에서 TODO 데이터를 요청**  
2️⃣ **요청한 데이터를 HTML에 동적으로 추가**  
3️⃣ **에러 발생 시 사용자에게 알림 표시**  

---

### **🔹 방법 1: `XMLHttpRequest` 이용**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TODO 리스트 - XMLHttpRequest</title>
</head>
<body>
    <h1>📌 TODO 리스트</h1>
    <ul id="todoList"></ul>

    <script>
        // XMLHttpRequest를 이용한 AJAX 요청
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/todos", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const todos = JSON.parse(xhr.responseText);
                const todoList = document.getElementById("todoList");

                todos.slice(0, 10).forEach(todo => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${todo.id}. ${todo.title} - ${todo.completed ? "✅ 완료" : "❌ 미완료"}`;
                    todoList.appendChild(listItem);
                });
            } else if (xhr.readyState === 4) {
                alert("데이터를 불러오는 데 실패했습니다.");
            }
        };

        xhr.send();
    </script>
</body>
</html>
```
✅ **`XMLHttpRequest`를 활용하여 데이터를 가져오는 방식!**  

---

### **🔹 방법 2: `fetch API` 이용 (더 간결한 코드)**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TODO 리스트 - Fetch API</title>
</head>
<body>
    <h1>📌 TODO 리스트</h1>
    <ul id="todoList"></ul>

    <script>
        // Fetch API를 이용한 AJAX 요청
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(todos => {
                const todoList = document.getElementById("todoList");

                todos.slice(0, 10).forEach(todo => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${todo.id}. ${todo.title} - ${todo.completed ? "✅ 완료" : "❌ 미완료"}`;
                    todoList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("데이터 요청 중 오류 발생:", error);
                alert("데이터를 불러오는 데 실패했습니다.");
            });
    </script>
</body>
</html>
```
✅ **`fetch API`를 이용해 더 직관적인 방식으로 데이터를 가져올 수 있음!**  

---

### **🎯 정리**  
| 방식 | 특징 |
|------|------|
| `XMLHttpRequest` | 전통적인 AJAX 방식으로 호환성이 뛰어남 |
| `fetch API` | 코드가 간결하며 `Promise`를 지원함 |

바닐라 자바스크립트를 활용해 **라이브러리 없이** API 데이터를 불러와 HTML에 동적으로 표시할 수 있어요! 🚀  
추가로 궁금한 점이 있으면 언제든지 질문하세요. 😃
