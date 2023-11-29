import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'accounts_ios_tokens';

  public async up() {
    void this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('account_id').unsigned().notNullable().references('id').inTable('accounts');
      table.integer('ios_token_id').unsigned().notNullable().references('id').inTable('ios_tokens');
    });
  }

  public async down() {
    void this.schema.dropTable(this.tableName);
  }
}
