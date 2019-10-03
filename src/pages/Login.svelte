<script>
import {Link,navigate} from 'svelte-routing';
import axios from 'axios';
import { isLoggedIn } from '../../store/store.js';

let email="";//'omar@test.com';
let password = "";//'pp';
let apiUrl='http://localhost:3000/login';


async function onSubmit(e){
    e.preventDefault();
    if(email.trim()===''||password.trim()===''){
        console.log('empty');
    }
    let user = {email,password};
    let result ;
    await axios.post(apiUrl,user).then(resjson=> result = resjson.data);
    if(result.success){
        let token = result.token;
        let user = result.user;
        localStorage.setItem('token',token);
        axios.defaults.headers.common['Authorization']=token;
        isLoggedIn.set(true);
        navigate('/', { replace: true });
    }
    
    
}
</script>


<style>
    .card-content h4{
        text-align: center;
        font-weight: bolder;
        font-size: 40px;
        color: #FF3F80;
    }
    .card{
        width:600px;
        margin: 20px auto;
        background-color: #424242;
    }
    .card .input-field input:focus + label {
     color: #FF3F80;
    }

   .card .input-field input:focus {
     border-bottom: 1px solid #FF3F80;
     box-shadow: 0 1px 0 0 #FF3F80;
   }
   input{color:white;}
   .card .btn{
       border-radius: 20px;
       background-color: #FF3F80;
   }
   label{
       color:white;
   }
</style>




  <div class="card">
    <div class="card-content">
        <h4>Login</h4>
        <div class="row">
            <form on:submit={onSubmit} class="col s12 ">
            
                <div class="row">
                    <div class="input-field col s12">
                    <input id="email" type="email" class="validate" bind:value={email}>
                    <label for="email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input id="password" type="password" class="validate"bind:value={password}>
                    <label for="password">Password</label>
                    </div>
                </div>
                <div class="row">

                    <button type="submit" class="btn waves-effect waves-light col s3" >Submit
                        <i class="material-icons left">send</i>
                    </button>
                    <div class="col s4 push-s5">
                        <Link to='/signup' class="">I don't have an account</Link>
                    </div>
                </div>
                
                
        
            </form>
        </div>
    
    </div>
  </div>