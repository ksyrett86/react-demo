import CodeUtil from '../../Components/CodeUtil';
import React from "react";
import { Neo, Views } from '@singularsystems/neo-react';
import { EnumItems } from "../Models/DropDownModel";
import { EnumHelper, Misc, NumberUtils } from '@singularsystems/neo-core';
import { observer } from 'mobx-react';
import DropDownVM from "./DropDownVM";
import { countries } from "../Models/DemoApiClient";

@observer
export default class DropDownDemo extends Views.ViewBase<DropDownVM> {

    constructor(props: unknown) {
        super("Select & Radio List", DropDownVM, props);

    }

    public render() {
        const basicModel = this.viewModel.basicModel,
            asyncModel = this.viewModel.asyncModel;

        return (
            <div className="constrain-width">
                <Neo.Card title="Select" icon="caret-down">
                    <p>
                        The <code>Neo.DropDown</code> component renders a simple html <code>select</code> element for displaying a list of
                        items in a drop down.
                    </p>
                    <p>
                        Advantages and disadvantages of using an html <code>select</code> element instead of a custom drop down component:
                    </p>
                    <Neo.GridLayout>
                        <div>
                            <strong>Advantages</strong>
                            <ul>
                                <li><code>Select</code> is a native control. The operating system or browser will display the select the same as most other apps the user is used to using.</li>
                                <li>This includes phones, where the phone will display a native ui to select an item.</li>
                            </ul>
                        </div>
                        <div>
                            <strong>Disadvantages</strong>
                            <ul>
                                <li>Limited functionality, including difficulty overriding styling.</li>
                                <li>Can only be used for short lists due to the following reasons:
                                    <ul>
                                        <li>You will have to load all the data and provide it to the drop down up front. The data cannot be incrementally loaded.</li>
                                        <li>The user has no way to search for an item apart from scanning through the list of items.</li>
                                        <li>When used in a grid, each drop down item is rendered for each row of the grid, slowing down initial rendering.</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Usage" icon="caret-up" data-code-key="DropDownSimple" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DropDownSimple, "Usage")} />}>

                    <Neo.GridLayout>
                        <div>
                            <p>
                                To render a form group as a drop down, specify the <code>select</code> prop. The simplest usage is to pass an array of items.
                                The first numeric property will be used as the value member. The first string property that doesn't end with <code>id</code> will be used as the display member.
                            </p>
                            <p>
                                You can also specify the display and value member, but they are not required.
                            </p>
                        </div>
                        <div>
                            <Neo.FormGroup bind={basicModel.meta.selectedItem} select={{ items: this.viewModel.basicItems }} />
                        </div>
                    </Neo.GridLayout>

                    <h6>Async data</h6>
                    <Neo.GridLayout>
                        <div>
                            If your data comes from a data source such as the app data cache, or an async data source, you can use the <code>itemSource</code> prop.
                            The select will initially render empty (with a loading spinner), and then render the items once the data has loaded.
                        </div>
                        <div>
                            <Neo.FormGroup bind={basicModel.meta.country} select={{ itemSource: this.viewModel.countryDataSource }} />
                            <Neo.Button size="sm" onClick={() => this.viewModel.countryDataSource.fetchDataAsync()}>Reload</Neo.Button>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Enums" data-code-key="DropDownEnum" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DropDownEnum, "Enums")} />}>

                    <Neo.GridLayout>
                        <div>
                            You can use the <code>EnumHelper</code> class to convert an enum to a list and pass this as the <code>items</code> prop.
                            You can also use the <code>EnumHelper</code> class to change the display text of each enum item.
                        </div>
                        <div>
                            <Neo.DropDown bind={basicModel.meta.selectedItemEnum} select={{ items: EnumHelper.asList(EnumItems) }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Blank item" data-code-key="DropDownNullable" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DropDownNullable, "Blank item")} />}>

                    <Neo.GridLayout>
                        <div>
                            <p>
                                On initial render of the drop down, if the bound property is null, a blank item will be shown in the drop down list.
                                This is because the text that displays in the 'closed' state cannot be disconnected from the drop down items.
                                Once you select an item (or if the bound property is not null), the blank item is removed. (Look at the first drop down in the demo to see this.)
                            </p>
                            <p>
                                This means that the user cannot de-select the item. To always show a blank item, add <code>@Attributes.Nullable()</code> to
                                the bound property, or set the <code>allowNulls</code> prop.
                            </p>
                        </div>
                        <div>
                            <Neo.DropDown bind={basicModel.meta.selectedItem} select={{ items: this.viewModel.basicItems, allowNulls: true }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <div className="mt-5">
                    <h3>Async / Multi-select</h3>

                    <Neo.Card>
                        The <code>Neo.AutoCompleteDropDown</code> supports some more advanced scenarios such as async fetch, and multiple selection. 
                        It is a wrapper of the <a href="https://react-select.com/">react-select</a> component, and provides the familiar binding interface used by the other neo controls.
                    </Neo.Card>

                    <Neo.Card title="Async" data-code-key="AsyncDropDownBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AsyncDropDownBasic, "Async")} />}>
                        <Neo.GridLayout>
                            <div>
                                <p>
                                    The async drop down requires the following props:
                                </p>
                                <ul>
                                    <li>
                                        <code>itemSource</code> - A callback function, or api client method which takes in a string, and returns a list. The value that the user types in the search box
                                            of the drop down will be passed to this function.
                                    </li>
                                    <li>
                                        <code>bind</code> - Same as a normal drop down. This value will be set to the selected items id.
                                    </li>
                                    <li>
                                        <code>bindDisplay</code> - Because an async drop down will never have the entire list of available items, it cannot always look up the display value of an item from 
                                            its id. You will need to provide the display value when loading data from the server. This prop is telling the drop down which property on your model contains the display value.
                                            When the user selects a new item, the value of this property will be updated automatically. 
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Neo.AutoCompleteDropDown 
                                    itemSource={this.viewModel.demoApiClient.getCountries} 
                                    bind={asyncModel.meta.selectedCountryId} 
                                    bindDisplay={asyncModel.meta.selectedCountryName} />
                            
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>

                    <Neo.Card title="Default items" data-code-key="AsyncDropDownDefaultItems" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AsyncDropDownDefaultItems, "Default items")} />}>
                        <Neo.GridLayout>
                            <div>
                                <p>
                                    If you have a list of options that the user can choose without searching, you can specify these using
                                    the <code>items</code> prop.
                                </p>
                                <p>
                                    As long as an <code>itemSource</code> prop is specified, the user can still do a full search by typing.
                                </p>
                            </div>
                            <div>
                                <Neo.AutoCompleteDropDown 
                                    itemSource={this.viewModel.demoApiClient.getCountries} 
                                    bind={asyncModel.meta.selectedCountryId2} 
                                    bindDisplay={asyncModel.meta.selectedCountryName2}
                                    items={countries.filter(c => c.flag)} />
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>

                    <Neo.Card title="Custom items" data-code-key="AsyncDropDownCustomItems" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AsyncDropDownCustomItems, "Custom items")} />}>
                        <Neo.GridLayout>
                            <div>
                                <p>
                                    By default, the drop down items will show the value of the <code>displayMember</code> property. You can customise this using 
                                    the <code>option</code> prop.
                                </p>
                                <p>
                                    This prop expects a function which takes in an item, and returns a JSX element. The element you return will be wrapped in a div
                                    with a class name of <code>react-select-row</code>. 
                                </p>
                                <p>
                                    To display multiple columns, return a react fragment, and set the <code>flex-basis</code> style of each column to alter its width.
                                    Refer to the following examples.
                                </p>
                            </div>
                            <div>
                                <div>
                                    {/* The css for the options below is in the demo.scss file. */}
                                    <small className="text-muted">Stacked</small>
                                    <Neo.AutoCompleteDropDown 
                                        itemSource={this.viewModel.demoApiClient.getCountries} 
                                        bind={asyncModel.meta.selectedCountryId3} 
                                        bindDisplay={asyncModel.meta.selectedCountryName3}
                                        items={countries.filter(c => c.flag)}
                                        option={item => <div className="country-option">
                                                            <div className="country-option-name">{item.countryName}</div>
                                                            <div className="country-option-population">Population: {NumberUtils.format(item.population, Misc.NumberFormat.NoDecimals)}</div>
                                                            <div className="country-option-flag">{item.flag && <img src={item.flag} alt="Flag" />}</div>
                                                        </div>} />
                                </div>
         
                                <div className="mt-3">
                                    <small className="text-muted">Columns</small>
                                    <Neo.AutoCompleteDropDown 
                                        itemSource={this.viewModel.demoApiClient.getCountries} 
                                        bind={asyncModel.meta.selectedCountryId3} 
                                        bindDisplay={asyncModel.meta.selectedCountryName3}
                                        items={countries.filter(c => c.flag)}
                                        option={item => <>
                                                            <div style={{flexBasis: 200}}>{item.countryName}</div>
                                                            <div style={{flexBasis: 200}}><small className="text-muted">Population:</small> {NumberUtils.format(item.population, Misc.NumberFormat.NoDecimals)}</div>
                                                            <div style={{flexBasis: 0}}>{item.flag && <img src={item.flag} alt="Flag" />}</div>
                                                        </>} />
                                </div>
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>

                    <Neo.Card title="Descriptions" data-code-key="AsyncDropDownDescriptions" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AsyncDropDownDescriptions, "Descriptions")} />}>
                        <Neo.GridLayout>
                            <div>
                                To show descriptions as muted text below the display text, you can use the <code>descriptionMember</code> prop to specify the description property name.
                                If you use an enum list, the descriptions will show if you have decorated the enum using <code>EnumHelper.decorateEnum</code>.
                            </div>
                            <div>
                                <Neo.AutoCompleteDropDown bind={basicModel.meta.selectedItemEnum} items={EnumHelper.asList(EnumItems)} />
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>
                    
                    <Neo.Card title="Multi select" data-code-key="AsyncDropDownMultiSelect" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AsyncDropDownMultiSelect, "Multi select")} />}>
                        <Neo.GridLayout>
                            <div>
                                <p>
                                    To support selection of multiple items, you need to provide the <code>bindItems</code> prop. This accepts a list of <code>Model.ISelectedItem</code>.
                                </p>
                                <p>
                                    You can also specify the optional <code>bindIds</code> prop if you need to send a list of ids back to the server. If you do have a list of ids, you 
                                    should add <code>@Attributes.NoTracking</code> to the <i>selected items</i> property on your model to prevent it being serialised together with the ids.
                                </p>
                            </div>
                            <div>
                                <Neo.AutoCompleteDropDown 
                                    itemSource={this.viewModel.demoApiClient.getCountries} 
                                    bindItems={asyncModel.meta.selectedItems} 
                                    bindIds={asyncModel.selectedIds} />

                                {asyncModel.selectedIds.length > 0 && <div className="mt-3">
                                    <small className="text-muted">Selected ids:</small>
                                    {asyncModel.selectedIds.map(id => <div><small key={id}>{id}</small></div>)}
                                </div>}
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>

                    <Neo.Card title="Non async">
                        <Neo.GridLayout>
                            <div>
                                <p>
                                    It is not necessary to set the <code>itemSource</code> prop if you have an in memory list of items. You can set 
                                    the <code>items</code> prop on its own.
                                </p>
                            </div>
                            <div>
                                <Neo.AutoCompleteDropDown 
                                    items={countries} 
                                    bindItems={asyncModel.meta.selectedItems2}
                                    bindIds={asyncModel.selectedIds2} />
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>

                    <Neo.Card title="Use with form group" data-code-key="AsyncDropDownFormGroup" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_AsyncDropDownFormGroup, "Use with form group")} />}>
                        <Neo.GridLayout>
                            <div>
                                <p>
                                    In order to tell a form group to render a normal drop down, you would specify the <code>select</code> prop. The auto complete 
                                    drop down is not one of the basic core controls, and does not have its props exposed from the form group.
                                </p>
                                <p>
                                    If you need the features of the form group (you need a label, or need to show validation errors), you can nest the auto complete
                                    drop down in a form group.
                                </p>
                                <p>
                                    If the inner control does not have a bind prop, you can set the <code>bindContext</code> property of the form group.
                                </p>
                                
                            </div>
                            <div>
                            <Neo.FormGroup>
                                <Neo.AutoCompleteDropDown 
                                    itemSource={this.viewModel.demoApiClient.getCountries} 
                                    bind={asyncModel.meta.selectedCountryId4} 
                                    bindDisplay={asyncModel.meta.selectedCountryName4} />
                            </Neo.FormGroup>
                            </div>
                        </Neo.GridLayout>
                    </Neo.Card>
                </div>

                <h3 className="mt-5">Radio list</h3>

                <Neo.Card>
                    <p className="mb-0">
                        A radio button list works similarly to a drop down. You have a list of items, where the id of the selected item is bound to a property.
                    </p>
                </Neo.Card>

                <Neo.Card title="Usage" data-code-key="RadioBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_RadioBasic, "Usage")} />}>
                    <Neo.GridLayout>
                        <div>
                            Form groups, and the <code>Neo.RadioList</code> component can be controlled using the <code>radioList</code> prop.
                            Since a radio list is much more likely to be used with an enum, an <code>enumType</code> prop is available to specify the radio items.
                            You can also use the <code>items</code> prop to provide an array of items. <br />
                            The display and value member detection work the same way as the drop down.
                        </div>
                        <div>
                            <Neo.RadioList bind={basicModel.meta.selectedItemEnum} radioList={{ enumType: EnumItems }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Form group" data-code-key="RadioFormGroup" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_RadioFormGroup, "Form group")} />}>
                    <Neo.GridLayout>
                        <div>
                            To align the label of the form group with the first item of the radio list, specify <code>pt-0</code> on the label class.
                        </div>
                        <div>
                            <Neo.FormGroupInline bind={basicModel.meta.selectedItemEnum} radioList={{ enumType: EnumItems }} labelProps={{ className: "pt-0" }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Horizontal" data-code-key="RadioInline" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_RadioInline, "Horizontal")} />}>
                    <Neo.GridLayout>
                        <div>
                            For a horizontal (inline) list, set <code>inline</code> to <code>true</code>.
                        </div>
                        <div>
                            <Neo.FormGroup bind={basicModel.meta.selectedItemEnum} radioList={{ enumType: EnumItems, inline: true }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Boolean Id" data-code-key="RadioBoolean" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_RadioBoolean, "Boolean Id")} />}>
                    <Neo.GridLayout>
                        <div>
                            You can also bind a radio list to a boolean property by passing two items with a true and false id. This may be more user friendly
                            than a checkbox if the display values are not simply yes / no.
                        </div>
                        <div>
                            <Neo.RadioList bind={basicModel.meta.isSell} radioList={{ items: [{ id: false, text: "Buy" }, { id: true, text: "Sell" }], inline: true }} />
                        </div>
                        <div>
                            When using a nullable boolean it makes even more sense.
                        </div>
                        <div>
                            <Neo.RadioList bind={basicModel.meta.yesNoAll} radioList={{ items: [{ id: null, text: "(All)" }, { id: true, text: "Yes" }, { id: false, text: "No" }, ], inline: true, valueMember: "id" }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_DropDownSimple = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            To render a form group as a drop down, specify the <code>select</code> prop. The simplest usage is to pass an array of items.
            The first numeric property will be used as the value member. The first string property that doesn't end with <code>id</code> will be used as the display member.
        </p>
        <p>
            You can also specify the display and value member, but they are not required.
        </p>
    </div>
    <div>
        <Neo.FormGroup bind={basicModel.meta.selectedItem} select={{ items: this.viewModel.basicItems }} />
    </div>
</Neo.GridLayout>

<h6>Async data</h6>
<Neo.GridLayout>
    <div>
        If your data comes from a data source such as the app data cache, or an async data source, you can use the <code>itemSource</code> prop.
        The select will initially render empty (with a loading spinner), and then render the items once the data has loaded.
    </div>
    <div>
        <Neo.FormGroup bind={basicModel.meta.country} select={{ itemSource: this.viewModel.countryDataSource }} />
        <Neo.Button size="sm" onClick={() => this.viewModel.countryDataSource.fetchDataAsync()}>Reload</Neo.Button>
    </div>
</Neo.GridLayout>`}, { language: "javascript", title: "Property on ViewModel", code: `public countryDataSource = new Data.ApiClientDataSource(this.demoApiClient.getDropDownList);`}];

const demo_source_code_DropDownEnum = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        You can use the <code>EnumHelper</code> class to convert an enum to a list and pass this as the <code>items</code> prop.
        You can also use the <code>EnumHelper</code> class to change the display text of each enum item.
    </div>
    <div>
        <Neo.DropDown bind={basicModel.meta.selectedItemEnum} select={{ items: EnumHelper.asList(EnumItems) }} />
    </div>
</Neo.GridLayout>`}, { language: "javascript", code: `export enum EnumItems {
    Zero = 0,
    One = 1,
    Two = 2
}

// Use the enum helper to change the enum item display and description values, or the order of each item.
EnumHelper.decorateEnum(EnumItems, e => {
    e.describe(EnumItems.Zero, "None", "This is the description");
    e.describe(EnumItems.One, "One", "Description for one.");
    e.describe(EnumItems.Two, "Two", "Did you know 1 + 1 = 2?");
});`}];

const demo_source_code_DropDownNullable = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            On initial render of the drop down, if the bound property is null, a blank item will be shown in the drop down list.
            This is because the text that displays in the 'closed' state cannot be disconnected from the drop down items.
            Once you select an item (or if the bound property is not null), the blank item is removed. (Look at the first drop down in the demo to see this.)
        </p>
        <p>
            This means that the user cannot de-select the item. To always show a blank item, add <code>@Attributes.Nullable()</code> to
            the bound property, or set the <code>allowNulls</code> prop.
        </p>
    </div>
    <div>
        <Neo.DropDown bind={basicModel.meta.selectedItem} select={{ items: this.viewModel.basicItems, allowNulls: true }} />
    </div>
</Neo.GridLayout>`}, { language: "javascript", title: "Bound model property", code: `@Attributes.Nullable()
@Attributes.Integer()
public selectedItem: number | null = null;`}];

const demo_source_code_AsyncDropDownBasic = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The async drop down requires the following props:
        </p>
        <ul>
            <li>
                <code>itemSource</code> - A callback function, or api client method which takes in a string, and returns a list. The value that the user types in the search box
                    of the drop down will be passed to this function.
            </li>
            <li>
                <code>bind</code> - Same as a normal drop down. This value will be set to the selected items id.
            </li>
            <li>
                <code>bindDisplay</code> - Because an async drop down will never have the entire list of available items, it cannot always look up the display value of an item from 
                    its id. You will need to provide the display value when loading data from the server. This prop is telling the drop down which property on your model contains the display value.
                    When the user selects a new item, the value of this property will be updated automatically. 
            </li>
        </ul>
    </div>
    <div>
        <Neo.AutoCompleteDropDown 
            itemSource={this.viewModel.demoApiClient.getCountries} 
            bind={asyncModel.meta.selectedCountryId} 
            bindDisplay={asyncModel.meta.selectedCountryName} />
    
    </div>
</Neo.GridLayout>`}, { language: "javascript", code: `// Note: Filtering would usually be done in the database. This code is for demo purposes only.
public async getCountries(countryName: string): Promise<AxiosResponse<ICountry[]>> {
    await TaskRunner.delay(150);
    return { data: countries.filter(c => c.countryName.toLowerCase().startsWith(countryName.toLowerCase())).slice(0, 30) } as any;
}`}, { language: "javascript", title: "Model properties", code: `@Rules.Required()
selectedCountryId: number | null = null;

// Client only properties

// The display name should be set when the model is loaded from the database.
@Attributes.NoTracking(Misc.SerialiseType.FullOnly)
selectedCountryName: string | null = null;`}];

const demo_source_code_AsyncDropDownDefaultItems = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            If you have a list of options that the user can choose without searching, you can specify these using
            the <code>items</code> prop.
        </p>
        <p>
            As long as an <code>itemSource</code> prop is specified, the user can still do a full search by typing.
        </p>
    </div>
    <div>
        <Neo.AutoCompleteDropDown 
            itemSource={this.viewModel.demoApiClient.getCountries} 
            bind={asyncModel.meta.selectedCountryId2} 
            bindDisplay={asyncModel.meta.selectedCountryName2}
            items={countries.filter(c => c.flag)} />
    </div>
</Neo.GridLayout>`}];

const demo_source_code_AsyncDropDownCustomItems = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            By default, the drop down items will show the value of the <code>displayMember</code> property. You can customise this using 
            the <code>option</code> prop.
        </p>
        <p>
            This prop expects a function which takes in an item, and returns a JSX element. The element you return will be wrapped in a div
            with a class name of <code>react-select-row</code>. 
        </p>
        <p>
            To display multiple columns, return a react fragment, and set the <code>flex-basis</code> style of each column to alter its width.
            Refer to the following examples.
        </p>
    </div>
    <div>
        <div>
            {/* The css for the options below is in the demo.scss file. */}
            <small className="text-muted">Stacked</small>
            <Neo.AutoCompleteDropDown 
                itemSource={this.viewModel.demoApiClient.getCountries} 
                bind={asyncModel.meta.selectedCountryId3} 
                bindDisplay={asyncModel.meta.selectedCountryName3}
                items={countries.filter(c => c.flag)}
                option={item => <div className="country-option">
                                    <div className="country-option-name">{item.countryName}</div>
                                    <div className="country-option-population">Population: {NumberUtils.format(item.population, Misc.NumberFormat.NoDecimals)}</div>
                                    <div className="country-option-flag">{item.flag && <img src={item.flag} alt="Flag" />}</div>
                                </div>} />
        </div>
         
        <div className="mt-3">
            <small className="text-muted">Columns</small>
            <Neo.AutoCompleteDropDown 
                itemSource={this.viewModel.demoApiClient.getCountries} 
                bind={asyncModel.meta.selectedCountryId3} 
                bindDisplay={asyncModel.meta.selectedCountryName3}
                items={countries.filter(c => c.flag)}
                option={item => <>
                                    <div style={{flexBasis: 200}}>{item.countryName}</div>
                                    <div style={{flexBasis: 200}}><small className="text-muted">Population:</small> {NumberUtils.format(item.population, Misc.NumberFormat.NoDecimals)}</div>
                                    <div style={{flexBasis: 0}}>{item.flag && <img src={item.flag} alt="Flag" />}</div>
                                </>} />
        </div>
    </div>
</Neo.GridLayout>`}];

const demo_source_code_AsyncDropDownDescriptions = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        To show descriptions as muted text below the display text, you can use the <code>descriptionMember</code> prop to specify the description property name.
        If you use an enum list, the descriptions will show if you have decorated the enum using <code>EnumHelper.decorateEnum</code>.
    </div>
    <div>
        <Neo.AutoCompleteDropDown bind={basicModel.meta.selectedItemEnum} items={EnumHelper.asList(EnumItems)} />
    </div>
</Neo.GridLayout>`}, { language: "javascript", code: `export enum EnumItems {
    Zero = 0,
    One = 1,
    Two = 2
}

// Use the enum helper to change the enum item display and description values, or the order of each item.
EnumHelper.decorateEnum(EnumItems, e => {
    e.describe(EnumItems.Zero, "None", "This is the description");
    e.describe(EnumItems.One, "One", "Description for one.");
    e.describe(EnumItems.Two, "Two", "Did you know 1 + 1 = 2?");
});`}];

const demo_source_code_AsyncDropDownMultiSelect = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            To support selection of multiple items, you need to provide the <code>bindItems</code> prop. This accepts a list of <code>Model.ISelectedItem</code>.
        </p>
        <p>
            You can also specify the optional <code>bindIds</code> prop if you need to send a list of ids back to the server. If you do have a list of ids, you 
            should add <code>@Attributes.NoTracking</code> to the <i>selected items</i> property on your model to prevent it being serialised together with the ids.
        </p>
    </div>
    <div>
        <Neo.AutoCompleteDropDown 
            itemSource={this.viewModel.demoApiClient.getCountries} 
            bindItems={asyncModel.meta.selectedItems} 
            bindIds={asyncModel.selectedIds} />

        {asyncModel.selectedIds.length > 0 && <div className="mt-3">
            <small className="text-muted">Selected ids:</small>
            {asyncModel.selectedIds.map(id => <div><small key={id}>{id}</small></div>)}
        </div>}
    </div>
</Neo.GridLayout>`}, { language: "javascript", title: "Model properties", code: `selectedIds: number[] = [];

@Attributes.NoTracking()
selectedItems: Model.ISelectedItem[] = [];`}];

const demo_source_code_AsyncDropDownFormGroup = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            In order to tell a form group to render a normal drop down, you would specify the <code>select</code> prop. The auto complete 
            drop down is not one of the basic core controls, and does not have its props exposed from the form group.
        </p>
        <p>
            If you need the features of the form group (you need a label, or need to show validation errors), you can nest the auto complete
            drop down in a form group.
        </p>
        <p>
            If the inner control does not have a bind prop, you can set the <code>bindContext</code> property of the form group.
        </p>
        
    </div>
    <div>
    <Neo.FormGroup>
        <Neo.AutoCompleteDropDown 
            itemSource={this.viewModel.demoApiClient.getCountries} 
            bind={asyncModel.meta.selectedCountryId4} 
            bindDisplay={asyncModel.meta.selectedCountryName4} />
    </Neo.FormGroup>
    </div>
</Neo.GridLayout>`}];

const demo_source_code_RadioBasic = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        Form groups, and the <code>Neo.RadioList</code> component can be controlled using the <code>radioList</code> prop.
        Since a radio list is much more likely to be used with an enum, an <code>enumType</code> prop is available to specify the radio items.
        You can also use the <code>items</code> prop to provide an array of items. <br />
        The display and value member detection work the same way as the drop down.
    </div>
    <div>
        <Neo.RadioList bind={basicModel.meta.selectedItemEnum} radioList={{ enumType: EnumItems }} />
    </div>
</Neo.GridLayout>`}];

const demo_source_code_RadioFormGroup = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        To align the label of the form group with the first item of the radio list, specify <code>pt-0</code> on the label class.
    </div>
    <div>
        <Neo.FormGroupInline bind={basicModel.meta.selectedItemEnum} radioList={{ enumType: EnumItems }} labelProps={{ className: "pt-0" }} />
    </div>
</Neo.GridLayout>`}];

const demo_source_code_RadioInline = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        For a horizontal (inline) list, set <code>inline</code> to <code>true</code>.
    </div>
    <div>
        <Neo.FormGroup bind={basicModel.meta.selectedItemEnum} radioList={{ enumType: EnumItems, inline: true }} />
    </div>
</Neo.GridLayout>`}];

const demo_source_code_RadioBoolean = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        You can also bind a radio list to a boolean property by passing two items with a true and false id. This may be more user friendly
        than a checkbox if the display values are not simply yes / no.
    </div>
    <div>
        <Neo.RadioList bind={basicModel.meta.isSell} radioList={{ items: [{ id: false, text: "Buy" }, { id: true, text: "Sell" }], inline: true }} />
    </div>
    <div>
        When using a nullable boolean it makes even more sense.
    </div>
    <div>
        <Neo.RadioList bind={basicModel.meta.yesNoAll} radioList={{ items: [{ id: null, text: "(All)" }, { id: true, text: "Yes" }, { id: false, text: "No" }, ], inline: true, valueMember: "id" }} />
    </div>
</Neo.GridLayout>`}];
