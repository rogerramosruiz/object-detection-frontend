import { writable } from "svelte/store";

export let confidence = writable(50);
export let modelSelected = writable('');
