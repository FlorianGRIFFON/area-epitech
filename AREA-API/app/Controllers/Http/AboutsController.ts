import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AboutsController {
  public async index({ response }: HttpContextContract) {
    const aboutData = {
      client: {
        host: '10.101.53.35',
      },
      server: {
        current_time: Math.floor(Date.now() / 1000),
        services: [
          {
            name: 'Timer',
            actions: [
              {
                name: 'everyday',
                description: 'This action will be executed everyday at specified time',
                detail1: 'hour',
                detail2: 'minute',
              },
              {
                name: 'day',
                description: 'This action will be executed on specified day at specified time',
                detail1: 'day',
                detail2: 'hour',
                detail3: 'minute',
              },
            ],
            reactions: [
              {
                name: 'like_message',
                description: 'The user likes a message',
              },
            ],
          },
          {
            name: 'Spotify',
            actions: [
              {
                name: 'is_listening',
                description: 'This action will be executed when the user is listening to a song',
              },
            ],
            reactions: [
              {
                name: 'create_playlist',
                description: 'Create a playlist',
                detail1: 'name',
                detail2: 'true/false (public/private)',
                detail3: 'description',
              },
              {
                name: 'add_to_playlist',
                description: 'Add a song to a playlist',
                detail1: 'playlist name',
                detail2: 'artist of the song',
                detail3: 'name of the song',
              },
              {
                name: 'delete_song_from_playlist',
                description: 'Delete a song from a playlist',
                detail1: 'playlist name',
                detail2: 'artist of the song',
                detail3: 'name of the song',
              },
              {
                name: 'create_recommended',
                description: 'This reaction will create a playlist with recommended songs',
                detail1: 'playlist name',
              },
            ],
          },
          {
            name: 'Discord',
            actions: [],
            reactions: [
              {
                name: 'send_message',
                description: 'This reaction will send a message to a channel',
                detail1: 'webhook url',
                detail2: 'message',
              },
            ],
          },
          {
            name: 'Gmail',
            actions: [],
            reactions: [
              {
                name: 'send_email_smtp',
                description: 'This reaction will send an email to a destination',
                detail1: 'destinataire',
                detail2: 'message',
              },
            ],
          },
        ],
      },
    }

    return response.json(aboutData)
  }
}
