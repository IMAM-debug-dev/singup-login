import jwt from "jsonwebtoken"

const Generativetoken = (id)=>{
    const token = jwt.sign( { _id: id }, process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    return token
}

export default Generativetoken;