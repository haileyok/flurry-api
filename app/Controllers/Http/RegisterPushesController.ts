import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RegisterPushValidator from 'App/Validators/RegisterPushValidator';
import Account from 'App/Models/Account';
import IosToken from 'App/Models/IosToken';
import AndroidToken from 'App/Models/AndroidToken';

export default class RegisterPushesController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterPushValidator);

      // Find the account or create one
      const account = await Account.firstOrCreate({ did: payload.did });

      // Add the token
      if (payload.platform === 'ios') {
        // Load the tokens
        await account.load('iosTokens');

        // See if it already exists
        if (account.iosTokens.find((t) => t.token === payload.token) != null) {
          response.ok('Already registered');
          return;
        }

        const token = await IosToken.firstOrCreate({ token: payload.token });

        await token.related('iosTokens').attach([account.id]);
      } else {
        await account.load('androidTokens');

        if (
          account.androidTokens.find((t) => t.token === payload.token) != null
        ) {
          response.ok('Already registered');
          return;
        }

        const token = await AndroidToken.firstOrCreate({
          token: payload.token,
        });

        await token.related('iosTokens').attach([account.id]);
      }

      response.created('Created');
    } catch (e) {
      response.internalServerError(e.message);
    }
  }

  public async unregister({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterPushValidator);

      const account = await Account.findByOrFail('did', payload.did);

      if (payload.platform === 'ios') {
        const iosToken = await IosToken.findByOrFail('token', payload.token);
        await account.related('iosTokens').detach([iosToken.id]);
      } else {
        const androidToken = await IosToken.findByOrFail(
          'token',
          payload.token,
        );
        await account.related('iosTokens').detach([androidToken.id]);
      }

      response.ok('Unregistered');
    } catch (e) {
      response.internalServerError(e.message);
    }
  }
}
