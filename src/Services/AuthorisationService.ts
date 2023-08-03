import { injectable } from 'inversify';

@injectable()
export default class AuthorisationService {
    public hasRole(roleName: string) : boolean {
        return true;
    }
    public loadRoles() : Promise<void> {
        return Promise.resolve();
    }
}