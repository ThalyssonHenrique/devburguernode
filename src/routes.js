import { Router } from 'express'

import { v4 } from 'uuid'

import User from './app/models/User'

const routes = new Router()

routes.get('/', async (request, response) => {
  const user = await User.create({
    id: v4(),
    name: 'thalyssoon',
    email: 'thalyseee@email.com',
    password_hash: 'd6sddd6s2ggg',
    admin: false,
  })
  return response.json(user)
})

export default routes
