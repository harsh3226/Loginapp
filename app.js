const express = require("express")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/loginDB', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
require('mongoose-type-email');
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const app=express();

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const loginSchema=new mongoose.Schema({
  email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: 'Email address is required',
         validate: [validateEmail, 'Please fill a valid email address'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     },
 password: { type: String, required: true }

});

const Data=mongoose.model('Data', loginSchema);



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res)
{
  res.render("index")
});

app.get("/register",function(req,res)
{
  res.render("register");
});

app.post("/",function(req,res){
  var t=req.body.email;
  var r=req.body.pass;
        //  console.log(t);
  // const data1= new Data({
  //   email: t,
  //   password: r
  // });

  Data.findOne({email: t}, function(err, foundData){
    if(!err){
      if(!foundData)
      {
      res.render("register");
    }
      else {
        res.send("Congrats you are successfully signed in");
      }
    }

  });
//  data1.save();
  //console.log(t);
  //console.log(r);
  //res.redirect("/");

});

 function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        //console.log('Given Name: ' + profile.getGivenName());
        //console.log('Family Name: ' + profile.getFamilyName());
        //console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
}

app.post("/register",function(req,res){
  var y=req.body.name;
  var w=req.body.password;
//  console.log(y);
//  console.log(w);
  const data1= new Data({
    email: y,
    password: w
  });
  data1.save();
  res.send("Successfully Registered");
})







app.listen(3000,function(){
  console.log("server is running");
})
