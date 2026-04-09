import express from 'express'
import { createUser } from '#db/queries/users'
import db from '#db/client'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/register',async (req,res)=>{
    const {username, password } = req.body

    if(!username || !password){
        return res.status(400).send('Error')
    }

    try{
        const createdUser = await createUser({username,password})

        const JWTtoken = jwt.sign({id:createdUser.id,username:createdUser.username},process.env.JWT_SECRET)
        res.status(201).send(JWTtoken)
    }catch{
        res.status(401).send("Error")
    }

})


router.post('/login', async (req,res)=>{
    const {username, password} = req.body

    if(!username || !password){
        return res.status(401).send('Missing username or password')
    }

    try{
        const {rows:users} = await db.query("SELECT id, username, password FROM users WHERE username = $1",[username])
      
        //compare password submission to dehashed stored password
        const passwordMatches = await bcrypt.compare(password, users[0].password)

        if(passwordMatches === true){
            const JWTtoken = jwt.sign({id:users[0].id, username:users[0].username},
                process.env.JWT_SECRET
            )

        res.status(200).send(JWTtoken)
        }else{
            return res.status(401).send('Credentials incorrect')
        }
        

    }catch{
        return res.status(500).send('Internal server error')
    }

})

export default router
