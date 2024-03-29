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

Route.get('/', async ({view}) => { return view.render('index') })
Route.get('/about', async ({view}) => { return view.render('about') })
Route.get('/cgu', async ({view}) => { return view.render('cgu') })
Route.get('/sandwich', 'SandwichesController.index')
Route.get('/login', async ({view}) => { return view.render('login') })
Route.get('/dessert', 'SandwichesController.dessert')
Route.get('/delivery', 'SandwichesController.delivery')
Route.get('/final', 'SandwichesController.final')

Route.post('/login', 'AuthController.login')
Route.post('/sandwich/first-step', 'SandwichesController.storeFirstStep')
Route.post('/sandwich/second-step', 'SandwichesController.storeSecondStep')
Route.post('/sandwich/third-step', 'SandwichesController.storeThirdStep')