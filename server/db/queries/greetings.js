import db from '../client.js'

export async function getGreeting(){
    const SQL = "SELECT message FROM greetings ORDER BY id LIMIT 1;"
    const {rows:[greeting]} = await db.query(SQL)
    return greeting
}