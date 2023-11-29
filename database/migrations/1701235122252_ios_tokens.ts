import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'ios_tokens';

  public async up() {
    void this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('token').notNullable();
      table.boolean('follows').notNullable().defaultTo(true);
      table.boolean('likes').notNullable().defaultTo(true);
      table.boolean('replies').notNullable().defaultTo(true);
      table.boolean('reposts').notNullable().defaultTo(true);
      table.boolean('mentions').notNullable().defaultTo(true);
      table.boolean('quotes').notNullable().defaultTo(true);
    });
  }

  public async down() {
    void this.schema.dropTable(this.tableName);
  }
}
