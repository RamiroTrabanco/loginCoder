import {userModel} from "../models/users.model.js"

export default class UsersManager {
    async createUser(user){
        const {email, password} = user
        try {
            const userExist = await userModel.find({email, password})
        if(userExist.length===0){
            const newUser = await userModel.create(user)
            return newUser
        } else {
            return null
        }
        } catch (error) {
            throw new Error(error)
        }
        
    }

    async loginUser(user){
        const {email, password} = user
        const usr = await userModel.find({email, password})
        if(usr.length!==0){
            return usr
        } else {
            return null
        }
    }

    async findUserByEmail({email}){
        const user = await userModel.findOne({email})
        return user
    }
}