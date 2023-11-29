import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RegisterPushValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    did: schema.string(),
    token: schema.string(),
    platform: schema.enum(['ios', 'android'] as const),
  });

  public messages: CustomMessages = {
    'did.required': 'A DID is required',
    'pushToken.required': 'A push token is required',
    'platform.required': 'A platform is required',
    'platform.enum': 'The platform must be either `ios` or `android`',
  };
}
