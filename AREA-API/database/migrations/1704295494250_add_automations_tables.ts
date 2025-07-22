import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Automations extends BaseSchema {
  protected tableName = 'automations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 255)
      table.string('description', 255)
      table.boolean('active').defaultTo(true)
      table.json('steps')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
