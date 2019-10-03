<script>

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Navbar from './layout/Navbar.svelte';	
import Home from './pages/Home.svelte';
import Login from  './pages/Login.svelte';
import Signup from './pages/Signup.svelte';
import Logout from './pages/Logout.svelte';
import User from './pages/User.svelte';
import Products from './pages/Products.svelte';
import AddProduct from './pages/AddProduct.svelte';
import { Router , Route } from 'svelte-routing';



</script>

<style>
.body{
	background-color: #303030!important;
}
</style>


<Router>
	<Navbar />
	<div class="container ">
		<Route path='/' component={Home}></Route>
		<Route path='/login' component={Login}></Route>
		<Route path='/signup' component={Signup}></Route>
		<Route path='/logout' component={Logout}></Route>
		<Route path='/user' component={User}></Route>
		<Route path='/products' component={Products}></Route>
		<Route path='/new_product' component={AddProduct}></Route>
	</div>

</Router>

