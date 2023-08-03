import { AppServices } from '@singularsystems/neo-core';
import { NeoReactTypes } from '@singularsystems/neo-react';
import { INeoDocsApiClient } from './ApiClients/NeoDocsApiClient';
import { AppConfig } from './Models/AppConfig';
import { AppDataService } from './Services/AppDataService';
import { RouteService } from './Services/RouteService';
import { IAppLayout } from './Services/AppLayout';
import { OidcAuthService } from './Services/AuthenticationService';

const Types = {
    ApiClients: {
        NeoDocsApiClient: new AppServices.ServiceIdentifier<INeoDocsApiClient>("ApiClient.NeoDocsApiClient"),
    },
    Services: {
        AuthenticationService: AppServices.NeoTypes.Security.AuthenticationService.asType<OidcAuthService>(),
        AppDataCache: new AppServices.ServiceIdentifier<AppDataService>("Services.AppDataCache"),
        AppLayout: new AppServices.ServiceIdentifier<IAppLayout>("Services.AppLayout"),
        RouteService: new AppServices.ServiceIdentifier<RouteService>("Services.RouteService"),
    },
    Config: AppServices.NeoTypes.Config.ConfigModel.asType<AppConfig>(),
    Neo: NeoReactTypes,
};

export default Types;