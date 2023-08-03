import { AppServices, Misc, NumberUtils } from '@singularsystems/neo-core';
import Types from './AppTypes';

import Axios from 'axios';
import AuthorisationService from './Services/AuthorisationService';
import { AppConfig } from './Models/AppConfig';
import { OidcAuthService } from './Services/AuthenticationService';
import { AppDataService } from './Services/AppDataService';
import { RouteService } from './Services/RouteService';
import { RouteSecurityService } from './Services/RouteSecurityService';
import AppLayout from './Services/AppLayout';
import { NeoDocsApiClient } from './ApiClients/NeoDocsApiClient';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SketchPicker } from 'react-color';
import AsyncSelect from 'react-select/async'
import Select from 'react-select';
import { Icons } from '@singularsystems/neo-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const appModule = new AppServices.Module("App", container => {

    // Config
    container.bind(Types.Config).to(AppConfig).inSingletonScope();

    // Security
    container.bind(Types.Neo.Security.AuthenticationService).to(OidcAuthService).inSingletonScope();
    container.bind(Types.Neo.Security.AuthorisationService).to(AuthorisationService).inSingletonScope();

    // Api clients
    container.bind(Types.Neo.Axios).toConstantValue(Axios);
    container.bind(Types.ApiClients.NeoDocsApiClient).to(NeoDocsApiClient).inSingletonScope();

    // Services
    container.bind(Types.Services.AppDataCache).to(AppDataService).inSingletonScope();
    container.bind(Types.Services.AppLayout).to(AppLayout).inSingletonScope();
    container.bind(Types.Services.RouteService).to(RouteService).inSingletonScope();
    container.bind(Types.Neo.Routing.RouteSecurityService).to(RouteSecurityService).inSingletonScope();

    // Components
    container.bind(Types.Neo.Components.Slider).toConstantValue(Slider);
    container.bind(Types.Neo.Components.Range).toConstantValue(Range);
    container.bind(Types.Neo.Components.SketchPicker).toConstantValue(SketchPicker);
    container.bind(Types.Neo.Components.AsyncSelect).toConstantValue(AsyncSelect);
    container.bind(Types.Neo.Components.ReactSelect).toConstantValue(Select);
    container.bind(Types.Neo.Components.IconFactory).toConstantValue(new Icons.FontAwesomeIconFactory(FontAwesomeIcon));

    Misc.Settings.fixedAppHeaderElement = () => document.querySelector(".app-header-panel");
    Misc.Settings.progressBar.reverse = true;
    Misc.Settings.grid.useStickyHeaders = true;
    NumberUtils.allowAsDecimalSeparator = ",";
});

const appTestModule = new AppServices.Module("App", container => {

});

export { appModule, appTestModule };