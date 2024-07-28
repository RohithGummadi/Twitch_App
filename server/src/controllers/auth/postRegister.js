import User from "../../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";


export const postRegister = async (req,res)=>{
    try {
        const {username, email, password}  = req.body
        const userExists = await User.exists({email})
        
        if(userExists){
            return res.status(409).send("Email already in use")
        }

        const encryptedPassword  = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        //issue jwt token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.TOKEN_KEY,
            //additional config
            {
                expiresIn: "24h"
            }

        );
        
        return res.status(200).json({
            userDetails:{
                email: user.email,
                userId: user._id,
                username,
                token
            }
        })

    } catch(err){
        console.log(err);
        return res.status(500).send("Error occured. Please try again")

    }

}