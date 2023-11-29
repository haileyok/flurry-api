import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import IosToken from 'App/Models/IosToken';
import AndroidToken from 'App/Models/AndroidToken';

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public did: string;

  @manyToMany(() => IosToken, {
    pivotTable: 'accounts_ios_tokens',
  })
  public iosTokens: ManyToMany<typeof IosToken>;

  @manyToMany(() => AndroidToken, {
    pivotTable: 'accounts_android_tokens',
  })
  public androidTokens: ManyToMany<typeof AndroidToken>;
}
