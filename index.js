const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded());


app.get("/",(req,res)=>{
    res.set({
        "Content-type": "text/html"
      });
    fs.readFile('index.html',(e,d)=>{
        res.send(d);
    })
});


app.get("/read",(req,res)=>{
    fs.readFile(req.query.Source,'utf-8',(err,data)=>{
        res.status(201).json({data})
    })
});


app.post("/write",(req,res)=>{
    fs.readFile(req.body.Source,'utf-8',(err,data)=>{
        fs.writeFile(req.body.Destination,data,(e,d)=>{
            res.status(201).json({message:"Data Written Succesfully!!!"})
        })
    })
});

app.post("/append",(req,res)=>{
    fs.readFile(req.body.Source,'utf-8',(err,data)=>{
        fs.appendFile(req.body.Destination,data,(e)=>{
            res.status(201).json({message:"Data Appended Successfully!!!"})
        })
    })
});

app.post("/delete",(req,res)=>{
    fs.unlink(req.body.Source,(err)=>{
        res.status(201).json({message:"File Deleted Successfully!!!"})
    })
})

app.listen(PORT,()=>{
    console.log("Server is Running !!");
})