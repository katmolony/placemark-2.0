// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";

export const subTitle = writable<string>(); // sub title to be used on a window
export const currentSession = writable<string>(); // email of the currently logged in user