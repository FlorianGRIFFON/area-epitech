import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthWithToken {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    const token = request.input('token')

    if (token) {
      const tokenObject = JSON.parse(token)

      if (tokenObject.token) {
        console.log(tokenObject.token)
        const user = await Database.query()
          .from('users')
          .where('remember_me_token', tokenObject.token)
          .first()

        if (user) {
          console.log('RememberMe log in from : ', user)

          // const expiresIn = tokenObject.expires_at;

          // if (expiresIn > new Date()) {
          await auth.login(user)
          return response.status(200).json({ valid: true })
          // } else {
          //   return response.status(401).send({ error: 'Token expired' });
          // }
        } else {
          return response.status(404).send({ error: 'User not found' })
        }
      } else {
        console.log(tokenObject)
        const user = await Database.query()
          .from('users')
          .where('remember_me_token', tokenObject)
          .first()

        if (user) {
          console.log('RememberMe log in from : ', user)

          // const expiresIn = tokenObject.expires_at;

          // if (expiresIn > new Date()) {
          await auth.login(user)
          return response.status(200).json({ valid: true })
          // } else {
          //   return response.status(401).send({ error: 'Token expired' });
          // }
        } else {
          return response.status(404).send({ error: 'User not found' })
        }
      }
    }

    await next()
  }
}
