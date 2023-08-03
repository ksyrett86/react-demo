import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { observer } from 'mobx-react';
import { ICancellableEvent, Neo, Views } from '@singularsystems/neo-react';
import { Attributes, ModalUtils, NeoModel } from '@singularsystems/neo-core';

@NeoModel
export class TabsVM extends Views.ViewModelBase {

    @Attributes.OnChanged<TabsVM>(c => c.onSelectedTabChanged)
    public selectedTab = "Tab 2";

    private onSelectedTabChanged() {
        // tslint:disable-next-line: no-console
        console.log("Tab changed to: " + this.selectedTab);
    }
}

@observer
export default class Tabs extends Views.ViewBase<TabsVM> {

    constructor(props: unknown) {
        super("Tabs", TabsVM, props);
    }

    public render() {
        // DemoCode: TabsFlat
        // Note: in a normal page you would place these tabs directly in the <TabContainer>. 
        // This page is re-using these tabs multiple times which is why they are defined as variables.
        const t1 = <Neo.Tab header="Tab 1">
            Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor,
            williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
            Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
        </Neo.Tab>;
        const t2 = <Neo.Tab header="Tab 2">
            Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level
            wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl
            cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown.
            Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown,
            tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
        </Neo.Tab>;
        const t3 = <Neo.Tab header="Tab 3">
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag
            gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify
            squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably
            haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
        </Neo.Tab>;
        // End DemoCode

        return <div className="tabs-demo constrain-width">
            <Neo.Card title="Tabs">
                <p>Note: The text in the tab content areas has been made lighter in this demo.</p>
            </Neo.Card>

            <Neo.Card title="Normal tabs">
                <p>
                    Setting the <code>variant</code> prop to <code>tabs</code>, or leaving it unspecified will cause the tab headers look like tabs.<br />
                    Tabs can be disabled using the <code>disable</code> prop.
                </p>
                <p>
                    In the example below, the tab component is placed outside of the card, since it behaves like a card itself.
                </p>
            </Neo.Card>

            <Neo.TabContainer>
                {t1} {t2} {t3}
                <Neo.Tab header="Disabled" disabled>Should not see this.</Neo.Tab>
            </Neo.TabContainer>

            <Neo.Card title="Card mode" data-code-key="TabsFlat" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsFlat, "Card mode")} />}>
                <p>
                    By default, tabs with <code>variant</code> unspecified, or set to <code>tabs</code> will render with <code>cardMode</code> on. If you have a tab component
                    nested in a card, you should disable card mode be setting <code>variant</code> to <code>flat</code>.
                </p>

                <Neo.TabContainer variant="flat">
                    {t1} {t2} {t3}
                    <Neo.Tab header="Disabled" disabled>Should not see this.</Neo.Tab>
                </Neo.TabContainer>
            </Neo.Card>

            <Neo.Card title="Pill tabs" data-code-key="TabsPill" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsPill, "Pill tabs")} />}>
                <p>Setting the <code>variant</code> prop to <code>pills</code> will cause the tab headers look like pills.</p>

                <Neo.TabContainer variant="pills">
                    {t1} {t2} {t3}
                </Neo.TabContainer>
            </Neo.Card>

            <Neo.Card title="Link tabs" data-code-key="TabsLink" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsLink, "Link tabs")} />}>
                <p>
                    Setting the <code>variant</code> prop to <code>none</code> will cause the tab headers look like normal links.
                    In this example, the alignment is set to <code>center</code>. The alignment prop applies to all tab variants.
                </p>

                <Neo.TabContainer variant="none" align="center">
                    {t1} {t2} {t3}
                </Neo.TabContainer>
            </Neo.Card>

            <Neo.Card title="Fill mode" data-code-key="TabsFill" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsFill, "Fill mode")} />}>
                <p>
                    Setting the <code>fillMode</code> prop will cause the tabs headers to span the whole width of the screen.
                    Available modes are <code>fill</code> and <code>justified</code>.
                </p>

                <Neo.TabContainer variant="pills" fillMode="fill">
                    {t1} {t2} {t3}
                    <Neo.Tab header="Tab with long name">Content of tab with long name</Neo.Tab>
                </Neo.TabContainer>
            </Neo.Card>

            <Neo.Card title="Vertical" data-code-key="TabsVertical" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsVertical, "Vertical")} />}>
                <p>
                    Setting the <code>verticalSizes</code> prop will make the tab headers appear vertically to the left of the tab content.
                    The column size of the tab headers can be set per breakpoint. In this case, the tab will be horizontal below the medium breakpoint,
                    and will use 3 columns at or above medium.
                </p>

                <Neo.TabContainer variant="pills" verticalSizes={{ md: 3 }}>
                    {t1} {t2} {t3}
                </Neo.TabContainer>
            </Neo.Card>

            <Neo.Card title="Icons" data-code-key="TabsIcon" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsIcon, "Icons")} />}>
                <p>
                    Setting the <code>icon</code> prop on each tab will add an icon to the left of the tab header text.
                </p>

                <Neo.TabContainer variant="flat">
                    {t1} {t2} {t3}
                    <Neo.Tab header="Icon Tab" icon="fa-chart-area">Content of icon tab</Neo.Tab>
                </Neo.TabContainer>
            </Neo.Card>

            

            <Neo.Card title="Bind selected tab" data-code-key="TabsBound" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsBound, "Bind selected tab")} />}>
                <p>
                    If you want to control the selected tab programatically, you can bind to the <code>selectedTab</code> property. The <code>selectedTab</code> is
                    referred to using its name rather than its index. If a <code>name</code> prop is not provided to a tab, its <code>header</code> prop will
                    be used as the tab name.
                </p>
                <p>
                    The tab manager component also accepts a <code>TabManager</code> instance. This offers more control than just using a <code>selectedTab</code> property.
                </p>
                <p>
                    Currently selected tab name is: <strong>{this.viewModel.selectedTab}</strong>
                    <Neo.Button size="sm" className="ml-3" onClick={() => this.viewModel.selectedTab = "Tab 1"}>Select tab 1</Neo.Button>
                </p>

                <Neo.TabContainer selectedTab={this.viewModel.meta.selectedTab} variant="flat">
                    {t1} {t2} {t3}
                    <Neo.Tab header="Click me" name="CustomName">Fourth tab</Neo.Tab>
                </Neo.TabContainer>
            </Neo.Card>

            <Neo.Card title="Events" data-code-key="TabsEvents" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_TabsEvents, "Events")} />}>
                <p>
                    The <code>Tab</code> component has 3 events:
                </p>
                <ul>
                    <li><code>onInitialise</code> - Called the first time the tab is displayed. This can be reset using <code>TabManager.reset</code></li>
                    <li><code>onDisplayed</code> - Called every time the tab is displayed. Including the first time, after onInitialise.</li>
                    <li><code>onLeave</code> - Called when the user is switching to a new tab.</li>
                </ul>

                <div data-code-content>
                    <Neo.TabContainer variant="flat">
                        <Neo.Tab header="Tab 1">
                            <p>
                                Open the dev tools console, and tab between this tab, and tab 2 to see the logs written by tab 2's <code>onInitialise</code> and <code>onDisplayed</code> events.
                            </p>
                            <p>
                                To see the <code>onLeave event, go to the 'Important tab'.</code>
                            </p>
                        </Neo.Tab>
                        <Neo.Tab header="Tab 2" onInitialise={() => this.onTab2Initialise()} onDisplayed={() => this.onTab2Displayed()}>
                            Click on Tab 1.
                        </Neo.Tab>
                        <Neo.Tab header="Important tab" onLeave={e => this.onTabLeave(e) }>
                            This tab will warn you when you try switch to a different tab.
                        </Neo.Tab>
                    </Neo.TabContainer>
                </div>
            </Neo.Card>

        </div>
    }

    // DemoCode: TabsEvents
    private onTab2Initialise() {
        console.log("Tab 2 initialised.");
    }

    private onTab2Displayed() {
        console.log("Tab 2 displayed.");
    }

    private onTabLeave(e: ICancellableEvent) {
        e.cancel();

        ModalUtils.showYesNo("Change tab", "Are you sure?", () => e.continue());
    }
    // End DemoCode
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_TabsFlat = [{ language: "jsx", code: 
`<p>
    By default, tabs with <code>variant</code> unspecified, or set to <code>tabs</code> will render with <code>cardMode</code> on. If you have a tab component
    nested in a card, you should disable card mode be setting <code>variant</code> to <code>flat</code>.
</p>

<Neo.TabContainer variant="flat">
    {t1} {t2} {t3}
    <Neo.Tab header="Disabled" disabled>Should not see this.</Neo.Tab>
</Neo.TabContainer>`}, { language: "javascript", code: `// Note: in a normal page you would place these tabs directly in the <TabContainer>. 
// This page is re-using these tabs multiple times which is why they are defined as variables.
const t1 = <Neo.Tab header="Tab 1">
    Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor,
    williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
    Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
</Neo.Tab>;
const t2 = <Neo.Tab header="Tab 2">
    Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level
    wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl
    cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown.
    Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown,
    tumblr butcher vero sint qui sapiente accusamus tattooed echo park.
</Neo.Tab>;
const t3 = <Neo.Tab header="Tab 3">
    Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag
    gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify
    squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably
    haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
</Neo.Tab>;`}];

const demo_source_code_TabsPill = [{ language: "jsx", code: 
`<p>Setting the <code>variant</code> prop to <code>pills</code> will cause the tab headers look like pills.</p>

<Neo.TabContainer variant="pills">
    {t1} {t2} {t3}
</Neo.TabContainer>`}];

const demo_source_code_TabsLink = [{ language: "jsx", code: 
`<p>
    Setting the <code>variant</code> prop to <code>none</code> will cause the tab headers look like normal links.
    In this example, the alignment is set to <code>center</code>. The alignment prop applies to all tab variants.
</p>

<Neo.TabContainer variant="none" align="center">
    {t1} {t2} {t3}
</Neo.TabContainer>`}];

const demo_source_code_TabsFill = [{ language: "jsx", code: 
`<p>
    Setting the <code>fillMode</code> prop will cause the tabs headers to span the whole width of the screen.
    Available modes are <code>fill</code> and <code>justified</code>.
</p>

<Neo.TabContainer variant="pills" fillMode="fill">
    {t1} {t2} {t3}
    <Neo.Tab header="Tab with long name">Content of tab with long name</Neo.Tab>
</Neo.TabContainer>`}];

const demo_source_code_TabsVertical = [{ language: "jsx", code: 
`<p>
    Setting the <code>verticalSizes</code> prop will make the tab headers appear vertically to the left of the tab content.
    The column size of the tab headers can be set per breakpoint. In this case, the tab will be horizontal below the medium breakpoint,
    and will use 3 columns at or above medium.
</p>

<Neo.TabContainer variant="pills" verticalSizes={{ md: 3 }}>
    {t1} {t2} {t3}
</Neo.TabContainer>`}];

const demo_source_code_TabsIcon = [{ language: "jsx", code: 
`<p>
    Setting the <code>icon</code> prop on each tab will add an icon to the left of the tab header text.
</p>

<Neo.TabContainer variant="flat">
    {t1} {t2} {t3}
    <Neo.Tab header="Icon Tab" icon="fa-chart-area">Content of icon tab</Neo.Tab>
</Neo.TabContainer>`}];

const demo_source_code_TabsBound = [{ language: "jsx", code: 
`<p>
    If you want to control the selected tab programatically, you can bind to the <code>selectedTab</code> property. The <code>selectedTab</code> is
    referred to using its name rather than its index. If a <code>name</code> prop is not provided to a tab, its <code>header</code> prop will
    be used as the tab name.
</p>
<p>
    The tab manager component also accepts a <code>TabManager</code> instance. This offers more control than just using a <code>selectedTab</code> property.
</p>
<p>
    Currently selected tab name is: <strong>{this.viewModel.selectedTab}</strong>
    <Neo.Button size="sm" className="ml-3" onClick={() => this.viewModel.selectedTab = "Tab 1"}>Select tab 1</Neo.Button>
</p>

<Neo.TabContainer selectedTab={this.viewModel.meta.selectedTab} variant="flat">
    {t1} {t2} {t3}
    <Neo.Tab header="Click me" name="CustomName">Fourth tab</Neo.Tab>
</Neo.TabContainer>`}];

const demo_source_code_TabsEvents = [{ language: "jsx", code: 
`<Neo.TabContainer variant="flat">
    <Neo.Tab header="Tab 1">
        <p>
            Open the dev tools console, and tab between this tab, and tab 2 to see the logs written by tab 2's <code>onInitialise</code> and <code>onDisplayed</code> events.
        </p>
        <p>
            To see the <code>onLeave event, go to the 'Important tab'.</code>
        </p>
    </Neo.Tab>
    <Neo.Tab header="Tab 2" onInitialise={() => this.onTab2Initialise()} onDisplayed={() => this.onTab2Displayed()}>
        Click on Tab 1.
    </Neo.Tab>
    <Neo.Tab header="Important tab" onLeave={e => this.onTabLeave(e) }>
        This tab will warn you when you try switch to a different tab.
    </Neo.Tab>
</Neo.TabContainer>`}, { language: "javascript", code: `private onTab2Initialise() {
    console.log("Tab 2 initialised.");
}

private onTab2Displayed() {
    console.log("Tab 2 displayed.");
}

private onTabLeave(e: ICancellableEvent) {
    e.cancel();

    ModalUtils.showYesNo("Change tab", "Are you sure?", () => e.continue());
}`}];
