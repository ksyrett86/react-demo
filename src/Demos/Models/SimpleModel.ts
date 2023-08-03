import { Attributes, ModelBase, NeoModel } from '@singularsystems/neo-core';

@NeoModel
export default class SimpleModel extends ModelBase {

    public stringProperty: string = "";

    public emailProperty: string = "";

    @Attributes.Display("Reg. No.")
    public regNoProperty: string = "";

    @Attributes.Display("Type here...")
    public conditionalString: string = "";

    public disableType: string = "Enabled";

    public booleanProperty: boolean = true;

    public switchProperty: boolean = true;

    @Attributes.Date()
    public dateProperty: Date | null = null;

    @Attributes.Integer()
    public numProperty = 0;

    @Attributes.NullableBoolean()
    public nullableBoolProperty: Nullable<boolean> = null;

    public get stringValue() {
        return this.stringProperty;
    }
}