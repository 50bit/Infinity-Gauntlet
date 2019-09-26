<script>
    import { onMount } from 'svelte';
    import {Link,navigate} from 'svelte-routing';
    import { isLoggedIn } from '../../store/store.js';
    import axios from 'axios'
    onMount(()=>{
        
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        isLoggedIn.update(n => n = false);
        
    })

    
</script>