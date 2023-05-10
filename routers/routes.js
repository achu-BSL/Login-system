const express = require("express")
const router = express.Router()


const credentail = {
    admin:{
        password: "123"
    }
}

router.use((req, res, next)=>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next()
})


router.get("/", (req, res)=>{
    res.redirect("/login")
})

// router for Login
router.get("/login", (req, res)=>{
    if(req.session.user){
        res.redirect("/home")
    } else {
        res.render("login")
    }
})

router.post("/login", (req, res)=>{
    const {username, password} = req.body
    if(!credentail[username])return res.redirect("/login")
    if(password === credentail[username].password){
        req.session.user = username
        res.redirect("/home")
    } else {
        res.render('login', {checkPas: "Incorrect Password"})
    }

})


//router for Home
router.get("/home", (req, res)=>{
    if(req.session.user){
        res.render("home", {user: req.session.user})
    } else {
        res.redirect("/login")
    }
})


//router for Logout
router.get("/logout", (req, res)=>{
    if(req.session.user){
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            } else {
                res.clearCookie('coonect-sid')
                res.redirect("/login")
            }
        })
    } else {
        res.redirect("/login")
    }
})

//router for Register
router.get("/register", (req, res)=>{
    if(req.session.user){
        res.redirect("/home")
    } else {
        res.render("register")
    }
})

router.post("/register", (req, res)=>{
    const {username, password, confirmpassword} = req.body
    if(credentail[username])return res.render("register", {userMsg: "Username is not available"})
    if(password.trim().length <= 5)return res.render("register", {pasMsg: "Password can't be less than 5"})
    if(password != confirmpassword)return res.render("register", {incorrectMsg: "Not match"})

    credentail[username] = {
        password
    }

    res.redirect("/login")

})

module.exports = router