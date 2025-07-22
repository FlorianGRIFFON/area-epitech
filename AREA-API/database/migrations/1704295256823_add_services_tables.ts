import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Services extends BaseSchema {
  protected tableName = 'services'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('gmail_token', 255).nullable()
      table.string('spotify_token', 500).nullable()
      table.string('discord_token', 255).nullable()
      table.string('chatgpt_token', 255).nullable()
      table.string('slack_token', 255).nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
