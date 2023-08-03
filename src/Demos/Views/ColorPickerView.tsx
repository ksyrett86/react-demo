import React from 'react';
import { observable } from 'mobx';
import { Neo, Views, NeoGrid } from '@singularsystems/neo-react';
import { NeoModel, ModelBase, List } from '@singularsystems/neo-core';
import { observer } from 'mobx-react';

@NeoModel
export class PickerModel extends ModelBase {
    // Default color
    public styleName: string = '';
    public value: string = '';
}

@NeoModel
export class ColorPickerModel extends ModelBase {
    // Default color
    public color: string = '#000';
    public tenantStyles = new List(PickerModel);


}

@observer
export default class ColorPickerView extends Views.ViewBase {

    constructor(props: unknown) {
        super("Color Picker", Views.EmptyViewModel, props);

        this.colorModel = new ColorPickerModel();
        this.colorModel.tenantStyles.set([
            { styleName: "Item 1", value: "#333" },
            { styleName: "Item 2", value: "#888" },
            { styleName: "Item 3", value: "#445B88" }
        ]);
    }

    @observable.ref
    private showBasicModal = false;

    private colorModel: ColorPickerModel;

    public render() {
        const colorModel = this.colorModel;

        return (
            <div>
                <h2>Color Picker</h2>

                <p>
                    This is a color picker demo
                    The documentation for this open source control is here <a href="https://www.npmjs.com/package/react-color" rel="noopener noreferrer" target="_blank">react-color</a>.
                    It is built using the "SketchPicker" component from the library.
                </p>

                <h6>The current hex value is [{colorModel.color}]</h6>

                <div className="mt-5">
                    <h5>This example you must click on block to open the picker</h5>
                    <Neo.ColorPicker
                        bind={colorModel.meta.color}
                        onChangeEvent={() => console.log('optional event')}
                    />
                </div>

                <div className="mt-5">
                    <h5>This example the picker is in a modal</h5>
                    <Neo.Button variant="secondary" icon="far-window-maximize" onClick={() => this.showBasicModal = true}>Show modal with the color picker</Neo.Button>

                    <Neo.Modal title="Basic Modal" show={this.showBasicModal} onClose={() => this.showBasicModal = false}>
                        {colorModel.tenantStyles &&
                            <NeoGrid.Grid items={colorModel.tenantStyles} >
                                {(item, meta) => (
                                    <NeoGrid.Row>
                                        <NeoGrid.Column bind={meta.styleName} />
                                        <NeoGrid.Column width='40%'>
                                            <Neo.ColorPicker
                                                bind={meta.value}
                                            />
                                        </NeoGrid.Column>
                                        <NeoGrid.ButtonColumn showDelete />
                                    </NeoGrid.Row>)}
                            </NeoGrid.Grid>}

                    </Neo.Modal>
                </div>
            </div>
        )
    }
}
