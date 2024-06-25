import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    })

    const emailOrPasswordIncorrect = () => {
      return response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' })
    }

    if (!(await schema.isValid(request.body))) {
      return emailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return emailOrPasswordIncorrect()
    }

    if (!(await user.checkPassword(password))) {
      return emailOrPasswordIncorrect()
    }

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
