import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public gmail_token: string | null = null

  @column()
  public spotify_token: string | null = null

  @column()
  public discord_token: string | null = null

  @column()
  public chatgpt_token: string | null = null

  @column()
  public slack_token: string | null = null
}
