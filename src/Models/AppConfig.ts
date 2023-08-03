import { AppServices, Security } from '@singularsystems/neo-core'
import { UserManagerSettings } from 'oidc-client';
import { injectable } from 'inversify';

@injectable()
export class AppConfig extends AppServices.ConfigModel {

    public userManagerSettings!: UserManagerSettings;

    public apiPath: string = "";
    private identityServer = { client_id: "", url: "" };

    /**
     * Transforms property values loaded from config.json
     */
    public initialise() {
        this.apiPath = this.apiPath.replace("{domain}", window.location.hostname);
        this.identityServer.url = this.identityServer.url.replace("{domain}", window.location.hostname);

        this.loadUserManagerSettings();
    }

    private loadUserManagerSettings() {
        this.userManagerSettings = {
            client_id: this.identityServer.client_id,
            redirect_uri: window.location.origin + '/OidcLoginRedirect',
            response_type: 'code',
            scope: "openid profile api1",
            authority: this.identityServer.url,
            silent_redirect_uri: window.location.origin + '/OidcSilentLoginRedirect',
            monitorSession: false,
            metadata: Security.OidcAuthService.createIdentityServerMetadata(this.identityServer.url)
        }
    }
}