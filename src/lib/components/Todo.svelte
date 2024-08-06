<script lang="ts">
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
  
    let newTask: string = '';
    const todos: Writable<string[]> = writable([]);
    const completed: Writable<string[]> = writable([]);
  
    const addTask = () => {
      if (newTask.trim() !== '') {
        // Add the new task to the todos list
        todos.update(tasks => [...tasks, newTask.trim()]);
        newTask = ''; // Clear the input field
      }
    };
  
    const completeTask = (index: number) => {
      todos.update(tasks => {
        const task = tasks[index]; // Get the task to complete
        completed.update(done => [...done, task]); // Add to completed list
        return tasks.filter((_, i) => i !== index); // Remove from todos
      });
    };
  
    const removeTask = (index: number) => {
      completed.update(done => {
        return done.filter((_, i) => i !== index); // Remove completed task
      });
    };
  </script>
  
  <div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Accessibility To-Do List</h1>
    <div class="flex mb-4">
      <input
        type="text"
        class="border p-2 flex-grow"
        bind:value={newTask}
        placeholder="Add new task"
        aria-label="Add new task"
      />
      <button
        on:click={addTask}
        class="bg-blue-500 text-white p-2 ml-2"
        aria-label="Add task button"
      >
        Add
      </button>
    </div>
    <h2 class="text-xl font-semibold mb-2">To-Do</h2>
    <ul class="list-disc pl-5">
      {#each $todos as task, index}
        <li class="mb-2 flex justify-between items-center">
          <span>{task}</span>
          <button
            on:click={() => completeTask(index)}
            class="bg-green-500 text-white p-1 ml-2"
            aria-label="Complete task button"
          >
            Complete
          </button>
        </li>
      {/each}
    </ul>
    <h2 class="text-xl font-semibold mt-4 mb-2">Completed</h2>
    <ul class="list-disc pl-5">
      {#each $completed as task, index}
        <li class="mb-2 flex justify-between items-center">
          <span>{task}</span>
          <button
            on:click={() => removeTask(index)}
            class="bg-red-500 text-white p-1 ml-2"
            aria-label="Remove task button"
          >
            Remove
          </button>
        </li>
      {/each}
    </ul>
  </div>
  
  <style>
    .button {
      @apply p-1 ml-2 text-white;
    }
  
    .add-button {
      @apply bg-blue-500;
    }
  
    .complete-button {
      @apply bg-green-500;
    }
  
    .remove-button {
      @apply bg-red-500;
    }
  </style>
  