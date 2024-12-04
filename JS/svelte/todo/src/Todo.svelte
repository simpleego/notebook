<script>
	export let todos // Store!
	export let todo
	
	let isEdit = false
	let title = ''
	
	function onEdit() {
		isEdit = true
		title = todo.title
	}
	function offEdit() {
		isEdit = false
	}
	function updateTodo() {
		todo.title = title
		$todos = $todos
		offEdit()
	}
	function deleteTodo() {
		$todos = $todos.filter(t => t.id !== todo.id)
	}
</script>

{#if isEdit}
	<div>
		<input type="text"
					 bind:value={title}
					 on:keydown={(e) => {e.key === 'Enter' && updateTodo()}} />
		<button on:click={updateTodo}>OK</button>
		<button on:click={offEdit}>cancel</button>
	</div>
{:else}
	<div>
		<span>{todo.title}</span>
		<button on:click={onEdit}>Edit</button>
		<button on:click={deleteTodo}>Delete</button>
	</div>
{/if}
