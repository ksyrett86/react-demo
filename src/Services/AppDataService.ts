import { Data } from '@singularsystems/neo-core';
import { injectable } from 'inversify';
import { AppService, Types } from './AppService';

export enum LifeTime {
    Short = 30,
    Long = 240
}

@injectable()
export class AppDataService extends Data.CachedDataService {

    constructor(private apiClient = AppService.get(Types.ApiClients.NeoDocsApiClient)) {
        super();
    }

    // Register cached data here:
    // public examples = this.register(this.apiClient.examples.get, LifeTime.Short);
}