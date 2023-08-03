import 'core-js/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './AppSetup';
import App from './App';
import { AppService, Types } from './Services/AppService';

(async function init() {

    let renderComponent = <App />;

    try {
        const config = await AppService.get(Types.Neo.Config.ConfigService).loadConfig();
        
        const authService = AppService.get(Types.Neo.Security.AuthenticationService);
        if (config.isDevelopment) {
            await authService.loadUserFromToken();
        }

        // Uncomment this if you want to redirect to IDS before the app ui is displayed.
        // if (window.location.href.indexOf("Redirect") < 0 && !authService.isAuthenticated) {
        //     let path = window.location.pathname + window.location.search;
        //     if (path.startsWith(config.baseUrl)) {
        //         path = path.substring(config.baseUrl.length);
        //     }
        //     authService.beginSignIn(path);
        //     return;
        // }

    } catch (e) {
        console.log(e);
        renderComponent = <div>The app failed to load.</div>;
    }

    // React init
    ReactDOM.render(
        renderComponent,
        document.getElementById('root') as HTMLElement
    );
    
})();

// Uncomment the following section if you want to enable offline support or want index.html served from cache.
// This will make your app startup time immediate, since no requests need to be made to the server.
// If a new index.html file exists on the server, the user will be shown a message (after a few seconds from the app loading) saying a new version is available, click ok to update.
// Move to imports section: import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();