import { UserManager, User } from 'oidc-client';
import { Security, NeoModel } from '@singularsystems/neo-core';
import { injectable } from 'inversify';
import { AppService, Types } from './AppService';
import AppUser from '../Models/Security/AppUser';

@injectable()
@NeoModel
export class OidcAuthService extends Security.OidcAuthService<AppUser> {

    constructor(axios = AppService.get(Types.Neo.Axios), config = AppService.get(Types.Config)) {
        super(
            new UserManager(config.userManagerSettings),
            axios);
    }

    protected createUser(user: User) : AppUser {
        return new AppUser(user);
    }

    protected afterUserLoaded() {
        
    }
}