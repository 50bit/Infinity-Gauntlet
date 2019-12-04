<script>
    import {onMount} from 'svelte'
    import { fade , fly} from 'svelte/transition';
    const { css } = emotion;
    import {navigate} from 'svelte-routing';
    import axios from 'axios';
    import { isLoggedIn } from '../../store/store.js';
    let user;
    onMount(()=>{
        isLoggedIn.subscribe(x=>user=x);
        if(!user){
            navigate('/login',{replace:true});
        }
    })

    let img = "https://www.droidviews.com/wp-content/uploads/2018/05/htc_u12_stock_wall_droidviews.jpg";
    $:actualImage="";
    
    function print(event){
        var input = event.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
                img = e.target.result;
                
            }
            reader.readAsDataURL(input.files[0]);
        }
        actualImage = input.files[0];
        console.log(actualImage)
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.chips');
        let options = { 
            placeholder:'Enter Tags'
        }
        var instances = M.Chips.init(elems, options);
    });

    let cardClass=["card","col","s6","originalPos"];
    let secondCardClass =["previewCard" ,"col", "s5"]
    let show = false;
    let preview = false;
    let dpreview = preview;
    let name="",description="",price,tags="";
    
    let longDescriptionTemp ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pulvinar sagittis nibh sed aliquet. Sed rutrum, neque in condimentum venenatis, risus leo consequat diam, vel tincidunt ligula mauris at lacus."

    function Preview(e){
        preview = !preview;
        if(preview == true){
            cardClass[4] = "move";
            setTimeout(()=>{
                secondCardClass[3]="show"
            },200);
            
            dpreview = !dpreview;
            
        }
        else{
            cardClass[4] = "originalPos";
            secondCardClass[3]=""
            dpreview = !dpreview;
            
        }
    }

    function fitLongDescription(str){
        if(str.length >= 180){
            return str.slice(0,140) + " ...."
        }
        else{
            return str
        }
    }

    function send(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append('image',actualImage);
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('tags',"test");
        let apiUrl='http://localhost:3000/products';
        if(name||description||price){
            axios.post(apiUrl,formData).then(resjson=> console.log(resjson.data));
        }   
    }

</script>

<style>

.row{
    transition: all .4s ease!important;
}
.card-content h4{
        text-align: center;
        font-weight: bolder;
        font-size: 40px;
        color: white;
}
.card{
    margin-top: 50px;
    border-radius: 40px!important;
    transition: all .4s ease!important;
    word-break: break-word;
    background-color: #424242;
}
.card-reveal{
    background-color: #424242;
}
.card-reveal .card-title{
    color:white!important;
    font-weight: bolder!important;
}
.originalPos{
    transform: translateX(-30%);
}
.move{
    transform: translateX(50px);
}

.previewCard{
    opacity : 0 ;
    transform: translateX(-50px);
    transition: all .4s ease!important;
    color: white;
}
.show{
    opacity : 1 ;
    transform: translateX(0px);
}
.card-image{
    border-radius: 40px!important;
    transition: all .4s ease!important;
}
.card-image img{
    width: auto;
    margin: 0 auto;
    height: 445px;
}
.custombtn{margin:40px 0 0 10px!important;}
.chips{
    margin:0px 10px;
}
.push-s6{
    transition: all .8s ease-in!important;
}
.switch{
    margin-top: 40px;
    
}
textarea{
    max-height: 40px;;
    overflow:hidden;
    
}
.halfway-fab{
    bottom:115px!important;
}
.card .btn{
       border-radius: 20px;
       background-color: #FF3F80;
}
input{color:white;}
label{
       color:white;
}
</style>


<div class="row">

    <div class="{secondCardClass.join(' ')}" >
      <div class="card ">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src={img}>
          <span class="card-title">{name||"Project Name"}&nbsp; &nbsp;{price||0}.0$ </span>
        </div>
            <a class="btn-floating btn-large halfway-fab waves-effect waves-light red"><i class="material-icons">shopping_cart</i></a>

        <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{name||"Project Name"} &nbsp; &nbsp;{price||0}.0$ <i class="material-icons right">close</i></span>
            <p>{description||longDescriptionTemp}</p>
        </div>
        <div class="card-content">
          <p>{fitLongDescription(description)||fitLongDescription(longDescriptionTemp)}</p>
        </div>
      </div>
    </div>

<div  class="{cardClass.join(' ')}" transition:fade="{{duration: 400 }}">
    <div class="card-content">
        <h4 class="center">Add Product</h4>
        <div class="row">
            <form   on:submit={send} class="col s12 " enctype="multipart/form-data">
            
                <div class="row">
                    <div class="input-field col s6">
                        <input id="name" type="text" class="validate" bind:value={name}>
                        <label for="name">Name</label>
                    </div>
                    
                    <div class="input-field col s6">
                        <input id="price" type="number" class="validate" min="0" bind:value={price}>
                        <label for="price">Price</label>
                    </div>
                
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <textarea id="description" class="validate materialize-textarea" bind:value={description}></textarea>
                    <label for="description">Description</label>
                    </div>
                </div>
                
               
                    
                    <div class=" file-field input-field">
                        <div class=" btn">
                            <span>Image</span>
                            <input type="file" ref="file" on:change={print} bind:value={actualImage} multiple accept="image/*">
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate"   type="text" placeholder="Upload one or more files">
                        </div>
                    </div>
                

                <div class="row">
                    <div class="chips chips-placeholder" ></div>
                </div>

                <div class="row">
                    <button  type="submit" class="btn custombtn waves-effect waves-light col s3 " >Submit
                        <i class="material-icons left">send</i>
                    </button>

                    
                    <div class="switch col s5 push-s5" >
                        <label>
                        Preview
                        <input type="checkbox" on:click={Preview}>
                        <span class="lever"></span>
                        </label>
                    </div>

                    
                </div>
                
                
        
            </form>
        </div>
    
    </div>
</div>
</div>