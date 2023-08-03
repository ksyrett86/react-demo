/* tslint:disable:max-classes-per-file */
import { ModelBase, NeoModel, Attributes, Rules, Validation, NumberUtils, List } from '@singularsystems/neo-core';

@NeoModel
export class SimpleModelNoRules extends ModelBase {

    public firstName: string = "";

    public lastName: string = "";
}

export abstract class BaseClass extends ModelBase {

    @Rules.Required()
    public firstName: string = "";

    protected addBusinessRules(rules: Validation.Rules<this>) {
        rules.warnWhen(c => c.firstName.length <= 2, "First name should be longer than 2 characters.");
    }

}

@NeoModel
export class SimpleModelWithRules extends BaseClass {

    @Rules.Required()
    public lastName: string = "";

    @Attributes.Display("I agree")
    public agree: boolean = false;

    protected addBusinessRules(rules: Validation.Rules<this>) {
        rules.failWhen(c => !c.agree, "You must agree.");
    }
}
// DemoCode: ValidationSeverity
@NeoModel
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
}
// End DemoCode
// DemoCode: ValidationMultipleProperties
@NeoModel
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
}
// End DemoCode
@NeoModel
export class SelectedItem extends ModelBase {

    public itemName: string = "";

    public isSelected: boolean = false;
}

// DemoCode: ModelRules,Model,1
@NeoModel
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
}
// End DemoCode