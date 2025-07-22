import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('remember_me_token').nullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('gmail_oauth', 255).nullable()
      table.string('facebook_oauth', 255).nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    // this.schema.table(this.tableName, (table) => {
    //   table.dropColumn('remember_me_token')
    // })
  }
}
