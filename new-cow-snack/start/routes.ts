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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import fs from 'fs'

const routes = fs.readdirSync('./resources/views').filter(file => file.endsWith('.edge'))

console.log('\nPrecreated routes:\n')
for (const route of routes) {
  const name = route.split('.')[0]  // remove .edge
  Route.get(`/${name === 'index' ? '' : name}`, async ({ view }) => { return view.render(name) })
  console.log('GET /' + name + " route created")
}
console.log()

Route.post('/login', 'AuthController.login')