import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Icons, Neo, Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSocks, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { AppService, Types } from '../../Services/AppService';
import { faHourglass } from '@fortawesome/free-regular-svg-icons';
import neoLogo from '../Images/neo-icon.png';

@observer
export default class IconsView extends Views.ViewBase {

    constructor(props: unknown) {
        super("Icons", Views.EmptyViewModel, props);
    }

    // DemoCode: IconFactoryUsage
    private iconFactory = AppService.get(Types.Neo.Components.IconFactory);

    private thumbsUpIcon = "fa-thumbs-up";
    private astronautIcon = <FontAwesomeIcon icon={faUserAstronaut} />;
    // End DemoCode

    private exampleFactory = new ExampleIconFactory();

    public render() {
        return (
            <div>
                <Neo.Card title="Icons" data-code-key="Icons" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_Icons, "Icons")} />}>
                    <p>
                        The <code>icon</code> prop on all neo components has a data type of <code>any</code>. This allows you to provide a string name for the icon, or to provide the icon definition, or icon component.
                    </p>

                    <Neo.Button variant="light" icon="fa-save">String</Neo.Button>
                    <Neo.Button variant="light" icon={<i className="fa fa-user fa-rotate-90" />} className="ml-2">Component</Neo.Button>
                </Neo.Card>

                <Neo.Card title="Icon Factory" data-code-key="IconFactoryUsage" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_IconFactoryUsage, "Icon Factory")} />}>
                    <p>
                        The <code>IconFactory</code> service is responsible for mapping string names to icons, and to allow neo components to request certain styles for icon definitions.
                        Use this service if you are developing components that require icons.
                    </p>

                    <div style={{ fontSize: "24px"}}>
                        <span>{this.iconFactory.getIconComponent(this.thumbsUpIcon)}</span> 
                        <span className="ml-2">{this.iconFactory.getIconComponent(this.astronautIcon)}</span>
                    </div>
                </Neo.Card>

                <Neo.Card title="Font-awesome" data-code-key="IconFA" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_IconFA, "Font-awesome")} />}>
                    <p>
                        By default, neo components create icons with an <code>i</code> tag, using font-awesome class names. The font-awesome script is included in index.html and is not part of the app bundle.
                        The advantage of this is that icons do not increase the bundled size of the app. 
                        The disadvantage is that you must use strings to identify icons, and newer versions of font awesome don't provide a public cdn location to reference.
                    </p>
                    <p>
                        In order to import icons using the normal javascript import syntax, you need to register a custom <code>IconFactory</code>. Neo includes a <code>FontAwesomeIconFactory</code>, 
                        but it is not enabled by default.
                    </p>
                    <p>
                        To enable it, add this to your app module: <code>container.bind(Types.Neo.Components.IconFactory).toConstantValue(new Icons.FontAwesomeIconFactory(FontAwesomeIcon))</code>
                    </p>
                    <p>
                        This will enable you to import icons:
                    </p>
                    <div>
                        <span>{this.iconFactory.getIconComponent(faHourglass, { spin: true })}</span> <br/>
                        <Neo.Button variant="light" className="mt-2" icon={faSocks}></Neo.Button>
                    </div>
                </Neo.Card>

                <Neo.Card title="Other icon packs" data-code-key="IconCustom" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_IconCustom, "Other icon packs")} />}>
                    <p>
                        If your project uses an icon pack other than font-awesome, you will need to create your own <code>IconFactory</code> service.
                        You can extend the default <code>IconFactory</code> class, and override the <code>mapStringToIcon</code>, and <code>createIconComponent</code> methods.
                    </p>
                    <p>
                        You will also need to register your service in your app module: <code>container.bind(Types.Neo.Components.IconFactory).to(ExampleIconFactory).inSingletonScope()</code>
                    </p>
                    <p>
                        <span>{this.exampleFactory.getIconComponent("neo")}</span> <br/>
                    </p>
                </Neo.Card>
            </div>
        );
    }
}

// DemoCode: IconCustom
export class ExampleIconFactory extends Icons.IconFactory {

    protected mapStringToIcon(iconName: string, style?: Icons.IconStyle): React.ReactNode {
        if (iconName === "neo") {
            return <img src={neoLogo} style={{maxHeight: 32}} alt="icon" />
        }
        return super.mapStringToIcon(iconName, style);
    }

    protected createIconComponent(iconDescriptor: any, style?: Icons.IconStyle): React.ReactNode {
        return super.createIconComponent(iconDescriptor, style);
    }
}
// End DemoCode

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_Icons = [{ language: "jsx", code: 
`<p>
    The <code>icon</code> prop on all neo components has a data type of <code>any</code>. This allows you to provide a string name for the icon, or to provide the icon definition, or icon component.
</p>

<Neo.Button variant="light" icon="fa-save">String</Neo.Button>
<Neo.Button variant="light" icon={<i className="fa fa-user fa-rotate-90" />} className="ml-2">Component</Neo.Button>`}];

const demo_source_code_IconFactoryUsage = [{ language: "jsx", code: 
`<p>
    The <code>IconFactory</code> service is responsible for mapping string names to icons, and to allow neo components to request certain styles for icon definitions.
    Use this service if you are developing components that require icons.
</p>

<div style={{ fontSize: "24px"}}>
    <span>{this.iconFactory.getIconComponent(this.thumbsUpIcon)}</span> 
    <span className="ml-2">{this.iconFactory.getIconComponent(this.astronautIcon)}</span>
</div>`}, { language: "javascript", code: `private iconFactory = AppService.get(Types.Neo.Components.IconFactory);

private thumbsUpIcon = "fa-thumbs-up";
private astronautIcon = <FontAwesomeIcon icon={faUserAstronaut} />;`}];

const demo_source_code_IconFA = [{ language: "jsx", code: 
`<p>
    By default, neo components create icons with an <code>i</code> tag, using font-awesome class names. The font-awesome script is included in index.html and is not part of the app bundle.
    The advantage of this is that icons do not increase the bundled size of the app. 
    The disadvantage is that you must use strings to identify icons, and newer versions of font awesome don't provide a public cdn location to reference.
</p>
<p>
    In order to import icons using the normal javascript import syntax, you need to register a custom <code>IconFactory</code>. Neo includes a <code>FontAwesomeIconFactory</code>, 
    but it is not enabled by default.
</p>
<p>
    To enable it, add this to your app module: <code>container.bind(Types.Neo.Components.IconFactory).toConstantValue(new Icons.FontAwesomeIconFactory(FontAwesomeIcon))</code>
</p>
<p>
    This will enable you to import icons:
</p>
<div>
    <span>{this.iconFactory.getIconComponent(faHourglass, { spin: true })}</span> <br/>
    <Neo.Button variant="light" className="mt-2" icon={faSocks}></Neo.Button>
</div>`}];

const demo_source_code_IconCustom = [{ language: "jsx", code: 
`<p>
    If your project uses an icon pack other than font-awesome, you will need to create your own <code>IconFactory</code> service.
    You can extend the default <code>IconFactory</code> class, and override the <code>mapStringToIcon</code>, and <code>createIconComponent</code> methods.
</p>
<p>
    You will also need to register your service in your app module: <code>container.bind(Types.Neo.Components.IconFactory).to(ExampleIconFactory).inSingletonScope()</code>
</p>
<p>
    <span>{this.exampleFactory.getIconComponent("neo")}</span> <br/>
</p>`}, { language: "javascript", code: `export class ExampleIconFactory extends Icons.IconFactory {

    protected mapStringToIcon(iconName: string, style?: Icons.IconStyle): React.ReactNode {
        if (iconName === "neo") {
            return <img src={neoLogo} style={{maxHeight: 32}} alt="icon" />
        }
        return super.mapStringToIcon(iconName, style);
    }

    protected createIconComponent(iconDescriptor: any, style?: Icons.IconStyle): React.ReactNode {
        return super.createIconComponent(iconDescriptor, style);
    }
}`}];
