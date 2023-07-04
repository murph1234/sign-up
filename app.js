const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    
})
app.post("/" ,function(req,res)
{
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    var data=
    {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:
                {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    
    var options={
        url:"https://us11.api.mailchimp.com/3.0/lists/fcc61a2484",
        method:"POST",
        headers: {
            "Authorization": "anagutjor 5f4d84efa322711114cb3048227f3658-us11"
        },
        body: jsonData
    }
    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log(response.statusCode);
                if(response.statusCode === 200){
                    res.sendFile(__dirname + "/success.html");
                } else {
                    res.sendFile(__dirname + "/failure.html");
                }
        }
    })
})

app.post("/failure", function(req, res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server running at port 3000");
})
// 5f4d84efa322711114cb3048227f3658-us11
//fcc61a2484