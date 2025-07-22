import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class SpotifyController {
  public async getCredentials({ response }: HttpContextContract) {
    const clientId = Env.get('SPOTIFY_CLIENT_ID')
    const clientSecret = Env.get('SPOTIFY_CLIENT_SECRET')
    const redirectUri = Env.get('SPOTIFY_REDIRECT_URL')
    const spotifyCredentials = { clientId, clientSecret, redirectUri }

    response.json(spotifyCredentials)
  }
}
