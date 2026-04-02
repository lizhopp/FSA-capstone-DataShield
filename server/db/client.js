import pg from 'pg'

const url = process.env.DATABASE_URL || "postgres://conno:password@localhost:5432/greetings"
const db = new pg.Client(url)

export default db