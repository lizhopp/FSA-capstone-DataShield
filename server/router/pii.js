import express from 'express'
import { createPii, getPiiById } from '#db/queries/pii.js'
import getUserFromToken from '../middleware/getUserFromToken'
import requireUser from '../middleware/requireUser'


//Make a route to add and pull from PII

const router = express.Router()

router.post('/createPii', getUserFromToken, requireUser, async (req, res) => {
    const userId = req.user.id
    const {
      title,
      first_name,
      middle_name,
      last_name,
      suffix,
      phone_number,
      email_address,
      street,
      apt,
      city,
      us_state,
      zip_code,
      dob,
    } = req.body
    if (
      !first_name ||
      !last_name ||
      !phone_number ||
      !email_address ||
      !street ||
      !city ||
      !us_state ||
      !zip_code ||
      !dob
    ) {
      return res.status(400).send('Missing required fields')
    }
    try {
      const newPii = await createPii({
        user_id: userId,
        title,
        first_name,
        middle_name,
        last_name,
        suffix,
        phone_number,
        email_address,
        street,
        apt,
        city,
        us_state,
        zip_code,
        dob,
      })
      res.status(201).json(newPii)
    } catch (err) {
      console.error(err)
      res.status(500).send('Could not save PII')
    }
  })

  router.get('/getPii', getUserFromToken, requireUser, async (req, res) => {
    const userId = req.user.id
    try {
      const pii = await getPiiById(userId)
      if (!pii) {
        return res.status(404).send('No PII found')
      }
      res.status(200).json(pii)
    } catch (err) {
      console.error(err)
      res.status(500).send('Could not get PII')
    }
  })






export default router