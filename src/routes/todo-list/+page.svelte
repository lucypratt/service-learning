<script lang="ts">
   let todos = [
    { id: 1, text: 'Ensure all images have alt text', completed: false },
    { id: 2, text: 'Provide captions for all multimedia content', completed: false },
    { id: 3, text: 'Use semantic HTML elements', completed: false },
    { id: 4, text: 'Ensure sufficient color contrast', completed: false },
    { id: 5, text: 'Enable keyboard navigation for all interactive elements', completed: false },
    { id: 6, text: 'Use ARIA roles and landmarks appropriately', completed: false },
    { id: 7, text: 'Ensure forms are accessible with proper labels and instructions', completed: false },
    { id: 8, text: 'Implement skip navigation links', completed: false },
    { id: 9, text: 'Ensure responsive design for different screen sizes', completed: false },
    { id: 10, text: 'Test accessibility with screen readers', completed: false },
    { id: 11, text: 'Avoid using automatic content changes without user consent', completed: false },
    { id: 12, text: 'Ensure all content is accessible and operable through a keyboard interface', completed: false },
    { id: 13, text: 'Provide clear and consistent navigation', completed: false },
    { id: 14, text: 'Ensure focus indicators are visible and clear', completed: false },
    { id: 15, text: 'Test with automated accessibility tools', completed: false },
    { id: 16, text: 'Regularly review and update accessibility practices', completed: false }
];


    let newTodo = '';
    let editingTodo: any = null;
    let editedText = '';
    let remaining: any = 0;
    let completedTodoArray: any

    function remainingTodos() {
        remaining = todos.filter(todo => !todo.completed).length;
        return remaining;
    }

    function completedTodos() {
        completedTodoArray = todos.filter(todo => todo.completed);
    }

    function getNextId() {
        const maxId = todos.reduce((max, todo) => {
            return todo.id > max ? todo.id : max;
        }, 0);
        return maxId + 1;
    }

    function addTodo() {
        if (newTodo === '') return;
        const nextId = getNextId();
        todos = [...todos, { id: nextId, text: newTodo, completed: false }];
        newTodo = '';
        remainingTodos();
    }

    function startEditing(todo: any) {
        editingTodo = todo.id;
        editedText = todo.text;
    }

    function updateTodo(id: any) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: editedText };
            }
            return todo;
        });
        editingTodo = null;
    }

    function completeToggle(id: any) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        remainingTodos();
        completedTodos();
    }

    function deleteTodo(id: any) {
        todos = todos.filter(todo => todo.id !== id);
        remainingTodos();
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        remainingTodos();
    }
</script>

<main class="container mx-10 mt-8">
    <div class="flex justify-between">
        <div>
            <div>
                <h1 class="text-4xl font-bold mb-4">Accessibility Checklist</h1>
                <p class="text-xl font-bold mb-4">Does your app comply with the following?</p>
                <div class="flex mb-4">
                    <input
                        class="input mr-2 p-4 rounded-md"
                        type="text"
                        placeholder="Add todo..."
                        bind:value={newTodo}
                        on:keydown={(e) => { if (e.key === "Enter") addTodo() }}
                    />
                    <button class="btn variant-filled-primary py-2 rounded-md" on:click={addTodo}>Add Custom Todo</button>
                </div>
                <div class="text-left">
                    {#each todos as todo (todo.id)}
                        <div class="flex items-center p-2 m-2 border border-primary-400 rounded-xl">
                            <input class="mr-2 checkbox" type="checkbox" checked={todo.completed} on:change={() => completeToggle(todo.id)} />
                            {#if editingTodo === todo.id}
                                <input class="input mr-2" type="text" bind:value={editedText} on:blur={() => updateTodo(todo.id)} on:keydown={(e) => { if (e.key === "Enter") updateTodo(todo.id) }} />
                                <button class="btn variant-ghost-primary hover:variant-filled-primary mr-2 rounded-md" on:click={() => updateTodo(todo.id)}>Save</button>
                                <button class="btn variant-ringed hover:variant-ghost-tertiary rounded-md" on:click={() => { editingTodo = null }}>Cancel</button>
                            {:else}
                                <span class="mr-2">{todo.text}</span>
                                <button class="btn variant-ghost-primary hover:variant-filled-primary mr-2 rounded-md" on:click={() => startEditing(todo)}>Edit</button>
                                <button class="btn variant-ringed hover:variant-warning rounded-md" on:click={() => deleteTodo(todo.id)}>Delete</button>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div>
            <div>
                <p class="mt-4 text-2xl font-bold">{remaining} Accessibility Items Left!</p>
                {#if todos.some(todo => todo.completed)}
                    <button class="btn variant-filled-primary py-2 rounded-md my-4" on:click={clearCompleted}>Clear completed todos</button>
                {/if}
                
                <h2 class="mt-4 text-xl font-bold">Completed Items:</h2>
                {#if completedTodoArray}
                {#each completedTodoArray as todo}
                <div class="flex items-center p-2 m-2 border border-primary-400 rounded-xl">
                    <span class="mr-2 line-through">{todo.text}</span>
                </div>
            {/each}
                {/if}
                
            </div>
        </div>
    </div>

    <div class="my-10">
        <h2 class="text-3xl font-bold my-4">Try the W3 Markup Validator to Check Your Site's Compliance</h2>
        <form id="validator-form" action="https://validator.w3.org/check" method="get" target="_blank">
            <label for="url">Enter URL to validate:</label>
            <div class="flex space-x-2">
                <input class="input mr-2 p-4 rounded-md" type="text" id="url" name="uri" placeholder="https://example.com" required>
                <button class="btn variant-filled-primary py-2 rounded-md" type="submit">Validate</button>
            </div>
           
        </form>

    </div>

    <div class="w-100 mx-auto my-6">
        <h2 class="text-3xl font-bold my-4">Why is Accessibility Important?</h2>
        <p class="mb-4">Web accessibility is important for several reasons:</p>
        <ul>
            <li class="mb-4"><strong>Inclusivity:</strong> It ensures that everyone, including people with disabilities, can access and use the web. This promotes equality and inclusivity, allowing all individuals to participate fully in society.</li>
            
            <li class="mb-4"><strong>Legal Compliance:</strong> Many countries have laws and regulations that require websites to be accessible. Compliance with standards like the Web Content Accessibility Guidelines (WCAG) helps organizations avoid legal issues and penalties.</li>
            
            <li class="mb-4"><strong>Wider Audience Reach:</strong> Making a website accessible opens it up to a broader audience, including people with various disabilities, older adults, and those using different devices and technologies. This can lead to increased traffic and potential customers.</li>
            
            <li class="mb-4"><strong>Improved User Experience:</strong> Accessible design often leads to a better overall user experience for everyone. Features that assist users with disabilities, such as clear navigation and proper labeling, can also benefit users without disabilities.</li>
            
            <li class="mb-4"><strong>SEO Benefits:</strong> Many accessibility practices align with good SEO practices, such as using alt text for images and clear headings. This can improve search engine visibility and ranking.</li>
            
            <li class="mb-4"><strong>Social Responsibility:</strong> Prioritizing web accessibility reflects an organization’s commitment to social responsibility and ethical standards. It demonstrates a dedication to serving all users fairly.</li>
            
            <li class="mb-4"><strong>Future-Proofing:</strong> As technology evolves, ensuring accessibility from the start helps future-proof websites against changes in technology and user needs.</li>
        </ul>
        

    </div>
</main>
