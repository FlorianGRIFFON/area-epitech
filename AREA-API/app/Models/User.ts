import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'remember_me_token' }) // Define the remember_me_token column
  public rememberMeToken: string | null

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ columnName: 'gmail_oauth' })
  public gmailOauth: string | null

  @column({ columnName: 'facebook_oauth' })
  public facebookOauth: string | null

  @beforeSave()
  public static async hashPassword(user: User) {
    console.warn('TEST')
    if (user.$dirty.password) {
      if (!user.password) {
        throw new Error('Password is empty')
      }
      user.password = await Hash.make(user.password)
    }
  }
}
