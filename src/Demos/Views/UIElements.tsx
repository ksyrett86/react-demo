import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import { demoMenuItem } from '../DemoRoutes';
import { Link } from 'react-router-dom';
import '../Styles/Demo.scss';

export default class UIElements extends Views.ViewBase {

    constructor(props: unknown) {
        super("Demos", Views.EmptyViewModel, props);

    }

    public render() {
        return (
            <div>
                <Neo.Card title="UI Elements" icon="folder">
                    <p>
                        Please use the links below, or use the menu items on the right to select a page.
                    </p>

                    {demoMenuItem.children!.map(r => (
                        r.path && <div><Link key={r.name} to={r.path}>{r.name}</Link></div>
                    ))}
                </Neo.Card>
            </div>
        )
    }
}