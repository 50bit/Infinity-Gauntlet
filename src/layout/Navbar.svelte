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
  background-color: whitesmoke!important;
  box-shadow: none!important;
}
.brandName{
  display: inline;
  font-size: 24px;
  font-family: 'Sedgwick Ave Display', cursive;
  color:#333;
  margin-left: 100px;
}
</style>

<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Sedgwick+Ave+Display&display=swap" rel="stylesheet">
</svelte:head>

  <nav class="nav-extended">
    <div class="nav-wrapper container">
      <Link to="/" >
        <span class="brand-logo">
          <img class="thanos" src="https://img.icons8.com/color/96/000000/thanos.png" alt="thanos">
        </span>
        <h2 class="brandName"> Thanos </h2>
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


