import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'
import User from '../models/User'

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const productsId = request.body.products.map((product) => product.id)

    try {
      const updatedProducts = await Product.findAll({
        where: { id: productsId },

        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
      })

      const editedProduct = updatedProducts.map((product) => {
        const productIndex = request.body.products.findIndex(
          (requestProduct) => requestProduct.id === product.id,
        )

        const newProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category.name,
          url: product.url,
          quantity: request.body.products[productIndex].quantity,
        }

        return newProduct
      })

      const order = {
        user: {
          id: request.userId,
          name: request.userName,
        },

        products: editedProduct,

        status: 'Pedido Realizado',
      }

      const orderResponse = await Order.create(order)

      return response.status(201).json(orderResponse)
    } catch (err) {
      console.log(err)

      return response
        .status(500)
        .json({ error: 'Internal error creating order' })
    }
  }

  async index(request, response) {
    const orders = await Order.find()

    return response.json(orders)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { id } = request.params

    const { status } = request.body

    try {
      await Order.updateOne({ _id: id }, { status })
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }

    return response.status(201).json({ message: 'Status updated sucessfully' })
  }
}

export default new OrderController()
