import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { ModelBase, NeoModel, Attributes, List, Misc, ModalUtils, NumberUtils } from '@singularsystems/neo-core';
import { observer } from 'mobx-react';
import { NeoGrid, Neo, Views } from '@singularsystems/neo-react';
import { AppService, Types } from '../../Services/AppService';

@NeoModel
class ChildItem extends ModelBase {
    name: string = ""

    @Attributes.Float()
    value: number = 0;
}

// tslint:disable-next-line: max-classes-per-file
@NeoModel
class GridItem extends ModelBase {

    stringProperty = ""

    stringProperty2 = ""

    @Attributes.Integer()
    intProperty = 0

    @Attributes.Float()
    floatProperty = 0

    @Attributes.Date()
    dateProperty?: Date

    boolProperty: boolean = false

    isExpanded = false;

    @Attributes.Float()
    get childTotal() {
        return this.childItems.reduce((total, item) => total += item.value, 0);
    }

    childItems = new List(ChildItem);
}

// tslint:disable-next-line: max-classes-per-file
@NeoModel
class GridViewModel extends Views.ViewModelBase {

    constructor(taskRunner = AppService.get(Types.Neo.TaskRunner)) {
        super(taskRunner);
    }

    filter: string = "";

    items = new List(GridItem);

    initialise() {
        this.items.set([
            { stringProperty: "Item 1", intProperty: 0, floatProperty: 123.45, dateProperty: new Date() },
            { stringProperty: "Item 2", intProperty: 9999, floatProperty: 0.12, dateProperty: new Date(2010, 0, 1) },
            { stringProperty: "Item 3", intProperty: 23456, floatProperty: 6000, dateProperty: new Date(), isExpanded: true },
            { stringProperty: "Item 4", intProperty: 9999, floatProperty: 405, dateProperty: new Date() },
            { stringProperty: "Item 5", intProperty: 5578, floatProperty: 123.45, dateProperty: new Date(2022, 1, 2) },
            { stringProperty: "Item 6", intProperty: 8888, floatProperty: 0.12, dateProperty: new Date(2010, 0, 1) },
            { stringProperty: "Item 7", intProperty: 33456, floatProperty: 6000, dateProperty: new Date() }
        ]);

        this.items[2].childItems.set([{ name: "Item 3.1", value: 22 }, { name: "Item 3.2", value: 34 }]);
    }
}

// tslint:disable-next-line: max-classes-per-file
@observer
export default class GridDemo extends Views.ViewBase<GridViewModel> {

    constructor(props: unknown) {
        super("Grid", GridViewModel, props);

    }

    async confirmDelete(item: GridItem) {
        if (await ModalUtils.showYesNo("Delete", "Are you sure you want to delete this item?") === Misc.ModalResult.Yes) {
            this.viewModel.items.removeWithoutTracking(item);
        }
    }

    editItem(item: GridItem) {
        ModalUtils.showMessage("Edit", "You clicked edit on " + item.stringProperty);
    }

    render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Grids" className="mt-3">
                    <p>
                        The <code>NeoGrid</code> namespace contains all the components required to show a data grid. The root component is always
                        the <code>NeoGrid.Grid</code> component. The grid either gets its data from an external component such as a <code>pager</code> or
                        <code> scroller</code>, or from the <code>items</code> prop.
                    </p>
                    <p>
                        The child component of a grid is always a callback function which takes two arguments: <code>(item, meta)</code>. This callback
                        is run for each item in the datasource of the grid and is effectively an item template. Since the grid is based on an html table,
                        the item template must always be a row, or list of rows.
                    </p>
                    <h6>Rows</h6>
                    <p>
                        The <code>NeoGrid.Row</code> component will render a single <code>tr</code> element in the header of the table, and a <code>tr</code> element
                        for each item of the datasource in the body of the table. <br />
                        You can specify multiple rows per item by providing a <code>NeoGrid.RowGroup</code> component as the item template, and nesting multiple
                        row components inside it.
                    </p>
                    <h6>Columns</h6>
                    <p>
                        The <code>NeoGrid.Column</code> component renders a <code>th</code> cell in the header, and <code>td</code> cells in the body. The properties
                        of the <code>NeoGrid.Column</code> component are the same as the <code>Neo.FormGroup</code> component. You can use the <code>bind</code> prop
                        for an editable control, and <code>display</code> for a read only control, as well specifying label, append / prepend, date, numeric, and drop down options etc).
                    </p>
                    <h6>Additional column properties</h6>
                    <ul>
                        <li><code>hideBelow</code> - Hide the column below a certain screen size.</li>
                        <li><code>hideAbove</code> - Hide the column above, or equal to a certain screen size.</li>
                    </ul>
                    <h6>Buttons</h6>
                    <p>
                        To show an add new button, specify the <code>showAddButton</code> prop on the grid. When the Add button is clicked, it will call <code>addNew()</code> if
                        the datasource is a <code>List</code>.
                    </p>
                    <p>
                        To show a delete button, add a <code>NeoGrid.ButtonColumn</code> column where you want the column to appear, and specify the <code>showDelete</code> prop.
                        The delete button will call <code>remove(item)</code> if the datasource is a <code>List</code>.
                    </p>
                </Neo.Card>

                <Neo.Card title="Example" data-code-key="GridBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_GridBasic, "Example")} />}>
                    <NeoGrid.Grid items={this.viewModel.items} showAddButton>
                        {(item, meta) => (
                            <NeoGrid.Row>
                                <NeoGrid.Column bind={meta.stringProperty} />
                                <NeoGrid.Column
                                    bind={meta.intProperty}
                                    append={<Neo.Button size="sm" icon="far-plus-square" variant="dark" onClick={() => item.intProperty += 1}>{item.intProperty}</Neo.Button>} />
                                <NeoGrid.Column bind={meta.floatProperty} label={<strong>Custom header</strong>} />
                                <NeoGrid.Column bind={meta.dateProperty} />
                                <NeoGrid.Column bind={meta.boolProperty} input={{ type: "switch" }} sort={false} />
                                <NeoGrid.Column hideBelow="lg">
                                    <span>Value is: {item.intProperty}</span>
                                </NeoGrid.Column>
                                <NeoGrid.ButtonColumn showDelete />
                            </NeoGrid.Row>
                        )}
                    </NeoGrid.Grid>
                </Neo.Card>

                <Neo.Card title="Custom columns" className="mt-3" data-code-key="GridCustomColumns" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_GridCustomColumns, "Custom columns")} />}>

                    <p>
                        The <code>NeoGrid.Column</code> component does not require a <code>bind</code> or <code>display</code> prop. Any content specified in
                        the <code>NeoGrid.Column</code> tags will be rendered in the table body. If you specify child content, and
                        a <code>bind</code> or <code>display</code> prop, the custom content will be displayed next to the bound control. (See int column below).
                    </p>
                    <p>
                        If you are using the current item in the column tag, you must use a callback function to return the content (See int column below). If
                        not, you don't need to use a callback function (like the custom column).
                    </p>

                    <h6>Sorting</h6>
                    <p>
                        By default, all bound columns are sortable. To disable sorting for the entire grid, you can specify <code>{"allowSort={false}"}</code> on the grid.
                        To prevent sorting on a column, set <code>{"sort={false}"}</code> on the column.
                    </p>
                    <p>
                        If you have a custom column, and want to allow sorting on that column, you can specify the sort property: <code>{"sort={meta.stringProperty}"}</code>.
                        This is useful if you display a formatted version of a property in an unbound column, but still want the user to sort by the original property value.
                    </p>

                    <h6>Initial sort</h6>
                    <p>
                        To set an initial sort column, specify the <code>initialSort</code> prop on the grid. This can be set even if the column is already sorted, as it
                        shows the user which column is sorted in the header.
                    </p>

                    <h6>Totals</h6>
                    <p>
                        To show a total of a column, you can specify the <code>sum</code> prop on the column. If you need to show some other value or text in the footer,
                        you can use the <code>footerContent</code> prop. (See the stringProperty, Int (R) columns). The grids filtered item array is passed into the callback function
                        which allows you to show values other than a simple sum.
                    </p>

                    <h6>Customise default buttons</h6>
                    <p>
                        To customise the add new / edit and delete buttons, you can specify a button options object rather than using the showXXX boolean value.
                        The options object takes the same props as the <code>Neo.Button</code> component. Specifying an <code>onClick</code> prop will override
                        the default behaviour of the grid.
                    </p>
                    <p>
                        The default button text and styles can be set globally using the grid settings object under <code>Misc.Settings.grid</code>.
                    </p>

                    <div data-code-content>
                        <NeoGrid.Grid items={this.viewModel.items} addButton={{ text: "Custom add", onClick: () => ModalUtils.showMessage("Add", "You clicked add") }} initialSort="floatProperty">
                            {(item, meta) => (
                                <NeoGrid.Row>
                                    <NeoGrid.Column display={meta.stringProperty} footerContent={(t) => "Totals"} />

                                    <NeoGrid.Column display={meta.intProperty} sum sort={false}>
                                        {/* Child elements will be added after the value of the bound element. 
                                            To suppress the value of the bound element, use bindContext instead of bind / display, or suppressDefaultContent if you need to suppress conditionally. */}
                                        <Neo.Button size="sm" icon="far-plus-square" variant="dark" className="ml-1" onClick={() => item.intProperty += 1} />
                                    </NeoGrid.Column>

                                    <NeoGrid.Column display={meta.intProperty} 
                                        numProps={{ format: Misc.NumberFormat.CurrencyDecimals }} 
                                        label="Int (R)"
                                        footerContent={(t: GridItem[]) => "Avg: " + NumberUtils.format(t.average(c => c.intProperty), Misc.NumberFormat.CurrencyDecimals)} />

                                    <NeoGrid.Column display={meta.floatProperty} sum />

                                    <NeoGrid.Column display={meta.dateProperty} />

                                    <NeoGrid.Column label="Custom" sort={meta.stringProperty}>
                                        Custom column
                                    </NeoGrid.Column>

                                    <NeoGrid.ButtonColumn
                                        buttonSize="sm"
                                        deleteButton={{ onClick: () => this.confirmDelete(item) }}
                                        editButton={{ text: "Edit", onClick: () => this.editItem(item) }}
                                        label={"Buttons"} />
                                </NeoGrid.Row>
                            )}
                        </NeoGrid.Grid>
                    </div>
                </Neo.Card>

                <Neo.Card title="Hierarchical grid" className="mt-3" data-code-key="GridParentChild" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_GridParentChild, "Hierarchical grid")} />}>
                    <p>
                        A hierarchical grid can be used to show a parent / child list data structure. It is achieved by nesting a <code>NeoGrid.Grid</code> inside
                        another <code>NeoGrid.Grid</code>.
                    </p>
                    <p>
                        The nested grid will be contained in a row below the parent row. Do this by specifying a <code>NeoGrid.ChildRow</code>.
                        This is a special version of a normal row, and will contain a cell that spans the number of cells in the parent row.
                    </p>
                    <p>
                        Note that the child row does not have to contain another grid. You could put any component here which represents your child data.
                    </p>
                    <p>
                        To control whether this child row is displayed or not, you can use a boolean property on your parent model.
                        Specify this property using the <code>expandProperty</code> prop on the <code>NeoGrid.RowGroup</code> component.
                    </p>

                    <div data-code-content>
                        <NeoGrid.Grid items={this.viewModel.items} showAddButton>
                            {(item, meta) => (
                                <NeoGrid.RowGroup expandProperty={meta.isExpanded}>
                                    <NeoGrid.Row>
                                        <NeoGrid.Column display={meta.stringProperty} />
                                        <NeoGrid.Column display={meta.childTotal} sum />
                                        <NeoGrid.ButtonColumn showDelete />
                                    </NeoGrid.Row>
                                    <NeoGrid.ChildRow>
                                        <NeoGrid.Grid items={item.childItems} addButton={{ text: "Add child" }}>
                                            {(child, childMeta) => (
                                                <NeoGrid.Row>
                                                    <NeoGrid.Column display={childMeta.name} />
                                                    <NeoGrid.Column bind={childMeta.value} sum />
                                                    <NeoGrid.ButtonColumn showDelete />
                                                </NeoGrid.Row>
                                            )}
                                        </NeoGrid.Grid>
                                    </NeoGrid.ChildRow>
                                </NeoGrid.RowGroup>
                            )}
                        </NeoGrid.Grid>
                    </div>
                </Neo.Card>

                <Neo.Card title="Fixed headers" data-code-key="GridFixedHeaders" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_GridFixedHeaders, "Fixed headers")} />}>
                    <p>
                        In this demo site, sticky headers have been enabled by default. If you scroll this page up and down, 
                        you will see that the headers of the grids stick to the top of the screen when the grid is partially in view. 
                        If you look at the paging demo, the same thing will happen.
                    </p>
                    <p>
                        This is enabled in the app module by setting the following global settings:
                    </p>
                        <ul>
                            <li>Enables sticky headers on all grids:<br/><code>{`Misc.Settings.grid.useStickyHeaders = true;`}</code></li> 
                            <li>Required if your app has a fixed header section:<br/><code>{`Misc.Settings.fixedAppHeaderElement = () => document.querySelector(".app-header-panel");`}</code></li>
                        </ul>
                    <p>
                        This does not have to be enabled globally. You can specify at a grid level by specifying the <code>stickyHeader</code> prop.
                    </p>
                    <p>
                        This also works when the grid is in a scrollable element, which enables you to create a scrollable grid:
                    </p>
                    <div data-code-content>
                        <div style={{maxHeight: 250, overflowY: "auto"}}>
                            <NeoGrid.Grid items={this.viewModel.items} stickyHeader>
                                {(item, meta) => (
                                    <NeoGrid.Row>
                                        <NeoGrid.Column bind={meta.stringProperty} />
                                        <NeoGrid.Column bind={meta.intProperty} />
                                        <NeoGrid.Column bind={meta.floatProperty} />
                                        <NeoGrid.Column bind={meta.dateProperty} />
                                        <NeoGrid.Column bind={meta.boolProperty} input={{ type: "switch" }} sort={false} />
                                        <NeoGrid.Column hideBelow="lg">
                                            <span>Value is: {item.stringProperty}</span>
                                        </NeoGrid.Column>
                                    </NeoGrid.Row>
                                )}
                            </NeoGrid.Grid>
                        </div>
                    </div>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_GridBasic = [{ language: "jsx", code: 
`<NeoGrid.Grid items={this.viewModel.items} showAddButton>
    {(item, meta) => (
        <NeoGrid.Row>
            <NeoGrid.Column bind={meta.stringProperty} />
            <NeoGrid.Column
                bind={meta.intProperty}
                append={<Neo.Button size="sm" icon="far-plus-square" variant="dark" onClick={() => item.intProperty += 1}>{item.intProperty}</Neo.Button>} />
            <NeoGrid.Column bind={meta.floatProperty} label={<strong>Custom header</strong>} />
            <NeoGrid.Column bind={meta.dateProperty} />
            <NeoGrid.Column bind={meta.boolProperty} input={{ type: "switch" }} sort={false} />
            <NeoGrid.Column hideBelow="lg">
                <span>Value is: {item.intProperty}</span>
            </NeoGrid.Column>
            <NeoGrid.ButtonColumn showDelete />
        </NeoGrid.Row>
    )}
</NeoGrid.Grid>`}];

const demo_source_code_GridCustomColumns = [{ language: "jsx", code: 
`<NeoGrid.Grid items={this.viewModel.items} addButton={{ text: "Custom add", onClick: () => ModalUtils.showMessage("Add", "You clicked add") }} initialSort="floatProperty">
    {(item, meta) => (
        <NeoGrid.Row>
            <NeoGrid.Column display={meta.stringProperty} footerContent={(t) => "Totals"} />

            <NeoGrid.Column display={meta.intProperty} sum sort={false}>
                {/* Child elements will be added after the value of the bound element. 
                    To suppress the value of the bound element, use bindContext instead of bind / display, or suppressDefaultContent if you need to suppress conditionally. */}
                <Neo.Button size="sm" icon="far-plus-square" variant="dark" className="ml-1" onClick={() => item.intProperty += 1} />
            </NeoGrid.Column>

            <NeoGrid.Column display={meta.intProperty} 
                numProps={{ format: Misc.NumberFormat.CurrencyDecimals }} 
                label="Int (R)"
                footerContent={(t: GridItem[]) => "Avg: " + NumberUtils.format(t.average(c => c.intProperty), Misc.NumberFormat.CurrencyDecimals)} />

            <NeoGrid.Column display={meta.floatProperty} sum />

            <NeoGrid.Column display={meta.dateProperty} />

            <NeoGrid.Column label="Custom" sort={meta.stringProperty}>
                Custom column
            </NeoGrid.Column>

            <NeoGrid.ButtonColumn
                buttonSize="sm"
                deleteButton={{ onClick: () => this.confirmDelete(item) }}
                editButton={{ text: "Edit", onClick: () => this.editItem(item) }}
                label={"Buttons"} />
        </NeoGrid.Row>
    )}
</NeoGrid.Grid>`}];

const demo_source_code_GridParentChild = [{ language: "jsx", code: 
`<NeoGrid.Grid items={this.viewModel.items} showAddButton>
    {(item, meta) => (
        <NeoGrid.RowGroup expandProperty={meta.isExpanded}>
            <NeoGrid.Row>
                <NeoGrid.Column display={meta.stringProperty} />
                <NeoGrid.Column display={meta.childTotal} sum />
                <NeoGrid.ButtonColumn showDelete />
            </NeoGrid.Row>
            <NeoGrid.ChildRow>
                <NeoGrid.Grid items={item.childItems} addButton={{ text: "Add child" }}>
                    {(child, childMeta) => (
                        <NeoGrid.Row>
                            <NeoGrid.Column display={childMeta.name} />
                            <NeoGrid.Column bind={childMeta.value} sum />
                            <NeoGrid.ButtonColumn showDelete />
                        </NeoGrid.Row>
                    )}
                </NeoGrid.Grid>
            </NeoGrid.ChildRow>
        </NeoGrid.RowGroup>
    )}
</NeoGrid.Grid>`}];

const demo_source_code_GridFixedHeaders = [{ language: "jsx", code: 
`<div style={{maxHeight: 250, overflowY: "auto"}}>
    <NeoGrid.Grid items={this.viewModel.items} stickyHeader>
        {(item, meta) => (
            <NeoGrid.Row>
                <NeoGrid.Column bind={meta.stringProperty} />
                <NeoGrid.Column bind={meta.intProperty} />
                <NeoGrid.Column bind={meta.floatProperty} />
                <NeoGrid.Column bind={meta.dateProperty} />
                <NeoGrid.Column bind={meta.boolProperty} input={{ type: "switch" }} sort={false} />
                <NeoGrid.Column hideBelow="lg">
                    <span>Value is: {item.stringProperty}</span>
                </NeoGrid.Column>
            </NeoGrid.Row>
        )}
    </NeoGrid.Grid>
</div>`}];
