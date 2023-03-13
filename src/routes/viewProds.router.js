import { Router } from "express"
import ProductManager from "../dao/mongoManagers/ProductManager.js"
import UsersManager from "../dao/mongoManagers/UsersManager.js"

const productManager = new ProductManager()
const usersManager = new UsersManager()
const router = Router()

router.get("/",async (req, res)=>{
    try {                                   /* HAY Q GUARDAR EN SESSION O COOKIES EL NOMBRE Y USUARIO PARA DESPUÉS TRAERLO ACÁ Y MANDARLO A PRODUCTS HANDLEBARS. FALTA TAMBIÉN ROL DE ADMIN Y USUARIO Y BOTON DE LOGOUT */
    const {limit=10, page=1, sort, ...query} = req.query
    const products = await productManager.getProducts(limit, page, sort, query)
    const {nameCookie} = req.cookies
    
    res.render("products", {products: products.payload, name: nameCookie})
    } catch (error) {
        return error
    }
})

export default router