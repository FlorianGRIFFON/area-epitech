import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class DiscordsController {
  public async callback({ request, response }) {
    console.log('callback')
    const code = request.input('code')
    try {
      const discordResponse = await axios.post(
        'https://discord.com/api/oauth2/token',
        {
          client_id: Env.get('DISCORD_CLIENT_ID'),
          client_secret: Env.get('DISCORD_CLIENT_SECRET'),
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://localhost:3000/',
          scope: 'identify guilds',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      const token = discordResponse.data.access_token
      return response.send({ token })
    } catch (error) {
      console.error('Failed to exchange code for token', error)
      return response.status(500).send('Server error')
    }
  }
}
