import express from 'express'
import { createUser } from '#db/queries/users.js'
import db from '#db/client.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/register',async (req,res)=>{
    const {username, password } = req.body
    console.log('[REGISTER] body keys:', Object.keys(req.body || {}))
    console.log('[REGISTER] username present:', !!username, 'password present:', !!password)

    if(!username || !password){
        console.log('[REGISTER] missing username/password')
        return res.status(400).send('Error')
    }

    try{
        const createdUser = await createUser({username,password})
        console.log('[REGISTER] createUser success id:', createdUser?.id)

        const JWTtoken = jwt.sign({id:createdUser.id,username:createdUser.username},process.env.JWT_SECRET)
        console.log('[REGISTER] jwt sign success')
        res.status(201).send(JWTtoken)
    }catch(err){
        console.error('[REGISTER] error:', err.message)
        res.status(401).send("Error")
    }

})


router.post('/login', async (req,res)=>{
    const {username, password} = req.body
    console.log('[LOGIN] body keys:', Object.keys(req.body || {}))
    console.log('[LOGIN] username present:', !!username, 'password present:', !!password)

    if(!username || !password){
        console.log('[LOGIN] missing username/password')
        return res.status(401).send('Missing username or password')
    }

    try{
        const {rows:users} = await db.query("SELECT id, username, password FROM users WHERE username = $1",[username])
        console.log('[LOGIN] users found:', users.length)
      
        //compare password submission to dehashed stored password
        if (!users.length) {
            return res.status(401).send('Credentials incorrect')
        }
        const passwordMatches = await bcrypt.compare(password, users[0].password)
        console.log('[LOGIN] password matches:', passwordMatches)

        if(passwordMatches === true){
            const JWTtoken = jwt.sign({id:users[0].id, username:users[0].username},
                process.env.JWT_SECRET
            )
            console.log('[LOGIN] jwt sign success')

        res.status(200).send(JWTtoken)
        }else{
            return res.status(401).send('Credentials incorrect')
        }
        

    }catch(err){
        console.error('[LOGIN] error:', err.message)
        return res.status(500).send('Internal server error')
    }

})

export default router
