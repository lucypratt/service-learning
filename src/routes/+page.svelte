<script lang="ts">

import { Table } from '@skeletonlabs/skeleton'
import type { TableSource } from '@skeletonlabs/skeleton'
import { onMount } from 'svelte'
import Memory from '../lib/components/Memory.svelte'
import Quiz from '../lib/components/Quiz.svelte'
import Todo from '../lib/components/Todo.svelte'



</script>

<main class="m-4">
	<h1 class="text-4xl font-bold uppercase text-center">Dev's Guide to Accessibility</h1>


	<!--Choose How to Study-->
	<div>
		<h2 class="text-2xl font-bold text-center my-5">Choose a Tool </h2>
		<div class="flex gap-4 justify-center">
			<a href="/todo-list" class="btn variant-outline-primary p-20 font-bold text-3xl hover:variant-filled-primary" >Accessibility<br> Checklist</a>
			<a href="/check-contrast" class="btn variant-outline-primary p-20 font-bold text-3xl hover:variant-filled-primary">Check<br> Contrast</a>
			<a href="/my-projects" class="btn variant-outline-primary p-20 font-bold text-3xl hover:variant-filled-primary" >My Projects</a>
		</div>

	</div>


	


</main>

