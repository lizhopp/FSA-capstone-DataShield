import express from 'express'
import db from './db/client.js';
import cors from 'cors'
import usersRouter from './router/users.js'
import piiRouter from './router/pii.js'




const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(cors())

app.get('/seed',seed)

app.use('/users', usersRouter)
app.use('/pii', piiRouter)



async function seed(req,res){
    await db.query(`CREATE TABLE IF NOT EXISTS greetings(id SERIAL PRIMARY KEY, message TEXT NOT NULL);`)
    await db.query(`INSERT INTO greetings (message)VALUES ($1)`,['Hello World 2'])
    res.send("database seeded ")

}

db.connect()

app.listen(PORT, ()=>{
    console.log("Listening on port 3001")
})