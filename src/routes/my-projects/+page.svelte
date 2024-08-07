<script lang='ts'>
    import { onMount } from 'svelte';
  

    let projectName = '';
    let stakeholder = '';
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
    let projects: any[] = [];
    let editingProject: any = null;

    function addProject() {
        const newProject = {
            id: Date.now(),
            name: projectName,
            stakeholder: stakeholder,
            todos: todos.map(todo => ({ ...todo }))
        };
        projects = [...projects, newProject];
        projectName = '';
        stakeholder = '';
        todos = todos.map(todo => ({ ...todo, completed: false }));
    }

    function editProject(project: any) {
        editingProject = { ...project };
    }

    function saveEdit() {
        projects = projects.map(project => {
            if (project.id === editingProject.id) {
                return { ...editingProject };
            }
            return project;
        });
        editingProject = null;
    }

    function calculateCompletion(todos: any[]) {
        const completedTodos = todos.filter(todo => todo.completed).length;
        return (completedTodos / todos.length) * 100;
    }
</script>

<div class="container mx-auto p-4">
    <form on:submit|preventDefault={addProject} class="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <div class="mb-4">
            <label class="block text-primary-800 text-sm font-bold mb-2" for="projectName">Project Name</label>
            <input
                type="text"
                id="projectName"
                bind:value={projectName}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-primary-800 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter project name"
            />
        </div>
        <div class="mb-4">
            <label class="block text-primary-800 text-sm font-bold mb-2" for="stakeholder">Stakeholder</label>
            <input
                type="text"
                id="stakeholder"
                bind:value={stakeholder}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-primary-800 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter stakeholder name"
            />
        </div>
        <div class="mb-4">
            <p class="block text-primary-800 text-sm font-bold mb-2">Accessibility Todos</p>
            {#each todos as todo}
                <label class="block">
                    <input type="checkbox" bind:checked={todo.completed} class="mr-2 leading-tight" />
                    {todo.text}
                </label>
            {/each}
        </div>
        <button
            type="submit"
            class="bg-primary-500 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Add Project
        </button>
    </form>

    {#if projects.length > 0}
        <h2 class="text-3xl text-primary-800 text-center mx-auto my-4">My Projects</h2>
        {/if}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        
        {#each projects as project}
            <div class="bg-white p-6 rounded-lg shadow-md relative">
                <h2 class="text-xl font-bold mb-2">{project.name}</h2>
                <p class="text-primary-800 mb-4"><strong>Stakeholder:</strong> {project.stakeholder}</p>
                <p class="text-primary-800 mb-4"><strong>Completion:</strong> {calculateCompletion(project.todos).toFixed(2)}%</p>
                <ul class="list-disc pl-5">
                    {#each project.todos as todo}
                        <li class={todo.completed ? 'line-through' : ''}>{todo.text}</li>
                    {/each}
                </ul>
                <button
                    on:click={() => editProject(project)}
                    class="absolute top-4 right-4 bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                    Edit
                </button>
            </div>
        {/each}
    </div>

    {#if editingProject}
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold mb-4">Edit Project</h2>
                <div class="mb-4">
                    <label class="block text-primary-800 text-sm font-bold mb-2" for="editProjectName">Project Name</label>
                    <input
                        type="text"
                        id="editProjectName"
                        bind:value={editingProject.name}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-primary-800 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter project name"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-primary-800 text-sm font-bold mb-2" for="editStakeholder">Stakeholder</label>
                    <input
                        type="text"
                        id="editStakeholder"
                        bind:value={editingProject.stakeholder}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-primary-800 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter stakeholder name"
                    />
                </div>
                <div class="mb-4">
                    <p class="block text-primary-800 text-sm font-bold mb-2">Accessibility Todos</p>
                    {#each editingProject.todos as todo}
                        <label class="block">
                            <input type="checkbox" bind:checked={todo.completed} class="mr-2 leading-tight" />
                            {todo.text}
                        </label>
                    {/each}
                </div>
                <div class="flex justify-end">
                    <button
                        on:click={() => saveEdit()}
                        class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                    <button
                        on:click={() => editingProject = null}
                        class="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 800px;
    }
</style>
