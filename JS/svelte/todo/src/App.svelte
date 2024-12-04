<script>
	import { writable } from 'svelte/store'
	import Todo from './Todo.svelte'

	let title = ''
	let todos = writable([])
	let id = 0
	
	function createTodo() {
		if (!title.trim()) {
		  title = ''
			return
 	  }
		$todos.push({
			id,
			title
		})
		$todos = $todos
		title = ''
		id += 1
	}
	// if (e.key === 'Enter') { createTodo() }
	// e.key === 'Enter' ? createTodo() : undefined
	// e.key === 'Enter' && createTodo()
</script>

<input bind:value={title}
			 on:kepup={(e) => {e.key === 'Enter' && createTodo()}} />
<button on:click={createTodo}>
	Create Todo
</button>

{#each $todos as todo}
	<Todo {todos} {todo} />
{/each}
