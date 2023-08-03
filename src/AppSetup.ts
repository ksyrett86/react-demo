import { AppService } from './Services/AppService';
import { appModule } from './AppModule';
import { AppServices } from '@singularsystems/neo-core';
import { NeoReactModule } from '@singularsystems/neo-react';

const appService = AppService as AppServices.AppService;

appService.registerModule(AppServices.NeoModule);
appService.registerModule(NeoReactModule);
appService.registerModule(appModule);