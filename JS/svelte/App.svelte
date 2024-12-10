<script>
    import Todos from './Todos.svelte'
    import Input from './Input.svelte'

	let title = "";
	let user_id = 10;
	let todo='';

	let todoList = [];
	fetch("https://jsonplaceholder.typicode.com/todos")
		.then((response) => {
			if (!response.ok) throw new Error();
			// 데이터 잘 도착 시 리턴값
			return response.json();
		})
		.then((data) => {
			let count = 0;
			data.forEach((item, index) => {
				if (item["userId"] == user_id) {
					todoList[count++] = item;
					console.log("-->" + todoList[count - 1]["userId"]);
				}
			});
		});

	let lastId = 0; // todoList[todoList.length-1]["id"];

	// 할일을 추가하는 함수
	let addTodo = () => {
		lastId = todoList[todoList.length - 1]["id"];
		
		if (!title.trim()) {
			title = '';
			return;
		}

		let newTodo = {
			userId: todoList[0]["userId"],
			id: ++lastId,
			title: title,
			completed: false,
		};
		todoList.push(newTodo);
		todoList = todoList;
		//todoList[todoList.length] = newTodo;
		title = "";
	}

	// todo값을 업데이트 하면서, 엔터키를 누르면 할일이 추가되도록 하는 함수
	let handleKeyUp = (e) => {
		title = e.target.value;
		if (e.keyCode === 13) {
			addTodo();
		}
	};

	
</script>

<main>
	<div>	

		<Input {title} {addTodo} {handleKeyUp}/>
		
		<Todos  todoList = {todoList}/>	

		<div>
			
		</div>
	</div>
</main>

<style>
	
</style>
