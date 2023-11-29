import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import Account from 'App/Models/Account';

export default class IosToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public token: string;

  @column()
  public follows: boolean;

  @column()
  public likes: boolean;

  @column()
  public replies: boolean;

  @column()
  public reposts: boolean;

  @manyToMany(() => Account, {
    pivotTable: 'accounts_ios_tokens',
  })
  public iosTokens: ManyToMany<typeof Account>;
}
