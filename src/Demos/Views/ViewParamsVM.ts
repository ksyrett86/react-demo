import { List, NeoModel } from '@singularsystems/neo-core';
import Country, { countries } from '../Models/Country';
import { Views } from '@singularsystems/neo-react';
import { AppService, Types } from '../../Services/AppService';

@NeoModel
export default class ViewParamsViewModel extends Views.ViewModelBase {

    constructor(
        taskRunner = AppService.get(Types.Neo.TaskRunner),
        public notifications = AppService.get(Types.Neo.UI.GlobalNotifications)) {

        super(taskRunner);
    }

    public selectedCountry?: Country;

    public countries = new List(Country);

    public initialise() {
        this.countries.set(countries);
    }

    public setCountry(countryId: string) {
        this.selectedCountry = this.countries.find(c => c.countryCode === countryId);
    }
}