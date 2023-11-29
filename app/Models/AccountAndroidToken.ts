import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class AccountAndroidToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public accountId: number;

  @column()
  public token: string;
}
