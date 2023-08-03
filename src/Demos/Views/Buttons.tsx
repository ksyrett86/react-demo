import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { MenuUtils, ModalUtils, TaskRunner } from '@singularsystems/neo-core';
import { AppService, Types } from '../../Services/AppService';

const buttonVariants = ["primary", "secondary", "info", "success", "warning", "danger", "light", "dark", "link"];
const buttonIcons = ["power-off", "cogs", "info", "check", "warning", "radiation", "far-lightbulb", "moon", "link"];

@observer
export default class ButtonsDemo extends Views.ViewBase {

    @observable
    dropDownButtonVariant = "dark"

    private buttonTask = AppService.get(Types.Neo.TaskRunner);

    constructor(props: unknown) {
        super("Buttons", Views.EmptyViewModel, props);

        this.changeVariant = this.changeVariant.bind(this);
        this.showContextMenuOnButton = this.showContextMenuOnButton.bind(this);
        this.showContextMenuAtMouseLocation = this.showContextMenuAtMouseLocation.bind(this);
    }

    // DemoCode: ButtonDDData
    variantItems = buttonVariants.map((variant, index) => {
        return {
            text: variant,
            icon: buttonIcons[index],
            data: variant
        }
    });

    changeVariant(e: React.MouseEvent, variant?: any) {
        if (variant) {
            this.dropDownButtonVariant = variant;
        } else {
            ModalUtils.showMessage("Button", "You clicked the main button, click a menu item to change the button style.");
        }
    }
    // End DemoCode

    // DemoCode: ContextMenu
    showContextMenuOnButton(e: React.MouseEvent) {

        // Show relative to the button
        MenuUtils.showContextMenu([
            { text: "Log out", icon: "fa-user", onClick: () => { } },
            {
                text: "Or", items: [
                    { text: "Change password", icon: "fa-lock", onClick: () => { } }
                ]
            }
        ], e.target as HTMLElement);
    }

    showContextMenuAtMouseLocation(e: React.MouseEvent) {
        e.preventDefault();

        // Show at mouse position
        MenuUtils.showContextMenu([
            { text: "Copy all", icon: "fa-copy", onClick: () => { } },
        ], e.nativeEvent);
    }
    // End DemoCode

    render() {

        return (
            <div>
                <Neo.Card title="buttons" icon="circle">
                    <div>
                        <h5>Normal</h5>
                        <p>Specify the variant using the <code>variant</code> prop.</p>

                        {buttonVariants.map((variant: any) => (
                            <React.Fragment key={variant}>
                                <Neo.Button data-tip={variant} variant={variant}>{variant}</Neo.Button> {" "}
                            </React.Fragment>

                        ))}
                    </div>
                    <div className="mt-5">
                        <h5>Outline</h5>
                        <p>Specify using the <code>isOutline</code> prop.</p>

                        {buttonVariants.map((variant: any) => (
                            <React.Fragment key={variant}>
                                <Neo.Button variant={variant} isOutline>{variant}</Neo.Button> {" "}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="mt-5">
                        <h5>Custom variants</h5>
                        <p>Custom variants can be specified using the <code>customVariant</code> prop. The corresponding <code>Outline</code> and <code>Pulse</code> css classes will be added to the button element automatically.</p>
                        <p>For example, if I specify a custom <code>tertiary</code> variant, the library will automatically add the css classes for outline and pulse as 
                        <code>btn-outline-tertiary</code> and <code>tertiary-color-pulse</code> and then it will be up to the developer to fill in/specify the corrseponding css for these classes in the relevant project/s.</p>
                        <div data-code-key="ButtonCustomVariants" className="demo-code-section"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ButtonCustomVariants, "Code")} />
                            <Neo.Button customVariant="tertiary">Normal</Neo.Button>
                            {" "}
                            <Neo.Button customVariant="tertiary" isOutline>Outline</Neo.Button>
                            {" "}
                            <Neo.Button customVariant="tertiary" pulse>Pulse</Neo.Button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h5>Size</h5>
                        <p>Specify using the <code>size</code> prop.</p>

                        {buttonVariants.map((variant: any) => (
                            <React.Fragment key={variant}>
                                <Neo.Button variant={variant} size="lg">{variant}</Neo.Button> {" "}
                            </React.Fragment>
                        ))}
                        <div className="mt-2">
                            {buttonVariants.map((variant: any) => (
                                <React.Fragment key={variant}>
                                    <Neo.Button variant={variant} size="sm">{variant}</Neo.Button> {" "}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="demo-code-section mt-5" data-code-key="ButtonIcons"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ButtonIcons, "Code")} />
                        <h5>Icons</h5>
                        <p>
                            Neo button supports font-awesome 5 icons when using strings to define an icon. To use a regular (outlined) icon, prefix the icon name with <code>far-</code>
                        </p>
                        <Neo.Button variant="secondary" icon="question-circle">question-circle</Neo.Button> {" "}
                        <Neo.Button variant="secondary" icon="far-question-circle">far-question-circle</Neo.Button> {" "}
                        <Neo.Button variant="secondary" icon="arrow-right" iconAlignment="right">right aligned</Neo.Button>


                    </div>

                    <div className="demo-code-section mt-5" data-code-key="ButtonTask"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ButtonTask, "Code")} />
                        <h5>Loading</h5>
                        <p>
                            By setting the <code>task</code> or <code>isBusy</code> prop, a neo button can be bound to a task runner to disable the button during a task, and show a loading icon.
                        </p>
                        <p>
                            You would normally do this if you want to block a smaller page section during a task, and would not use the main pages task runner. To create
                            an independent task runner, call <code>AppService.get(Types.Neo.TaskRunner)</code>.
                        </p>
                        <Neo.Button task={this.buttonTask} icon="save" onClick={() => this.buttonTask.waitFor(TaskRunner.delay(3000))}>Save</Neo.Button>
                    </div>
                </Neo.Card>

                <Neo.Card title="Drop down buttons" icon="fa-caret-down">
                    <div className="demo-code-section mt-4" data-code-key="ButtonDD"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ButtonDD, "Code")} />
                        <h5>Normal</h5>

                        <p>
                            Normal drop down button. The click even of the button will be overridden, and will cause the drop down to appear.
                        </p>
                        <Neo.Button
                            onClick={() => alert("This won't appear")}
                            menuItems={
                                [{ text: "Click me!", icon: "mouse", onClick: () => ModalUtils.showMessage("Button", "You clicked an item.") },
                                { isDivider: true },
                                { text: "Item 2" },
                                { text: "Item 3" }]}>
                            Normal
                        </Neo.Button>

                        <Neo.Button
                            className="ml-1"
                            menuAlignment="right"
                            menuItems={[
                                { text: "Click me!", icon: "mouse", onClick: () => ModalUtils.showMessage("Button", "You clicked an item.") }
                            ]}>
                            Right Aligned
                        </Neo.Button>
                    </div>
                    <div className="demo-code-section mt-5" data-code-key="ButtonDDSplit"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ButtonDDSplit, "Code")} />
                        <h5>Split</h5>
                        <p>
                            Split drop down button. The button is split in 2, so that the click event of the main button is still available
                        </p>
                        <Neo.Button
                            variant="info"
                            onClick={() => ModalUtils.showMessage("Button", "You clicked the main button.")}
                            splitMenu
                            menuItems={
                                [{ header: "Header" },
                                { text: "Item 1" },
                                { text: "Item 2" },
                                { text: "Item 3" }]}>
                            Split
                        </Neo.Button>
                    </div>

                    <div className="demo-code-section mt-5" data-code-key="ButtonDDData"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ButtonDDData, "Code")} />
                        <h5>Item data</h5>
                        <p>
                            Items can share a single click event, by using the data property on each item. The data value is passed to the button click event if no click event is specified on the item.
                        </p>
                        <Neo.Button
                            icon="ice-cream"
                            menuItems={this.variantItems}
                            splitMenu
                            variant={this.dropDownButtonVariant as any}
                            onClick={this.changeVariant}>
                            Change style
                        </Neo.Button>
                    </div>
                </Neo.Card>

                <Neo.Card title="Context menu" icon="fa-bars" data-code-key="ContextMenu" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ContextMenu, "Context menu")} />}>
                    <p>
                        Neo supports context menus through the <code>MenuUtils</code> helper class. Your main layout page must render the global context menu component: <code>{"<Neo.ContextMenuContainer />"}</code>
                    </p>
                    <p>
                        Context menus can be attached to an element:
                    </p>
                    <Neo.Button onClick={this.showContextMenuOnButton}>Show menu</Neo.Button>

                    <p className="mt-3">
                        Or they can be shown at the mouse position:
                    </p>
                    <div style={{ border: "2px dashed #ccc", padding: "1rem" }} onContextMenu={this.showContextMenuAtMouseLocation}>Right click here</div>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_ButtonCustomVariants = [{ language: "jsx", code: 
`<Neo.Button customVariant="tertiary">Normal</Neo.Button>
{" "}
<Neo.Button customVariant="tertiary" isOutline>Outline</Neo.Button>
{" "}
<Neo.Button customVariant="tertiary" pulse>Pulse</Neo.Button>`}, { language: "sass", title: "Sass classes", code: `$tertiary-color: #258EA1;

.btn.btn-tertiary { 
  background-color: $tertiary-color;
  color: #fff;

  &:hover {
      background-color: darken($tertiary-color, 15%); 
      color: #fff;
  }
}

.btn.btn-outline-tertiary { 
  background-color: #fff;
  border: 1px solid $tertiary-color;
  color: $tertiary-color;

 &:hover {
     border: 1px solid lighten($tertiary-color, 10%);
     background-color: lighten($tertiary-color, 10%); 
     color: #fff;
 }
}

@keyframes tertiary-color-pulse {
  from {
      box-shadow: 0 0 3px 1px #fff;
  }

  to {
      box-shadow: 0 0 12px 2px transparentize($tertiary-color, 0.25);
  }
}

.btn.tertiary-color-pulse {
  animation-name: tertiary-color-pulse;
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}`}];

const demo_source_code_ButtonIcons = [{ language: "jsx", code: 
`<h5>Icons</h5>
<p>
    Neo button supports font-awesome 5 icons when using strings to define an icon. To use a regular (outlined) icon, prefix the icon name with <code>far-</code>
</p>
<Neo.Button variant="secondary" icon="question-circle">question-circle</Neo.Button> {" "}
<Neo.Button variant="secondary" icon="far-question-circle">far-question-circle</Neo.Button> {" "}
<Neo.Button variant="secondary" icon="arrow-right" iconAlignment="right">right aligned</Neo.Button>`}];

const demo_source_code_ButtonTask = [{ language: "jsx", code: 
`<h5>Loading</h5>
<p>
    By setting the <code>task</code> or <code>isBusy</code> prop, a neo button can be bound to a task runner to disable the button during a task, and show a loading icon.
</p>
<p>
    You would normally do this if you want to block a smaller page section during a task, and would not use the main pages task runner. To create
    an independent task runner, call <code>AppService.get(Types.Neo.TaskRunner)</code>.
</p>
<Neo.Button task={this.buttonTask} icon="save" onClick={() => this.buttonTask.waitFor(TaskRunner.delay(3000))}>Save</Neo.Button>`}];

const demo_source_code_ButtonDD = [{ language: "jsx", code: 
`<h5>Normal</h5>

<p>
    Normal drop down button. The click even of the button will be overridden, and will cause the drop down to appear.
</p>
<Neo.Button
    onClick={() => alert("This won't appear")}
    menuItems={
        [{ text: "Click me!", icon: "mouse", onClick: () => ModalUtils.showMessage("Button", "You clicked an item.") },
        { isDivider: true },
        { text: "Item 2" },
        { text: "Item 3" }]}>
    Normal
</Neo.Button>

<Neo.Button
    className="ml-1"
    menuAlignment="right"
    menuItems={[
        { text: "Click me!", icon: "mouse", onClick: () => ModalUtils.showMessage("Button", "You clicked an item.") }
    ]}>
    Right Aligned
</Neo.Button>`}];

const demo_source_code_ButtonDDSplit = [{ language: "jsx", code: 
`<h5>Split</h5>
<p>
    Split drop down button. The button is split in 2, so that the click event of the main button is still available
</p>
<Neo.Button
    variant="info"
    onClick={() => ModalUtils.showMessage("Button", "You clicked the main button.")}
    splitMenu
    menuItems={
        [{ header: "Header" },
        { text: "Item 1" },
        { text: "Item 2" },
        { text: "Item 3" }]}>
    Split
</Neo.Button>`}];

const demo_source_code_ButtonDDData = [{ language: "jsx", code: 
`<h5>Item data</h5>
<p>
    Items can share a single click event, by using the data property on each item. The data value is passed to the button click event if no click event is specified on the item.
</p>
<Neo.Button
    icon="ice-cream"
    menuItems={this.variantItems}
    splitMenu
    variant={this.dropDownButtonVariant as any}
    onClick={this.changeVariant}>
    Change style
</Neo.Button>`}, { language: "javascript", code: `variantItems = buttonVariants.map((variant, index) => {
    return {
        text: variant,
        icon: buttonIcons[index],
        data: variant
    }
});

changeVariant(e: React.MouseEvent, variant?: any) {
    if (variant) {
        this.dropDownButtonVariant = variant;
    } else {
        ModalUtils.showMessage("Button", "You clicked the main button, click a menu item to change the button style.");
    }
}`}];

const demo_source_code_ContextMenu = [{ language: "jsx", code: 
`<p>
    Neo supports context menus through the <code>MenuUtils</code> helper class. Your main layout page must render the global context menu component: <code>{"<Neo.ContextMenuContainer />"}</code>
</p>
<p>
    Context menus can be attached to an element:
</p>
<Neo.Button onClick={this.showContextMenuOnButton}>Show menu</Neo.Button>

<p className="mt-3">
    Or they can be shown at the mouse position:
</p>
<div style={{ border: "2px dashed #ccc", padding: "1rem" }} onContextMenu={this.showContextMenuAtMouseLocation}>Right click here</div>`}, { language: "javascript", code: `showContextMenuOnButton(e: React.MouseEvent) {

    // Show relative to the button
    MenuUtils.showContextMenu([
        { text: "Log out", icon: "fa-user", onClick: () => { } },
        {
            text: "Or", items: [
                { text: "Change password", icon: "fa-lock", onClick: () => { } }
            ]
        }
    ], e.target as HTMLElement);
}

showContextMenuAtMouseLocation(e: React.MouseEvent) {
    e.preventDefault();

    // Show at mouse position
    MenuUtils.showContextMenu([
        { text: "Copy all", icon: "fa-copy", onClick: () => { } },
    ], e.nativeEvent);
}`}];
