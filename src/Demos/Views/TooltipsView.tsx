import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { NeoModel } from '@singularsystems/neo-core';
import { Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import { AppService, Types } from '../../Services/AppService';
import neoLogo from '../Images/neo-icon.png';

@NeoModel
class TooltipsVM extends Views.ViewModelBase {

    constructor(
        taskRunner = AppService.get(Types.Neo.TaskRunner),
        private notifications = AppService.get(Types.Neo.UI.GlobalNotifications)) {

        super(taskRunner);
    }

    public demoString = "";

    public async initialise() {

    }
}

@observer
export default class TooltipsView extends Views.ViewBase<TooltipsVM> {

    constructor(props: unknown) {
        super("Tooltips", TooltipsVM, props);
    }

    public render() {
        return (
            <div>
			    <Neo.Card title="Tooltips">

                    <Neo.GridLayout>
                        <div>
                            <p>
                                Neo supports two methods of showing custom tooltips. 
                                <ul>
                                    <li>Either by wrapping an element with the <code>Neo.Tooltip</code> component,</li>
                                    <li>or by specifying the <code>data-tip</code> prop on any other element.</li>
                                </ul>
                                 
                            </p>
                            <p>
                                Tooltips require a global <code>{"<Neo.TooltipProvider />"}</code> to be present in your apps main layout page.
                            </p>
                        </div>
                        <div>
                            Hover over these components:

                            <div className="mt-4">
                                <Neo.Tooltip content="A basic tooltip" inline>
                                    <span className="demo-tooltip-target">Tooltip component</span>
                                </Neo.Tooltip>

                                <div className="mt-3">
                                    <span className="demo-tooltip-target" data-tip="A basic tooltip">Using <code>data-tip</code>.</span>
                                </div>
                            </div>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Tooltip component" data-code-key="TooltipComponent" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TooltipComponent, "Tooltip component")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>The tooltip component wraps another element. When the mouse hovers over the inner element, the tooltip will display. </p>
                            
                            The following props are available:
                            <ul>
                                <li><code>content</code> - The content to display in the tooltip. Can either be a string, or a component.</li>
                                <li><code>className</code> - This will be applied to the actual tooltip, not the wrapper div.</li>
                                <li><code>inline</code> - Causes the wrapping div to display inline. Use this when wrapping text elements.</li>
                                <li><code>position</code> - Changes where the tooltip appears relative to the hover element. Default is top.</li>
                                <li><code>alignment</code> - Changes the alignment of the tooltip, and tooltip arrow. This will be horizontal, or vertical aligment based on the value of <code>position</code>.</li>
                            </ul>
                        </div>
                        <div data-code-content>
                            <div>
                                <Neo.Tooltip 
                                    content={<span>
                                        <strong>Custom tooltip</strong><br />
                                        Can contain any component.<br />
                                        <img src={neoLogo} className="mt-2" style={{width: 32}} /></span>} 
                                    inline>
                                    <span className="demo-tooltip-target">Custom content</span>
                                </Neo.Tooltip>
                            </div>
                            <div className="mt-3">
                                <Neo.Tooltip content="Demo tooltip" inline className="demo-green">
                                    <span className="demo-tooltip-target">Custom style</span>
                                </Neo.Tooltip>
                            </div>
                            <div className="mt-3">
                                <Neo.Tooltip content="Demo tooltip" inline position="left">
                                    <span className="demo-tooltip-target">Left position</span>  
                                </Neo.Tooltip>
                                <Neo.Tooltip content="Demo tooltip" inline position="right">
                                    <span className="demo-tooltip-target ml-2">Right position</span>
                                </Neo.Tooltip>
                            </div>
                            <div className="mt-3">
                                <Neo.Tooltip content="Demo tooltip" inline alignment="start">
                                    <span className="demo-tooltip-target">Left alignment</span>  
                                </Neo.Tooltip>
                                <Neo.Tooltip content="Demo tooltip" inline alignment="end">
                                    <span className="demo-tooltip-target ml-2">Right alignment</span>
                                </Neo.Tooltip>
                            </div>   
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="data-tip prop" data-code-key="TooltipDataProp" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TooltipDataProp, "data-tip prop")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>Sometimes it is not possible to wrap a compnent with the tooltip component. E.g. you may not have access to the rendered element, like in a column cell in a grid, or wrapping the component with the triggering div causes other issues.
                            In these cases you can add the <code>data-tip</code> prop.</p>

                            The same props as on the component are available by specifying the following in addition to <code>data-tip</code>:
                            <ul>
                                <li><code>data-tip-html</code> - This is necessary to show formatted html in the tooltip. Do not use values that can be changed by an untrusted party.</li>
                                <li><code>data-tip-class</code> - Maps to className above.</li>
                                <li><code>data-tip-pos</code> - Maps to position above.</li>
                                <li><code>data-tip-align</code> - Maps to alignment above.</li>
                            </ul>
                        </div>
                        <div data-code-content>
                            <div>
                                <span 
                                    className="demo-tooltip-target" 
                                    data-tip={`<strong>Custom tooltip</strong><br /> Can contain html<br /> <img src="${neoLogo}" style="width: 32px" class="mt-2" />`} 
                                    data-tip-html>Custom content</span>
                            </div>
                            <div className="mt-3">
                                <span className="demo-tooltip-target" data-tip="Demo tooltip" data-tip-class="demo-green">Custom style</span>
                            </div>
                            <div className="mt-3">
                                <span className="demo-tooltip-target" data-tip="Demo tooltip" data-tip-pos="left">Left position</span>
                                <span className="demo-tooltip-target ml-2" data-tip="Demo tooltip" data-tip-pos="right">Right position</span>
                            </div>
                            <div className="mt-3">
                                <span className="demo-tooltip-target" data-tip="Demo tooltip" data-tip-align="start">Left alignment</span>
                                <span className="demo-tooltip-target ml-2" data-tip="Demo tooltip" data-tip-align="end">Right alignment</span>
                            </div>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Component built in props" data-code-key="TooltipBuiltIn" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TooltipBuiltIn, "Component built in props")} />}>
                    <Neo.GridLayout>
                        <div>
                            Some neo components expose a tooltip prop for convenience, so that you don't have to add a wrapper component, or use the <code>data-tip</code> prop.<br/>
                            You can either specify a string for a simple tooltip, or tooltip options if you need to specify position, alignment etc.
                        </div>
                        <div>
                            <div>
                                Specified as string: <Neo.Button tooltip="Click me">Button</Neo.Button>
                            </div>
                            <div className="mt-3">
                                Specified as tooltip options: <Neo.Button tooltip={{ content: "Click me", position: "right"}}>Button</Neo.Button>
                            </div>
                            
                        </div>
                    </Neo.GridLayout>
                    <Neo.GridLayout className="mt-4">
                        <div>
                            The formgroup provides an <code>editorTooltip</code> to apply a tooltip to the inner editor.
                        </div>
                        <div>
                            <div>
                                <Neo.FormGroup bind={this.viewModel.meta.demoString} editorTooltip="Enter a value" />
                            </div>
                            <div className="mt-3">
                                <Neo.FormGroup bind={this.viewModel.meta.demoString} editorTooltip={{ content: "Enter a value", alignment: "start"}} />
                            </div>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        );
    }
}
/*
// DemoCode: TooltipComponent,Style,1,css
.neo-tooltip.demo-green {
    background-color: $lightGreen;
}
// End DemoCode

// DemoCode: TooltipDataProp,Style,1,css
.neo-tooltip.demo-green {
    background-color: $lightGreen;
}
// End DemoCode
*/

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_TooltipComponent = [{ language: "jsx", code: 
`<div>
    <Neo.Tooltip 
        content={<span>
            <strong>Custom tooltip</strong><br />
            Can contain any component.<br />
            <img src={neoLogo} className="mt-2" style={{width: 32}} /></span>} 
        inline>
        <span className="demo-tooltip-target">Custom content</span>
    </Neo.Tooltip>
</div>
<div className="mt-3">
    <Neo.Tooltip content="Demo tooltip" inline className="demo-green">
        <span className="demo-tooltip-target">Custom style</span>
    </Neo.Tooltip>
</div>
<div className="mt-3">
    <Neo.Tooltip content="Demo tooltip" inline position="left">
        <span className="demo-tooltip-target">Left position</span>  
    </Neo.Tooltip>
    <Neo.Tooltip content="Demo tooltip" inline position="right">
        <span className="demo-tooltip-target ml-2">Right position</span>
    </Neo.Tooltip>
</div>
<div className="mt-3">
    <Neo.Tooltip content="Demo tooltip" inline alignment="start">
        <span className="demo-tooltip-target">Left alignment</span>  
    </Neo.Tooltip>
    <Neo.Tooltip content="Demo tooltip" inline alignment="end">
        <span className="demo-tooltip-target ml-2">Right alignment</span>
    </Neo.Tooltip>
</div>   `}, { language: "css", title: "Style", code: `.neo-tooltip.demo-green {
    background-color: $lightGreen;
}`}];

const demo_source_code_TooltipDataProp = [{ language: "jsx", code: 
`<div>
    <span 
        className="demo-tooltip-target" 
        data-tip={\`<strong>Custom tooltip</strong><br /> Can contain html<br /> <img src="\${neoLogo}" style="width: 32px" class="mt-2" />\`} 
        data-tip-html>Custom content</span>
</div>
<div className="mt-3">
    <span className="demo-tooltip-target" data-tip="Demo tooltip" data-tip-class="demo-green">Custom style</span>
</div>
<div className="mt-3">
    <span className="demo-tooltip-target" data-tip="Demo tooltip" data-tip-pos="left">Left position</span>
    <span className="demo-tooltip-target ml-2" data-tip="Demo tooltip" data-tip-pos="right">Right position</span>
</div>
<div className="mt-3">
    <span className="demo-tooltip-target" data-tip="Demo tooltip" data-tip-align="start">Left alignment</span>
    <span className="demo-tooltip-target ml-2" data-tip="Demo tooltip" data-tip-align="end">Right alignment</span>
</div>`}, { language: "css", title: "Style", code: `.neo-tooltip.demo-green {
    background-color: $lightGreen;
}`}];

const demo_source_code_TooltipBuiltIn = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        Some neo components expose a tooltip prop for convenience, so that you don't have to add a wrapper component, or use the <code>data-tip</code> prop.<br/>
        You can either specify a string for a simple tooltip, or tooltip options if you need to specify position, alignment etc.
    </div>
    <div>
        <div>
            Specified as string: <Neo.Button tooltip="Click me">Button</Neo.Button>
        </div>
        <div className="mt-3">
            Specified as tooltip options: <Neo.Button tooltip={{ content: "Click me", position: "right"}}>Button</Neo.Button>
        </div>
        
    </div>
</Neo.GridLayout>
<Neo.GridLayout className="mt-4">
    <div>
        The formgroup provides an <code>editorTooltip</code> to apply a tooltip to the inner editor.
    </div>
    <div>
        <div>
            <Neo.FormGroup bind={this.viewModel.meta.demoString} editorTooltip="Enter a value" />
        </div>
        <div className="mt-3">
            <Neo.FormGroup bind={this.viewModel.meta.demoString} editorTooltip={{ content: "Enter a value", alignment: "start"}} />
        </div>
    </div>
</Neo.GridLayout>`}];
