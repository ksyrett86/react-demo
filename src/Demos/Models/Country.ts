import { ModelBase, NeoModel, Rules, Validation, Attributes } from '@singularsystems/neo-core';
import { countryFlags } from './DemoApiClient';

@NeoModel
export default class Country extends ModelBase {

    public countryId: number = 0;

    @Rules.Required()
    public name: string = "";

    public countryCode: string = "";

    @Attributes.Integer()
    public population: number = 0;

    public flag: string = "";
  
    protected addBusinessRules(rules: Validation.Rules<this>) {
        
    }
}

export const countries = [
    { countryCode: "ZA", name: "South Africa", population: 58558270, flag: countryFlags.ZA },
    { countryCode: "DE", name: "Germany", population: 83517045, flag: countryFlags.DE },
    { countryCode: "US", name: "USA", population: 329064917, flag: countryFlags.US },
    { countryCode: "GB", name: "United Kingdom", population: 67530172, flag: countryFlags.GB },
    { countryCode: "IN", name: "India", population: 1366417754, flag: countryFlags.IN },
    { countryCode: "CN", name: "China", population: 1433783686, flag: countryFlags.CN },
    { countryCode: "BR", name: "Brazil", population: 211049527, flag: countryFlags.BR },
    { countryCode: "ZW", name: "Zimbabwe", population: 14645468, flag: countryFlags.ZW },
]