<script>
import { onMount } from 'svelte';
import {navigate} from 'svelte-routing';
import axios from 'axios';
import { isLoggedIn } from '../../store/store.js';

let apiUrl='http://localhost:3000/products';
let baseUrl='http://localhost:3000';
let data = [];
let user;
onMount(()=>{
  isLoggedIn.subscribe(x=>user=x);
  if(!user){
    
    navigate('/login',{replace:true});
  }
  
  axios.get(apiUrl).then(resjson=>data = resjson.data);
  
  
})

</script>



<style>
.card-image img{
   width: 250px!important;
   margin: 0 auto!important;
}
.card{
    margin-top: 50px;
    border-radius: 40px!important;
    word-break: break-word;
}

</style>

<div class="row">
{#each data as eachData ,i }

  <div class="col s12 m6">
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src={baseUrl}/{eachData.image}>
        <span class="card-title">{eachData.name}&nbsp; &nbsp;{eachData.price}.0$</span>
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
      </div>
      <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">{eachData.name}<i class="material-icons right">close</i></span>
          <p>{eachData.description}</p>
      </div>
      <div class="card-content">
        <p>{eachData.description}</p>
      </div>
    </div>
  </div>

{/each}
</div>