import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controller/UserController'
import SessionController from './app/controller/SessionController'
import ProductController from './app/controller/ProductController'
import CategoryController from './app/controller/CategoryController'
import OrderController from './app/controller/OrderController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware) // Será chamado por todas as rotas ABAIXO

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
