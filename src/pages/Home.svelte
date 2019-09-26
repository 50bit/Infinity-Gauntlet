<script>
import { onMount } from 'svelte';
import { isLoggedIn } from '../../store/store.js';
import { navigate } from "svelte-routing";


onMount(()=>{
    let user="";
    isLoggedIn.subscribe(value=>{
        user=value;
    })
    console.log(user)
    if(!user){
        navigate("/login", { replace: true });
    }
    
})

</script>

<h1>Home Page</h1>