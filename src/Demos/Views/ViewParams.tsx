import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { NeoGrid, Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import ViewParamsViewModel from './ViewParamsVM';
import { Link } from 'react-router-dom';
import ViewBaseView from './ViewBaseView';

class CountryViewParams {
    public country = {}
}

@observer
export default class CountryView extends Views.ViewBase<ViewParamsViewModel, CountryViewParams> {
    // Don't forget to add this static field to your view.
    public static params = new CountryViewParams();

    constructor(props: unknown) {
        super("View parameters", ViewParamsViewModel, props);
    }

    // DemoCode: ViewParams
    // viewParamsUpdated() is called when the component is mounted, and whenever a route parameter or query parameter gets a new value.
    // Use this method to update the state of your view from the view parameters.
    protected viewParamsUpdated() {
        this.viewModel.setCountry(this.viewParams.country.asString());
        if (this.viewModel.selectedCountry) {
            // Set the parameter description so that it appears in the breadcrumb.
            this.viewParams.country.description = this.viewModel.selectedCountry.name;
        }
    }

    // When selecting country, do not set the bound property directly.
    // Rather set the view parameter value, which will in turn cause viewParamsUpdated() to run.
    // This means that your views state will be updated the same for events like this, and external events:
    //    E.g. breadcrumb clicks, browser back button clicks, page loads with initial parameters.
    private selectCountry(countryCode: string) {
        this.viewParams.country.value = countryCode;
    }
    // End DemoCode

    public render() {
        const selectedCountry = this.viewModel.selectedCountry;

        return (
            <div>
                <Neo.GridLayout lg={2}>
                    <Neo.Card title="Overview" icon="book">

                        <p>
                            This page demonstrates how to setup view parameters so that your view can take in arguments from the url. <br />
                            Normally, components are passed props from a parent component. <br />
                            A view component is a top level component, it needs to get its arguments from the url.<br />
                        </p>
                        <p>
                            You can define the arguments of a view by defining a class, where the property names of the class are the parameter names. <br />
                            Then pass this type as the second generic argument to <code>ViewBase</code> (After the view model type). E.g. <code>{"ViewBase<CountryVM, CountryViewParams>"}</code>. <br />
                            You also need to define a static property named <code>params</code> in your view: <code>static params = new CountryViewParams();</code>.
                        </p>
                        <h6>Reading view parameters</h6>
                        <p>

                            Reading view parameters should always be done in the <code>viewParamsUpdated()</code> method. This method is called when the component is mounted,
                            and whenever a route parameter or query parameter gets a new value. <br />
                            Read the value of each parameter using the <code>viewParams</code> instance property. This is a strongly typed object based on the definition of your
                            parameter class. Access the parameter value by reading the <code>value</code> property. E.g. <code>this.viewParams.country.value</code>.
                            If you expect the value to be a number, you can also use the <code>asNullableInt()</code> method.
                        </p>
                        <h6>Writing view parameter values</h6>
                        <p>

                            You can change a view parameters value by setting the same <code>value</code> parameter. Changing the value of a view parameter is asyncronous,
                            when you set a parameters value, you are causing the url to update based on the new value. Reading the value property immediately after setting it
                            will return the old value. Once the view has reacted to the change in url, the <code>viewParamsUpdated()</code> method will be called, and the
                            parameter will now have the new value.
                        </p>
                        <h6>Descriptions</h6>
                        <p>

                            Once the description corresponding to a parameter value is known (e.g. after fetching some data), you can set the parameter description using
                            the <code>description</code> property. E.g. <code>this.viewParams.country.description = this.selectedCountry.name</code>. This causes the breadcrumb
                            to show the parameter description.
                        </p>
                        <h6>State management</h6>
                        <p>

                            When using view parameters, you need to manage the state of your view differently. In the case of this demo,
                            the <code>selectedCountry</code> observable property is based on the value of the view parameter. If the page loads with
                            a url that tells us to show ZA, we need to set selectedCountry to South Africa. If the user clicks the browser back button, and the url changes
                            so that there are no parameters, we need to set selectedCountry to null. <br />
                            This is what the <code>viewParamsUpdated()</code> method is for, synchronising our view state with the values from the view parameters. <br />
                            When the user clicks a button in your view to select a country, you should not set the selectedCountry property on your view directly, as the
                            values between the url and your page will be out of sync. Rather set the view parameter value, and react to the change in
                            the <code>viewParamsUpdated()</code> method.
                        </p>
                        <h6>Parameter props</h6>
                        <p>

                            When defining the parameter class, each property should return an object. This object can have the following additional properties:
                            <ul>
                                <li><code>required</code> - True if the parameter is required. If the url does not contain this parameter, the entire route will not match and the view will not display.</li>
                                <li><code>isQuery</code> - True if the parameter is defined in the query string of the url, and not the url itself. Use this if your view parameters have no clear order.</li>
                                <li><code>selection</code> - Allows you to define if this parameter is selectable on the breadcrumb. This can be set to <code>Routing.BreadCrumbSelectMode.None</code> to disable
                                    selection, or <code>Routing.BreadCrumbSelectMode.SelectParent</code> to select the previous level if the user clicks on this level.</li>
                            </ul>
                        </p>
                        <p>
                            The selection property can be used where your view can show multiple types of data. E.g. you may be able to view an email, or an sms. Your url would
                            either contain <code>mypage/email/1</code> or <code>mypage/sms/1</code>. It may not make sense to show <code>mypage/email</code> without a specific record
                            selected. In this case, you would use the <code>SelectParent</code> or <code>None</code> selection mode as described above.
                        </p>
                        <h6>Routing</h6>
                        <p>
                            Please read the navigation section of the <Link to={this.navigation.getPathForView(ViewBaseView)}>view base & navigation</Link> demo page to see how
                            to navigate to a page with the initial view parameters specified.
                        </p>

                    </Neo.Card>
                    <Neo.Card title="Demo" icon="laptop" data-code-key="ViewParams" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ViewParams, "Demo")} />}>
                        <p>
                            When clicking these buttons, notice how the url changes. Also try change the state of the page by clicking the breadcrumb and browser forward and back
                            buttons.
                        </p>

                        {!selectedCountry &&
                            <div>
                                <NeoGrid.Grid items={this.viewModel.countries} keyProperty="countryCode">
                                    {(item, meta) => (
                                        <NeoGrid.Row>
                                            <NeoGrid.Column display={meta.countryCode} />
                                            <NeoGrid.Column display={meta.name} />
                                            <NeoGrid.ButtonColumn showDefaultButtonText buttonSize="sm" viewButton={{ onClick: () => this.selectCountry(item.countryCode) }} />
                                        </NeoGrid.Row>
                                    )}
                                </NeoGrid.Grid>
                            </div>}

                        {selectedCountry &&
                            <div>

                                <img alt="flag" src={selectedCountry.flag} /> <h4 style={{ display: "inline-block", verticalAlign: "sub" }}>{selectedCountry.name}</h4>

                                <div className="my-4">
                                    <Neo.Button onClick={() => this.viewParams.country.value = null} icon="arrow-left" variant="light" size="sm">Back</Neo.Button> {" "}
                                To go back, you can also click the browser back button, or use the breadcrumb.
                            </div>

                                <Neo.FormGroup display={selectedCountry.meta.countryCode} />
                                <Neo.FormGroup display={selectedCountry.meta.name} />
                                <Neo.FormGroup display={selectedCountry.meta.population} />
                            </div>}

                    </Neo.Card>
                </Neo.GridLayout>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_ViewParams = [{ language: "jsx", code: 
`<p>
    When clicking these buttons, notice how the url changes. Also try change the state of the page by clicking the breadcrumb and browser forward and back
    buttons.
</p>

{!selectedCountry &&
    <div>
        <NeoGrid.Grid items={this.viewModel.countries} keyProperty="countryCode">
            {(item, meta) => (
                <NeoGrid.Row>
                    <NeoGrid.Column display={meta.countryCode} />
                    <NeoGrid.Column display={meta.name} />
                    <NeoGrid.ButtonColumn showDefaultButtonText buttonSize="sm" viewButton={{ onClick: () => this.selectCountry(item.countryCode) }} />
                </NeoGrid.Row>
            )}
        </NeoGrid.Grid>
    </div>}

{selectedCountry &&
    <div>

        <img alt="flag" src={selectedCountry.flag} /> <h4 style={{ display: "inline-block", verticalAlign: "sub" }}>{selectedCountry.name}</h4>

        <div className="my-4">
            <Neo.Button onClick={() => this.viewParams.country.value = null} icon="arrow-left" variant="light" size="sm">Back</Neo.Button> {" "}
        To go back, you can also click the browser back button, or use the breadcrumb.
    </div>

        <Neo.FormGroup display={selectedCountry.meta.countryCode} />
        <Neo.FormGroup display={selectedCountry.meta.name} />
        <Neo.FormGroup display={selectedCountry.meta.population} />
    </div>}`}, { language: "javascript", code: `// viewParamsUpdated() is called when the component is mounted, and whenever a route parameter or query parameter gets a new value.
// Use this method to update the state of your view from the view parameters.
protected viewParamsUpdated() {
    this.viewModel.setCountry(this.viewParams.country.asString());
    if (this.viewModel.selectedCountry) {
        // Set the parameter description so that it appears in the breadcrumb.
        this.viewParams.country.description = this.viewModel.selectedCountry.name;
    }
}

// When selecting country, do not set the bound property directly.
// Rather set the view parameter value, which will in turn cause viewParamsUpdated() to run.
// This means that your views state will be updated the same for events like this, and external events:
//    E.g. breadcrumb clicks, browser back button clicks, page loads with initial parameters.
private selectCountry(countryCode: string) {
    this.viewParams.country.value = countryCode;
}`}];
