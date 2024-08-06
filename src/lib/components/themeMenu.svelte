<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore';
	import { Avatar } from '@skeletonlabs/skeleton';
	//import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const handleSignOut = async () => {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Signing out',
			body: `Are you sure you want to sign out?`,
			response: (r: boolean) => {
				if (r) {
					//signOut();
					//goto('/');
				}
			},
		};
		modalStore.trigger(modal);
	};
					

</script>
	<div class="my-6">
		
			<h2 class="p-4 text-xl uppercase">Settings</h2>
			<hr />
		
		<div class="flex gap-2 my-4">
			<div class="flex items-center px-4"><LightSwitch /></div>
			
		<select class="select" bind:value={$themeStore}>
				<option value="wintry">Wintry</option>
				<option value="skeleton">Skeleton</option>
				<option value="crimson">Crimson</option>
				<option value="seafoam">Seafoam</option>
				<option value="rocket">Rocket</option>
				<option value="vintage">Vintage</option>
				<option value="sahara">Sahara</option>
				<option value="hamlindigo">Hamlindigo</option>
		
			</select>
		
		</div>
	</div>				
