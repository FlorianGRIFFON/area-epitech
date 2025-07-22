import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import PasswordValidator from 'App/Validators/PasswordValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async read({ auth, response }: HttpContextContract) {
    try {
      // Vérifie si l'utilisateur est connecté
      await auth.authenticate()

      // Renvoie les informations de l'utilisateur
      return auth.user
    } catch (error) {
      // Si l'utilisateur n'est pas connecté, renvoie une erreur 401
      return response.unauthorized({ error: 'User is not logged in' })
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = new User()
    user.email = data.email
    user.password = data.password
    await user.save()

    const token = await auth.use('api').generate(user, {
      expiresIn: '14days',
    })
    if (data.rememberMe) {
      // Assuming 'rememberMe' is a field in the registration form
      // Save the remember me token to the user
      user.rememberMeToken = token.token
      await user.save()
    }

    return { user, token }
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password, rememberMe } = request.all()

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '1day',
    })

    try {
      if (rememberMe) {
        const user = await User.findBy('email', email)

        if (user) {
          const rememberMeToken = await auth.use('api').generate(user, {
            expiresIn: '14days',
          })

          // Save the remember me token to the user
          user.rememberMeToken = rememberMeToken.token
          await user.save()

          return rememberMeToken
        }
      }

      return token
    } catch (error) {
      throw new Error('Invalid credentials') // Handle invalid credentials
    }
  }

  public async updatePassword({ auth, request, response }: HttpContextContract) {
    const { newPassword } = request.all()

    try {
      await auth.authenticate() // Ensure the user is authenticated
      await request.validate(PasswordValidator) // Validate the new password
      const user = auth.user
      console.log(user)
      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }
      const hashedPassword = await Hash.make(newPassword) // Hash the new password
      await Database.from('users').where('id', user.id).update({ password: hashedPassword })
      return response.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      return response.status(422).json({ errors: error.messages }) // Handle validation errors
    }
  }
}
