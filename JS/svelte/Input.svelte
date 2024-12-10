<script>
    export let title;
    export let addTodo;
    export let handleKeyUp;
</script>

<main>  
    <div id="insertItem"> 
        <p>To Do List</p>
        <div>
            <input	type="text"
            placeholder="할일을 입력하쇼"
            bind:value={title}
            on:keyup={(e) => handleKeyUp(e)}
                />
            <button on:click={addTodo}>ADD</button>
        </div>
    </div> 
</main>

<style>
    #insertItem {
        padding-top: 30px;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 55px;
        padding-left: 100px;
        background-color: steelblue;
    }

</style>