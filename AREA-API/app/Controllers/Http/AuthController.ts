import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Service from 'App/Models/Service'

export default class AuthController {
  public async redirectToGoogle({ ally }: HttpContextContract) {
    await ally.use('google').redirect()
  }

  public async handleGoogleCallback({ ally, auth }: HttpContextContract) {
    const googleUser = await ally.use('google').user()
    if (!googleUser.email) {
      throw new Error('Unable to get user email from Google')
    }

    let user = await User.findBy('email', googleUser.email)

    if (!user) {
      user = new User()
      user.email = googleUser.email
      user.password = Math.random().toString(36).substring(2)
      user.gmailOauth = googleUser.token.token
      let service = new Service()
      service.userId = user.id
      service.gmail_token = googleUser.token.token
      await user.save()
    } else {
      user.gmailOauth = googleUser.token.token
      let service = await Service.findBy('userId', user.id)
      if (!service) {
        service = new Service()
        service.userId = user.id
      }
      service.gmail_token = googleUser.token.token
      await user.save()
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '1day',
    })
    user.rememberMeToken = token.token
    await user.save()

    return token
  }

  public async redirectToFacebook({ ally }: HttpContextContract) {
    console.log('test1')
    await ally.use('facebook').redirect()
    console.log('test2')
  }

  public async handleFacebookCallback({ ally, auth }: HttpContextContract) {
    console.log('test3')
    const facebookUser = await ally.use('facebook').user()
    console.log('test4')
    if (!facebookUser.email) {
      throw new Error('Unable to get user email from Facebook')
    }

    let user = await User.findBy('email', facebookUser.email)

    if (!user) {
      user = new User()
      user.email = facebookUser.email
      user.password = Math.random().toString(36).substring(2)
      user.facebookOauth = facebookUser.token.token
      await user.save()
    } else {
      user.facebookOauth = facebookUser.token.token
      await user.save()
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '1day',
    })
    user.rememberMeToken = token.token
    await user.save()

    return token
  }
}
