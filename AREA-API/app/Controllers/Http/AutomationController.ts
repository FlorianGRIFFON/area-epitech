import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Automation from 'App/Models/Automation'
// import User from 'App/Models/User'
// import AutomationValidator from 'App/Validators/AutomationValidator'

export default class AutomationController {
  public async readAll({ response }: HttpContextContract) {
    try {
      // Retrieve all automations from the database
      const automations = await Automation.all()

      return response.status(200).json({ automations })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to fetch automations', error: error.messages || error })
    }
  }

  public async getAutomations({ auth, response }: HttpContextContract) {
    try {
      // Vérifie si l'utilisateur est connecté
      await auth.authenticate()

      // Récupère les automations de l'utilisateur
      const automations = await Automation.query().where('user_id', auth.user?.id)
      if (automations.length === 0) {
        return response.badRequest({ error: 'No automations found' })
      }

      return automations
    } catch (error) {
      // Si l'utilisateur n'est pas connecté, renvoie une erreur 401
      return response.unauthorized({ error: 'User is not logged in' })
    }
  }

  public async addAutomation({ auth, request, response }: HttpContextContract) {
    try {
      // const data = await request.validate(AutomationValidator)
      await auth.authenticate()

      const name = request.input('name')
      const description = request.input('description')
      const steps = request.input('steps')

      const automation = new Automation()
      automation.user_id = auth.user?.id
      automation.name = name
      automation.description = description
      automation.steps = steps

      // Find the user using the provided user_id
      // const user = await User.findOrFail(data.user_id)

      // await automation.related('user').associate(user)

      await automation.save()

      return response.status(200).json({ message: 'Automation created successfully', automation })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to create automation', error: error.messages || error })
    }
  }

  public async modifyAutomations({ auth, request, response }: HttpContextContract) {
    try {
      await auth.authenticate()
      const id = request.input('id')
      const name = request.input('name')
      const description = request.input('description')
      const steps = request.input('steps')

      // Find the automation by ID for the current user
      const automation = await Automation.query()
        .where('user_id', auth.user?.id)
        .where('id', id)

      if (!automation.length) {
        return response.status(404).json({ message: 'Automation not found' })
      }

      automation[0].name = name
      automation[0].description = description
      automation[0].steps = steps

      await automation[0].save()

      return response
        .status(200)
        .json({ message: 'Automation modified successfully', automation: automation[0] })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to modify automation', error: error.messages || error })
    }
  }

  public async changeStatus({ auth, request, response }: HttpContextContract) {
    try {
      await auth.authenticate()
      const id = request.input('id')

      // Find the automation by ID for the current user
      const automation = await Automation.query()
        .where('user_id', auth.user?.id)
        .where('id', id)

      if (!automation.length) {
        return response.status(404).json({ message: 'Automation not found' })
      }

      automation[0].active = !automation[0].active

      await automation[0].save()

      return response
        .status(200)
        .json({ message: 'Automation status modified successfully', automation: automation[0] })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to change status of automation', error: error.messages || error })
    }
  }

  public async deleteAutomation({ auth, request, response }: HttpContextContract) {
    try {
      await auth.authenticate()
      const id = request.input('id')

      console.log(id)

      // Find the automation by ID for the current user
      const automation = await Automation.query()
        .where('user_id', auth.user?.id)
        .where('id', id)

      if (!automation.length) {
        return response.status(404).json({ message: 'Automation not found' })
      }

      await automation[0].delete()

      return response.status(200).json({ message: 'Automation deleted successfully' })
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Failed to delete automation', error: error.messages || error })
    }
  }
}
