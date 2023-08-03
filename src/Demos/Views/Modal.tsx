import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { observer } from 'mobx-react';
import { ModalUtils, Misc, Model, NeoModel, ModelBase, Rules } from '@singularsystems/neo-core';
import { Neo, Views } from '@singularsystems/neo-react';

@NeoModel
class ModalVM extends Views.ViewModelBase {

    public showBasicModal = false;

    public showBasicModal2 = false;

    public showButtonModal = false;

    public showAcceptOnlyModal = false;

    public showCustomButtonModal = false;

    public showSmallModal = false;

    public showLargeModal = false;

    public showXlModal = false;

    public showOuterModal = false;

    public showInnerModal = false;

    public editItem: EditModel | null = null;
}

@NeoModel
class EditModel extends ModelBase {

    @Rules.Required()
    public firstName = "";

    @Rules.Required()
    public lastName = "";
}

@observer
export default class ModalDemo extends Views.ViewBase<ModalVM> {

    constructor(props: unknown) {
        super("Modal", ModalVM, props);

        this.showCustomModal = this.showCustomModal.bind(this);
        this.showAndWaitForModal = this.showAndWaitForModal.bind(this);
        this.showInput = this.showInput.bind(this);
    }

    // DemoCode: ModalUtils
    private showCustomModal() {

        ModalUtils.showModal(
            "Custom", 
            "This modal was created without any markup.",
            { buttons: [
                { text: "Green", variant: "success" }, 
                { text: "Yellow", variant: "warning" }, 
                { text: "Red", variant: "danger" }] });
    }

    private async showAndWaitForModal() {

        const modalResult = await ModalUtils.showYesNoCancel("Modal test", "Click a button, and view the console to see which button was clicked.");

        console.log("Modal result was: " + modalResult);

        if (modalResult === Misc.ModalResult.Yes) {
            // Use the Misc.ModalResult enum when checking the return value.
            // Note: If you only care about when Yes / Accept is clicked, you can pass a callback to the above method instead of awaiting it.
        }
    }
    // End DemoCode

    // DemoCode: ModalInput
    private async showInput() {

        // Create a temporary observable to bind to.
        const nameProperty = Model.ObservableProperty.required("Name", "");

        const result = await ModalUtils.showOkCancel(
            "What is your name?",
            <Neo.FormGroup label="Type in your name below:" bind={nameProperty} />, 
            nameProperty); // Pass the property / modal to make sure it is validated before the modal is accepted.

        if (result === Misc.ModalResult.Yes) {
            ModalUtils.showMessage("Name", "Your name is " + nameProperty.value);
        }
    }
    // End DemoCode

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Modals">
                    <p className="mb-0">
                        The <code>Neo.Modal</code> component can be used to show a dialog in front of the rest of the page content.
                    </p>
                </Neo.Card>

                <Neo.Card title="Basic" data-code-key="ModalBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalBasic, "Basic")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The simplest way to define when a modal component should be shown is by binding it to a boolean property.
                            </p>
                            <p>
                                The modal will be visible whenever the value of the property is true.
                                When the modal is dismissed (when its close or cancel buttons are clicked, or by clicking in the backdrop area outside of the modal), the property will be set to false automatically.
                            </p>
                            <p>
                                The content of the <code>title</code> prop is displayed as the header, and the content between the <code>Neo.Modal</code> tags is displayed
                                in the modal body.
                            </p>
                        </div>
                        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showBasicModal = true}>Show modal</Neo.Button>
                    </Neo.GridLayout>

                    <Neo.Modal title="Basic Modal" bind={this.viewModel.meta.showBasicModal}>
                        This is the most basic modal.
                    </Neo.Modal>
                </Neo.Card>

                <Neo.Card title="OnClose" data-code-key="ModalManual" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalManual, "OnClose")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                If you need manual control over when to show the modal, and what happens when it is dismissed, you can use the <code>show</code> and <code>onClose</code> props.
                            </p>
                            <p>
                                Your <code>onClose</code> handler must manually set the show value to false to close the modal.
                            </p>
                        </div>
                        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showBasicModal2 = true}>Show modal</Neo.Button>
                    </Neo.GridLayout>

                    <Neo.Modal title="Basic Modal" show={this.viewModel.showBasicModal2} onClose={() => { this.viewModel.showBasicModal2 = false; console.log("Modal was closed"); }}>
                        View the console before closing this modal.
                    </Neo.Modal>
                </Neo.Card>

                <Neo.Card title="Binding to a model" data-code-key="ModalBindModel" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalBindModel, "Binding to a model")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                Sometimes you need a modal to show if an object property is set. E.g. when clicking an edit button, you fetch an editable model, and set a property like <code>ViewModel.EditItem</code>.
                            </p>
                            <p>
                                Usually, you would want the modal to show as soon as the value of <code>ViewModel.EditItem</code> is set.
                            </p>
                            <p>
                                The modal component supports this via the <code>bindModel</code> prop with the following functionality.
                            </p>
                            <ul>
                                <li>When dismissing the modal, the value of the bound property will automatically be set to null.</li>
                                <li>The model property of the modals form will be set, preventing the modal being accepted while the model is invalid.</li>
                                <li>Your accept button callback must manually set the value of the bound property to null to close the modal.</li>
                            </ul>
                        </div>
                        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.editItem = new EditModel()}>Edit item</Neo.Button>
                    </Neo.GridLayout>

                    <Neo.Modal title="Edit" bindModel={this.viewModel.meta.editItem} acceptButton={{ text: "Save", onClick: () => { this.viewModel.editItem = null } }}>
                        {(item: EditModel) => (
                            <div>
                                <Neo.FormGroup bind={item.meta.firstName} />
                                <Neo.FormGroup bind={item.meta.lastName} />
                            </div>
                        )}
                    </Neo.Modal>
                </Neo.Card>

                <Neo.Card title="Default buttons" data-code-key="ModalDefaultButtons" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalDefaultButtons, "Default buttons")} />}>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <p>
                                You can show an accept button in addition to the close button by specifying the <code>acceptButton</code> prop. The close and accept
                                button take in the same props as the <code>Neo.Button</code> component, so you can customise the icon, text, colour and size of the buttons.
                            </p>
                        </div>
                        <div>
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showButtonModal = true}>Show button modal</Neo.Button>
                        </div>
                        <div className="mt-3">
                            <p>The close button can be hidden by specifying <code>false</code> as the argument to <code>closeButton</code>. The cancel button can
                            also be hidden by setting <code>showCancelButton</code> to false.</p>
                        </div>
                        <div>
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showAcceptOnlyModal = true}>Show accept only modal</Neo.Button>
                        </div>
                    </Neo.GridLayout>

                    <Neo.Modal title="Buttons Modal" bind={this.viewModel.meta.showButtonModal}
                        closeButton={{ text: "Close me!", variant: "danger", isOutline: true }}
                        acceptButton={{ text: "Accept", variant: "success" }}>
                        Look at these buttons:
                    </Neo.Modal>

                    <Neo.Modal title="Accept only modal" bind={this.viewModel.meta.showAcceptOnlyModal}
                        closeButton={false}
                        showCancelButton={false}
                        acceptButton={{ text: "Accept", variant: "success" }}>
                        This modal can only be accepted. Try click the backdrop area outside of the modal. This wont close the modal if <code>showCancelButton</code> is
                        set to false.
                    </Neo.Modal>
                </Neo.Card>

                <Neo.Card title="Custom buttons" data-code-key="ModalCustomButtons" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalCustomButtons, "Custom buttons")} />}>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <p>
                                You can specify custom buttons using the <code>buttons</code> prop. This property accepts an array of button objects, which contain the same
                                button options as a normal <code>Neo.Button</code>. The <code>close</code>, and <code>accept</code> props will be ignored if you use
                                the <code>buttons</code> prop.
                            </p>
                        </div>
                        <div>
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showCustomButtonModal = true}>Show custom button modal</Neo.Button>
                        </div>
                    </Neo.GridLayout>

                    <Neo.Modal title="Custom buttons" bind={this.viewModel.meta.showCustomButtonModal}
                        buttons={
                            [{ text: "Green button", variant: "success" }, { text: "Blue button", variant: "info" }]
                        }>
                        These buttons were specified with the <code>buttons</code> prop.
                    </Neo.Modal>
                </Neo.Card>

                <Neo.Card title="Sizes" data-code-key="ModalSizes" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalSizes, "Sizes")} />}>
                    <Neo.GridLayout>
                        <div>

                            <p>The size of the modal can be changed using the <code>size</code> prop. The default size is medium.</p>
                        </div>
                        <div>
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showSmallModal = true}>Show small modal</Neo.Button> {" "}
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showLargeModal = true}>Show large modal</Neo.Button> {" "}
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showXlModal = true}>Show extra large modal</Neo.Button> {" "}
                        </div>
                    </Neo.GridLayout>

                    <Neo.Modal title="Small Modal" size="sm" bind={this.viewModel.meta.showSmallModal}>This is a small modal.</Neo.Modal>
                    <Neo.Modal title="Large Modal" size="lg" bind={this.viewModel.meta.showLargeModal}>This is a large modal.</Neo.Modal>
                    <Neo.Modal title="Extra Large Modal" size="xl" bind={this.viewModel.meta.showXlModal}>This is an extra large modal.</Neo.Modal>
                </Neo.Card>

                <Neo.Card title="Nested modals" data-code-key="ModalNested" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalNested, "Nested modals")} />}>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <p>
                                Modals can display additional modals. The most recent modal will be displayed at the top of the screen, with the rest displaying underneath.
                            </p>
                        </div>
                        <div>
                            <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showOuterModal = true}>Show outer modal</Neo.Button>
                        </div>
                    </Neo.GridLayout>

                    <Neo.Modal title="Test Modal"
                        bind={this.viewModel.meta.showOuterModal}
                        acceptButton={{ text: "Open", onClick: () => this.viewModel.showInnerModal = true }}>
                        Click 'Open' to open another modal.
                    </Neo.Modal>

                    <Neo.Modal title="Inner Modal"
                        size="lg"
                        bind={this.viewModel.meta.showInnerModal}>

                        This is the inner modal.
                        <p className="mt-3">
                            The user can only interact with the top modal. Interaction with previous modals is disabled.
                        </p>
                        <p className="mt-3">
                            The backdrop area outside this modal will only dismiss if there is one modal displaying.
                        </p>
                    </Neo.Modal>
                </Neo.Card>

                <Neo.Card title="Modal utils" data-code-key="ModalUtils" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalUtils, "Modal utils")} />}>
                    <p>
                        Sometimes you may want to show a modal using only code, without having to specify a <code>Neo.Modal</code> component and all the supporting
                        properties to show it.
                    </p>
                    <p>
                        The <code>ModalUtils</code> class in the neo-core package supports the following modals.
                    </p>
                    <ul>
                        <li>
                            <code>ModalUtils.showMessage</code> - Similar to <code>alert</code>. Shows the user a message an allows them to dismiss the message.
                            {" "}<Neo.Button size="sm" onClick={() => ModalUtils.showMessage("Hello", "This is a message")}>Show</Neo.Button>
                        </li>
                        <li>
                            <code>ModalUtils.showYesNo</code> - Shows a message and yes and no buttons. The top right cancel button is hidden.
                            {" "}<Neo.Button size="sm" onClick={() => ModalUtils.showYesNo("Question", "Are you sure?")}>Show</Neo.Button>
                        </li>
                        <li>
                            <code>ModalUtils.showYesNoCancel</code> - Shows a message with yes, no and cancel buttons. The top right cancel button is also visible.
                            {" "}<Neo.Button size="sm" onClick={() => ModalUtils.showYesNoCancel("Question", "Are you sure?")}>Show</Neo.Button>
                        </li>
                        <li>
                            <code>ModalUtils.showModal</code> - Allows you to show a modal with the same options as a normal modal defined using component markup.
                            {" "}<Neo.Button size="sm" onClick={this.showCustomModal}>Show</Neo.Button>
                        </li>
                    </ul>
                    <p>
                        The first three methods above provide a <code>{"Promise<ModalResult>"}</code> return value. This allows you to asyncronously show the modal,
                        and <code>await</code> the result.<br />
                        <code>ModalUtils.showModal</code> does not return a promise, because you define the buttons. You must therefore provide the callbacks in the button
                        options to handle button clicks.<br />

                        {" "}<Neo.Button variant="secondary" size="sm" onClick={this.showAndWaitForModal}>Example</Neo.Button>
                    </p>
                </Neo.Card>

                <Neo.Card title="Input box" data-code-key="ModalInput" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ModalInput, "Input box")} />}>
                    <p>
                        Sometimes you may need the user to enter a piece of information when performing an action. E.g. asking for a reason when cancelling or rejecting something.
                        This can be done using the <code>ModalUtils.showOkCancel</code> method. You can pass in a template with one or more input controls.
                        The modal will perform validation, and prevent the ok button being pressed if you provide the <code>model</code> argument.<br />
                        Click the example button, and then try submit the dialog without entering a value.
                    </p>
                    <Neo.Button variant="secondary" size="sm" onClick={this.showInput}>Example</Neo.Button>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_ModalBasic = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The simplest way to define when a modal component should be shown is by binding it to a boolean property.
        </p>
        <p>
            The modal will be visible whenever the value of the property is true.
            When the modal is dismissed (when its close or cancel buttons are clicked, or by clicking in the backdrop area outside of the modal), the property will be set to false automatically.
        </p>
        <p>
            The content of the <code>title</code> prop is displayed as the header, and the content between the <code>Neo.Modal</code> tags is displayed
            in the modal body.
        </p>
    </div>
    <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showBasicModal = true}>Show modal</Neo.Button>
</Neo.GridLayout>

<Neo.Modal title="Basic Modal" bind={this.viewModel.meta.showBasicModal}>
    This is the most basic modal.
</Neo.Modal>`}];

const demo_source_code_ModalManual = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            If you need manual control over when to show the modal, and what happens when it is dismissed, you can use the <code>show</code> and <code>onClose</code> props.
        </p>
        <p>
            Your <code>onClose</code> handler must manually set the show value to false to close the modal.
        </p>
    </div>
    <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showBasicModal2 = true}>Show modal</Neo.Button>
</Neo.GridLayout>

<Neo.Modal title="Basic Modal" show={this.viewModel.showBasicModal2} onClose={() => { this.viewModel.showBasicModal2 = false; console.log("Modal was closed"); }}>
    View the console before closing this modal.
</Neo.Modal>`}];

const demo_source_code_ModalBindModel = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            Sometimes you need a modal to show if an object property is set. E.g. when clicking an edit button, you fetch an editable model, and set a property like <code>ViewModel.EditItem</code>.
        </p>
        <p>
            Usually, you would want the modal to show as soon as the value of <code>ViewModel.EditItem</code> is set.
        </p>
        <p>
            The modal component supports this via the <code>bindModel</code> prop with the following functionality.
        </p>
        <ul>
            <li>When dismissing the modal, the value of the bound property will automatically be set to null.</li>
            <li>The model property of the modals form will be set, preventing the modal being accepted while the model is invalid.</li>
            <li>Your accept button callback must manually set the value of the bound property to null to close the modal.</li>
        </ul>
    </div>
    <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.editItem = new EditModel()}>Edit item</Neo.Button>
</Neo.GridLayout>

<Neo.Modal title="Edit" bindModel={this.viewModel.meta.editItem} acceptButton={{ text: "Save", onClick: () => { this.viewModel.editItem = null } }}>
    {(item: EditModel) => (
        <div>
            <Neo.FormGroup bind={item.meta.firstName} />
            <Neo.FormGroup bind={item.meta.lastName} />
        </div>
    )}
</Neo.Modal>`}];

const demo_source_code_ModalDefaultButtons = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <p>
            You can show an accept button in addition to the close button by specifying the <code>acceptButton</code> prop. The close and accept
            button take in the same props as the <code>Neo.Button</code> component, so you can customise the icon, text, colour and size of the buttons.
        </p>
    </div>
    <div>
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showButtonModal = true}>Show button modal</Neo.Button>
    </div>
    <div className="mt-3">
        <p>The close button can be hidden by specifying <code>false</code> as the argument to <code>closeButton</code>. The cancel button can
        also be hidden by setting <code>showCancelButton</code> to false.</p>
    </div>
    <div>
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showAcceptOnlyModal = true}>Show accept only modal</Neo.Button>
    </div>
</Neo.GridLayout>

<Neo.Modal title="Buttons Modal" bind={this.viewModel.meta.showButtonModal}
    closeButton={{ text: "Close me!", variant: "danger", isOutline: true }}
    acceptButton={{ text: "Accept", variant: "success" }}>
    Look at these buttons:
</Neo.Modal>

<Neo.Modal title="Accept only modal" bind={this.viewModel.meta.showAcceptOnlyModal}
    closeButton={false}
    showCancelButton={false}
    acceptButton={{ text: "Accept", variant: "success" }}>
    This modal can only be accepted. Try click the backdrop area outside of the modal. This wont close the modal if <code>showCancelButton</code> is
    set to false.
</Neo.Modal>`}];

const demo_source_code_ModalCustomButtons = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <p>
            You can specify custom buttons using the <code>buttons</code> prop. This property accepts an array of button objects, which contain the same
            button options as a normal <code>Neo.Button</code>. The <code>close</code>, and <code>accept</code> props will be ignored if you use
            the <code>buttons</code> prop.
        </p>
    </div>
    <div>
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showCustomButtonModal = true}>Show custom button modal</Neo.Button>
    </div>
</Neo.GridLayout>

<Neo.Modal title="Custom buttons" bind={this.viewModel.meta.showCustomButtonModal}
    buttons={
        [{ text: "Green button", variant: "success" }, { text: "Blue button", variant: "info" }]
    }>
    These buttons were specified with the <code>buttons</code> prop.
</Neo.Modal>`}];

const demo_source_code_ModalSizes = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>

        <p>The size of the modal can be changed using the <code>size</code> prop. The default size is medium.</p>
    </div>
    <div>
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showSmallModal = true}>Show small modal</Neo.Button> {" "}
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showLargeModal = true}>Show large modal</Neo.Button> {" "}
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showXlModal = true}>Show extra large modal</Neo.Button> {" "}
    </div>
</Neo.GridLayout>

<Neo.Modal title="Small Modal" size="sm" bind={this.viewModel.meta.showSmallModal}>This is a small modal.</Neo.Modal>
<Neo.Modal title="Large Modal" size="lg" bind={this.viewModel.meta.showLargeModal}>This is a large modal.</Neo.Modal>
<Neo.Modal title="Extra Large Modal" size="xl" bind={this.viewModel.meta.showXlModal}>This is an extra large modal.</Neo.Modal>`}];

const demo_source_code_ModalNested = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <p>
            Modals can display additional modals. The most recent modal will be displayed at the top of the screen, with the rest displaying underneath.
        </p>
    </div>
    <div>
        <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.viewModel.showOuterModal = true}>Show outer modal</Neo.Button>
    </div>
</Neo.GridLayout>

<Neo.Modal title="Test Modal"
    bind={this.viewModel.meta.showOuterModal}
    acceptButton={{ text: "Open", onClick: () => this.viewModel.showInnerModal = true }}>
    Click 'Open' to open another modal.
</Neo.Modal>

<Neo.Modal title="Inner Modal"
    size="lg"
    bind={this.viewModel.meta.showInnerModal}>

    This is the inner modal.
    <p className="mt-3">
        The user can only interact with the top modal. Interaction with previous modals is disabled.
    </p>
    <p className="mt-3">
        The backdrop area outside this modal will only dismiss if there is one modal displaying.
    </p>
</Neo.Modal>`}];

const demo_source_code_ModalUtils = [{ language: "jsx", code: 
`<p>
    Sometimes you may want to show a modal using only code, without having to specify a <code>Neo.Modal</code> component and all the supporting
    properties to show it.
</p>
<p>
    The <code>ModalUtils</code> class in the neo-core package supports the following modals.
</p>
<ul>
    <li>
        <code>ModalUtils.showMessage</code> - Similar to <code>alert</code>. Shows the user a message an allows them to dismiss the message.
        {" "}<Neo.Button size="sm" onClick={() => ModalUtils.showMessage("Hello", "This is a message")}>Show</Neo.Button>
    </li>
    <li>
        <code>ModalUtils.showYesNo</code> - Shows a message and yes and no buttons. The top right cancel button is hidden.
        {" "}<Neo.Button size="sm" onClick={() => ModalUtils.showYesNo("Question", "Are you sure?")}>Show</Neo.Button>
    </li>
    <li>
        <code>ModalUtils.showYesNoCancel</code> - Shows a message with yes, no and cancel buttons. The top right cancel button is also visible.
        {" "}<Neo.Button size="sm" onClick={() => ModalUtils.showYesNoCancel("Question", "Are you sure?")}>Show</Neo.Button>
    </li>
    <li>
        <code>ModalUtils.showModal</code> - Allows you to show a modal with the same options as a normal modal defined using component markup.
        {" "}<Neo.Button size="sm" onClick={this.showCustomModal}>Show</Neo.Button>
    </li>
</ul>
<p>
    The first three methods above provide a <code>{"Promise<ModalResult>"}</code> return value. This allows you to asyncronously show the modal,
    and <code>await</code> the result.<br />
    <code>ModalUtils.showModal</code> does not return a promise, because you define the buttons. You must therefore provide the callbacks in the button
    options to handle button clicks.<br />

    {" "}<Neo.Button variant="secondary" size="sm" onClick={this.showAndWaitForModal}>Example</Neo.Button>
</p>`}, { language: "javascript", code: `private showCustomModal() {

    ModalUtils.showModal(
        "Custom", 
        "This modal was created without any markup.",
        { buttons: [
            { text: "Green", variant: "success" }, 
            { text: "Yellow", variant: "warning" }, 
            { text: "Red", variant: "danger" }] });
}

private async showAndWaitForModal() {

    const modalResult = await ModalUtils.showYesNoCancel("Modal test", "Click a button, and view the console to see which button was clicked.");

    console.log("Modal result was: " + modalResult);

    if (modalResult === Misc.ModalResult.Yes) {
        // Use the Misc.ModalResult enum when checking the return value.
        // Note: If you only care about when Yes / Accept is clicked, you can pass a callback to the above method instead of awaiting it.
    }
}`}];

const demo_source_code_ModalInput = [{ language: "jsx", code: 
`<p>
    Sometimes you may need the user to enter a piece of information when performing an action. E.g. asking for a reason when cancelling or rejecting something.
    This can be done using the <code>ModalUtils.showOkCancel</code> method. You can pass in a template with one or more input controls.
    The modal will perform validation, and prevent the ok button being pressed if you provide the <code>model</code> argument.<br />
    Click the example button, and then try submit the dialog without entering a value.
</p>
<Neo.Button variant="secondary" size="sm" onClick={this.showInput}>Example</Neo.Button>`}, { language: "javascript", code: `private async showInput() {

    // Create a temporary observable to bind to.
    const nameProperty = Model.ObservableProperty.required("Name", "");

    const result = await ModalUtils.showOkCancel(
        "What is your name?",
        <Neo.FormGroup label="Type in your name below:" bind={nameProperty} />, 
        nameProperty); // Pass the property / modal to make sure it is validated before the modal is accepted.

    if (result === Misc.ModalResult.Yes) {
        ModalUtils.showMessage("Name", "Your name is " + nameProperty.value);
    }
}`}];
