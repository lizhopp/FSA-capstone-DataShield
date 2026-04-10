import db from './client.js'

await db.connect()
await seed()
await db.end()
console.log('Database seeded')


async function seed(){
    await db.query(
    `INSERT INTO brokers (firm_name, email) VALUES
      ($1, $2),
      ($3, $4),
      ($5, $6)`,
    [
      'MyLife',
      'privacy@mylife.com',
      'Nuwber',
      'support@nuwber.com',
      'Radaris',
      'customer-service@radaris.com',
    ]
  )


}