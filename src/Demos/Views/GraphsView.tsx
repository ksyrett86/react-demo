import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import GraphsVM, { ILineChartItem, PieOptions } from './GraphsVM';
import { observer } from 'mobx-react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export const pieColors = ["#65B4BB", "#2B7F86", "#3A8672", "#00333A", "#94B0B3", "#D4EAE3"];
export const lineColors = ["#fa6464", "#fb996d", "#2e3643", "#FFC800", "#1FD0A3", "#369AFE"];

@observer
export default class GraphsView extends Views.ViewBase<GraphsVM> {

    constructor(props: unknown) {
        super("Graphs", GraphsVM, props);
    }

    public render() {
        return (
            <div>
			    <Neo.Card title="Graphs" icon="chart-area">
                    Neo doesn't have any charting components, but we recommend using highcharts.

                    <p>
                        To use highcharts, install the following packages:<br />
                        <ul>
                            <li><code>highcharts</code><br /></li>
                            <li><code>highcharts-react-official</code></li>
                        </ul> 
                    </p>

                    <p>
                        Some examples are provided below. Refer to the highcharts <a href="https://www.highcharts.com/demo">demos</a> and <a href="https://api.highcharts.com/highcharts/">api documentation</a> for more examples and options.
                    </p>
                </Neo.Card>

                <Neo.GridLayout xl={2}>

                    <Neo.Card title="Pie chart" icon="chart-pie" data-code-key="ChartPie" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ChartPie, "Pie chart")} />}>

                        <div className="d-flex">
                            <Neo.FormGroup bind={this.viewModel.pieOptions.meta.isDonut} className="mr-3" />
                            <Neo.FormGroup bind={this.viewModel.pieOptions.meta.showLegend} input={{ type: "switch" }} data-tip="Show a legend instead of labels." />
                        </div>

                        <PieChart options={this.viewModel.pieOptions} />
                    </Neo.Card>

                    <Neo.Card title="Line chart" icon="chart-line" data-code-key="ChartLine" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_ChartLine, "Line chart")} />}>
                        <Neo.FormGroup bind={this.viewModel.lineOptions.meta.mergeData} data-tip="Merge data and show an area chart" data-tip-align="start" className="mr-3" />

                        <LineChart data={this.viewModel.getLineData()} />
                    </Neo.Card>

                </Neo.GridLayout>
                
            </div>
        );
    }
}

// DemoCode: ChartPie,Component,0,jsx
@observer
class PieChart extends React.Component<{ options: PieOptions }> {

    public render() {

        return <HighchartsReact
                    highcharts={Highcharts}
                    options={this.getPieChartOptions()} />
    }

    public getPieChartOptions() {
        const options = this.props.options,
            showLabels = !options.showLegend;

        return {
            chart: { 
                type: "pie", 
                backgroundColor: "#fff" 
            },
            plotOptions: { 
                pie: {
                    innerSize: options.isDonut ? "70%" : undefined,
                    dataLabels: { enabled: showLabels, format: "<b>{point.name}</b>: {point.percentage:.1f} %", style: { fontSize: "10px" } }
                }
            },
            title: { text: "Car Sales" },
            series: [{
                animation: true,
                tooltip: { valueDecimals: 0, pointFormat: "<b>{point.y}</b> units" },
                type: "pie",
                name: "Value",
                data: pieData.map(c => [c.browser, c.value]),
                colors: pieColors,
                showInLegend: options.showLegend
            }],
        } as Highcharts.Options;
    }
}

const pieData = [
    { browser: "Toyota", value: 13529 },
    { browser: "VW", value: 6322 },
    { browser: "Suzuki", value: 4287 },
    { browser: "Nissan", value: 3167 },
    { browser: "Hyundai", value: 2980 },
    { browser: "Ford", value: 2341 } ];
// End DemoCode

// DemoCode: ChartLine,Component,0,jsx
@observer
class LineChart extends React.Component<{ data: ILineChartItem[] }> {

    public render() {

        return <HighchartsReact
                    highcharts={Highcharts}
                    options={this.getLineChartOptions()} />
    }

    private getLineChartOptions() {

        const shareData = this.props.data;
        const symbol = "R";
        
        const chartType = shareData.length === 1 ? "area" : "line";
        const tooltipHeader = shareData.length === 1 ? "{point.x:%d %b %Y}<br>" : "{point.series.name}<br>{point.x:%d %b %Y}<br>"

        const chartOptions = {
            chart: { type: chartType, backgroundColor: "transparent" },
            title: { text: undefined },
            xAxis: {
                type: "datetime",
                labels: { format: "{value:%d %b %y}" },
            },
            yAxis: {
                labels: { format: "R{value:,.0f}" },
                title: { text: undefined },
            },
            series: shareData.map((s, index) => ({
                animation: true,
                marker: { enabled: false },
                tooltip: { valueDecimals: 0, headerFormat: tooltipHeader, pointFormat: "<b>" + symbol + "{point.y}</b>" },
                name: s.instrument,
                type: chartType,
                data: s.values.map(c => [new Date(c.date).getTime(), c.value]),
                dataLabels: [{ enabled: false }],  
                lineWidth: 3,
                color: lineColors[index % lineColors.length]
            })),
            legend: { enabled: shareData.length > 1 }
        } as Highcharts.Options;

        if (chartOptions.series!.length === 1) {
            const series = chartOptions.series![0] as Highcharts.PlotAreaOptions;
            series.color = "#369afe";
            
            series.fillColor = {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(54, 154, 254, 0.2)'],
                    [0.5, 'rgba(54, 154, 254, 0.05)'],
                    [1, 'rgba(54, 154, 254, 0)']
                ]
            };
        }

        return chartOptions;
    }
}
// End DemoCode

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_ChartPie = [{ language: "jsx", code: 
`<div className="d-flex">
    <Neo.FormGroup bind={this.viewModel.pieOptions.meta.isDonut} className="mr-3" />
    <Neo.FormGroup bind={this.viewModel.pieOptions.meta.showLegend} input={{ type: "switch" }} data-tip="Show a legend instead of labels." />
</div>

<PieChart options={this.viewModel.pieOptions} />`}, { language: "jsx", title: "Component", code: `@observer
class PieChart extends React.Component<{ options: PieOptions }> {

    public render() {

        return <HighchartsReact
                    highcharts={Highcharts}
                    options={this.getPieChartOptions()} />
    }

    public getPieChartOptions() {
        const options = this.props.options,
            showLabels = !options.showLegend;

        return {
            chart: { 
                type: "pie", 
                backgroundColor: "#fff" 
            },
            plotOptions: { 
                pie: {
                    innerSize: options.isDonut ? "70%" : undefined,
                    dataLabels: { enabled: showLabels, format: "<b>{point.name}</b>: {point.percentage:.1f} %", style: { fontSize: "10px" } }
                }
            },
            title: { text: "Car Sales" },
            series: [{
                animation: true,
                tooltip: { valueDecimals: 0, pointFormat: "<b>{point.y}</b> units" },
                type: "pie",
                name: "Value",
                data: pieData.map(c => [c.browser, c.value]),
                colors: pieColors,
                showInLegend: options.showLegend
            }],
        } as Highcharts.Options;
    }
}

const pieData = [
    { browser: "Toyota", value: 13529 },
    { browser: "VW", value: 6322 },
    { browser: "Suzuki", value: 4287 },
    { browser: "Nissan", value: 3167 },
    { browser: "Hyundai", value: 2980 },
    { browser: "Ford", value: 2341 } ];`}];

const demo_source_code_ChartLine = [{ language: "jsx", code: 
`<Neo.FormGroup bind={this.viewModel.lineOptions.meta.mergeData} data-tip="Merge data and show an area chart" data-tip-align="start" className="mr-3" />

<LineChart data={this.viewModel.getLineData()} />`}, { language: "jsx", title: "Component", code: `@observer
class LineChart extends React.Component<{ data: ILineChartItem[] }> {

    public render() {

        return <HighchartsReact
                    highcharts={Highcharts}
                    options={this.getLineChartOptions()} />
    }

    private getLineChartOptions() {

        const shareData = this.props.data;
        const symbol = "R";
        
        const chartType = shareData.length === 1 ? "area" : "line";
        const tooltipHeader = shareData.length === 1 ? "{point.x:%d %b %Y}<br>" : "{point.series.name}<br>{point.x:%d %b %Y}<br>"

        const chartOptions = {
            chart: { type: chartType, backgroundColor: "transparent" },
            title: { text: undefined },
            xAxis: {
                type: "datetime",
                labels: { format: "{value:%d %b %y}" },
            },
            yAxis: {
                labels: { format: "R{value:,.0f}" },
                title: { text: undefined },
            },
            series: shareData.map((s, index) => ({
                animation: true,
                marker: { enabled: false },
                tooltip: { valueDecimals: 0, headerFormat: tooltipHeader, pointFormat: "<b>" + symbol + "{point.y}</b>" },
                name: s.instrument,
                type: chartType,
                data: s.values.map(c => [new Date(c.date).getTime(), c.value]),
                dataLabels: [{ enabled: false }],  
                lineWidth: 3,
                color: lineColors[index % lineColors.length]
            })),
            legend: { enabled: shareData.length > 1 }
        } as Highcharts.Options;

        if (chartOptions.series!.length === 1) {
            const series = chartOptions.series![0] as Highcharts.PlotAreaOptions;
            series.color = "#369afe";
            
            series.fillColor = {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(54, 154, 254, 0.2)'],
                    [0.5, 'rgba(54, 154, 254, 0.05)'],
                    [1, 'rgba(54, 154, 254, 0)']
                ]
            };
        }

        return chartOptions;
    }
}`}, { language: "javascript", title: "Processing", code: `public getLineData(): ILineChartItem[] {

    if (this.lineOptions.mergeData) {
        const initial: ILineChartItem = { instrument: "All", values: [] };

        return [shareData.reduce((p, c) => {
            if (p.values.length === 0) {
                // Clone the first instrument.
                p.values = c.values.map(v => ({...v}));
            } else {
                // Add the remaining values to the first instrument.
                for (let i = 0; i < c.values.length; i++) {
                    p.values[i].value += c.values[i].value;
                }
            }
            
            return p;
        }, initial)];
    } else {
        return shareData;
    }
}`}];
