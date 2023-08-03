import { Data, NeoModel } from "@singularsystems/neo-core";
import { Views } from "@singularsystems/neo-react";
import DemoApiClient from "../Models/DemoApiClient";
import DropDownModel, { AsyncDropDownModel } from "../Models/DropDownModel";

@NeoModel
export default class DropDownVM extends Views.ViewModelBase {

    public demoApiClient = new DemoApiClient();

    // DemoCode: DropDownSimple,Property on ViewModel
    public countryDataSource = new Data.ApiClientDataSource(this.demoApiClient.getDropDownList);
    // End DemoCode

    public basicModel = new DropDownModel();

    public asyncModel = new AsyncDropDownModel();

    public basicItems = [
        { itemId: 1, itemName: "Item 1", itemDescription: "Item 1 description" },
        { itemId: 2, itemName: "Item 2", itemDescription: "Item 2 description" },
        { itemId: 3, itemName: "Item 3", itemDescription: "Item 3 description" }]
}