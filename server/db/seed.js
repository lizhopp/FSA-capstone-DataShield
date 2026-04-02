import db from './client.js'

await db.connect()
await seed()
await db.end()
console.log('Database seeded')


async function seed(){
    const SQL = 'INSERT INTO greetings (message) VALUES ($1) RETURNING *'

    const {rows: [message],} = await db.query(SQL,["HELLO WORLD"])

}