<script>
    import TodoItem from './TodoItem.svelte'
    export let todoList;

    let isEdit = false;
    let title = ''
    let edit_id = ''

    let editTodo=((todo) =>{
        isEdit = true;
        title = todo.title;
        edit_id = todo.id;
    });

    let offEdit=(()=>{
        isEdit = false;
    });

    let updateTodo=((todo,title)=>{
        todo.title = title;
        todoList = todoList;
        offEdit();
    });

    let deleteTodo = (id) => {
		const index = todoList.findIndex((todo) => todo.id === id);
		if (todoList[index]["completed"]) {
			todoList = todoList.filter((todo) => todo.id !== id);
		} else {
			alert("아직 완료하지 않은 업무입니다.");
		}
	};

    let handleComplete = (id) => {
		const index = todoList.findIndex((todo) => todo.id === id);
		todoList[index]["completed"] = !todoList[index]["completed"];
	}
</script>

<main>
    {#each todoList as todo}
        <!-- <TodoItem {todo}/> -->
        <div>
            <TodoItem {isEdit} {edit_id} {todo} 
            {editTodo} {offEdit} {updateTodo}
            {deleteTodo} {handleComplete}/>            
        </div>
    {/each}
</main>


<style>
   
</style>
