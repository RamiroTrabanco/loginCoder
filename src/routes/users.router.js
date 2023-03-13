import { Router } from "express";
import UsersManager from "../dao/mongoManagers/UsersManager.js";

const usersManager = new UsersManager()

const router = Router()

router.post("/register", async (req, res)=>{
    const newUser = await usersManager.createUser(req.body)
    if(newUser){
        res.redirect("/views")
    } else {
        res.redirect("/views/registerError")
    }
})

router.post("/login",async (req, res)=>{
    const {email, password} = req.body
    const user = await usersManager.loginUser(req.body)
    if(user){
        const nameUser = await usersManager.findUserByEmail({email})
        const {first_name, last_name} = nameUser
        res.cookie("nameCookie", first_name + " " + last_name)
        req.session.email = email
        req.session.password = password
        res.redirect("/products")
    } else{
        res.redirect("/views/loginError")
    }
})

router.get("/logout", async (req,res)=>{
    req.session.destroy(error=>{
        if(error){console.log(error)}
        else{ res.redirect("/views")}
    })
})

export default router