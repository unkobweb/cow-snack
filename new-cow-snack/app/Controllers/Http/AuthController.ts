import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  async login({request, auth, session, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/admin')
    } catch {
      session.flash('error',"L'email ou le mot de passe est incorrect")
      return response.badRequest('Invalid credentials')
    }
  }
}
