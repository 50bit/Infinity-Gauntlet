<script>
import {isLoggedIn} from '../../store/store.js';
import { onMount } from 'svelte';
import axios from 'axios';

let apiUrl='http://localhost:3000/user';
onMount(()=>{
    let axiosConfig = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }
    }
    axios.get(apiUrl,axiosConfig).then(resjson=>console.log(resjson));
    
    
});

</script>

