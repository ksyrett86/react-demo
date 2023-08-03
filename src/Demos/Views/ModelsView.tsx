import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Views, Neo } from '@singularsystems/neo-react';
import ModelsVM from './ModelsVM';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ViewBaseView from './ViewBaseView';
import { countries } from '../Models/Country';

@observer
export default class ModelsView extends Views.ViewBase<ModelsVM> {

    constructor(props: unknown) {
        super("Models", ModelsVM, props);

    }

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Models" icon="tablet">
                    <p>
                        Most of the neo ui library centers around objects known as models. A model is simply an object which contains properties,
                        methods to modify the state of the model, and validation rules.
                    </p>
                    <p>
                        Models when used with the neo library can also be observable, meaning they can notify components to update when the state of
                        the model changes. This functionality comes from the mobx library.
                    </p>
                </Neo.Card>

                <Neo.Card title="Base classes" icon="user">
                    <p>
                        There are several base classes available for different types of models.
                    </p>
                    <ul>
                        <li><code>BindableBase</code> - This is the root base class which enables data binding via the <code>meta</code> property.
                        It also contains helper methods for deserialisation and cloning. Classes which directly extend <code>BindableBase</code> are not observable.

                        <ul>
                                <li><code>LookupBase</code> - This is an extension of <code>BindableBase</code> which is used for 'read-only' models.
                            'Read-only' models are more performant because the properties are plain values, with no tracking logic to enable observability.
                            Models which extend <code>LookupBase</code> are not really read-only, they are just not observable, meaning changes to property
                            values will not automatically update the UI.
                            </li>
                                <li><code>ModelBase</code> - This is the main model base class. It automatically converts each property of the model to an
                            observable property, it tracks each property to allow change tracking (isSelfDirty / isDirty) and contains methods and properties
                            to enable validation (addBusinessRules, isSelfValid, isValid). It also contains helper methods for serialisation and partial
                            deserialisation.
                                <ul>
                                        <li><code>ValueObject</code> - ValueObject does not add any features over <code>ModelBase</code>, but parts of the neo
                                    library will treat value objects differently to full model classes.</li>
                                        <li><code>ViewModelBase</code> - Contains a few extra features which are used
                                    by <Link to={this.navigation.getPathForView(ViewBaseView)}>views</Link>.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Neo.Card>

                <Neo.Card title="@NeoModel">
                    <p>
                        In order for data-binding and observability to work, each property on a model needs to be processed. For binding, each property needs
                        a <code>PropertyInstance</code> created for it on the <code>meta</code> object. <br />
                        For observability, each property needs to be converted into an observable, and needs events to enable change tracking.
                    </p>
                    <p>
                        To do this, we could call a method in the constructor of a model class, e.g. something like <code>setupModelInstance(this)</code>. This
                        method could iterate through all the properties and process them. This would mean having an empty constructor and boilerplate code in
                        each model class though.
                    </p>
                    <p>
                        An easy way to get around this would be to put the code in the constructor of <code>BindableBase</code>.
                        Since all models extend this type, the <code>setupModelInstance()</code> method would be called automatically, setting up our model.
                        Unfortunately in javascript, the base constructor is called before the properties on our model class exist, so
                        the <code>setupModelInstance()</code> method would not know about the properties to convert.
                    </p>
                    <p>
                        The work around is to use a class decorator (<code>@NeoModel</code>) to extend the model class and call <code>setupModelInstance()</code> for
                        you. Like a model class extends <code>ModelBase</code>, <code>@NeoModel</code> creates a new type which extends the model class.
                    </p>
                    <p>
                        Unfortunately this also has drawbacks.
                    </p>
                    <ul>
                        <li>Only the last type in an inheritance heirarchy can have the <code>@NeoModel</code> decorator. E.g. you cannot have a base class
                            decorated with <code>@NeoModel</code> and then extend it.
                            </li>
                        <li>
                            If you create an instance of the class in a static method of that class, you will get an instance of the non-extended type,
                            meaning the resulting instance will not be observable / bindable.
                                <br /> E.g: <br />
                            <code>public static create() {'{'} return new Animal(); {'}'} </code> <br />
                                will not work as expected. You will need to write the above code as follows: <br />
                            <code>public static create() {'{'} return Utils.createInstance(Animal); {'}'}</code> <br />
                                Note, this only applies to static methods defined on the class of the type you are trying to instantiate.
                            </li>
                    </ul>
                </Neo.Card>

                <Neo.Card title="Observing changes" icon="eye">
                    <p>
                        Normally you want the UI to update automatically whenever a property changes. Mobx makes this extremely simple by allowing you to decorate
                        a component with the <code>@observer</code> attribute. This causes the component to re-render whenever an observable property changes. <br />
                        This is done at a property level, so if you have a model with 'FirstName' and 'LastName', but only show FirstName in a component, the
                        component will not react to changes in LastName, because LastName is not being observed.
                    </p>
                    <p>
                        The <code>@observer</code> attribute only applies to the <code>render()</code> function of a react component. Sometimes you may need to react
                        to a change in an observable in a different scope. The following sections explain how to do this.
                    </p>

                    <div data-code-key="ObserveModelProperties" className="demo-code-section"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ObserveModelProperties, "Code")} />
                        <h6>Model level</h6>
                        <p>
                            You may need to change one value in a model when another value changes, for example in a cascading drop down. You can do this by adding
                            an <code>@Attributes.OnChanged</code> decorator to the property, providing a callback function to execute when the value changes. <br />

                            The properties below have an <code>@Attributes.OnChanged</code> decorator attached to them. Change some values to see the effect. The search
                            property has a debounce delay which is useful for fields where the user types in some text. The country property callback fires immediately
                            (this is the default).
                        </p>
                        <Neo.GridLayout>
                            <Neo.FormGroup bind={this.viewModel.criteriaModel.meta.countryId} select={{ items: countries, displayMember: "name" }} />
                            <Neo.FormGroup bind={this.viewModel.criteriaModel.meta.search} />
                        </Neo.GridLayout>

                        <div className="log">
                            {this.viewModel.events.map(event => (
                                <div>{event}</div>
                            ))}
                        </div>
                    </div>

                    <div data-code-key="ObserveUsingReaction" className="demo-code-section"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ObserveUsingReaction, "Code")} />
                        <h6 className="mt-4">Outside a model</h6>
                        <p>
                            The <code>@Attributes.OnChanged</code> decorator is only meant for use inside a model. If you look at the code for the above example, it
                            is not very clean, as view model state has to be passed into the model. We also have to add the onChanged decorator to every property we
                            need to observe. It would be better if we could react to changes from outside the model.
                        </p>
                        <p>
                            Mobx caters for this with the <code>reaction</code> (<a href="https://mobx.js.org/refguide/reaction.html">docs</a>) helper function. This function signature looks like this: <code>reaction&lt;T&gt;(expression: () =&gt; T, effect(value: T) =&gt; void)</code>.
                            <br />
                            To use it, you pass a callback function as the first argument. This function can access one or more observable properties, and return a value or object.
                            Whenever any of the values you accessed in this function change, the function you passed in as the effect argument will be called.
                        </p>
                        <p>
                            View the code for the example below in the <code>initialise()</code> method of the VM. Note, you must dispose the reaction in
                            the <code>dispose()</code> method of the VM.
                            <br />
                            The reaction below will execute immediately when any of the properties change. You can pass in an options object specifying a delay,
                            but then countryId will also have a delay.
                        </p>

                        <Neo.GridLayout>
                            <Neo.FormGroup bind={this.viewModel.criteriaModel2.meta.countryId} select={{ items: countries, displayMember: "name" }} />
                            <Neo.FormGroup bind={this.viewModel.criteriaModel2.meta.search} />
                        </Neo.GridLayout>

                        <div className="log">
                            {this.viewModel.events2.map(event => (
                                <div>{event}</div>
                            ))}
                        </div>
                    </div>
                    
                    <div data-code-key="ObserveUsingAutoRunner" className="demo-code-section"><Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ObserveUsingAutoRunner, "Code")} />
                        <h6 className="mt-4">Using onAnyPropertyChanged()</h6>
                        <p>
                            The above example using a <code>reaction</code> is an improvement over the first example, but has a drawback in that you have to specify the same delay for all properties.
                            When selecting an item in a drop down however, there is no need for a delay. So you would want a delay for string properties, but not properties bound to a drop down.
                        </p>
                        <p>
                            To help in this situation, <code>ModelBase</code> contains a method called <code>onAnyPropertyChanged()</code>. 
                            This function accepts a callback which runs whenever any of the properties of the model (or it's value objects) change. <br />
                            It will delay the callback for text and numeric properties, but not for drop down (foreign key) properties.
                        </p>
                        <p>
                            Select a country below, and type in some text in the search field and notice when the callback is fired for each.<br /> In this example, the search
                            is called automatically, and there is a search button. If you type in some text, and press enter, the search will happen immediately. If you
                            do this, you must cancel the delayed pending callback, otherwise the search will be called twice. You can do this using
                            the <code>cancelPending()</code> method of the object returned from <code>onAnyPropertyChanged()</code>.<br /> As with <code>reaction()</code>, you
                            must call <code>dispose()</code> when the view model is disposed. You can also let the view model dispose it automatically by using the <code>autoDispose</code> method on the view model. 
                        </p>
                        <Neo.Form onSubmit={() => this.viewModel.example3Search()}>
                            <Neo.GridLayout md={3}>
                                <Neo.FormGroup bind={this.viewModel.criteriaModel3.meta.countryId} select={{ items: countries, displayMember: "name" }} />
                                <Neo.FormGroup bind={this.viewModel.criteriaModel3.meta.search} />
                                <Neo.Button isSubmit className="form-btn">Search</Neo.Button>
                            </Neo.GridLayout>
                        </Neo.Form>

                        <div className="log">
                            {this.viewModel.events3.map(event => (
                                <div>{event}</div>
                            ))}
                        </div>
                    </div>

                </Neo.Card>
            </div>
        );
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_ObserveModelProperties = [{ language: "jsx", code: 
`<h6>Model level</h6>
<p>
    You may need to change one value in a model when another value changes, for example in a cascading drop down. You can do this by adding
    an <code>@Attributes.OnChanged</code> decorator to the property, providing a callback function to execute when the value changes. <br />

    The properties below have an <code>@Attributes.OnChanged</code> decorator attached to them. Change some values to see the effect. The search
    property has a debounce delay which is useful for fields where the user types in some text. The country property callback fires immediately
    (this is the default).
</p>
<Neo.GridLayout>
    <Neo.FormGroup bind={this.viewModel.criteriaModel.meta.countryId} select={{ items: countries, displayMember: "name" }} />
    <Neo.FormGroup bind={this.viewModel.criteriaModel.meta.search} />
</Neo.GridLayout>

<div className="log">
    {this.viewModel.events.map(event => (
        <div>{event}</div>
    ))}
</div>`}, { language: "javascript", code: `@NeoModel
export class CriteriaModel extends ModelBase {

    constructor(public vm: ModelsVM) {
        super();
    }

    @Attributes.OnChanged<CriteriaModel>(c => c.searchChanged, false, 500)
    public search: string = "";

    @Attributes.OnChanged<CriteriaModel>(c => c.countryChanged)
    public countryId: number | null = null;

    private searchChanged(oldValue: string) {
        this.vm.events.push(\`search changed from \${oldValue} to: \${this.search}\`);
    }

    private countryChanged(oldValue: number) {
        this.vm.events.push(\`country changed from \${oldValue ?? "<null>"} to: \${this.countryId ?? "<null>"}\`);
    }
}`}];

const demo_source_code_ObserveUsingReaction = [{ language: "jsx", code: 
`<h6 className="mt-4">Outside a model</h6>
<p>
    The <code>@Attributes.OnChanged</code> decorator is only meant for use inside a model. If you look at the code for the above example, it
    is not very clean, as view model state has to be passed into the model. We also have to add the onChanged decorator to every property we
    need to observe. It would be better if we could react to changes from outside the model.
</p>
<p>
    Mobx caters for this with the <code>reaction</code> (<a href="https://mobx.js.org/refguide/reaction.html">docs</a>) helper function. This function signature looks like this: <code>reaction&lt;T&gt;(expression: () =&gt; T, effect(value: T) =&gt; void)</code>.
    <br />
    To use it, you pass a callback function as the first argument. This function can access one or more observable properties, and return a value or object.
    Whenever any of the values you accessed in this function change, the function you passed in as the effect argument will be called.
</p>
<p>
    View the code for the example below in the <code>initialise()</code> method of the VM. Note, you must dispose the reaction in
    the <code>dispose()</code> method of the VM.
    <br />
    The reaction below will execute immediately when any of the properties change. You can pass in an options object specifying a delay,
    but then countryId will also have a delay.
</p>

<Neo.GridLayout>
    <Neo.FormGroup bind={this.viewModel.criteriaModel2.meta.countryId} select={{ items: countries, displayMember: "name" }} />
    <Neo.FormGroup bind={this.viewModel.criteriaModel2.meta.search} />
</Neo.GridLayout>

<div className="log">
    {this.viewModel.events2.map(event => (
        <div>{event}</div>
    ))}
</div>`}, { language: "javascript", code: `// This model has no OnChanged attributes.
@NeoModel
export class AutoCriteriaModel extends ModelBase {

    public search: string = "";

    public countryId: number | null = null;
}`}, { language: "javascript", title: "VM code", code: `public criteriaModel2 = new AutoCriteriaModel();
public events2: string[] = [];
public disposer2?: IReactionDisposer;

private setupExample2() {
    this.disposer2 = reaction(() => {
        // This callback function accesses the search and countryId observable properties,
        // and returns their values as fields on a new object.
        return {
            search: this.criteriaModel2.search,
            countryId: this.criteriaModel2.countryId
        }
    }, (result) => {
        // Mobx will execute this second callback whenever the values which were
        // accessed above change.
        this.events2.push("Observed state changed to: " + JSON.stringify(result));
    });
}

public dispose() {
    // Note: Reactions must be disposed to prevent memory leaks.
    if (this.disposer2) this.disposer2();
}`}];

const demo_source_code_ObserveUsingAutoRunner = [{ language: "jsx", code: 
`<h6 className="mt-4">Using onAnyPropertyChanged()</h6>
<p>
    The above example using a <code>reaction</code> is an improvement over the first example, but has a drawback in that you have to specify the same delay for all properties.
    When selecting an item in a drop down however, there is no need for a delay. So you would want a delay for string properties, but not properties bound to a drop down.
</p>
<p>
    To help in this situation, <code>ModelBase</code> contains a method called <code>onAnyPropertyChanged()</code>. 
    This function accepts a callback which runs whenever any of the properties of the model (or it's value objects) change. <br />
    It will delay the callback for text and numeric properties, but not for drop down (foreign key) properties.
</p>
<p>
    Select a country below, and type in some text in the search field and notice when the callback is fired for each.<br /> In this example, the search
    is called automatically, and there is a search button. If you type in some text, and press enter, the search will happen immediately. If you
    do this, you must cancel the delayed pending callback, otherwise the search will be called twice. You can do this using
    the <code>cancelPending()</code> method of the object returned from <code>onAnyPropertyChanged()</code>.<br /> As with <code>reaction()</code>, you
    must call <code>dispose()</code> when the view model is disposed. You can also let the view model dispose it automatically by using the <code>autoDispose</code> method on the view model. 
</p>
<Neo.Form onSubmit={() => this.viewModel.example3Search()}>
    <Neo.GridLayout md={3}>
        <Neo.FormGroup bind={this.viewModel.criteriaModel3.meta.countryId} select={{ items: countries, displayMember: "name" }} />
        <Neo.FormGroup bind={this.viewModel.criteriaModel3.meta.search} />
        <Neo.Button isSubmit className="form-btn">Search</Neo.Button>
    </Neo.GridLayout>
</Neo.Form>

<div className="log">
    {this.viewModel.events3.map(event => (
        <div>{event}</div>
    ))}
</div>`}, { language: "javascript", code: `// This model has no OnChanged attributes.
@NeoModel
export class AutoCriteriaModel extends ModelBase {

    public search: string = "";

    public countryId: number | null = null;
}`}, { language: "javascript", title: "VM code", code: `public criteriaModel3 = new AutoCriteriaModel();
public events3: string[] = [];
public autoRunner3?: Misc.IAutoRunner;

private setupExample3() {

    // The callback will be run when any properties on criteriaModel3 change.
    // This can be configured to only observe certain properties, and to include child objects and lists.
    this.autoRunner3 = this.autoDispose(this.criteriaModel3.onAnyPropertyChanged(() => {
        // Usually you would pass the query object directly to an API get method.
        this.events3.push("Query object: " + JSON.stringify(this.criteriaModel3.toQueryObject()));
    }));
}

public example3Search() {
    // When searching manually, you can call fireImmediate() to execute the callback immediately.
    this.autoRunner3?.fireImmediate();
}`}];
