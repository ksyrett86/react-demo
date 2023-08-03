import * as React from 'react';
import { Views } from '@singularsystems/neo-react';
import { observer } from 'mobx-react';

@observer
export default class Home extends Views.ViewBase {

    constructor(props: unknown) {
        super("", Views.EmptyViewModel, props);
    }

    public render() {
        return (
            <div>
            </div>
        )
    }
}