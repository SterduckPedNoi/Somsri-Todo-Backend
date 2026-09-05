import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'category_id' })
  public categoryId: number | null

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public title: string

  @column({ columnName: 'is_completed' })
  public isCompleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
