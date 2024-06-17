import { Router } from 'express'
import multer from 'multer'
import configMulter from './config/multer'

import UserController from './app/controller/UserController'
import SessionController from './app/controller/SessionController'
import ProductController from './app/controller/ProductController'

import authMiddlewares from './app/middlewares/auth'

const routes = new Router()
const upload = multer(configMulter)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.use(authMiddlewares)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

export default routes
