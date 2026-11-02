
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import Generativetoken from "../config/token.js";


export const registerUser = async (req, res) => {
    try {

        const {
            firstname,
            lastname,
            username,
            email,
            password
        } = req.body;

        // Required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Send username, email and password"
            });
        }

        // Check existing user
        const existUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const createUser = await User.create({
            FirstName: firstname || "",
            LastName: lastname || "",
            username,
            email,
            password: passwordHash
        });

        // Generate token
        let token = Generativetoken(createUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: createUser._id,
                FirstName: createUser.FirstName,
                LastName: createUser.LastName,
                username: createUser.username,
                email: createUser.email
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });

    }
};

export const login = async ( req , res) =>{
    try {
        const { email , password } = req.body
        const existsuser = await User.findOne({email})
        if(!existsuser){
            return res.status(400).json({
                message:"User is not registred"
            })
        }

        const match = await bcrypt.compare(password , existsuser.password)
        if(!match){
            return res.status(400).json({
                message:"password is not currect"
            })
        }    
         let token =  Generativetoken(existsuser._id)

        res.cookie("token" , token , {
            httpOnly:true,
            secure:process.env.NODE_ENVEROMENT == "production",
            samesite:"strict",
            maxAge:7*24*60*60*1000
        });
         return res.status(200).json({
            success: true,
            message: "User Login successful",
            user: {
                _id: existsuser._id,
                FirstName: existsuser.FirstName,
                LastName: existsuser.LastName,
                username: existsuser.username,
                email: existsuser.email
            }
        });
        }
     catch (error) {
       return res.status(500).json(error)
    }
}

export const logout = async ( req , res)  =>{
    try {
        res.clearcookie("token")
      return  res.status(200).json({
            message:"logout sucessfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
