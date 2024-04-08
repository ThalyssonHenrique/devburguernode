import { Router } from 'express'

import { v4 } from 'uuid'

import User from './app/models/User'

const routes = new Router()

routes.get('/', (request, response) => {
  const user = User.create({
    id: v4(),
    name: 'thalysson',
    email: 'thalys@email.com',
    password_hash: 'd6sd6s2',
  })
  return response.json(user)
})

export default routes
