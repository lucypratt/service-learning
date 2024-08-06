<script lang="ts">
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
 import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton'
 import { onNavigate } from '$app/navigation'
 import { page } from '$app/stores'
// import { signIn, signOut } from '@auth/sveltekit/client'
 import { Modal, getModalStore } from '@skeletonlabs/skeleton'
 import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton'
 import { Avatar } from '@skeletonlabs/skeleton'
 
 onNavigate((navigation) => {
     if (!document.startViewTransition) return
 
     return new Promise((resolve) => {
         document.startViewTransition(async () => {
             resolve()
             await navigation.complete
         })
     })
 
 })
 
 
    const drawerStore = getDrawerStore()
 function drawerClose(): void {
      drawerStore.close()
 }
 
 const modalStore = getModalStore()
 const handleSignOut = async () => {
     
     const modal: ModalSettings = {
         type: "confirm",
         title: "You Are Signing Out",
         body:"Are you sure you want to sign out?",
         image: "/goodbye.gif",
         response: (r: boolean) => { if (r) {
          //   signOut()
         
         }
         }
     }
     modalStore.trigger(modal)
 }
 </script>
 
 <div class="w-[100%] flex space-between lg:hidden">
     {#if $page.data.session?.user}
     <Avatar src="{$page.data.session?.user?.image ?? ''}" class="w-8 h-8 rounded-full my-auto ml-4 border-solid border-primary-300 border-4"  on:click={handleSignOut}/>
     {:else}
     <Avatar initials="?" background="bg-primary-500" />
      {/if}  
     <h2 class="p-4 text-xl uppercase">Full Stack Svelte</h2>
     <button on:click={drawerClose} class="ml-10 mr-5">X</button>
     
 </div>
 <hr />
 
 <nav class="list-nav lg:hidden">
     <ul>
        <li><a href="/airbnb" class="border-b-2 mx-4 hover:scale-110 uppercase">Airbnb</a></li>
        <li><a href="/sales" class="mx-4 border-b-2 hover:scale-110 uppercase">Sales Dashboard</a></li>
        <li><a href="/dynamic-routes" class="mx-4 border-b-2 hover:scale-110 uppercase">Dynamic Routes</a></li>
        <li><a href="/tutorial" class="mx-4 border-b-2 hover:scale-110 uppercase">Tutorials</a></li>
         {#if $page.data.session?.user}
         <li>  <a class="text-xl" on:click={handleSignOut}>Logout</a></li>
         {:else}
         <li>  <a class="text-xl" href="/auth/login">Login</a></li>
         {/if}
     </ul>
 </nav>