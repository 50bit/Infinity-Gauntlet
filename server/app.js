const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+"-"+file.originalname);
    }
});
const upload = multer({storage:storage,limits:{
    fileSize: 1024 * 1024 * 5
}});
const Product = require("./models/product");



const app = express();
app.use('/uploads',express.static('uploads'));
const port = 3000 ;

app.use(cors({credentials: true, origin: 'http://localhost:5000',crossDomain: true}));
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/svelte',{ useNewUrlParser: true })
.then(()=>console.log("MongoDB Connected...."))
.catch((err)=>console.error(err));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());



app.use(passport.initialize());

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey='c10h15n';

passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    User.findById(jwt_payload._id).then(user=>{
        if(user) return done(null,user);
        return done(null,false);    
    }).catch(err=>console.log(err));
}));




app.get('/',(req,res)=>{
    res.send('hello world');
});

app.post('/register',(req,res)=>{
    var password = req.body.password;
    var newUser=new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    });
    User.createUser(newUser,(err,user)=>{
        if(err){
            console.error(err.message);
            console.log("something went wrong");
        } 
        console.log('saved')
        res.send({success:true,user:user,message:'Signed up successfully'});
    })
});




app.post('/login',function(req, res) {

    User.getUserByEmail(req.body.email, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(200).json({ message: 'Unknown User' });
        }

        User.comparePassword(req.body.password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                const payload = { 
                    _id : user._id,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    email : user.email 
                }
                jwt.sign(payload,'c10h15n',{expiresIn:604800},(err,token)=>{
                    if(!err){
                        res.status(200).json({
                            success:true,
                            token:`Bearer ${token}`,
                            user:user,
                            message:'logged in successfully'
                        })
                    }
                });
            } else {
                res.status(200).json({ message: 'Invalid password' });
            }
        });
    });

});


// Endpoint to get current user
app.get('/user',passport.authenticate('jwt',{session:false}),function(req, res){
    res.send(req.user);
});

app.post('/products',upload.single('image'),(req,res)=>{
    
    let newProduct = {
        name:req.body.name,
        description : req.body.description,
        price: req.body.price,
        image : req.file.path,
        tags : req.body.tags
    }
    console.log(newProduct)
    const prodcut = new Product(newProduct);

    prodcut.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Created product successfully",
            created_product:{
                name:result.name,
                description : result.description,
                price: result.price,
                image : result.image,
                tags : result.tags
            }
        })
    })
});

app.get('/products',(req,res)=>{
    Product.find({},(err,products)=>{
        let productMap=[];
        products.forEach((product)=>{
            productMap.push(product);
        })
        res.send(productMap);
    })
})


app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});