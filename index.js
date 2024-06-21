import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
import config from './config.json' with { type: "json" };

const app= express();
const port= 3000

const API_URL="https://api.notion.com/v1/";
const yourToken= config.API_TOKEN;

let blogList= [];
let title= [];
var func;

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//configuration
const configure={
    headers:{
        Authorization: `Bearer ${yourToken}`,
        "Notion-Version": "2022-06-28"
    }
};

//API response
const response= await axios.post(`${API_URL}databases/f3905f63-6ea3-437f-a41c-ed5f939d9d5e/query`,{}, configure);
for(let i=0;i<(response.data.results).length; i++){
    title.push(response.data.results[i].properties.Name.title[0].plain_text);
}

app.get("/", async(req,res)=>{
    try{
        console.log(title);
        res.render("index.ejs",
            {
                func:func,
                blogList:blogList,
                title:title
            }
        )
    }catch(error){
        console.log(`Error found: ${error.message}`);
    }
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
        blog: blogList[+req.body.blogNumber],        
        //note: the '+' symbol coverts the string blogNumber to integer to pass to arry in index.ejs!
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