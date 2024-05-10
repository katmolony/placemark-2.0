// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";
import type { Location, Session } from "$lib/types/placemark-types";

export const currentSession = writable<Session>(); // email of the currently logged in user
export const subTitle = writable<string>(); // sub title to be used on a window
export const latestLocation = writable<Location>();
