const express = require("express") 
const router = express.Router()
const app = express()

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

//login user
router.post("/login", (req, res)=>{
    if(req.body.email === credential.email && req.body.password === credential.password){
        req.session.user = req.body.email
        res.redirect("/route/dashboard")
        // res.send("Login success")
    } else {
        res.end("Invalid user")
    }   
})

//route for dashboard
router.get("/dashboard", (req, res)=>{
    if(req.session.user){
        res.render("dashboard", {user: req.session.user})
    } else {
        res.redirect("/")
    }
    
})

//route for logout
router.get("/logout", (req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send(err)
        } else {
            res.render("base", {title: "Express", logout: "Log out Success"})
        }
    }) 
})


module.exports = router