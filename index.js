import express from "express"
import bodyParser from "body-parser"

const app=express();
const port=3000;

var title=[], tag = [], content = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("home.ejs",
        {
            title: title,
            tag: tag,
            content: content
        }
    );
})

app.get("/newpost",(req,res)=>{
    res.render("newpost.ejs");
})

app.post("/", (req,res)=>{
    content.push(req.body["content"]);
    title.push(req.body["title"]);
    var tag_str = Object.keys(req.body).find(key =>
        req.body[key] == "on");
    tag.push(tag_str);  
    res.redirect("/");
})



app.get("/view", (req, res)=>{
    var number= req.body["number"];
    console.log(number);
    res.render("view.ejs",
        {
            title: title[number],
            tag: tag[number],
            content: content[number]
        }
    );
})
app.delete("/delete", (req,res)=>{
    //remove from lists
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log(`Serving running on port ${port}`);
})