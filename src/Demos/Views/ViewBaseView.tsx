import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Views, Neo } from '@singularsystems/neo-react';
import ViewBaseViewModel from './ViewBaseVM';
import { Link } from 'react-router-dom';
import { countries } from '../Models/Country';
import CountryView from './ViewParams';
import LoadingBar from './LoadingBar';
import UIElements from './UIElements';

export default class ViewBaseView extends Views.ViewBase<ViewBaseViewModel> {

    constructor(props: unknown) {
        super("View base", ViewBaseViewModel, props);

        this.navigateToCountry = this.navigateToCountry.bind(this);
    }

    // DemoCode: ViewBase
    public onLeave() {
        if (this.viewModel.warnWhenLeaving) {
            return "Are you sure you want to leave this page?";
        }
        return undefined;
    }
    // End DemoCode

    // DemoCode: ViewBaseNavigation
    private navigateToCountry(e: React.MouseEvent, countryCode?: string) {
        this.navigation.navigateToView(CountryView, { country: countryCode });
    }
    // End DemoCode

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="View and ViewModel" icon="link">
                    <p>
                        All views in your react app should inherit from <code>ViewBase</code>. ViewBase is an extension of <code>React.Component</code> which provides some additional
                        functionality which is explained below.
                    </p>
                    <p>
                        <code>ViewBase</code> has a generic argument for the <code>ViewModel</code> type. The <code>ViewModel</code> property on the view base class will be strongly
                        typed to the type provided in the generic argument.
                    </p>
                    <p>
                        Your view must have a constructor which calls the base constructor providing it with:
                        <ul>
                            <li><code>viewName</code> - The name of your view (which is displayed in the breadcrumb).</li>
                            <li><code>viewModel</code> - Either the viewModel type, an instance of the viewModel, or a callback which returns the viewModel. This allows you to
                            choose to let the neo library create the view model for you, or create it yourself if you need to pass it custom parameters.</li>
                            <li><code>props</code> - React props which get passed in from a parent component. These should always be empty, however react requires these to be
                            passed to the base component.</li>
                        </ul>
                    </p>
                </Neo.Card>

                <Neo.Card title="ViewBase functionality" data-code-key="ViewBase" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ViewBase, "ViewBase functionality")} />}>
                    <h5>Breadcrumb</h5>
                    <p>
                        The breadcrumb control which is part of the app`s master page will call <code>getBreadCrumbList()</code> on the current view to get a list of bread crumb
                        items. This includes the current view name, the parent views (setup in the routes file), and the view parameters (explained in the View parameters demo).
                    </p>
                    <p>
                        To modify the bread crumb list, or to add additional items, you can override <code>getBreadCrumbStart()</code>, and modify the list returned by the base
                        method.
                    </p>
                    <h5>View parameters</h5>
                    <p>
                        See more in the <Link to={this.navigation.getPathForView(CountryView)}>view parameters</Link> demo.
                    </p>

                    <h5>Task runner</h5>
                    <p>
                        See more in the <Link to={this.navigation.getPathForView(LoadingBar)}>loading & progress</Link> demo.
                    </p>

                    <h5>Page leave confirmation</h5>
                    <p>
                        If your view is a data entry screen, you may want to warn the user if they try leave the page without saving first. You can do this by overriding
                        the <code>onLeave()</code> method.
                    </p>
                    <p>
                        Return a string that should be displayed if you want to warn the user, otherwise return <code>undefined</code>. When nagivating internally, the user
                        will be shown a neo dialog with the confirmation prompt. When closing the browser, or going to a different site, the browser will show its default
                        prompt. This behaviour can be overridden by registering a new <code>PageLeaveHandler</code> with dependency injection.
                    </p>
                    <p>
                        Set the following checkbox to true to test this functionality.
                    </p>
                    <Neo.FormGroup bind={this.viewModel.meta.warnWhenLeaving} />
                </Neo.Card>

                <Neo.Card title="Navigation" data-code-key="ViewBaseNavigation" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ViewBaseNavigation, "Navigation")} />}>
                    <h5>Routing</h5>
                    <p>
                        The react project template uses react router to map urls to components (in our case components which extend <code>ViewBase</code>). When navigating
                        within the app, you will almost always be nagivating to a view. <br />

                        To get the app to render the new view, we have to change the browsers url to the url which maps to that view. This mapping is setup in the route.ts
                        file in your project.
                    </p>

                    <h5>Navigation helper</h5>
                    <p>
                        Neo provides a navigation helper which uses the mapping from the route definition to allow you to nagivate to a view by specifying the view type. <br />
                        You can access the <code>NavigationHelper</code> instance either by using the <code>navigation</code> property on your view, or by retrieving the singleton
                        instance from DI.
                    </p>

                    <h5>Simple navigation</h5>
                    <p>
                        To nagivate internally, either use the <code>navigateToView()</code> method, or the <code>navigateInternal()</code> method on <code>NavigationHelper</code>.
                        Setting <code>window.location = "..."</code> will cause your whole app to reload, rather than causing a re-render to show the new view. <br />
                    </p>
                    <p>
                        Click the button below to navigate to the demo root view. Note, you can also use the <code>getPathForView()</code> method if you want to use a link instead
                        of a button (see the source code for the links in the above section).
                    </p>
                    <Neo.Button variant="light" size="sm" onClick={() => this.navigation.navigateToView(UIElements)}>Go to demo root</Neo.Button>

                    <h5 className="mt-4">Passing parameters</h5>
                    <p>
                        Sometimes you may want to pass initial parameters to a view. The button below shows how to do this programatically using the <code>navigateToView()</code> method.
                    </p>
                    <Neo.Button variant="light" size="sm" menuItems={countries.map(c => ({ data: c.countryCode, text: c.name }))} onClick={this.navigateToCountry}>
                        Select country...
                    </Neo.Button>

                    <h6 className="mt-4">Main Menu</h6>
                    <p>
                        You may also want to have different menu items in the main menu pointing to the same view, but with different initial states (e.g. to start on a specific tab).
                        If you expand the <em>View parameters</em> menu item in the main menu, you will see that you can select a menu item which shows the view with a specific country
                        selected. See the DemoRoutes.ts file to see how this is done using the <code>MenuRoute</code> class.
                    </p>
                </Neo.Card>



            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_ViewBase = [{ language: "jsx", code: 
`<h5>Breadcrumb</h5>
<p>
    The breadcrumb control which is part of the app\`s master page will call <code>getBreadCrumbList()</code> on the current view to get a list of bread crumb
    items. This includes the current view name, the parent views (setup in the routes file), and the view parameters (explained in the View parameters demo).
</p>
<p>
    To modify the bread crumb list, or to add additional items, you can override <code>getBreadCrumbStart()</code>, and modify the list returned by the base
    method.
</p>
<h5>View parameters</h5>
<p>
    See more in the <Link to={this.navigation.getPathForView(CountryView)}>view parameters</Link> demo.
</p>

<h5>Task runner</h5>
<p>
    See more in the <Link to={this.navigation.getPathForView(LoadingBar)}>loading & progress</Link> demo.
</p>

<h5>Page leave confirmation</h5>
<p>
    If your view is a data entry screen, you may want to warn the user if they try leave the page without saving first. You can do this by overriding
    the <code>onLeave()</code> method.
</p>
<p>
    Return a string that should be displayed if you want to warn the user, otherwise return <code>undefined</code>. When nagivating internally, the user
    will be shown a neo dialog with the confirmation prompt. When closing the browser, or going to a different site, the browser will show its default
    prompt. This behaviour can be overridden by registering a new <code>PageLeaveHandler</code> with dependency injection.
</p>
<p>
    Set the following checkbox to true to test this functionality.
</p>
<Neo.FormGroup bind={this.viewModel.meta.warnWhenLeaving} />`}, { language: "javascript", code: `public onLeave() {
    if (this.viewModel.warnWhenLeaving) {
        return "Are you sure you want to leave this page?";
    }
    return undefined;
}`}];

const demo_source_code_ViewBaseNavigation = [{ language: "jsx", code: 
`<h5>Routing</h5>
<p>
    The react project template uses react router to map urls to components (in our case components which extend <code>ViewBase</code>). When navigating
    within the app, you will almost always be nagivating to a view. <br />

    To get the app to render the new view, we have to change the browsers url to the url which maps to that view. This mapping is setup in the route.ts
    file in your project.
</p>

<h5>Navigation helper</h5>
<p>
    Neo provides a navigation helper which uses the mapping from the route definition to allow you to nagivate to a view by specifying the view type. <br />
    You can access the <code>NavigationHelper</code> instance either by using the <code>navigation</code> property on your view, or by retrieving the singleton
    instance from DI.
</p>

<h5>Simple navigation</h5>
<p>
    To nagivate internally, either use the <code>navigateToView()</code> method, or the <code>navigateInternal()</code> method on <code>NavigationHelper</code>.
    Setting <code>window.location = "..."</code> will cause your whole app to reload, rather than causing a re-render to show the new view. <br />
</p>
<p>
    Click the button below to navigate to the demo root view. Note, you can also use the <code>getPathForView()</code> method if you want to use a link instead
    of a button (see the source code for the links in the above section).
</p>
<Neo.Button variant="light" size="sm" onClick={() => this.navigation.navigateToView(UIElements)}>Go to demo root</Neo.Button>

<h5 className="mt-4">Passing parameters</h5>
<p>
    Sometimes you may want to pass initial parameters to a view. The button below shows how to do this programatically using the <code>navigateToView()</code> method.
</p>
<Neo.Button variant="light" size="sm" menuItems={countries.map(c => ({ data: c.countryCode, text: c.name }))} onClick={this.navigateToCountry}>
    Select country...
</Neo.Button>

<h6 className="mt-4">Main Menu</h6>
<p>
    You may also want to have different menu items in the main menu pointing to the same view, but with different initial states (e.g. to start on a specific tab).
    If you expand the <em>View parameters</em> menu item in the main menu, you will see that you can select a menu item which shows the view with a specific country
    selected. See the DemoRoutes.ts file to see how this is done using the <code>MenuRoute</code> class.
</p>`}, { language: "javascript", code: `private navigateToCountry(e: React.MouseEvent, countryCode?: string) {
    this.navigation.navigateToView(CountryView, { country: countryCode });
}`}];
