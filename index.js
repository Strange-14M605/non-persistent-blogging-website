import express from "express"
import bodyParser from "body-parser"

const app= express();
const port= 3000
var title;

let blogList= [];
var func;

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs",{
        func:func,
        blogList: blogList
    });
})

app.get("/newPost", (req,res)=>{
    res.render("index.ejs",{
        newPost:"What do you want to write about today?"
    });
})

app.post("/",(req,res)=>{
    func=1;
    let newArray = [req.body.title, req.body.tag, req.body.blogContent];
    blogList.push(newArray);
    res.redirect("/");
})

app.post("/viewPost", (req,res)=>{
    res.render("index.ejs",{
        viewPost: 1,
        blog: blogList[+req.body.blogNumber],        //note: the '+' symbol coverts the string blogNumber to integer to pass to arry in index.ejs!
        blogNumber: +req.body.blogNumber
    });
})

app.post("/deletePost", (req,res)=>{
    blogList.splice(+req.body.blogNumber, 1);
    console.log(blogList);
    res.redirect("/");
})

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})