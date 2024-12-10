<script>
    export let todo;
    export let isEdit;
    export let edit_id;
    export let deleteTodo;    
    export let handleComplete;

    export let editTodo;
    export let updateTodo;
    export let offEdit;

</script>

<main>
    <div>
        {#if isEdit && edit_id == todo.id}
          <input type="text" bind:value={todo.title} />
          <button on:click={updateTodo(todo,todo.title)}>Ok</button>
          <button on:click={offEdit}>Cancel</button>
        {:else}
            <p>{todo.id}: {todo.title}</p>
            <input
                type="checkbox"
                checked={todo.completed}
                on:change={handleComplete(todo.id)}
            />
            <button on:click={editTodo(todo)}>
                <i class="fa fa-edit"></i>
            </button>
            <button on:click={deleteTodo(todo.id)}>
                <i class="fa fa-trash-o"></i>
            </button>
        {/if}
    </div>
</main>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<style>
    p {
        display: inline-block;
    }
</style>
