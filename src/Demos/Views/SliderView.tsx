import React from 'react';
import { observer } from 'mobx-react';
import { Neo, Views } from '@singularsystems/neo-react';
import { ModelBase, NeoModel } from '@singularsystems/neo-core';
import { Marks as ISliderMarks } from 'rc-slider';

@NeoModel
class SliderModel extends ModelBase {
    public item: number | undefined
}

@NeoModel
class RangeModel extends ModelBase {
    public item: number | undefined
    public itemEnd: number | undefined
}

class SliderViewModel extends Views.ViewModelBase {

    constructor() {
        super();

        this.sliderModel1.item = 8;
        this.sliderModel2.item = 2;
        this.sliderModel3.item = 2;
        this.rangeModal1.item = 1;
        this.rangeModal1.itemEnd = 5;
        this.rangeModal2.item = 15;
        this.rangeModal2.itemEnd = 20;
        this.rangeModal3.item = 0;
        this.rangeModal3.itemEnd = 90;
        this.rangeModal4.item = 0;
        this.rangeModal4.itemEnd = 90;
    }

    public sliderModel1 = new SliderModel();
    public sliderModel2 = new SliderModel();
    public sliderModel3 = new SliderModel();
    public rangeModal1 = new RangeModel();
    public rangeModal2 = new RangeModel();
    public rangeModal3 = new RangeModel();
    public rangeModal4 = new RangeModel();
}

const sliderData: ISliderMarks = {
    1: <i className="fa fa-fw fa-play"></i>, // Add an icon
    2: '10',
    3: 'mid',
    4: 'last',
    5: <span>Last<i className="fa fa-fw fa-hourglass-end"></i></span> // Add an icon
};

const rangeData: ISliderMarks = {
    1: <i className="fa fa-fw fa-play"></i>, // Add an icon
    8: 'mid',
    10: <span>Last<i className="fa fa-fw fa-hourglass-end"></i></span>, // Add an icon
    15: 'almost',
    20: '20',
    25: '25',
};

@observer
export default class SliderView extends Views.ViewBase<SliderViewModel> {

    constructor(props: unknown) {
        super("Slider", SliderViewModel, props);
    }

    public render() {
        return (
            <div className="slider-demo constrain-width">
                <Neo.Card title="Slider">
                    <p className="mb-0">
                        This is a slider demo
							The documentation for this open source control is here <a href="https://www.npmjs.com/package/rc-slider" rel="noopener noreferrer" target="_blank">rc-slider</a>.
					</p>
                </Neo.Card>

                <Neo.Card title="Horizontal">
                    <div className="mt-2">
                        <h5>Slider - basic [{this.viewModel.sliderModel1.item}]</h5>
                        <Neo.FormGroup bind={this.viewModel.sliderModel1.meta.item} />
                        <Neo.Slider
                            bind={this.viewModel.sliderModel1.meta.item}
                            dots
                            min={0}
                            max={20}
                            step={2}
                            onChangeEvent={() => console.log('custom change 1')}
                        />
                    </div>

                    <div className="mt-5">
                        <h5>Slider - with marks [{this.viewModel.sliderModel2.item}]</h5>
                        <Neo.Slider
                            bind={this.viewModel.sliderModel2.meta.item}
                            dots
                            marks={sliderData}
                            min={1}
                            max={5}
                        // reverse
                        />
                    </div>

                    <div className="mt-5">
                        <h5>Range - basic [{this.viewModel.rangeModal1.item}, {this.viewModel.rangeModal1.itemEnd}]</h5>
                        <Neo.Slider
                            bind={this.viewModel.rangeModal1.meta.item}
                            bindEnd={this.viewModel.rangeModal1.meta.itemEnd}
                            dots
                            min={0}
                            max={20}
                        // reverse
                        />
                    </div>

                    <div className="mt-5">
                        <h5>Range - with specific marks [{this.viewModel.rangeModal2.item}, {this.viewModel.rangeModal2.itemEnd}]</h5>
                        <Neo.Slider
                            bind={this.viewModel.rangeModal2.meta.item}
                            bindEnd={this.viewModel.rangeModal2.meta.itemEnd}
                            dots
                            min={0}
                            max={20}
                            marks={rangeData}
                            // reverse
                            onChangeEvent={() => console.log('custom change 2')}
                        />
                    </div>

                    <div className="mt-5 mb-5">
                        <h5>Range - with a step of 10 [{this.viewModel.rangeModal3.item}, {this.viewModel.rangeModal3.itemEnd}]</h5>
                        <Neo.Slider
                            bind={this.viewModel.rangeModal3.meta.item}
                            bindEnd={this.viewModel.rangeModal3.meta.itemEnd}
                            // dots
                            defaultValue={1}
                            min={0}
                            max={100}
                            // reverse
                            step={10}
                        />
                    </div>
                </Neo.Card>

                <Neo.Card title="Vertical">
                    <Neo.GridLayout md={2} xl={3} xxl={4}>

                        <div className="mt-5">
                            <h5>Slider - basic [{this.viewModel.sliderModel3.item}]</h5>
                            <Neo.Slider
                                bind={this.viewModel.sliderModel3.meta.item}
                                dots
                                min={0}
                                max={20}
                                step={2}
                                style={{ height: '300px' }}
                                vertical
                            />
                        </div>

                        <div className="mt-5 mb-5">
                            <h5>Range - with a step of 10 [{this.viewModel.rangeModal4.item}, {this.viewModel.rangeModal4.itemEnd}]</h5>
                            <Neo.Slider
                                bind={this.viewModel.rangeModal4.meta.item}
                                bindEnd={this.viewModel.rangeModal4.meta.itemEnd}
                                // dots
                                min={0}
                                max={100}
                                // reverse
                                step={10}
                                style={{ height: '300px' }}
                                vertical
                            />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}
