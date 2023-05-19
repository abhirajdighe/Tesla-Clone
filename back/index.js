const express = require('express');
require('./db/config');
const user = require('./db/Users');
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors())

app.post('/register',async (req,resp)=>{
    let data = new user(req.body)
    let result = await data.save();
    // result= result.toObject();
    console.log(result);
    resp.send(result)
})

app.post('/account',async (req,resp)=>{
    let user = await user.findOne(req.body).select("-password")
    if(req.body.password && req.body.email){
        if(user){
            resp.send(user)
        }
        else{
            resp.send({result:"NO user found"})
        }
    }
    else{
        resp.send({result:"NO user found"})
    }
    
    // console.log(data);
    // resp.send(data);
})

app.listen(4500);
