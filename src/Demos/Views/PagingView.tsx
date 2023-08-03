import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, NeoGrid, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import { CountryCriteria, CountryLookup } from '../Models/Paging';
import DemoApiClient from '../Models/DemoApiClient';
import { Data, Model } from '@singularsystems/neo-core';

@observer
export default class PagingView extends Views.ViewBase {

    constructor(props: unknown) {
        super("Paging", Views.EmptyViewModel, props);
    }

    private demoApiClient = new DemoApiClient();

    // DemoCode: PageManagerBasic,ViewModel Code
    private criteria = new CountryCriteria();

    private pageManager = new Data.PageManager(this.criteria, CountryLookup, this.demoApiClient.getPagedList, {
        pageSize: 12,
        pageSizeOptions: [6, 12, 24],
        sortBy: "population",
        sortAscending: false,
        fetchInitial: true,
        initialTaskRunner: this.taskRunner,
        beforeFetch: this.beforeFetch.bind(this),
        afterFetch: this.afterFetch.bind(this)
    });

    private beforeFetch(criteria: Model.PlainObject<Data.PageRequest<CountryCriteria>>) {

    }

    private afterFetch(data: CountryLookup[]) {

    }
    // End DemoCode

    public render() {

        return (
            <div className="constrain-width">
                <Neo.Card title="Paging">
                    <p>
                        The <code>PageManager</code> class, and <code>Neo.Pager</code> component are used together to provide the functionality required to request, and display paginated data.
                    </p>
                    <p>
                        The <code>PageRequest</code> and <code>PageResult</code> objects in the <code>Neo.Model</code> c# libraries have corresponding typescript versions under
                        the <code>Data</code> namespace of <code>neo-core</code>. The api client generator will automatically use these models in any api client method that uses
                        paging.
                    </p>
                </Neo.Card>

                <Neo.Card title="PageManager" data-code-key="PageManagerBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_PageManagerBasic, "PageManager")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The page manager constructor takes 4 arguments:
                                <ul>
                                    <li><code>criteria</code> - A criteria instance that will be included in each request to the server.</li>
                                    <li><code>modelType</code> - An instance of this type will be created for each raw data item returned by the server.</li>
                                    <li><code>dataSource</code> - A function which takes in <code>PageRequest&lt;TCriteria&gt;</code> and returns a <code>PageResult&lt;TModel&gt;.</code></li>
                                    <li><code>options</code> - Used to configure the page manager.
                                        <ul>
                                            <li><code>pageSize</code> - No of records per page. Defaults to 20.</li>
                                            <li><code>pageSizeOptions</code> - Options to show in the page size drop down. The default can be changed under <code>Misc.Settings.pager.pageSizeOptions</code>.</li>
                                            <li><code>sortBy</code> - The initial sort property.</li>
                                            <li><code>fetchInitial</code> - Set to true if you want initial data to be fetched when the page manager is initialised. (In this page it is set to true, so that the data is displayed as the page loads).</li>
                                            <li><code>taskRunner</code> - The pageManager has it's own task runner, which the pager component will use to display an inline loading indicator.
                                            If you want the pageManager to use a custom taskRunner, or the default task runner of the page, set this property.</li>
                                            <li><code>initialTaskRunner</code> - This task runner will be used for the initial data request if specified. Set this to the pages taskRunner
                                            if you want all inital page loads to keep the main loading bar visible.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </p>
                            <h6>Methods and properties</h6>
                            <p>
                                The most commonly used method on <code>PageManager</code> would be <code>refreshData</code>. Call this when any of your criteria properties change, or you know the
                                underlying data has changed.
                            </p>
                            <p>
                                There are also methods which allow you to programatically go to the first, previous, next and last pages, as well as set the current page index.
                            </p>
                        </div>
                        <div data-code-content>
                            <Neo.Form model={this.criteria} onSubmit={() => this.pageManager.refreshData()}>
                                <Neo.GridLayout>
                                    <Neo.FormGroup bind={this.criteria.meta.countryName} />
                                    <Neo.Button isSubmit className="form-btn">Filter</Neo.Button>
                                </Neo.GridLayout>
                            </Neo.Form>

                            <Neo.Pager pageManager={this.pageManager} pageControlProps={{ pageSizeLabel: "Show: " }}>
                                <NeoGrid.Grid<CountryLookup>>
                                    {(item) => (
                                        <NeoGrid.Row>
                                            <NeoGrid.Column display={item.meta.countryName} />
                                            <NeoGrid.Column display={item.meta.population} width="25%" />
                                        </NeoGrid.Row>
                                    )}
                                </NeoGrid.Grid>
                            </Neo.Pager>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Pager" data-code-key="PageManagerControls" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_PageManagerControls, "Pager")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>Neo.Pager</code> component is used to display paged data. It takes <code>PageManager</code> as a prop, which it uses to
                                fetch and display data.
                            </p>
                            <p>
                                The child component of <code>Neo.Pager</code> can either be a component which works with a dataview (like Neo.Grid), or a callback
                                which will be passed the items of the current page.
                            </p>
                            <p>
                                If the component is a grid, clicking the column headers will call <code>changeSort()</code> on the page manager (causing a data refresh)
                                rather than sorting the records in the current page.
                            </p>
                            <h6>Page controls</h6>
                            <p>
                                The pager component contains basic page controls to allow the user to select a page. You can change the position of these controls using
                                the <code>pageControls</code> prop. This can be set to top, bottom, both or none.
                            </p>
                            <p>
                                The <code>pageControlProps</code> property can be used to set the properties of the page controls. The button text can also be changed globally
                                under <code>Settings.pager</code>.
                            </p>
                            <p>
                                The <code>Neo.PagerControlsBasic</code> component can be used as a stand alone component. It also takes a <code>PageManager</code> prop
                                and can be bound to the same page manager as the pager.
                            </p>
                            <Neo.PagerControlsBasic pageManager={this.pageManager} alignment="start" noOfButtons={3} />
                        </div>
                        <div>

                            <Neo.Pager
                                pageManager={this.pageManager}
                                className="pager-demo-2"
                                pageControlProps={{ firstText: "First", prevText: "Prev", nextText: "Next", lastText: "Last", alignment: "center" }}>
                                {data => (
                                    <Neo.GridLayout md={4}>
                                        {data.map(item => (
                                            <div key={item.entityIdentifier}>{item.countryName}</div>
                                        ))}
                                    </Neo.GridLayout>

                                )}
                            </Neo.Pager>
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        );
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_PageManagerBasic = [{ language: "jsx", code: 
`<Neo.Form model={this.criteria} onSubmit={() => this.pageManager.refreshData()}>
    <Neo.GridLayout>
        <Neo.FormGroup bind={this.criteria.meta.countryName} />
        <Neo.Button isSubmit className="form-btn">Filter</Neo.Button>
    </Neo.GridLayout>
</Neo.Form>

<Neo.Pager pageManager={this.pageManager} pageControlProps={{ pageSizeLabel: "Show: " }}>
    <NeoGrid.Grid<CountryLookup>>
        {(item) => (
            <NeoGrid.Row>
                <NeoGrid.Column display={item.meta.countryName} />
                <NeoGrid.Column display={item.meta.population} width="25%" />
            </NeoGrid.Row>
        )}
    </NeoGrid.Grid>
</Neo.Pager>`}, { language: "javascript", title: "ViewModel Code", code: `private criteria = new CountryCriteria();

private pageManager = new Data.PageManager(this.criteria, CountryLookup, this.demoApiClient.getPagedList, {
    pageSize: 12,
    pageSizeOptions: [6, 12, 24],
    sortBy: "population",
    sortAscending: false,
    fetchInitial: true,
    initialTaskRunner: this.taskRunner,
    beforeFetch: this.beforeFetch.bind(this),
    afterFetch: this.afterFetch.bind(this)
});

private beforeFetch(criteria: Model.PlainObject<Data.PageRequest<CountryCriteria>>) {

}

private afterFetch(data: CountryLookup[]) {

}`}];

const demo_source_code_PageManagerControls = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>Neo.Pager</code> component is used to display paged data. It takes <code>PageManager</code> as a prop, which it uses to
            fetch and display data.
        </p>
        <p>
            The child component of <code>Neo.Pager</code> can either be a component which works with a dataview (like Neo.Grid), or a callback
            which will be passed the items of the current page.
        </p>
        <p>
            If the component is a grid, clicking the column headers will call <code>changeSort()</code> on the page manager (causing a data refresh)
            rather than sorting the records in the current page.
        </p>
        <h6>Page controls</h6>
        <p>
            The pager component contains basic page controls to allow the user to select a page. You can change the position of these controls using
            the <code>pageControls</code> prop. This can be set to top, bottom, both or none.
        </p>
        <p>
            The <code>pageControlProps</code> property can be used to set the properties of the page controls. The button text can also be changed globally
            under <code>Settings.pager</code>.
        </p>
        <p>
            The <code>Neo.PagerControlsBasic</code> component can be used as a stand alone component. It also takes a <code>PageManager</code> prop
            and can be bound to the same page manager as the pager.
        </p>
        <Neo.PagerControlsBasic pageManager={this.pageManager} alignment="start" noOfButtons={3} />
    </div>
    <div>

        <Neo.Pager
            pageManager={this.pageManager}
            className="pager-demo-2"
            pageControlProps={{ firstText: "First", prevText: "Prev", nextText: "Next", lastText: "Last", alignment: "center" }}>
            {data => (
                <Neo.GridLayout md={4}>
                    {data.map(item => (
                        <div key={item.entityIdentifier}>{item.countryName}</div>
                    ))}
                </Neo.GridLayout>

            )}
        </Neo.Pager>
    </div>
</Neo.GridLayout>`}];
