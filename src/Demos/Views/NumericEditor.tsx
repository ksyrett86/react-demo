import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import NumberModel from '../Models/NumberModel';
import { observer } from 'mobx-react';
import { Misc } from '@singularsystems/neo-core';

const currencies = [{ text: "Rand", data: "R" }, { text: "Dollar", data: "$" }, { text: "Zim Dollar", data: "Z$" }];
const roundingOptions = [{ text: "Auto round", data: true }, { text: "No rounding", data: false }];

@observer
export default class NumericEditorDemo extends Views.ViewBase {

    constructor(props: unknown) {
        super("Numeric editor", Views.EmptyViewModel, props);

        this.changeCurrency = this.changeCurrency.bind(this);
        this.changeRounding = this.changeRounding.bind(this);
    }

    private model = new NumberModel();

    // DemoCode: NumericCurrency
    private changeCurrency(e: React.MouseEvent, data?: any) {
        this.model.currency = data;
    }
    // End DemoCode

    // DemoCode: NumericRounding
    private changeRounding(e: React.MouseEvent, data?: any) {
        this.model.autoRound = data;
    }
    // End DemoCode

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Numeric Editor">

                    <p>
                        The <code>Neo.NumberInput</code> component adds some basic features on top of the text input component to help with the input and display
                        of numbers:
                    </p>
                    <ul className="my-4">
                        <li>On update, converts the string value from the html input element into a number. <br /><em>This is important as you want 1 + 1 = 2.
                            If you try add the values of two text editors, you will get a result of 11, because the results are concatenated instead of added.</em></li>
                        <li>Prevents updating numeric properties with non numeric characters.</li>
                        <li>Adds a <code>numeric-input</code> class to the input element to allow number specific styling (e.g. right alignment).</li>
                        <li>Formats the bound numeric value using a supplied or default format string.</li>
                    </ul>
                </Neo.Card>

                <Neo.Card title="Basic" data-code-key="NumericBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericBasic, "Basic")} />}>
                    <p>
                        Numeric properties on your model should be decorated with the <code>@Attributes.Integer()</code> attribute for integers,
                        or the <code>@Attributes.Float()</code> attribute for floats.
                    </p>
                    <p>
                        An example of each type is shown below. Type in new values below. If you type an invalid value and leave the input, then the original value
                        will be restored.
                    </p>
                    <p>The following two numeric editors are the most basic type, with no props specified apart from the bind property.</p>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                Integer numeric input. The default format string is #,##0 (thousands seperators with no decimals)
                            </p>
                        </div>
                        <Neo.NumberInput bind={this.model.meta.basic} />
                        <div>
                            <p>
                                Float numeric input. The default format string is#,##0.00 (thousands seperators with 2 decimals)
                            </p>
                        </div>
                        <Neo.NumberInput bind={this.model.meta.basicFloat} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Props">
                    <p>
                        The properties of the numeric editor are specified using the <code>numProps</code> prop. The properties available are described
                        below. <br />
                        Format settings can also be changed globally using the static properties of the <code>NumberUtils</code> class, including
                        currency, thousands separators and changing the pre-defined number formats.
                    </p>
                </Neo.Card>

                <Neo.Card title="Formatting" data-code-key="NumericFormatting" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericFormatting, "Formatting")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The format can be selected using the <code>format</code> prop. This can be selected using a set of pre-defined formats.
                                You can also specify a custom format string using the <code>formatString</code> prop.
                            </p>
                        </div>
                        <Neo.NumberInput bind={this.model.meta.quantity} numProps={{ formatString: "#,##0;(-#,##0)" }} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Currency" data-code-key="NumericCurrency" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericCurrency, "Currency")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                Currency symbols can be changed globally, or by specifying the <code>currencySymbol</code> prop.
                            </p>
                        </div>
                        <Neo.NumberInput bind={this.model.meta.price}
                            numProps={{ format: Misc.NumberFormat.CurrencyDecimals, currencySymbol: this.model.currency }}
                            append={() => <Neo.Button menuItems={currencies} variant="dark" onClick={this.changeCurrency}>Currency</Neo.Button>}
                        />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Percentages" data-code-key="NumericPercent" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericPercent, "Percentages")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                A numeric editor will automatically multiply percent values by 100 on display, and divide by 100 on input.
                                It will do this if you specify a format string which contains a % symbol or set <code>appendText</code> to a percent
                                symbol.
                            </p>
                            <p>
                                You can disable this behaviour by setting <code>transformPercent</code> = false globally on the <code>NumberUtils</code> class.
                            </p>
                        </div>

                        <div>
                            <Neo.NumberInput className="mb-2" bind={this.model.meta.discount} numProps={{ format: Misc.NumberFormat.PercentDecimals }} />
                            <Neo.NumberInput bind={this.model.meta.discount} appendText="%" />
                            <small>Raw value: {this.model.discount}</small>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Nulls" data-code-key="NumericNullable" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericNullable, "Nulls")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                Numeric editors will normally convert a blank input string to zero. If you clear the normal field to the right, it will set
                                the bound property to zero, as most numeric properties do not allow null.
                            </p>
                        </div>
                        <Neo.FormGroup bind={this.model.meta.normal} />
                        <p>
                            If the property has a <code>Attributes.Nullable()</code> decorator, then the numeric editor it is bound to will convert an
                            empty input string to null.
                        </p>
                        <Neo.FormGroup bind={this.model.meta.nullable} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Rounding" data-code-key="NumericRounding" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericRounding, "Rounding")} />}>
                    <Neo.GridLayout alignItems="center">
                        <p>
                            If the value of a property has more decimal places than the format string, it will be displayed as a rounded value.
                            By default, if a user types in more decimal places than the format string allows, the value will be rounded before
                            it's bound property is set. Type in a value of 77.777 in the input to see this. <br />
                            If you want to allow more precision than what is displayed, set the <code>autoRound</code> numProp to false.
                        </p>
                        <div>
                            <Neo.NumberInput
                                bind={this.model.meta.round}
                                numProps={{ autoRound: this.model.autoRound, formatString: "#,##0.00" }}
                                append={() => <Neo.Button menuItems={roundingOptions} variant="dark" onClick={this.changeRounding}>{this.model.autoRound ? "Auto round" : "No rounding"}</Neo.Button>} />
                            <small>Raw value: {this.model.round}</small>

                            
                        </div>
                        <p className="mt-3">
                            The precision of the property can be specified using the <code>@Attributes.Float</code> property, by passing in the no of allowed decimal places as a parameter.
                            The displayed decimal places will match the precision, unless you specify a custom format string. Auto rounding will still occur at the allowed no of decimal places.
                        </p>
                        <div>
                            <Neo.NumberInput bind={this.model.meta.round4Places} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Read Only">
                    <Neo.GridLayout>
                        <p>
                            Readonly numeric editors (as well as editable ones) will remove the formatting when the input is focused. This allows the values
                            to be copied to other programs. This will not work when the editor is disabled, as it cannot be focused.
                        </p>
                        <Neo.NumberInput bind={this.model.meta.readOnly} isReadOnly prependText="R" />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Html 5 numeric editor" data-code-key="NumericHtml5" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_NumericHtml5, "Html 5 numeric editor")} />}>
                    <Neo.GridLayout>
                        <p>
                            To render the browsers html 5 numeric editor, you can set the <code>native</code> flag on <code>numProps</code> to true. In this mode, the format string will set the <code>step</code> property to allow 
                            the correct number of decimals. Unfortunately, the native numeric editor does not support showing a thousands separator.
                        </p>
                        <Neo.NumberInput bind={this.model.meta.htmlInt} numProps={{ native: true }} prependText="R" />
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_NumericBasic = [{ language: "jsx", code: 
`<p>
    Numeric properties on your model should be decorated with the <code>@Attributes.Integer()</code> attribute for integers,
    or the <code>@Attributes.Float()</code> attribute for floats.
</p>
<p>
    An example of each type is shown below. Type in new values below. If you type an invalid value and leave the input, then the original value
    will be restored.
</p>
<p>The following two numeric editors are the most basic type, with no props specified apart from the bind property.</p>
<Neo.GridLayout>
    <div>
        <p>
            Integer numeric input. The default format string is #,##0 (thousands seperators with no decimals)
        </p>
    </div>
    <Neo.NumberInput bind={this.model.meta.basic} />
    <div>
        <p>
            Float numeric input. The default format string is#,##0.00 (thousands seperators with 2 decimals)
        </p>
    </div>
    <Neo.NumberInput bind={this.model.meta.basicFloat} />
</Neo.GridLayout>`}, { language: "javascript", code: `@Attributes.Integer()
public basic: number = 12345;

@Attributes.Float()
public basicFloat: number = 12345;`}];

const demo_source_code_NumericFormatting = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The format can be selected using the <code>format</code> prop. This can be selected using a set of pre-defined formats.
            You can also specify a custom format string using the <code>formatString</code> prop.
        </p>
    </div>
    <Neo.NumberInput bind={this.model.meta.quantity} numProps={{ formatString: "#,##0;(-#,##0)" }} />
</Neo.GridLayout>`}];

const demo_source_code_NumericCurrency = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            Currency symbols can be changed globally, or by specifying the <code>currencySymbol</code> prop.
        </p>
    </div>
    <Neo.NumberInput bind={this.model.meta.price}
        numProps={{ format: Misc.NumberFormat.CurrencyDecimals, currencySymbol: this.model.currency }}
        append={() => <Neo.Button menuItems={currencies} variant="dark" onClick={this.changeCurrency}>Currency</Neo.Button>}
    />
</Neo.GridLayout>`}, { language: "javascript", code: `private changeCurrency(e: React.MouseEvent, data?: any) {
    this.model.currency = data;
}`}];

const demo_source_code_NumericPercent = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            A numeric editor will automatically multiply percent values by 100 on display, and divide by 100 on input.
            It will do this if you specify a format string which contains a % symbol or set <code>appendText</code> to a percent
            symbol.
        </p>
        <p>
            You can disable this behaviour by setting <code>transformPercent</code> = false globally on the <code>NumberUtils</code> class.
        </p>
    </div>

    <div>
        <Neo.NumberInput className="mb-2" bind={this.model.meta.discount} numProps={{ format: Misc.NumberFormat.PercentDecimals }} />
        <Neo.NumberInput bind={this.model.meta.discount} appendText="%" />
        <small>Raw value: {this.model.discount}</small>
    </div>
</Neo.GridLayout>`}];

const demo_source_code_NumericNullable = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            Numeric editors will normally convert a blank input string to zero. If you clear the normal field to the right, it will set
            the bound property to zero, as most numeric properties do not allow null.
        </p>
    </div>
    <Neo.FormGroup bind={this.model.meta.normal} />
    <p>
        If the property has a <code>Attributes.Nullable()</code> decorator, then the numeric editor it is bound to will convert an
        empty input string to null.
    </p>
    <Neo.FormGroup bind={this.model.meta.nullable} />
</Neo.GridLayout>`}, { language: "javascript", code: `@Attributes.Integer()
public normal: number = 10;

@Attributes.Nullable()
@Attributes.Integer()
public nullable: number | null = null;`}];

const demo_source_code_NumericRounding = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <p>
        If the value of a property has more decimal places than the format string, it will be displayed as a rounded value.
        By default, if a user types in more decimal places than the format string allows, the value will be rounded before
        it's bound property is set. Type in a value of 77.777 in the input to see this. <br />
        If you want to allow more precision than what is displayed, set the <code>autoRound</code> numProp to false.
    </p>
    <div>
        <Neo.NumberInput
            bind={this.model.meta.round}
            numProps={{ autoRound: this.model.autoRound, formatString: "#,##0.00" }}
            append={() => <Neo.Button menuItems={roundingOptions} variant="dark" onClick={this.changeRounding}>{this.model.autoRound ? "Auto round" : "No rounding"}</Neo.Button>} />
        <small>Raw value: {this.model.round}</small>

        
    </div>
    <p className="mt-3">
        The precision of the property can be specified using the <code>@Attributes.Float</code> property, by passing in the no of allowed decimal places as a parameter.
        The displayed decimal places will match the precision, unless you specify a custom format string. Auto rounding will still occur at the allowed no of decimal places.
    </p>
    <div>
        <Neo.NumberInput bind={this.model.meta.round4Places} />
    </div>
</Neo.GridLayout>`}, { language: "javascript", code: `@Attributes.Float()
public round: number = 0;

@Attributes.Float(4)
public round4Places: number = 1.1234;`}, { language: "javascript", code: `private changeRounding(e: React.MouseEvent, data?: any) {
    this.model.autoRound = data;
}`}];

const demo_source_code_NumericHtml5 = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>
        To render the browsers html 5 numeric editor, you can set the <code>native</code> flag on <code>numProps</code> to true. In this mode, the format string will set the <code>step</code> property to allow 
        the correct number of decimals. Unfortunately, the native numeric editor does not support showing a thousands separator.
    </p>
    <Neo.NumberInput bind={this.model.meta.htmlInt} numProps={{ native: true }} prependText="R" />
</Neo.GridLayout>`}];
