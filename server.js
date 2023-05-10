const express = require("express")
const router = require("./routers/routes")
const session = require("express-session")
const cookie = require("cookie-parser")
require("dotenv").config()
const app = express()

app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

const port = process.env.PORT || 3001
app.set("view engine", "ejs")
app.use(router)


app.listen(port, (req, res)=>{
    console.log(`Server is running on port http://localhost:${port}`)
})