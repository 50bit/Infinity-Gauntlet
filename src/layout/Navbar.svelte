<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-routing';
  import { isLoggedIn } from '../../store/store.js'; 

  onMount(()=>{
    
    
    M.AutoInit();
  });

</script>


<style>

.nav-extended{
  background-color: #212121!important;
  
}
.brandName{
  display: inline;
  font-size: 35px;
  font-family: 'Notable', sans-serif;
  color:#FF3F80;
  width: 100px;
  line-height: 0px;
  text-shadow: 3px 2px #3E50B4;
}

</style>

<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Notable&display=swap" rel="stylesheet">
</svelte:head>

  <nav class="nav-extended ">
    <div class="nav-wrapper container ">
      <Link to="/" >
        <h2 class="brandName"> I . G</h2>
      </Link>
      <a href="/" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">

        {#if !$isLoggedIn}
        <li><Link to="/login">Login</Link></li>
        {/if}
        {#if $isLoggedIn}
          <li><Link to="/">Home</Link></li>
        {/if}
        {#if $isLoggedIn}
          <li><Link to="/logout">Logout</Link></li>
        {/if}

      </ul>
    </div>

  </nav>

  <ul class="sidenav" id="mobile-demo">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/">Home</Link></li>
  </ul>


