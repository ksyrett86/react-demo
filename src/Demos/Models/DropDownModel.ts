import { ModelBase, NeoModel, Attributes, EnumHelper, Rules, Model, Validation, Misc } from "@singularsystems/neo-core";

// DemoCode: DropDownEnum|AsyncDropDownDescriptions
export enum EnumItems {
    Zero = 0,
    One = 1,
    Two = 2
}

// Use the enum helper to change the enum item display and description values, or the order of each item.
EnumHelper.decorateEnum(EnumItems, e => {
    e.describe(EnumItems.Zero, "None", "This is the description");
    e.describe(EnumItems.One, "One", "Description for one.");
    e.describe(EnumItems.Two, "Two", "Did you know 1 + 1 = 2?");
});
// End DemoCode

@NeoModel
export default class DropDownModel extends ModelBase {

    // DemoCode: DropDownNullable,Bound model property
    @Attributes.Nullable()
    @Attributes.Integer()
    public selectedItem: number | null = null;
    // End DemoCode

    @Attributes.Display("Enum item")
    public selectedItemEnum: number | null = 0;

    public country: number | null = null;

    public isSell: boolean = false;

    @Attributes.NullableBoolean()
    public yesNoAll: boolean | null = null;
}

@NeoModel
export class AsyncDropDownModel extends ModelBase {

    // DemoCode: AsyncDropDownBasic,Model properties
    @Rules.Required()
    selectedCountryId: number | null = null;

    // Client only properties

    // The display name should be set when the model is loaded from the database.
    @Attributes.NoTracking(Misc.SerialiseType.FullOnly)
    selectedCountryName: string | null = null;
    // End DemoCode

    selectedCountryId2: number | null = null;
    selectedCountryName2: string | null = null;

    selectedCountryId3: number | null = null;
    selectedCountryName3: string | null = null;

    @Rules.Required()
    @Attributes.Display("Country")
    selectedCountryId4: number | null = null;
    selectedCountryName4: string | null = null;

    // DemoCode: AsyncDropDownMultiSelect,Model properties
    selectedIds: number[] = [];

    @Attributes.NoTracking()
    selectedItems: Model.ISelectedItem[] = [];
    // End DemoCode

    selectedIds2: number[] = [];

    @Attributes.NoTracking()
    selectedItems2: Model.ISelectedItem[] = [];

    addBusinessRules(rules: Validation.Rules<AsyncDropDownModel>) {
        rules.failWhen(c => c.selectedItems.length < 2, "You must choose 2 items.");
    }
}