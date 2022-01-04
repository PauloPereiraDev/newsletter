const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https=require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email= req.body.email;
  //console.log(firstName,lastName,email);
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);
  const url="https://us20.api.mailchimp.com/3.0/lists/d4630f57ad"
  const op={
    method: "POST",
    auth: "Paulo: 2fc74dac9595252d3a5de47572975c63-us20"
  }
  const request=https.request(url,op,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port");
})


//api key
//2fc74dac9595252d3a5de47572975c63-us20

//list ID
//d4630f57ad
