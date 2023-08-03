import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { SimpleModelWithRules, SimpleModelNoRules, ModelWithWarnings, ModelWithMultipleDisplayRule, ObjectRuleModel } from '../Models/ModelWithRules';
import { Neo, NeoGrid, Views } from '@singularsystems/neo-react';
import { ModalUtils, Validation, Model, Utils } from '@singularsystems/neo-core';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { AppService, Types } from '../../Services/AppService';

const displayModes = [
    { text: "After blur", data: Validation.DisplayMode.AfterBlur },
    { text: "Always", data: Validation.DisplayMode.Always },
    { text: "After submit", data: Validation.DisplayMode.AfterSubmit },
    { text: "Never", data: Validation.DisplayMode.Never }];

@observer
export default class FormsAndValidationDemo extends Views.ViewBase {

    constructor(props: unknown) {
        super("Forms & Validation", Views.EmptyViewModel, props);

        this.onForm1Invalid = this.onForm1Invalid.bind(this);
        this.changeDisplayMode = this.changeDisplayMode.bind(this);
    }

    private simpleModelNoRules = new SimpleModelNoRules();

    private simpleModel = new SimpleModelWithRules();

    private simpleModel2 = new SimpleModelWithRules();

    @observable.ref
    private simpleModel3 = new SimpleModelWithRules();

    private severityModel = new ModelWithWarnings();

    private multiplePropertyModel = new ModelWithMultipleDisplayRule();

    private objectRuleModel = new ObjectRuleModel();

    private onForm1Submit() {
        ModalUtils.showMessage("Submit", "Submit function has been called.");
    }
    // DemoCode: FormWithModel
    private onForm1Invalid(e: React.FormEvent, justValidated?: boolean) {
        if (!justValidated) {
            ModalUtils.showMessage("Save", "Model is not valid, submit not allowed.");
        }
    }
    private onForm1Save() {
        ModalUtils.showMessage("Save", "Model is valid, submit was called.");
    }
    // End DemoCode

    @observable.ref
    private displayMode = displayModes[0];

    private changeDisplayMode(e: React.MouseEvent, data?: any) {
        this.simpleModel3 = new SimpleModelWithRules();
        this.displayMode = displayModes.find(c => c.data === data)!;
    }

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Neo.Form" icon="file" data-code-key="Form" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Form, "Neo.Form")} />}>
                    <p>
                        Editor components can be grouped together using a <code>Neo.Form</code> component. One of the purposes of <code>Neo.Form</code> is to provide
                        an onSubmit callback which is fired when the submit button is clicked, or when a user presses the enter key on one of the editors in the form.
                    </p>

                    <Neo.Form onSubmit={() => this.onForm1Submit()}>
                        <Neo.GridLayout md={2}>
                            <Neo.FormGroup bind={this.simpleModelNoRules.meta.firstName} />
                            <Neo.FormGroup bind={this.simpleModelNoRules.meta.lastName} />
                        </Neo.GridLayout>

                        <Neo.Button isSubmit>Submit</Neo.Button>

                    </Neo.Form>

                    <p className="mt-4">
                        In the example above, the submit button has no click event handler. It does however have an <code>isSubmit</code> prop, which means it will
                        fire the forms onSubmit handler when clicked.
                    </p>
                    <p>
                        Try focus one of the editors and press enter. Then click the submit button. Also note there is only one submit handler for both methods
                        of submitting the form.
                    </p>
                </Neo.Card>

                <Neo.Card title="Form validation" icon="exclamation-circle" data-code-key="FormWithModel" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FormWithModel, "Form validation")} />}>

                    <p>
                        A form component can be bound to a model to control validation display behaviour. In the example below, the validation display mode has been
                        set to <code>Validation.DisplayMode.AfterSubmit</code>. This means that the validation errors will only be shown once the form has been
                        submitted.
                    </p>
                    <p>
                        Notice however, that the isValid property of the model is still returning false. <br />
                        The actual validation state of the model is seperate from the validation <em>display</em> state of the model.
                    </p>

                    <Neo.Form model={this.simpleModel}
                        validationDisplayMode={Validation.DisplayMode.AfterSubmit}
                        onSubmit={() => this.onForm1Save()}
                        onInvalid={this.onForm1Invalid}>

                        {(model, meta) => (
                            <React.Fragment>
                                <Neo.GridLayout md={2}>
                                    <Neo.FormGroup bind={meta.firstName} />
                                    <Neo.FormGroup bind={meta.lastName} />
                                    <Neo.FormGroup bind={meta.agree} />
                                </Neo.GridLayout>

                                <p>Model is <strong>{model.isValid ? "valid" : "not valid"}</strong>.</p>

                                <Neo.Button variant="success" isSubmit>Save</Neo.Button>
                            </React.Fragment>
                        )}
                    </Neo.Form>

                    <p className="mt-4">
                        In the above form, populate the two fields, and click I agree. You will see the model validation state change from invalid to valid.
                    </p>
                    <p>
                        Clear one of the fields to make the model invalid, and click save. You will see the validation errors are now displayed.
                        If you click save again, the <code>justValidated</code> parameter of the <code>onInvalid</code> callback will be set to false, and the user can
                        be shown another message.
                    </p>
                    <p>
                        Also note that the onSubmit callback is only fired if the model is valid.
                    </p>

                </Neo.Card>

                <Neo.Card title="Error text" icon="times" data-code-key="ErrorText" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ErrorText, "Error text")} />}>

                    <p>
                        The description of the error will be displayed below the editor when using a <code>Neo.FormGroup</code>. If the editor is being displayed outside
                        of a form group, e.g. in a grid, the error description will be displayed in a tooltip when hovering over the editor.
                    </p>
                    <Neo.Form model={this.simpleModel2} validationDisplayMode={Validation.DisplayMode.Always}>
                        {(model, meta) => (
                            <Neo.GridLayout md={2}>
                                <div>
                                    <small><em>Error description is displayed below the editor</em></small>
                                    <Neo.FormGroup bind={meta.lastName} />
                                </div>
                                <div>
                                    <small><em>Error description is displayed on hover</em></small>
                                    <NeoGrid.Grid items={[this.simpleModel2]}>
                                        {item => (
                                            <NeoGrid.Row>
                                                <NeoGrid.Column bind={item.meta.firstName} />
                                            </NeoGrid.Row>
                                        )}
                                    </NeoGrid.Grid>
                                </div>

                            </Neo.GridLayout>
                        )}
                    </Neo.Form>

                </Neo.Card>

                <Neo.Card title="Display modes" icon="laptop" data-code-key="DisplayModes" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DisplayModes, "Display modes")} />}>

                    <p>
                        In the above form, the validation errors are only shown after the first submit attempt. The default behaviour is for the validation errors
                        to display when the editor loses focus.
                    </p>
                    <p>
                        Change the display mode to see how each mode works. {" "}
                        <Neo.Button variant="dark" size="sm"
                            menuItems={displayModes}
                            onClick={this.changeDisplayMode}>{this.displayMode.text}</Neo.Button>
                    </p>

                    <Neo.Form model={this.simpleModel3}
                        validationDisplayMode={this.displayMode.data}
                        onSubmit={() => this.onForm1Save()}
                        showSummaryModal>

                        <Neo.GridLayout md={2}>
                            <Neo.FormGroup bind={this.simpleModel3.meta.firstName} />
                            <Neo.FormGroup bind={this.simpleModel3.meta.lastName} />
                        </Neo.GridLayout>

                        <Neo.Button variant="success" isSubmit>Save</Neo.Button>


                    </Neo.Form>
                </Neo.Card>

                <Neo.Card title="Validation summary" icon="exclamation-triangle">

                    <p>
                        Click 'save' in the above section. You will see a validation summary showing the models validation errors is shown in a modal.
                        To enable this, either set the <code>showSummaryModal</code> or <code>invalidSummaryText</code> props on <code>Neo.Form</code>.
                    </p>
                    <p>
                        To show a validation summary component yourself, you can use the <code>Neo.ValidationSummary</code> component.
                    </p>
                    <p> 
                        To get an object graph containing broken rules, you can use <code>modelInstance.validator.getBrokenRules()</code>.
                    </p>
                </Neo.Card>

                <Neo.Card title="Multiple properties" icon="building" data-code-key="ValidationMultipleProperties" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ValidationMultipleProperties, "Multiple properties")} />}>
                    <p>
                        Rules can be displayed on multiple properties. In the example below, the minimum amount rule below has been configured to apply to all three fields,
                        so is displayed on all of them.
                    </p>
                    <p>
                        Editors will also display multiple rules that are broken on the same property. In the example below, discount has two of its rules broken.
                    </p>

                    <Neo.Form model={this.multiplePropertyModel} validationDisplayMode={Validation.DisplayMode.Always}>

                        <Neo.GridLayout md={2} xl={3}>
                            <Neo.FormGroup bind={this.multiplePropertyModel.meta.quantity} />
                            <Neo.FormGroup bind={this.multiplePropertyModel.meta.price} />
                            <Neo.FormGroup bind={this.multiplePropertyModel.meta.discount} appendText="%" />
                            <Neo.FormGroup display={this.multiplePropertyModel.meta.value} />
                        </Neo.GridLayout>
                    </Neo.Form>
                </Neo.Card>

                <Neo.Card title="Severity" icon="exclamation" data-code-key="ValidationSeverity" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ValidationSeverity, "Severity")} />}>
                    <p>
                        Validation rules can have different severities. Only validation rules of type <code>error</code> and <code>async busy</code> will cause
                        the model to be invalid.
                    </p>
                    <p>
                        The editor will only show the most severe errors. In the example below, <code>firstName</code> has an error and a warning. The warning will
                        only be shown when the error is resolved. Type something in <code>firstName</code> to see this.
                    </p>

                    <Neo.Form model={this.severityModel} validationDisplayMode={Validation.DisplayMode.Always} showSummaryModal>

                        <Neo.GridLayout>
                            <Neo.FormGroup bind={this.severityModel.meta.firstName} />
                            <Neo.FormGroup bind={this.severityModel.meta.lastName} />
                            <Neo.FormGroup bind={this.severityModel.meta.emailAddress} />
                            <Neo.FormGroup bind={this.severityModel.meta.userName} />

                        </Neo.GridLayout>

                        <hr />
                        <p>Floating form groups:</p>
                        <Neo.GridLayout>
                            <Neo.FormGroupFloating bind={this.severityModel.meta.firstName} />
                            <Neo.FormGroupFloating bind={this.severityModel.meta.lastName} />
                            <Neo.FormGroupFloating bind={this.severityModel.meta.emailAddress} />
                            <Neo.FormGroupFloating bind={this.severityModel.meta.userName} />

                        </Neo.GridLayout>

                        <Neo.Button isSubmit></Neo.Button>
                    </Neo.Form>
                </Neo.Card>

                <Neo.Card title="Model Rules" icon="check" data-code-key="ModelRules" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModelRules, "Model Rules")} />}>
                    <p>
                        Some validation rules refer to a group of properties, or the same property on multiple objects. It might not make sense, or be possible
                        to display these rules on an editor like the above rules.
                    </p>
                    <p>
                        In this example, the rule checks that the user has selected more than one item. It does not make sense to add this rule to
                        the <code>selectedItem</code> property on the child, so it is added to the parent model. There is no property on the parent which this rule
                        relates to either.
                    </p>
                    <p>
                        The <code>validator</code> property on any neo model has a method called <code>getRuleResult</code> which accepts
                        a <code>rule</code> argument and returns a <code>RuleResult</code> object. Any rule which is defined in <code>addBusinessRules</code> can
                        be passed to this method. You can use the result to display a message if that specific rule is broken.
                    </p>
                    <p>
                        In the example below, we have created a component to display the rule. We use the static property <code>selectedItemsRule</code> defined on
                        the model so we have a reference to the specific rule we want to display.
                    </p>

                    <Neo.Form model={this.objectRuleModel} validationDisplayMode={Validation.DisplayMode.Always}>
                        <div>
                            <p>Select one or more items below:</p>

                            {this.objectRuleModel.items.map(item => (
                                <div key={item.entityIdentifier}>
                                    <Neo.FormGroup bind={item.meta.isSelected} label={item.itemName} />
                                </div>
                            ))}
                        </div>
                        <div className="model-rules-demo">
                            <Neo.Button isSubmit variant="success" icon="fa-check" disabled={!this.objectRuleModel.isValid}>Save</Neo.Button>
                            <ValidationDisplay model={this.objectRuleModel} rule={ObjectRuleModel.selectedItemsRule} />
                        </div>
                    </Neo.Form>
                </Neo.Card>
            </div>
        )
    }
}

// DemoCode: ModelRules,Component,2,jsx
@observer
class ValidationDisplay extends React.Component<{ rule: Validation.IRule | null, model: Model.IModelBase }> {
    private iconFactory = AppService.get(Types.Neo.Components.IconFactory);

    public render() {

        const result = this.props.model.validator.getRuleResult(this.props.rule);
        const displayInfo = result && result.getDisplayInfo(true);

        return (
            displayInfo && result!.hasDetail && <div>
                <Neo.Alert variant={displayInfo.variant}>{this.iconFactory.getIconComponent(displayInfo.icon)} {displayInfo.displayText}</Neo.Alert>
            </div>
        )
    }
}
// End DemoCode

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_Form = [{ language: "jsx", code: 
`<p>
    Editor components can be grouped together using a <code>Neo.Form</code> component. One of the purposes of <code>Neo.Form</code> is to provide
    an onSubmit callback which is fired when the submit button is clicked, or when a user presses the enter key on one of the editors in the form.
</p>

<Neo.Form onSubmit={() => this.onForm1Submit()}>
    <Neo.GridLayout md={2}>
        <Neo.FormGroup bind={this.simpleModelNoRules.meta.firstName} />
        <Neo.FormGroup bind={this.simpleModelNoRules.meta.lastName} />
    </Neo.GridLayout>

    <Neo.Button isSubmit>Submit</Neo.Button>

</Neo.Form>

<p className="mt-4">
    In the example above, the submit button has no click event handler. It does however have an <code>isSubmit</code> prop, which means it will
    fire the forms onSubmit handler when clicked.
</p>
<p>
    Try focus one of the editors and press enter. Then click the submit button. Also note there is only one submit handler for both methods
    of submitting the form.
</p>`}];

const demo_source_code_FormWithModel = [{ language: "jsx", code: 
`<p>
    A form component can be bound to a model to control validation display behaviour. In the example below, the validation display mode has been
    set to <code>Validation.DisplayMode.AfterSubmit</code>. This means that the validation errors will only be shown once the form has been
    submitted.
</p>
<p>
    Notice however, that the isValid property of the model is still returning false. <br />
    The actual validation state of the model is seperate from the validation <em>display</em> state of the model.
</p>

<Neo.Form model={this.simpleModel}
    validationDisplayMode={Validation.DisplayMode.AfterSubmit}
    onSubmit={() => this.onForm1Save()}
    onInvalid={this.onForm1Invalid}>

    {(model, meta) => (
        <React.Fragment>
            <Neo.GridLayout md={2}>
                <Neo.FormGroup bind={meta.firstName} />
                <Neo.FormGroup bind={meta.lastName} />
                <Neo.FormGroup bind={meta.agree} />
            </Neo.GridLayout>

            <p>Model is <strong>{model.isValid ? "valid" : "not valid"}</strong>.</p>

            <Neo.Button variant="success" isSubmit>Save</Neo.Button>
        </React.Fragment>
    )}
</Neo.Form>

<p className="mt-4">
    In the above form, populate the two fields, and click I agree. You will see the model validation state change from invalid to valid.
</p>
<p>
    Clear one of the fields to make the model invalid, and click save. You will see the validation errors are now displayed.
    If you click save again, the <code>justValidated</code> parameter of the <code>onInvalid</code> callback will be set to false, and the user can
    be shown another message.
</p>
<p>
    Also note that the onSubmit callback is only fired if the model is valid.
</p>`}, { language: "javascript", code: `private onForm1Invalid(e: React.FormEvent, justValidated?: boolean) {
    if (!justValidated) {
        ModalUtils.showMessage("Save", "Model is not valid, submit not allowed.");
    }
}
private onForm1Save() {
    ModalUtils.showMessage("Save", "Model is valid, submit was called.");
}`}];

const demo_source_code_ErrorText = [{ language: "jsx", code: 
`<p>
    The description of the error will be displayed below the editor when using a <code>Neo.FormGroup</code>. If the editor is being displayed outside
    of a form group, e.g. in a grid, the error description will be displayed in a tooltip when hovering over the editor.
</p>
<Neo.Form model={this.simpleModel2} validationDisplayMode={Validation.DisplayMode.Always}>
    {(model, meta) => (
        <Neo.GridLayout md={2}>
            <div>
                <small><em>Error description is displayed below the editor</em></small>
                <Neo.FormGroup bind={meta.lastName} />
            </div>
            <div>
                <small><em>Error description is displayed on hover</em></small>
                <NeoGrid.Grid items={[this.simpleModel2]}>
                    {item => (
                        <NeoGrid.Row>
                            <NeoGrid.Column bind={item.meta.firstName} />
                        </NeoGrid.Row>
                    )}
                </NeoGrid.Grid>
            </div>

        </Neo.GridLayout>
    )}
</Neo.Form>`}];

const demo_source_code_DisplayModes = [{ language: "jsx", code: 
`<p>
    In the above form, the validation errors are only shown after the first submit attempt. The default behaviour is for the validation errors
    to display when the editor loses focus.
</p>
<p>
    Change the display mode to see how each mode works. {" "}
    <Neo.Button variant="dark" size="sm"
        menuItems={displayModes}
        onClick={this.changeDisplayMode}>{this.displayMode.text}</Neo.Button>
</p>

<Neo.Form model={this.simpleModel3}
    validationDisplayMode={this.displayMode.data}
    onSubmit={() => this.onForm1Save()}
    showSummaryModal>

    <Neo.GridLayout md={2}>
        <Neo.FormGroup bind={this.simpleModel3.meta.firstName} />
        <Neo.FormGroup bind={this.simpleModel3.meta.lastName} />
    </Neo.GridLayout>

    <Neo.Button variant="success" isSubmit>Save</Neo.Button>


</Neo.Form>`}];

const demo_source_code_ValidationMultipleProperties = [{ language: "jsx", code: 
`<p>
    Rules can be displayed on multiple properties. In the example below, the minimum amount rule below has been configured to apply to all three fields,
    so is displayed on all of them.
</p>
<p>
    Editors will also display multiple rules that are broken on the same property. In the example below, discount has two of its rules broken.
</p>

<Neo.Form model={this.multiplePropertyModel} validationDisplayMode={Validation.DisplayMode.Always}>

    <Neo.GridLayout md={2} xl={3}>
        <Neo.FormGroup bind={this.multiplePropertyModel.meta.quantity} />
        <Neo.FormGroup bind={this.multiplePropertyModel.meta.price} />
        <Neo.FormGroup bind={this.multiplePropertyModel.meta.discount} appendText="%" />
        <Neo.FormGroup display={this.multiplePropertyModel.meta.value} />
    </Neo.GridLayout>
</Neo.Form>`}, { language: "javascript", code: `@NeoModel
export class ModelWithMultipleDisplayRule extends ModelBase {

    @Attributes.Integer()
    public quantity: number = 0;

    @Attributes.Float()
    public price: number = 0;

    @Attributes.Float()
    public discount: number = 0.55;

    @Attributes.Float()
    public get value() {
        return this.quantity * (this.price || 0) * (1 - this.discount);
    }

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);

        rules.failWhen(c => c.discount > 0.5, c => "Discount must be less than 50%, you entered " + NumberUtils.format(c.discount, "#,##0.00%"));

        rules.failWhen(c => c.value < 100, "Value must be above R100").onProperties(c => [c.quantity, c.price, c.discount]);
    }
}`}];

const demo_source_code_ValidationSeverity = [{ language: "jsx", code: 
`<p>
    Validation rules can have different severities. Only validation rules of type <code>error</code> and <code>async busy</code> will cause
    the model to be invalid.
</p>
<p>
    The editor will only show the most severe errors. In the example below, <code>firstName</code> has an error and a warning. The warning will
    only be shown when the error is resolved. Type something in <code>firstName</code> to see this.
</p>

<Neo.Form model={this.severityModel} validationDisplayMode={Validation.DisplayMode.Always} showSummaryModal>

    <Neo.GridLayout>
        <Neo.FormGroup bind={this.severityModel.meta.firstName} />
        <Neo.FormGroup bind={this.severityModel.meta.lastName} />
        <Neo.FormGroup bind={this.severityModel.meta.emailAddress} />
        <Neo.FormGroup bind={this.severityModel.meta.userName} />

    </Neo.GridLayout>

    <hr />
    <p>Floating form groups:</p>
    <Neo.GridLayout>
        <Neo.FormGroupFloating bind={this.severityModel.meta.firstName} />
        <Neo.FormGroupFloating bind={this.severityModel.meta.lastName} />
        <Neo.FormGroupFloating bind={this.severityModel.meta.emailAddress} />
        <Neo.FormGroupFloating bind={this.severityModel.meta.userName} />

    </Neo.GridLayout>

    <Neo.Button isSubmit></Neo.Button>
</Neo.Form>`}, { language: "javascript", code: `@NeoModel
export class ModelWithWarnings extends BaseClass {

    public lastName: string = "";

    @Rules.EmailAddress()
    public emailAddress: string = "";

    public userName: string = "";

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);

        rules.warnWhen(c => !c.lastName, "You should enter a last name.");

        rules.infoWhen(c => !c.emailAddress, "Email address is recommended.");

        // Note: When calling rules.add, do not use an arrow function ((context) => {}), always define a separate method.
        rules.add(this.asyncRule).onProperties(c => {
            return c.userName;
        });
    }

    private asyncRule(context: Validation.IRuleContext) {
        context.beginAsync("Checking user name...", asyncContext => {
            // Rule must never finish for demo purposes.
            // asyncContext.endAsync();
        });
    }
}`}];

const demo_source_code_ModelRules = [{ language: "jsx", code: 
`<p>
    Some validation rules refer to a group of properties, or the same property on multiple objects. It might not make sense, or be possible
    to display these rules on an editor like the above rules.
</p>
<p>
    In this example, the rule checks that the user has selected more than one item. It does not make sense to add this rule to
    the <code>selectedItem</code> property on the child, so it is added to the parent model. There is no property on the parent which this rule
    relates to either.
</p>
<p>
    The <code>validator</code> property on any neo model has a method called <code>getRuleResult</code> which accepts
    a <code>rule</code> argument and returns a <code>RuleResult</code> object. Any rule which is defined in <code>addBusinessRules</code> can
    be passed to this method. You can use the result to display a message if that specific rule is broken.
</p>
<p>
    In the example below, we have created a component to display the rule. We use the static property <code>selectedItemsRule</code> defined on
    the model so we have a reference to the specific rule we want to display.
</p>

<Neo.Form model={this.objectRuleModel} validationDisplayMode={Validation.DisplayMode.Always}>
    <div>
        <p>Select one or more items below:</p>

        {this.objectRuleModel.items.map(item => (
            <div key={item.entityIdentifier}>
                <Neo.FormGroup bind={item.meta.isSelected} label={item.itemName} />
            </div>
        ))}
    </div>
    <div className="model-rules-demo">
        <Neo.Button isSubmit variant="success" icon="fa-check" disabled={!this.objectRuleModel.isValid}>Save</Neo.Button>
        <ValidationDisplay model={this.objectRuleModel} rule={ObjectRuleModel.selectedItemsRule} />
    </div>
</Neo.Form>`}, { language: "javascript", title: "Model", code: `@NeoModel
export class ObjectRuleModel extends ModelBase {

    constructor() {
        super();

        this.items.push(SelectedItem.mapFrom<SelectedItem>({ itemName: "Item 1"}));
        this.items.push(SelectedItem.mapFrom<SelectedItem>({ itemName: "Item 2"}));
        this.items.push(SelectedItem.mapFrom<SelectedItem>({ itemName: "Item 3"}));
    }

    public items = new List(SelectedItem);

    protected addBusinessRules(rules: Validation.Rules<this>) {
        super.addBusinessRules(rules);

        // Note: When calling rules.add, do not use an arrow function ((context) => {}), always define a separate method.
        ObjectRuleModel.selectedItemsRule = rules.add(this.selectedItemsRule);
    }

    private selectedItemsRule (context: Validation.IRuleContext) {
        const selectedCount = this.items.filter(i => i.isSelected).length;
        if (selectedCount === 0) {
            context.addError("You must select at least one item.");
        } else if (selectedCount === 1) {
            context.addWarning("You should select more than 1 item.");
        }
    }

    public static selectedItemsRule: Validation.IRule | null = null;
}`}, { language: "jsx", title: "Component", code: `@observer
class ValidationDisplay extends React.Component<{ rule: Validation.IRule | null, model: Model.IModelBase }> {
    private iconFactory = AppService.get(Types.Neo.Components.IconFactory);

    public render() {

        const result = this.props.model.validator.getRuleResult(this.props.rule);
        const displayInfo = result && result.getDisplayInfo(true);

        return (
            displayInfo && result!.hasDetail && <div>
                <Neo.Alert variant={displayInfo.variant}>{this.iconFactory.getIconComponent(displayInfo.icon)} {displayInfo.displayText}</Neo.Alert>
            </div>
        )
    }
}`}];
