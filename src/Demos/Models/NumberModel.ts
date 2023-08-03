import { Attributes, ModelBase, NeoModel } from '@singularsystems/neo-core';

@NeoModel
export default class NumberModel extends ModelBase {

    // DemoCode: NumericBasic
    @Attributes.Integer()
    public basic: number = 12345;

    @Attributes.Float()
    public basicFloat: number = 12345;
    // End DemoCode

    // DemoCode: NumericNullable
    @Attributes.Integer()
    public normal: number = 10;

    @Attributes.Nullable()
    @Attributes.Integer()
    public nullable: number | null = null;
    // End DemoCode

    @Attributes.Integer()
    public quantity: number = 0;

    @Attributes.Float()
    public price: number = 0;

    @Attributes.Float()
    public discount: number = 0.4;

    // DemoCode: NumericRounding
    @Attributes.Float()
    public round: number = 0;

    @Attributes.Float(4)
    public round4Places: number = 1.1234;
    // End DemoCode

    public autoRound: boolean = true;

    public currency: string = "R";

    @Attributes.Float()
    public readOnly: number = 9999999.99;

    @Attributes.Integer()
    public htmlInt: number = 0;

}