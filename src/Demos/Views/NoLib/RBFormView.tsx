import CodeUtil from '../../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import { Attributes, Misc, ModalUtils, ModelBase, NeoModel, Rules, Validation } from '@singularsystems/neo-core';

@observer
export default class RBFormView extends Views.ViewBase<RBFormVM> {

    constructor(props: unknown) {
        super("Form", RBFormVM, props);
    }

    public render() {
        const userInfo = this.viewModel.userInfo;

        return (
            <div>
                <Neo.Card title="Basic Form" data-code-key="Nolib_form_neo" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Nolib_form_neo, "Basic Form")} />}>
                    <Neo.Alert variant="primary" className="mb-5">
                        This basic example of a form with validation is a replication of a demo from the react bootstrap library. It's intention is to demonstrate the differences between neo and a popular alternative library.
                        Click the code icon on the top right of each card to view the source code.
                    </Neo.Alert>

                    <div data-code-content>
                        <Neo.Form
                            model={userInfo}
                            onSubmit={() => this.viewModel.submitForm()}>

                            <div className="row">
                                <div className="col-md-4">
                                    <Neo.FormGroup
                                        bind={userInfo.meta.firstName}
                                        placeholder />
                                </div>
                                <div className="col-md-4">
                                    <Neo.FormGroup
                                        bind={userInfo.meta.lastName}
                                        placeholder />
                                </div>
                                <div className="col-md-4">
                                    <Neo.FormGroup
                                        bind={userInfo.meta.userName}
                                        prependText="@"
                                        placeholder />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Neo.FormGroup
                                        bind={userInfo.meta.city}
                                        placeholder />
                                </div>
                                <div className="col-md-3">
                                    <Neo.FormGroup
                                        bind={userInfo.meta.state}
                                        placeholder />
                                </div>
                                <div className="col-md-3">
                                    <Neo.FormGroup
                                        bind={userInfo.meta.zip}
                                        placeholder />
                                </div>
                            </div>

                            <Neo.FormGroup bind={userInfo.meta.acceptTerms} />

                            <Neo.Button isSubmit>Submit form</Neo.Button>
                        </Neo.Form>
                    </div>
                </Neo.Card>

                <Neo.Card title="React-Bootstrap equivalent" data-code-key="Nolib_form_react_bootstrap" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Nolib_form_react_bootstrap, "React-Bootstrap equivalent")} />}>

                    <a href="https://react-bootstrap.github.io/forms/validation/">View live demo</a>
                </Neo.Card>
            </div>
        );
    }
}

// DemoCode: Nolib_form_neo,ViewModel
// Neo stores state in an observable view model, rather than using react's state.
@NeoModel
class RBFormVM extends Views.ViewModelBase {

    public userInfo = new BasicUserInfo();

    public submitForm() {
        const postData = this.userInfo.toJSObject();
        // api.post(postData);

        ModalUtils.showMessage("Submit", "Form submitted.");
    }
}
// End DemoCode

// DemoCode: Nolib_form_neo,Model
// Related state is stored in a model. The metadata of the model, such as validation, is kept within the model.
@NeoModel
class BasicUserInfo extends ModelBase {

    @Rules.Required()
    public firstName: string = "Mark";

    @Rules.Required()
    public lastName: string = "Otto";

    @Rules.Required("Please choose a username.")
    public userName: string = "";

    @Rules.Required("Please provide a valid city.")
    public city: string = "";

    @Rules.Required("Please provide a valid state.")
    public state: string = "";

    @Rules.Required("Please provide a valid zip.")
    public zip: string = "";

    @Attributes.Serialisation(Misc.SerialiseType.Never)
    public acceptTerms: boolean = false;

    protected addBusinessRules(rules: Validation.Rules<this>): void {
        rules.failWhen(c => !c.acceptTerms, "You must agree before submitting.")
    }
}
// End DemoCode

/*
// DemoCode: Nolib_form_react_bootstrap,Component,1,jsx
function FormExample() {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState("Mark");
    const [lastName, setLastName] = useState("Otto");
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [zip, setzip] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = (event) => {
        // In most ui libraries (like react bootstrap), validation is performed by the ui. 
        // There is no way to validate model state without binding it to the ui, or to duplicate domain logic.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        setValidated(true);

        const postData = {
            firstName,
            lastName,
            userName,
            city,
            stateName,
            zip
        };
        // api.post(postData);

        alert("Form submitted.");
    };

    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>

            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustom01">

                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={setFirstName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustom02">

                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChanged={setLastName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustomUsername">

                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            required
                            value={userName}
                            onChanged={setUserName}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            
            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        required value={city}
                        onChanged={setCity} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="State"
                        required
                        value={stateName}
                        onChanged={setStateName} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Zip"
                        required
                        value={city}
                        onChanged={setCity} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                    value={acceptTerms}
                    onChanged={setAcceptTerms}
                />
            </Form.Group>

            <Button type="submit">Submit form</Button>
        </Form>
    );
}
// End DemoCode
*/

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_Nolib_form_neo = [{ language: "jsx", code: 
`<Neo.Form
    model={userInfo}
    onSubmit={() => this.viewModel.submitForm()}>

    <div className="row">
        <div className="col-md-4">
            <Neo.FormGroup
                bind={userInfo.meta.firstName}
                placeholder />
        </div>
        <div className="col-md-4">
            <Neo.FormGroup
                bind={userInfo.meta.lastName}
                placeholder />
        </div>
        <div className="col-md-4">
            <Neo.FormGroup
                bind={userInfo.meta.userName}
                prependText="@"
                placeholder />
        </div>
    </div>

    <div className="row">
        <div className="col-md-6">
            <Neo.FormGroup
                bind={userInfo.meta.city}
                placeholder />
        </div>
        <div className="col-md-3">
            <Neo.FormGroup
                bind={userInfo.meta.state}
                placeholder />
        </div>
        <div className="col-md-3">
            <Neo.FormGroup
                bind={userInfo.meta.zip}
                placeholder />
        </div>
    </div>

    <Neo.FormGroup bind={userInfo.meta.acceptTerms} />

    <Neo.Button isSubmit>Submit form</Neo.Button>
</Neo.Form>`}, { language: "javascript", title: "ViewModel", code: `// Neo stores state in an observable view model, rather than using react's state.
@NeoModel
class RBFormVM extends Views.ViewModelBase {

    public userInfo = new BasicUserInfo();

    public submitForm() {
        const postData = this.userInfo.toJSObject();
        // api.post(postData);

        ModalUtils.showMessage("Submit", "Form submitted.");
    }
}`}, { language: "javascript", title: "Model", code: `// Related state is stored in a model. The metadata of the model, such as validation, is kept within the model.
@NeoModel
class BasicUserInfo extends ModelBase {

    @Rules.Required()
    public firstName: string = "Mark";

    @Rules.Required()
    public lastName: string = "Otto";

    @Rules.Required("Please choose a username.")
    public userName: string = "";

    @Rules.Required("Please provide a valid city.")
    public city: string = "";

    @Rules.Required("Please provide a valid state.")
    public state: string = "";

    @Rules.Required("Please provide a valid zip.")
    public zip: string = "";

    @Attributes.Serialisation(Misc.SerialiseType.Never)
    public acceptTerms: boolean = false;

    protected addBusinessRules(rules: Validation.Rules<this>): void {
        rules.failWhen(c => !c.acceptTerms, "You must agree before submitting.")
    }
}`}];

const demo_source_code_Nolib_form_react_bootstrap = [{ language: "jsx", code: 
`<a href="https://react-bootstrap.github.io/forms/validation/">View live demo</a>`}, { language: "jsx", title: "Component", code: `function FormExample() {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState("Mark");
    const [lastName, setLastName] = useState("Otto");
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [zip, setzip] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = (event) => {
        // In most ui libraries (like react bootstrap), validation is performed by the ui. 
        // There is no way to validate model state without binding it to the ui, or to duplicate domain logic.
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        setValidated(true);

        const postData = {
            firstName,
            lastName,
            userName,
            city,
            stateName,
            zip
        };
        // api.post(postData);

        alert("Form submitted.");
    };

    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>

            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustom01">

                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={setFirstName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustom02">

                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChanged={setLastName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustomUsername">

                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            required
                            value={userName}
                            onChanged={setUserName}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            
            <Row className="mb-3">
                <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        required value={city}
                        onChanged={setCity} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="State"
                        required
                        value={stateName}
                        onChanged={setStateName} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Zip"
                        required
                        value={city}
                        onChanged={setCity} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                    value={acceptTerms}
                    onChanged={setAcceptTerms}
                />
            </Form.Group>

            <Button type="submit">Submit form</Button>
        </Form>
    );
}`}];
