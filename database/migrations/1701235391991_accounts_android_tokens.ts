import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'accounts_android_tokens';

  public async up() {
    void this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('account_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('accounts');
      table
        .integer('android_token_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('android_tokens');
    });
  }

  public async down() {
    void this.schema.dropTable(this.tableName);
  }
}
