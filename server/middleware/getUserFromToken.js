import { getUserById } from "#db/queries/users.js";
import {verifyToken} from '#utils/jwt.js';



export default async function getUserFromToken(req,res,next){
    const authorization = req.get('authorization')
    console.log('[AUTH] authorization header present:', !!authorization)
    if(!authorization || !authorization.startsWith("Bearer ")) return next()

    //splits token from bearer from token and selects the second thing, the token
    const token = authorization.split(" ")[1]

    try{
        const {id} = verifyToken(token)
        const user = await getUserById(id)
        //put the user we just got by ID on the request
        req.user = user
        next()
    }catch (e){
        console.error('[AUTH] token verify error:', e.message)
        res.status(401).send("Invalid token")
    }

};