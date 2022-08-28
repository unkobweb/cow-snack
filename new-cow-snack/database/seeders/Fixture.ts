import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Ingredient from 'App/Models/Ingredient'
import IngredientType from 'App/Models/IngredientType'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    let types = await IngredientType.all()
    let ingredients = await Ingredient.all()

    if (types.length === 0) {
      const typesValues = ['viande','accompagnement','sauce','boisson','dessert'].map(type => ({name: type}))
      types = await IngredientType.createMany(typesValues)
    }

    if (ingredients.length === 0) {
      const viandes = ["Cordon bleu","Steak","Emincés de poulet","Merguez","Nuggets","Saucisse"].map(viande => ({name: viande,type_id: types.find(type => type.name === "viande")!.id}))
      const accompagnements = ["Bacon", "Cheddar", "Gruyère", "Jambon de Bayonne", "Jambon Blanc", "Lardons", "Oignons", "Pâtes", "Salade", "Salami", "Saucisson", "Tomate"].map(accomp => ({name: accomp,type_id: types.find(type => type.name === "accompagnement")!.id}))
      const sauces = ["BBQ Miel", "Beurre", "Biggy", "Curry", "Ketchup", "Mayo"].map(sauce => ({name: sauce,type_id: types.find(type => type.name === "sauce")!.id}))
      const boissons = ["7up", "Coca", "Fanta", "Ice Tea", "Oasis", "Orangina", "Pepsi", "Sprite", "Tropico"].map(boisson => ({name: boisson,type_id: types.find(type => type.name === "boisson")!.id}))
      const desserts = ["Cookie"].map(dessert => ({name: dessert,type_id: types.find(type => type.name === "dessert")!.id}))
      ingredients = await Ingredient.createMany([...viandes,...accompagnements,...sauces,...boissons,...desserts])
    }
  }
}
