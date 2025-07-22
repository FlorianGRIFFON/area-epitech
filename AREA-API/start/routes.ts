/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', async () => {
  const response = Database.query().select('*').from('users')
  return response
})

Route.post('/users/register', 'UsersController.register')

Route.group(() => {
  Route.get('/read', 'UsersController.read')
  Route.post('/login', 'UsersController.login')
  Route.post('/update-password', 'UsersController.updatePassword')
})
  .prefix('users')
  .middleware('authWithToken')

Route.get('/api/spotify-credentials', 'SpotifyController.getCredentials')

Route.post('/send-email', 'EmailController.sendEmail')

Route.get('/about.json', 'AboutsController.index')

Route.group(() => {
  Route.get('/read', 'ServicesController.getServices')
  Route.post('/add', 'ServicesController.addService')
  Route.put('/delete', 'ServicesController.deleteService')
})
  .prefix('services')
  .middleware('auth')

Route.get('login/google', 'AuthController.redirectToGoogle')
Route.get('google/callback', 'AuthController.handleGoogleCallback')

Route.get('login/facebook', 'AuthController.redirectToFacebook')
Route.get('facebook/callback', 'AuthController.handleFacebookCallback')

Route.group(() => {
  Route.post('/create', 'AutomationController.addAutomation')
  Route.get('/read', 'AutomationController.getAutomations')
  Route.put('/modify', 'AutomationController.modifyAutomations')
  Route.put('/status', 'AutomationController.changeStatus')
  Route.delete('/delete', 'AutomationController.deleteAutomation')
})
  .prefix('automations')
  .middleware('auth')

Route.group(() => {
  Route.get('/oauth2/callback', 'DiscordController.callback')
})
  .prefix('discord')
  .middleware('auth')

//? Debug routes to readAll without .auth
Route.get('/services/readall', 'ServicesController.readAll')
Route.get('/automations/readall', 'AutomationController.readAll')
