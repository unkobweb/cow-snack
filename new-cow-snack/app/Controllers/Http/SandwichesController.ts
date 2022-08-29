import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredient from 'App/Models/Ingredient'

export default class SandwichesController {
  async index({view}: HttpContextContract) {
    const viandes = await Ingredient.query().whereHas('type', (query) => query.where('name','viande'))
    const accompagnements = await Ingredient.query().whereHas('type', (query) => query.where('name','accompagnement'))
    const sauces = await Ingredient.query().whereHas('type', (query) => query.where('name','sauce'))

    return view.render('sandwich', {viandes, accompagnements, sauces})
  }

  async storeFirstStep({request, session, response}: HttpContextContract) {
    session.put('firstStep',request.all())
    return response.status(200).send('OK')
  }

  async storeSecondStep({request, session, response}: HttpContextContract) {
    session.put('secondStep', request.all())
    return response.status(200).send('OK')
  }

  async storeThirdStep({request, session, response}: HttpContextContract) {
    session.put('thirdStep', request.all())
    return response.status(200).send('OK')
  } 

  async dessert({session, response, view}: HttpContextContract) {
    const boissons = await Ingredient.query().whereHas('type', (query) => query.where('name','boisson'))
    const desserts = await Ingredient.query().whereHas('type', (query) => query.where('name','dessert'))

    if (!session.get('firstStep')) {
      return response.redirect('/sandwich')
    } else {
      return view.render('dessert', {boissons, desserts})
    }
  }

  async delivery({session, response, view}: HttpContextContract) {
    if (!session.get('firstStep') || !session.get('secondStep')) {
      return response.redirect('/dessert')
    } else {
      return view.render('delivery')
    }
  }

  async final({session, response, view}: HttpContextContract) {
    if (!session.get('firstStep') || !session.get('secondStep') || !session.get('thirdStep')) {
      return response.redirect('/delivery')
    } else {
      // TODO INSERT IN DB

      return view.render('final')
    }
  }
}
