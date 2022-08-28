import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredient from 'App/Models/Ingredient'

export default class SandwichesController {
  async index({view}: HttpContextContract) {
    const viandes = await Ingredient.query().whereHas('type', (query) => query.where('name','viande'))
    const accompagnements = await Ingredient.query().whereHas('type', (query) => query.where('name','accompagnement'))
    const sauces = await Ingredient.query().whereHas('type', (query) => query.where('name','sauce'))
    const boissons = await Ingredient.query().whereHas('type', (query) => query.where('name','boisson'))
    const desserts = await Ingredient.query().whereHas('type', (query) => query.where('name','dessert'))

    return view.render('sandwich', {viandes, accompagnements, sauces, boissons, desserts})
  }

  async storeFirstStep({request, session, response}: HttpContextContract) {
    session.put('command',request.all())
    return response.status(200).send('OK')
  }

  async dessert({session, response, view}: HttpContextContract) {
    const command = session.get('command')
    if (!command) {
      return response.redirect('/sandwich')
    } else {
      return view.render('dessert')
    }
  }
}
