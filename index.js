const express = require ("express");
const path = require ("path");
const app = express();
const bodyParser = require ("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Register', {useNewUrlParser: true, useUnifiedTopology: true })
const port = 5000;


// scehema
var registerSchema = new mongoose.Schema({
    name: String,
    sname:({type:String,
    unique:true}),
    email: String,
    phone: String,
    address: String
  });


  var detail = mongoose.model('detail', registerSchema);






// ------------------------------------------------------------------------------- 

app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"views")));

app.set("view engine","pug");

var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({extended : true}));




app.get("/" ,(req,res)=>{

    res.status(200).render("one.pug");
});

app.get("/register" ,(req,res)=>{
  res.status(200).render("register.pug");
});



app.post("/register" ,jsonParser,(req,res)=>{
  var myData = new detail(req.body);
  myData.save().then(()=>{
    res.send("submit sucessfull")
  }).catch(()=>{
    
    res.status(400).send("not save");
     
  });

 
  // res.status(200).render("register.pug");
});


app.listen(port,()=>{

console.log("connect sucessfully");

});