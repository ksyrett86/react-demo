import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import SimpleModel from '../Models/SimpleModel';

const disableType = [{ text: "Enabled", data: "Enabled" }, { text: "Disabled", data: "Disabled" }, { text: "Read Only", data: "Read Only" }];

@observer
export default class LayoutAndEditorsDemo extends Views.ViewBase {

    constructor(props: unknown) {
        super("Layout & Editors", Views.EmptyViewModel, props);
    }

    private model = new SimpleModel();
    private model2 = new SimpleModel();

    private disabledTypeClick(e: React.MouseEvent<HTMLButtonElement>, data?: any) {
        this.model.disableType = data;
    }

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Layout" icon="tablet-alt" data-code-key="Layout" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Layout, "Layout")} />}>
                    <p>
                        Bootstrap allows you to layout content using the <code>row</code> and <code>col-</code> css classes. If you need elements to flow vertically
                        this is easy to write (two column divs nested inside a row div). Creating a layout that flows horizontally is a lot more difficult.
                    </p>
                    <p>
                        The <code>Neo.GridLayout</code> component makes this easy if you are happy that each cell is of equal width.
                        Each direct child of <code>Neo.GridLayout</code> will be wrapped in a div with the bootstrap column class.
                    </p>
                    <p>
                        You can specify how many columns to display for each screen size. Resize the browser window to see this work. If you dont specify any props,
                        it will default to 2 columns above medium screen size, and 1 column below.
                    </p>
                    <p>
                        <code>Neo.GridLayout</code>s can be nested. If you need to put multiple elements in a 'cell', wrap them in a nested grid layout, or just
                        use a <code>div</code>.
                    </p>
                    <Neo.GridLayout withGaps md={2} xl={3} xxl={4} >
                        <div className="box">One</div>
                        <div className="box">Two</div>
                        <div className="box">Three</div>
                        <div className="box">Four</div>
                        <Neo.GridLayout withGaps gutterSize={1} >
                            <div className="box">Five</div>
                            <div className="box">Six</div>
                        </Neo.GridLayout>
                    </Neo.GridLayout>

                </Neo.Card>

                <div className="container-xl">
                    <Neo.Card title="xxl breakpoint" icon="desktop">
                        <p>
                            Neo supports the addition of an <code>xxl</code> breakpoint for full HD screens. The xxl breakpoint needs to be defined in the bootstrap
                            css overrides in your project. This demo project adds an xxl breakpoint. If you look at the above layout, you will see it changes from
                            3 columns to 4 between the xl and xxl breakpoint.
                        </p>
                        <p>
                            If you want a page to only expand to the xl breakpoint, use the <code>container-xl</code> class.
                        </p>
                        <div className="box">Only expands to xl</div>

                    </Neo.Card>
                </div>

                <h3 className="mt-4">Input elements</h3>

                <Neo.Card title="Binding" data-code-key="Binding" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Binding, "Binding")} />}>

                    <Neo.GridLayout alignItems="center">
                        <p>Basic text editor. The bind property takes in a propertyInstance to allow two way binding. To pass in a property instance,
                            use <code>model.meta.property</code> instead of <code>model.property</code>.
                        </p>
                        <div>
                            <Neo.Input bind={this.model.meta.stringProperty} />
                            <small>You typed: {this.model.stringProperty}</small>
                        </div>
                    </Neo.GridLayout>

                </Neo.Card>

                <Neo.Card title="Types" data-code-key="Types" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Types, "Types")} />}>

                    <p>The input editor takes its arguments via the <code>input</code> prop.</p>
                    <Neo.GridLayout alignItems="center">
                        <span>Convert the text editor to a password editor by specifying <code>{"input={{ type: \"password\" }}"}</code>.
                        </span>
                        <Neo.Input bind={this.model.meta.stringProperty} input={{ type: "password" }} />
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-3">
                        <span>Convert the text editor to a multi line editor by specifying <code>{"input={{ rows: n }}"}</code>.</span>
                        <Neo.Input bind={this.model.meta.stringProperty} input={{ rows: 2 }} />
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-3">
                        <span>A checkbox will be rendered if the value is boolean, or by specifying <code>{"input={{ type: \"checkbox\" }}"}</code>.</span>
                        <Neo.FormGroup bind={this.model.meta.booleanProperty} />
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-3">
                        <span>Nullable boolean properties must be decorated with the <code>@Attributes.NullableBoolean()</code> attribute for them to become tri-state.</span>
                        <Neo.FormGroup bind={this.model.meta.nullableBoolProperty} />
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-3">
                        <span>A checkbox will be rendered as a switch by specifying <code>{"input={{ type: \"switch\" }}"}</code>.</span>
                        <Neo.FormGroup bind={this.model.meta.switchProperty} input={{ type: "switch" }} />
                    </Neo.GridLayout>

                    <Neo.GridLayout className="mt-3">
                        <span>More advanced types are described in their own demo pages.</span>
                    </Neo.GridLayout>

                </Neo.Card>

                <Neo.Card title="Append / Prepend" data-code-key="AppendPrepend" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AppendPrepend, "Append / Prepend")} />}>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <span>
                                You can append or prepend icons and text using the <code>appendText</code> and <code>prependText</code> props.
                                Icons are specified using the font-awesome 5 name. E.g. <code>fa-user</code>
                            </span>
                        </div>
                        <Neo.Input bind={this.model.meta.stringProperty} appendText="appended" prependText="fa-user" />
                    </Neo.GridLayout>

                    <Neo.GridLayout alignItems="center" className="mt-4">
                        <span>
                            You can also add components as appended or prepended items.
                        </span>
                        <Neo.Input
                            bind={this.model.meta.stringProperty}
                            append={<Neo.Button variant="secondary" isOutline tabIndex={-1} onClick={() => this.model.stringProperty = ""}>Reset</Neo.Button>} />
                    </Neo.GridLayout>

                    <Neo.GridLayout alignItems="center" className="mt-4">
                        <span>
                            If you are conditionally appending / prepending a component, you will need to pass <code>null</code> to the append / prepend prop.
                            If you pass <code>undefined</code>, react will remount the input element, causing it to lose focus.
                        </span>
                        <Neo.FormGroup
                            bind={this.model.meta.conditionalString}
                            append={!this.model.conditionalString ? null : <Neo.Button variant="secondary" isOutline tabIndex={-1} onClick={() => this.model.conditionalString = ""}>Reset</Neo.Button>} />
                    </Neo.GridLayout>
                </Neo.Card>

                <h3 className="mt-4">FormGroup</h3>

                <Neo.Card data-code-key="FormGroup" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FormGroup, "Code")} />}>

                    <Neo.GridLayout>
                        <div>

                            <p>You can define a label and editor group with single bind statement by using the <code>Neo.FormGroup</code> component.
                            The formgroup will get its label text from the property instance. In this case, the property name is <code>regNoProperty</code>,
                            but the label is showing Reg. No. This is because <code>regNoProperty</code> is decorated with <code>@Attributes.Display("Reg. No.")</code></p>
                        </div>
                        <Neo.FormGroup bind={this.model.meta.regNoProperty} />
                    </Neo.GridLayout>

                    <Neo.GridLayout className="mt-4" alignItems="center">
                        <p>You can manually set the label using the <code>label</code> prop.</p>
                        <Neo.FormGroup bind={this.model.meta.emailProperty} label="Email Address" prependText="fa-at" />
                    </Neo.GridLayout>

                </Neo.Card>

                {/* TODO, explain that editor props are part of form group. */}

                <Neo.Card title="Inline FormGroup" data-code-key="InlineFormGroup" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_InlineFormGroup, "Inline FormGroup")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>To make a <code>Neo.FormGroup</code> display the label and editor inline, use <code>Neo.FormGroupInline</code>.
                                This has props which allow you to control the label / editor widths at each screen size breakpoint.</p>
                        </div>
                        <Neo.FormGroupInline xs={4} md={12} lg={4} bind={this.model.meta.stringProperty} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Multiple Inline FormGroups" data-code-key="FormGroupProps" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FormGroupProps, "Multiple Inline FormGroups")} />}>
                    <Neo.GridLayout formGroupProps={{ xs: 4, md: 12, lg: 4 }}>
                        <div>
                            <p>
                                If you are displaying a number of <code>Neo.FormGroupInline</code> components, you probably want them to share the same label / editor widths.
                                To do this, you can nest the <code>Neo.FormGroup</code>s inside a <code>Neo.GridLayout</code>, and set the
                                widths on the <code>Neo.GridLayout</code> component.
                            </p>
                        </div>
                        <div>
                            <Neo.FormGroupInline bind={this.model.meta.stringProperty} />
                            <Neo.FormGroupInline bind={this.model.meta.emailProperty} />
                            <Neo.FormGroupInline bind={this.model.meta.regNoProperty} />
                        </div>

                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Floating Form Group" data-code-key="FloatingFormGroup" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_FloatingFormGroup, "Floating Form Group")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>Neo.FormGroupFloating</code> component will show the label as a placeholder in the editor control. When the editor is focused, or has a value, the label
                                will 'float' above the editor.
                            </p>
                            <p>
                                You can still specify the <code>placeholder</code> prop, however it will only be shown when the editor has focus. (See email or date property).
                            </p>
                        </div>
                        <div>
                            <Neo.FormGroupFloating bind={this.model2.meta.stringProperty} />
                            <Neo.FormGroupFloating bind={this.model2.meta.emailProperty} placeholder="name@example.com" />
                            <Neo.FormGroupFloating bind={this.model2.meta.dateProperty} placeholder="dd MMM yyyy" />
                            <Neo.FormGroupFloating bind={this.model2.meta.numProperty} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Disabled / Readonly" data-code-key="DisabledReadonly" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DisabledReadonly, "Disabled / Readonly")} />}>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <p>
                                Editors can be disabled using the <code>isDisabled</code> / <code>isReadOnly</code> prop. Disabled elements cannot receive focus.
                                Read only elements can receive focus, will display tooltips. The <code>isReadOnly</code> prop will also cause the tab index to be set to -1.
                            </p>
                        </div>

                        <Neo.FormGroup bind={this.model.meta.stringProperty}
                            isDisabled={this.model.disableType === "Disabled"}
                            isReadOnly={this.model.disableType === "Read Only"}
                            append={<Neo.Button text={this.model.disableType} menuItems={disableType} variant="dark" onClick={this.disabledTypeClick.bind(this)} />}
                        />
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-4" alignItems="center">
                        <p>
                            You can also make an editor readonly by passing the property instance using the <code>display</code> prop instead of the <code>bind</code> prop.
                        </p>
                        <Neo.FormGroup display={this.model.meta.stringProperty} />
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-4" alignItems="center">
                        <p>
                            If you use <code>bind</code> with a readonly property (getter method without a setter), the editor will automatically be readonly.
                        </p>
                        <Neo.FormGroup bind={this.model.meta.stringValue} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Accessing editor and label" data-code-key="LabelAndEditor" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_LabelAndEditor, "Accessing editor and label")} />}>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <p>
                                Html attributes set on the <code>FormGroup</code> will be applied to the container div. To add attributes to the label / editor,
                                use <code>editorProps</code> and <code>labelProps</code>.
                            </p>
                        </div>
                        <Neo.FormGroup bind={this.model.meta.stringProperty}
                            labelProps={{ style: { fontStyle: "italic" } }}
                            editorProps={{ style: { backgroundColor: "#cfb" } }} />
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_Layout = [{ language: "jsx", code: 
`<p>
    Bootstrap allows you to layout content using the <code>row</code> and <code>col-</code> css classes. If you need elements to flow vertically
    this is easy to write (two column divs nested inside a row div). Creating a layout that flows horizontally is a lot more difficult.
</p>
<p>
    The <code>Neo.GridLayout</code> component makes this easy if you are happy that each cell is of equal width.
    Each direct child of <code>Neo.GridLayout</code> will be wrapped in a div with the bootstrap column class.
</p>
<p>
    You can specify how many columns to display for each screen size. Resize the browser window to see this work. If you dont specify any props,
    it will default to 2 columns above medium screen size, and 1 column below.
</p>
<p>
    <code>Neo.GridLayout</code>s can be nested. If you need to put multiple elements in a 'cell', wrap them in a nested grid layout, or just
    use a <code>div</code>.
</p>
<Neo.GridLayout withGaps md={2} xl={3} xxl={4} >
    <div className="box">One</div>
    <div className="box">Two</div>
    <div className="box">Three</div>
    <div className="box">Four</div>
    <Neo.GridLayout withGaps gutterSize={1} >
        <div className="box">Five</div>
        <div className="box">Six</div>
    </Neo.GridLayout>
</Neo.GridLayout>`}];

const demo_source_code_Binding = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <p>Basic text editor. The bind property takes in a propertyInstance to allow two way binding. To pass in a property instance,
        use <code>model.meta.property</code> instead of <code>model.property</code>.
    </p>
    <div>
        <Neo.Input bind={this.model.meta.stringProperty} />
        <small>You typed: {this.model.stringProperty}</small>
    </div>
</Neo.GridLayout>`}];

const demo_source_code_Types = [{ language: "jsx", code: 
`<p>The input editor takes its arguments via the <code>input</code> prop.</p>
<Neo.GridLayout alignItems="center">
    <span>Convert the text editor to a password editor by specifying <code>{"input={{ type: \"password\" }}"}</code>.
    </span>
    <Neo.Input bind={this.model.meta.stringProperty} input={{ type: "password" }} />
</Neo.GridLayout>
<Neo.GridLayout className="mt-3">
    <span>Convert the text editor to a multi line editor by specifying <code>{"input={{ rows: n }}"}</code>.</span>
    <Neo.Input bind={this.model.meta.stringProperty} input={{ rows: 2 }} />
</Neo.GridLayout>
<Neo.GridLayout className="mt-3">
    <span>A checkbox will be rendered if the value is boolean, or by specifying <code>{"input={{ type: \"checkbox\" }}"}</code>.</span>
    <Neo.FormGroup bind={this.model.meta.booleanProperty} />
</Neo.GridLayout>
<Neo.GridLayout className="mt-3">
    <span>Nullable boolean properties must be decorated with the <code>@Attributes.NullableBoolean()</code> attribute for them to become tri-state.</span>
    <Neo.FormGroup bind={this.model.meta.nullableBoolProperty} />
</Neo.GridLayout>
<Neo.GridLayout className="mt-3">
    <span>A checkbox will be rendered as a switch by specifying <code>{"input={{ type: \"switch\" }}"}</code>.</span>
    <Neo.FormGroup bind={this.model.meta.switchProperty} input={{ type: "switch" }} />
</Neo.GridLayout>

<Neo.GridLayout className="mt-3">
    <span>More advanced types are described in their own demo pages.</span>
</Neo.GridLayout>`}];

const demo_source_code_AppendPrepend = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <span>
            You can append or prepend icons and text using the <code>appendText</code> and <code>prependText</code> props.
            Icons are specified using the font-awesome 5 name. E.g. <code>fa-user</code>
        </span>
    </div>
    <Neo.Input bind={this.model.meta.stringProperty} appendText="appended" prependText="fa-user" />
</Neo.GridLayout>

<Neo.GridLayout alignItems="center" className="mt-4">
    <span>
        You can also add components as appended or prepended items.
    </span>
    <Neo.Input
        bind={this.model.meta.stringProperty}
        append={<Neo.Button variant="secondary" isOutline tabIndex={-1} onClick={() => this.model.stringProperty = ""}>Reset</Neo.Button>} />
</Neo.GridLayout>

<Neo.GridLayout alignItems="center" className="mt-4">
    <span>
        If you are conditionally appending / prepending a component, you will need to pass <code>null</code> to the append / prepend prop.
        If you pass <code>undefined</code>, react will remount the input element, causing it to lose focus.
    </span>
    <Neo.FormGroup
        bind={this.model.meta.conditionalString}
        append={!this.model.conditionalString ? null : <Neo.Button variant="secondary" isOutline tabIndex={-1} onClick={() => this.model.conditionalString = ""}>Reset</Neo.Button>} />
</Neo.GridLayout>`}];

const demo_source_code_FormGroup = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>

        <p>You can define a label and editor group with single bind statement by using the <code>Neo.FormGroup</code> component.
        The formgroup will get its label text from the property instance. In this case, the property name is <code>regNoProperty</code>,
        but the label is showing Reg. No. This is because <code>regNoProperty</code> is decorated with <code>@Attributes.Display("Reg. No.")</code></p>
    </div>
    <Neo.FormGroup bind={this.model.meta.regNoProperty} />
</Neo.GridLayout>

<Neo.GridLayout className="mt-4" alignItems="center">
    <p>You can manually set the label using the <code>label</code> prop.</p>
    <Neo.FormGroup bind={this.model.meta.emailProperty} label="Email Address" prependText="fa-at" />
</Neo.GridLayout>`}];

const demo_source_code_InlineFormGroup = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>To make a <code>Neo.FormGroup</code> display the label and editor inline, use <code>Neo.FormGroupInline</code>.
            This has props which allow you to control the label / editor widths at each screen size breakpoint.</p>
    </div>
    <Neo.FormGroupInline xs={4} md={12} lg={4} bind={this.model.meta.stringProperty} />
</Neo.GridLayout>`}];

const demo_source_code_FormGroupProps = [{ language: "jsx", code: 
`<Neo.GridLayout formGroupProps={{ xs: 4, md: 12, lg: 4 }}>
    <div>
        <p>
            If you are displaying a number of <code>Neo.FormGroupInline</code> components, you probably want them to share the same label / editor widths.
            To do this, you can nest the <code>Neo.FormGroup</code>s inside a <code>Neo.GridLayout</code>, and set the
            widths on the <code>Neo.GridLayout</code> component.
        </p>
    </div>
    <div>
        <Neo.FormGroupInline bind={this.model.meta.stringProperty} />
        <Neo.FormGroupInline bind={this.model.meta.emailProperty} />
        <Neo.FormGroupInline bind={this.model.meta.regNoProperty} />
    </div>

</Neo.GridLayout>`}];

const demo_source_code_FloatingFormGroup = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>Neo.FormGroupFloating</code> component will show the label as a placeholder in the editor control. When the editor is focused, or has a value, the label
            will 'float' above the editor.
        </p>
        <p>
            You can still specify the <code>placeholder</code> prop, however it will only be shown when the editor has focus. (See email or date property).
        </p>
    </div>
    <div>
        <Neo.FormGroupFloating bind={this.model2.meta.stringProperty} />
        <Neo.FormGroupFloating bind={this.model2.meta.emailProperty} placeholder="name@example.com" />
        <Neo.FormGroupFloating bind={this.model2.meta.dateProperty} placeholder="dd MMM yyyy" />
        <Neo.FormGroupFloating bind={this.model2.meta.numProperty} />
    </div>
</Neo.GridLayout>`}];

const demo_source_code_DisabledReadonly = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <p>
            Editors can be disabled using the <code>isDisabled</code> / <code>isReadOnly</code> prop. Disabled elements cannot receive focus.
            Read only elements can receive focus, will display tooltips. The <code>isReadOnly</code> prop will also cause the tab index to be set to -1.
        </p>
    </div>

    <Neo.FormGroup bind={this.model.meta.stringProperty}
        isDisabled={this.model.disableType === "Disabled"}
        isReadOnly={this.model.disableType === "Read Only"}
        append={<Neo.Button text={this.model.disableType} menuItems={disableType} variant="dark" onClick={this.disabledTypeClick.bind(this)} />}
    />
</Neo.GridLayout>
<Neo.GridLayout className="mt-4" alignItems="center">
    <p>
        You can also make an editor readonly by passing the property instance using the <code>display</code> prop instead of the <code>bind</code> prop.
    </p>
    <Neo.FormGroup display={this.model.meta.stringProperty} />
</Neo.GridLayout>
<Neo.GridLayout className="mt-4" alignItems="center">
    <p>
        If you use <code>bind</code> with a readonly property (getter method without a setter), the editor will automatically be readonly.
    </p>
    <Neo.FormGroup bind={this.model.meta.stringValue} />
</Neo.GridLayout>`}];

const demo_source_code_LabelAndEditor = [{ language: "jsx", code: 
`<Neo.GridLayout alignItems="center">
    <div>
        <p>
            Html attributes set on the <code>FormGroup</code> will be applied to the container div. To add attributes to the label / editor,
            use <code>editorProps</code> and <code>labelProps</code>.
        </p>
    </div>
    <Neo.FormGroup bind={this.model.meta.stringProperty}
        labelProps={{ style: { fontStyle: "italic" } }}
        editorProps={{ style: { backgroundColor: "#cfb" } }} />
</Neo.GridLayout>`}];
