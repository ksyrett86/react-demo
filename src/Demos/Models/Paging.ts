import { ValueObject, LookupBase, NeoModel, Attributes } from '@singularsystems/neo-core';

@NeoModel
export class CountryCriteria extends ValueObject {

    public countryName: string = "";
}

@NeoModel
export class CountryLookup extends LookupBase {

    public countryName: string = "";

    @Attributes.Integer()
    public population: number = 0;
}