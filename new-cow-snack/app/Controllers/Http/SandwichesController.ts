import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredient from 'App/Models/Ingredient'

export default class SandwichesController {
  async index({view}: HttpContextContract) {
    const ingredients = await Ingredient.query().preload('type')
    return view.render('sandwich', {ingredients})
  }
}
