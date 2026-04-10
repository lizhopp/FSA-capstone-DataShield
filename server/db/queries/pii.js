
import db from '#db/client'

export async function createPii({user_id, title, first_name, middle_name, last_name, suffix, phone_number, email_address, street, apt, city, us_state, zip_code, dob}){
    const {rows}=await db.query(`
        INSERT INTO user_pii (user_id,title, first_name, middle_name, last_name, suffix, phone_number, email_address, street, apt, city, us_state, zip_code, dob)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING *
        `,[user_id, title, first_name, middle_name, last_name, suffix, phone_number, email_address, street, apt, city, us_state, zip_code, dob])

        return rows[0]
}



export async function getPiiById(id){
    const {rows} = await db.query(
        `
        SELECT user_id,title, first_name, middle_name, last_name, suffix, phone_number, email_address, street, apt, city, us_state, zip_code, dob FROM user_pii WHERE user_id = $1
        `,[id]
    )
    return rows[0]
}