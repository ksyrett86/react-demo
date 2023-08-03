import { Routing as NeoRouting } from '@singularsystems/neo-core';
import { Routing } from '@singularsystems/neo-react';
import { injectable } from 'inversify';
import { AppService, Types } from './AppService';

import Home from '../Views/Home';

import NotFound from '../Components/404NotFound';
import LoggedOut from '../Views/Security/LoggedOut';
import OidcLoginRedirect from '../Views/Security/OidcLoginRedirect';
import OidcSilentLoginRedirect from '../Views/Security/SilentSignInRedirect';
import { demoMenuItem } from '../Demos/DemoRoutes';

interface ICommonAppRouteProps {
    /** TODO: Add any custom route props here, like userType. */
}

export interface IAppRoute extends NeoRouting.IRoute, ICommonAppRouteProps {

}

export interface IAppMenuItem extends NeoRouting.IMenuRoute, ICommonAppRouteProps {

}

@injectable()
export class RouteService {

    private routeProvider: Routing.RouteProvider;

    constructor(private config = AppService.get(Types.Config)) {
        
        this.routeProvider = new Routing.RouteProvider(
            this.getMenuRoutes(),
            this.getPureRoutes(),
            NotFound,
        )
    }

    /**
     * Gets the routes provider
     */
    public get routes(): Routing.RouteProvider {
        return this.routeProvider;
    }

    private getMenuRoutes(): IAppMenuItem[] {
        return [
            {
                name: "Home", path: '/', component: Home, icon: "home", allowAnonymous: true
            }, 
            demoMenuItem
        ]
    }

    private getPureRoutes(): IAppRoute[] {
        return [
            {
                path: "/OidcLoginRedirect", component: OidcLoginRedirect, allowAnonymous: true
            },
            {
                path: "/OidcSilentLoginRedirect", component: OidcSilentLoginRedirect, allowAnonymous: true
            },
            {
                path: "/loggedout", component: LoggedOut, allowAnonymous: true
            },
        ]
    }
}