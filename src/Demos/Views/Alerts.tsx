import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import { Components, Model, NotifyUtils } from '@singularsystems/neo-core';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const variants = ["primary", "secondary", "info", "success", "warning", "danger", "light", "dark"] as Components.variant[];

@observer
export default class AlertsDemo extends Views.ViewBase {

    constructor(props: unknown) {
        super("Alerts & Toasts", Views.EmptyViewModel, props);
    }

    @observable.ref
    private showAlert = false;

    private showBoundAlert = new Model.ObservableValue(false);

    // DemoCode: ToastBasic
    private exampleToast?: Components.INotification;

    private showToast() {
        if (!this.exampleToast) {
            this.exampleToast = NotifyUtils.addSuccess("Saved", "The data was saved successfully.");
        }
    }

    private hideToast() {
        if (this.exampleToast) {
            this.exampleToast.hide();
            this.exampleToast = undefined;
        }
    }
    // End DemoCode

    // DemoCode: ToastAutoHide
    private showToasts() {
        const hideTimeSeconds = 10;

        variants.forEach((variant, index) => {
            setTimeout(() => {

                NotifyUtils.add(variant + " toast", 
                    "This is a self closing toast. This toast will self destruct after 10 seconds.",
                    variant, 
                    hideTimeSeconds);

            }, index * 250);
        });

    }
    // End DemoCode

    // DemoCode: ToastUnique
    private numClicks = 0;

    private showUniqueToast() {
        this.numClicks += 1;
        NotifyUtils.addOrUpdate("Save", "Saved", <span>The data was saved successfully<hr />You have clicked the button {this.numClicks} times.</span>, "success", 5);
    }
    // End DemoCode

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Alerts & Toasts">
                    <p>The <code>Neo.Alert</code> component uses the bootstrap alert classes.</p>

                    <h6>Basic</h6>
                    <p>
                        <code>Neo.Alert</code> components can be shown using the following variants:
                    </p>
                    <Neo.GridLayout md={2}>

                        {variants.map((variant: any) => (
                            <Neo.Alert key={variant} variant={variant}>This is a {variant} alert.</Neo.Alert>
                        ))}

                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Heading and body" data-code-key="AlertBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AlertBasic, "Heading and body")} />}>
                    <Neo.GridLayout>
                        <p>
                            The <code>heading</code> prop can be specified to show a heading. The content within the <code>Neo.Alert</code> tags is the body.
                        </p>
                        <Neo.Alert variant="primary" heading="This is a heading">This is the body of the alert.</Neo.Alert>
                        <p>
                            The body can contain any html markup, and components.
                        </p>
                        <Neo.Alert variant="success" heading="This is a heading">Any HTML can be placed inside the alert body<hr />
                            Including <Neo.Button size="sm" variant="success">Components</Neo.Button>.</Neo.Alert>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Animation" data-code-key="AlertAnimate" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AlertAnimate, "Animation")} />}>
                    <Neo.GridLayout>
                        <p>
                            You can show / hide alerts using normal react conditional rendering, but the alerts will not animate. To enable animation, you can use
                            the <code>show</code> prop. This will cause the alert to be <code>display: hidden</code> when not shown, rather than be removed from the DOM.
                        </p>
                        <div>
                            <Neo.Button variant="secondary" icon="fa-bell" className="mb-3" onClick={() => this.showAlert = !this.showAlert}>Toggle alert</Neo.Button>
                            <Neo.Alert variant="primary" heading="Animated alert" show={this.showAlert}>This alert has its <code>show</code> property set.</Neo.Alert>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Self close" data-code-key="AlertSelfClose" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AlertSelfClose, "Self close")} />}>
                    <Neo.GridLayout>
                        <p>
                            The previous alert is shown / hidden by passing a boolean value (one way binding). This means the alert is not self dismissable. To allow this,
                            you need to pass an observable value, rather than a plain boolean. You can do this using the <code>bindShow</code> prop. This can either be
                            a <code>PropertyInstance</code> via a models <code>meta</code> object, or an <code>ObservableValue</code> object.
                        </p>
                        <div>
                            <div>
                                <Neo.Button variant="secondary" icon="fa-bell" className="mb-3" onClick={() => this.showBoundAlert.value = !this.showBoundAlert.value}>
                                    Toggle alert
                                </Neo.Button>
                                <Neo.Alert variant="primary" heading="Bound alert" bindShow={this.showBoundAlert}>
                                    This alert has its <code>bindShow</code> property set. This enables the close button.
                                </Neo.Alert>
                            </div>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <h3>Toasts</h3>
                <Neo.Card>

                    <p>The <code>Neo.Toast</code> component combines features of the alert and modal components. It uses the bootstrap toast classes.</p>

                    <h6>Basic</h6>
                    <Neo.GridLayout>
                        <p>
                            Toasts share the same props as the <code>Neo.Alert</code> component.
                        </p>
                        <div>
                            <Neo.Toast variant="primary" heading="Toast heading" bindShow={new Model.ObservableValue(true)}>Body of the toast</Neo.Toast>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Toast container" data-code-key="ToastBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ToastBasic, "Toast container")} />}>
                    <p>
                        Toasts are meant to be shown overlayed on top of the rest of the page content. The <code>Neo.ToastContainer</code> component enables this.<br />
                        For most apps, the <code>Neo.ToastContainer</code> component should be hosted in the master page, not in each individual view.
                    </p>
                    <p>The master toast container should be bound to the global <code>NotificationStore</code>. You can add toasts programatically by calling methods on
                    the <code>NotifyUtils</code> class.</p>

                    <Neo.GridLayout>
                        <p>Add a toast by calling the <code>addSuccess</code> method on the <code>NotifyUtils</code>.</p>
                        <Neo.Button variant="secondary" size="sm" onClick={() => this.showToast()}>Add toast</Neo.Button>
                    </Neo.GridLayout>
                    <Neo.GridLayout>
                        <p>
                            The <code>add*</code> methods returns a reference to the toast. This reference can be used to hide the toast programatically by calling <code>hide()</code>.
                            The user can also dismiss the toast by clicking on the close button.
                        </p>
                        <Neo.Button variant="secondary" size="sm" onClick={() => this.hideToast()}>Hide toast</Neo.Button>
                    </Neo.GridLayout>

                </Neo.Card>

                <Neo.Card title="Auto hide" data-code-key="ToastAutoHide" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ToastAutoHide, "Auto hide")} />}>
                    <Neo.GridLayout>
                        <p>Toasts can be given a timeout value, after which they will automatically dismiss.</p>
                        <Neo.Button variant="secondary" size="sm" onClick={() => this.showToasts()}>Show toasts</Neo.Button>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Unique toasts" data-code-key="ToastUnique" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ToastUnique, "Unique toasts")} />}>
                    <Neo.GridLayout>
                        <p>If you dont want to add duplicate toasts (e.g. if a user performs an action multiple times), you can use the <code>addOrUpdate</code> method
                        on <code>NotifyUtils</code>. This method takes a <code>key</code> parameter which will check to see if a toast of the same key is already
                        visible. If so, the hide timer will be reset each time <code>addOrUpdate</code> is called.</p>
                        <div>
                            <Neo.Button variant="secondary" size="sm" onClick={() => this.showUniqueToast()}>Show unique toast</Neo.Button> {" "}
                            <small>Click this button multiple times.</small>
                        </div>

                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_AlertBasic = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>
        The <code>heading</code> prop can be specified to show a heading. The content within the <code>Neo.Alert</code> tags is the body.
    </p>
    <Neo.Alert variant="primary" heading="This is a heading">This is the body of the alert.</Neo.Alert>
    <p>
        The body can contain any html markup, and components.
    </p>
    <Neo.Alert variant="success" heading="This is a heading">Any HTML can be placed inside the alert body<hr />
        Including <Neo.Button size="sm" variant="success">Components</Neo.Button>.</Neo.Alert>
</Neo.GridLayout>`}];

const demo_source_code_AlertAnimate = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>
        You can show / hide alerts using normal react conditional rendering, but the alerts will not animate. To enable animation, you can use
        the <code>show</code> prop. This will cause the alert to be <code>display: hidden</code> when not shown, rather than be removed from the DOM.
    </p>
    <div>
        <Neo.Button variant="secondary" icon="fa-bell" className="mb-3" onClick={() => this.showAlert = !this.showAlert}>Toggle alert</Neo.Button>
        <Neo.Alert variant="primary" heading="Animated alert" show={this.showAlert}>This alert has its <code>show</code> property set.</Neo.Alert>
    </div>
</Neo.GridLayout>`}];

const demo_source_code_AlertSelfClose = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>
        The previous alert is shown / hidden by passing a boolean value (one way binding). This means the alert is not self dismissable. To allow this,
        you need to pass an observable value, rather than a plain boolean. You can do this using the <code>bindShow</code> prop. This can either be
        a <code>PropertyInstance</code> via a models <code>meta</code> object, or an <code>ObservableValue</code> object.
    </p>
    <div>
        <div>
            <Neo.Button variant="secondary" icon="fa-bell" className="mb-3" onClick={() => this.showBoundAlert.value = !this.showBoundAlert.value}>
                Toggle alert
            </Neo.Button>
            <Neo.Alert variant="primary" heading="Bound alert" bindShow={this.showBoundAlert}>
                This alert has its <code>bindShow</code> property set. This enables the close button.
            </Neo.Alert>
        </div>
    </div>
</Neo.GridLayout>`}];

const demo_source_code_ToastBasic = [{ language: "jsx", code: 
`<p>
    Toasts are meant to be shown overlayed on top of the rest of the page content. The <code>Neo.ToastContainer</code> component enables this.<br />
    For most apps, the <code>Neo.ToastContainer</code> component should be hosted in the master page, not in each individual view.
</p>
<p>The master toast container should be bound to the global <code>NotificationStore</code>. You can add toasts programatically by calling methods on
the <code>NotifyUtils</code> class.</p>

<Neo.GridLayout>
    <p>Add a toast by calling the <code>addSuccess</code> method on the <code>NotifyUtils</code>.</p>
    <Neo.Button variant="secondary" size="sm" onClick={() => this.showToast()}>Add toast</Neo.Button>
</Neo.GridLayout>
<Neo.GridLayout>
    <p>
        The <code>add*</code> methods returns a reference to the toast. This reference can be used to hide the toast programatically by calling <code>hide()</code>.
        The user can also dismiss the toast by clicking on the close button.
    </p>
    <Neo.Button variant="secondary" size="sm" onClick={() => this.hideToast()}>Hide toast</Neo.Button>
</Neo.GridLayout>`}, { language: "javascript", code: `private exampleToast?: Components.INotification;

private showToast() {
    if (!this.exampleToast) {
        this.exampleToast = NotifyUtils.addSuccess("Saved", "The data was saved successfully.");
    }
}

private hideToast() {
    if (this.exampleToast) {
        this.exampleToast.hide();
        this.exampleToast = undefined;
    }
}`}];

const demo_source_code_ToastAutoHide = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>Toasts can be given a timeout value, after which they will automatically dismiss.</p>
    <Neo.Button variant="secondary" size="sm" onClick={() => this.showToasts()}>Show toasts</Neo.Button>
</Neo.GridLayout>`}, { language: "javascript", code: `private showToasts() {
    const hideTimeSeconds = 10;

    variants.forEach((variant, index) => {
        setTimeout(() => {

            NotifyUtils.add(variant + " toast", 
                "This is a self closing toast. This toast will self destruct after 10 seconds.",
                variant, 
                hideTimeSeconds);

        }, index * 250);
    });

}`}];

const demo_source_code_ToastUnique = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>If you dont want to add duplicate toasts (e.g. if a user performs an action multiple times), you can use the <code>addOrUpdate</code> method
    on <code>NotifyUtils</code>. This method takes a <code>key</code> parameter which will check to see if a toast of the same key is already
    visible. If so, the hide timer will be reset each time <code>addOrUpdate</code> is called.</p>
    <div>
        <Neo.Button variant="secondary" size="sm" onClick={() => this.showUniqueToast()}>Show unique toast</Neo.Button> {" "}
        <small>Click this button multiple times.</small>
    </div>

</Neo.GridLayout>`}, { language: "javascript", code: `private numClicks = 0;

private showUniqueToast() {
    this.numClicks += 1;
    NotifyUtils.addOrUpdate("Save", "Saved", <span>The data was saved successfully<hr />You have clicked the button {this.numClicks} times.</span>, "success", 5);
}`}];
