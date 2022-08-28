import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import IngredientType from './IngredientType'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @computed()
  public get slug() {
    return this.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s/gmi,'_')
  }

  @column()
  public type_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => IngredientType, {
    foreignKey: 'type_id'
  })
  public type: BelongsTo<typeof IngredientType>
}
