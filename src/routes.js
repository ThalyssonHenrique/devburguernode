import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controller/UserController'
import SessionController from './app/controller/SessionController'
import ProductController from './app/controller/ProductController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

export default routes
