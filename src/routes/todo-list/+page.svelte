<script lang="ts">
    let todos = [
      { id: 1, text: 'homework', completed: false },
      { id: 2, text: 'coding', completed: false }
    ]
  
    let newTodo = ''
    let editingTodo: any = null
    let editedText = ''
   let remaining: any
   
   
   //$: remainingTodosNumber = remainingTodos()
   console.log(remainingTodos())
  
   function remainingTodos() {
    remaining = todos.filter(todo => !todo.completed).length
    console.log(remaining)
    return remaining
   }
  
   function getNextId() {
    const maxId = todos.reduce((max, todo) => {
      return todo.id > max ? todo.id : max
    }, 0)
    return maxId + 1
  }
  
    function addTodo() {
      if (newTodo === '') return
      const nextId = getNextId()
      todos = [...todos, { id: nextId, text: newTodo, completed: false }]
      newTodo = ''
      remainingTodos()
   
    }
  
    function startEditing(todo: any) {
      editingTodo = todo.id
      editedText = todo.text
    }
  
    function updateTodo(id: any) {
      todos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, text: editedText }
        }
        return todo
      })
      editingTodo = null
    }
  
    function completeToggle(id: any) {
      
      todos = todos.map(todo => {
        if (todo.id === id) {
          
          return { ...todo, completed: !todo.completed }
          
        }
        
        return todo
      })
      remainingTodos()
    }
  
    function deleteTodo(id: any) {
      todos = todos.filter(todo => todo.id !== id)
      remainingTodos()
    }
  
    function clearCompleted() {
      todos = todos.filter(todo => !todo.completed)
      remainingTodos()
    }
  
  
  </script>
  
  <main class="container mx-auto mt-8">
    <h1 class="text-4xl font-bold mb-4">Svelte Todo App</h1>
  
    <div class="flex mb-4">
      <input class="input mr-2 p-2" type="text" placeholder="Add todo..." bind:value={newTodo} on:keydown={(e) => {if (e.key === "Enter") addTodo()}}/>
      <button class="btn" on:click={addTodo}>Add Todo</button>
    </div>
  
    <div class="text-left ">
      {#each todos as todo (todo.id)}
        <div class="flex items-center p-2 m-2 border border-gray-200 rounded-xl">
          <input class="mr-2" type="checkbox" checked={todo.completed} on:change={() => completeToggle(todo.id)} />
          { #if editingTodo === todo.id}
            <input class="input mr-2" type="text" bind:value={editedText} on:blur={() => updateTodo(todo.id)} on:keydown={(e) => {if (e.key === "Enter") updateTodo(todo.id)}}/>
            <button class="btn bg-purple-500 hover:bg-purple-60 mr-2" on:click={() => updateTodo(todo.id)}>Save</button>
            <button class="btn bg-blue-500 hover:bg-blue-60 mr-2" on:click={() => {editingTodo = null}}>Cancel</button>
          {:else}
            <span class="mr-2">{todo.text}</span>
            <button class="btn bg-purple-500 hover:bg-purple-60 mr-2" on:click={() => startEditing(todo)}>Edit</button>
            <button class="btn bg-blue-500 hover:bg-blue-60 mr-2" on:click={() => deleteTodo(todo.id)}>Delete</button>
          {/if}
        </div>
      {/each}
    </div>
  
    <p class="mt-4 text-2xl font-bold">{remaining} todos left</p>
  
    {#if todos.some(todo => todo.completed)}
      <button class="btn mt-4" on:click={clearCompleted}>Clear completed todos</button>
    {/if}
  </main>