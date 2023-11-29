import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'accounts';

  public async up() {
    void this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('did').notNullable();
    });
  }

  public async down() {
    void this.schema.dropTable(this.tableName);
  }
}

