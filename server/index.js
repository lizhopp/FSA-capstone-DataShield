import { getGreeting } from './db/queries/greetings.js';
import express from 'express'
import db from './db/client.js';


const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json());

app.get('/greet', helloWorld)

async function helloWorld(req,res){
    try{

        const greeting = await getGreeting()
        res.status(200).json(greeting)

    }catch(error){
        console.log("error")
    }
    
}

db.connect()

app.listen(PORT, ()=>{
    console.log("Listening on port 3001")
})