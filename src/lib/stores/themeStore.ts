import { localStorageStore } from '@skeletonlabs/skeleton'
import type { Writable } from 'svelte/store'
import { browser } from '$app/environment'

export const themeStore: Writable<string> = localStorageStore('theme', browser ? document.body.dataset.theme ?? 'vintage' : 'vintage')

themeStore.subscribe((value) => {
    if (browser) {
        document.body.dataset.theme = value as string

    }
    
})