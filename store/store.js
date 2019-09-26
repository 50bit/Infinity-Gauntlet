import { writable } from 'svelte/store';

let token = localStorage.getItem('token') || '';

let bool = ( token != '' ) ? true : false;

export let isLoggedIn = writable(bool); 



