<script>
import {Link} from 'svelte-routing';
import axios from 'axios';

let firstname = '',lastname = '',email = '',password = '';
let apiUrl = 'http://localhost:3000/register'

async function onSubmit(e){
    e.preventDefault();
    if(email.trim()===''||password.trim()===''){
        console.log('empty');
    }
    let user = {firstname,lastname,email,password};
    let result ;
    await axios.post(apiUrl,user).then(resjson=> result = resjson.data);
    if(result.success){
        let user = result.user;
        console.log(user);        
    }
    
    
}
</script>


<style>
    .card-content h4{
        text-align: center;
        font-weight: bolder;
        font-size: 40px;
        color: #5c6bc0;
    }
    .card{
        width:600px;
        margin: 20px auto;
    }
    .card .input-field input:focus + label {
     color: #5c6bc0;
    }

   .card .input-field input:focus {
     border-bottom: 1px solid #5c6bc0;
     box-shadow: 0 1px 0 0 #5c6bc0;
   }
   .card .btn{
       border-radius: 20px;
   }
</style>




  <div class="card">
    <div class="card-content">
        <h4>Signup</h4>
        <div class="row">
            <form on:submit={onSubmit} class="col s12 ">
                <div class="row">
                    <div class="input-field col s6 ">
                    <input bind:value={firstname} id="first_name" type="text" class="validate">
                    <label for="first_name">First Name</label>
                    </div>
                    <div class="input-field col s6">
                    <input bind:value={lastname} id="last_name" type="text" class="validate">
                    <label for="last_name">Last Name</label>
                    </div>
                </div>  
                <div class="row">
                    <div class="input-field col s12">
                    <input bind:value={password} id="password" type="password" class="validate">
                    <label for="password">Password</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input bind:value={email} id="email" type="email" class="validate">
                    <label for="email">Email</label>
                    </div>
                </div>

                <div class="row">

                    <button class="btn waves-effect waves-light indigo lighten-1 col s3" type="submit" name="action">Submit
                        <i class="material-icons left">send</i>
                    </button>
                    <div class="col s5 push-s5">
                        <Link to='/login' class="">I already have an account</Link>
                    </div>
                </div>
                
                
        
            </form>
        </div>
    
    </div>
  </div>