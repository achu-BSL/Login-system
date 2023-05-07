const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const session = require("express-session")
const {v4: uuidv4} = require("uuid")
const router = require("./router")

const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")

//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.use("/route", router)

app.get("/", (req, res)=>{
    res.render("base", {title: "Login SyStem"})
})

app.listen(4000, ()=>{
    console.log("Server is runnig on port 4000")
})