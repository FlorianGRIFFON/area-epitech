import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'

export default class ServicesController {
  // Debug routes to see in localhost whole table - Flo
  public async readAll({ response }: HttpContextContract) {
    try {
      const services = await Service.all()

      return response.status(200).json({ services })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to fetch services', error: error.messages || error })
    }
  }

  public async getServices({ auth, response }: HttpContextContract) {
    try {
      // Vérifie si l'utilisateur est connecté
      await auth.authenticate()

      // Récupère les services de l'utilisateur
      const services = await Service.query().where('userId', auth.user?.id)
      if (services.length === 0) {
        return response.badRequest({ error: 'No services found' })
      }

      return services
    } catch (error) {
      // Si l'utilisateur n'est pas connecté, renvoie une erreur 401
      return response.unauthorized({ error: 'User is not logged in' })
    }
  }

  public async addService({ auth, request, response }: HttpContextContract) {
    try {
      // Vérifie si l'utilisateur est connecté
      await auth.authenticate()
      // Récupère le nom du service et le token de la requête
      const serviceName = request.input('serviceName')
      const token = request.input('token')

      // Vérifie si un service avec le même nom existe déjà pour cet utilisateur
      let service = await Service.query()
        .where('userId', auth.user?.id)
        .first()

      if (!service) {
        // Si un service n'existe pas déjà, crée un nouveau service avec l'ID de l'utilisateur
        service = new Service()
        service.userId = auth.user?.id
        try {
          await service.save()
        } catch (error) {
          console.error(error)
        }
      }

      console.log('1')

      // Met à jour le token du service spécifique
      switch (serviceName.toLowerCase()) {
        case 'gmail':
          service.gmail_token = token
          break
        case 'spotify':
          service.spotify_token = token
          break
        case 'discord':
          service.discord_token = token
          break
        case 'chatgpt':
          service.chatgpt_token = token
          break
        case 'slack':
          service.slack_token = token
          break
        default:
          return response.badRequest({ error: 'Invalid service name' })
      }

      console.log('2')

      service.save()

      console.log('3')

      return service
    } catch (error) {
      // Si l'utilisateur n'est pas connecté, renvoie une erreur 401
      return response.unauthorized({ error: 'User is not logged in' })
    }
  }

  public async deleteService({ auth, request, response }: HttpContextContract) {
    try {
      // Vérifie si l'utilisateur est connecté
      await auth.authenticate()
      // Récupère le nom du service et le token de la requête
      const serviceName = request.input('serviceName')

      // Vérifie si un service avec le même nom existe déjà pour cet utilisateur
      let service = await Service.query()
        .where('userId', auth.user?.id)
        .first()

      if (!service) {
        // Si un service n'existe pas déjà, crée un nouveau service avec l'ID de l'utilisateur
        service = new Service()
        service.userId = auth.user?.id
        try {
          await service.save()
        } catch (error) {
          console.error(error)
        }
      }

      // Met à jour le token du service spécifique
      switch (serviceName) {
        case 'gmail':
          service.gmail_token = null
          break
        case 'spotify':
          service.spotify_token = null
          break
        case 'discord':
          service.discord_token = null
          break
        case 'chatgpt':
          service.chatgpt_token = null
          break
        case 'slack':
          service.slack_token = null
          break
        default:
          return response.badRequest({ error: 'Invalid service name' })
      }

      await service.save()

      return service
    } catch (error) {
      // Si l'utilisateur n'est pas connecté, renvoie une erreur 401
      return response.unauthorized({ error: 'User is not logged in' })
    }
  }
}
