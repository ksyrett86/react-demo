import { ModelBase, NeoModel } from '@singularsystems/neo-core';
import { Views } from '@singularsystems/neo-react';
import { AppService, Types } from '../../Services/AppService';

@NeoModel
export default class GraphsVM extends Views.ViewModelBase {

    constructor(
        taskRunner = AppService.get(Types.Neo.TaskRunner),
        private notifications = AppService.get(Types.Neo.UI.GlobalNotifications)) {

        super(taskRunner);
    }

    public pieOptions = new PieOptions();

    public lineOptions = new LineOptions();

    public async initialise() {

    }

    // DemoCode: ChartLine,Processing,1
    public getLineData(): ILineChartItem[] {

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
    }
    // End DemoCode
}

@NeoModel
export class PieOptions extends ModelBase {

    public isDonut = true;

    public showLegend = false;
}

@NeoModel
export class LineOptions extends ModelBase {

    public mergeData = false;
}

export type ILineChartItem = { instrument: string, values: { date: string, value: number }[]};

const shareData = [
    { 
        instrument: "ABC",
        values: [
            { date: "1 Jan 2022", value: 251 },
            { date: "1 Feb 2022", value: 250 },
            { date: "1 Mar 2022", value: 193 },
            { date: "1 Apr 2022", value: 172 },
            { date: "1 May 2022", value: 159 },
            { date: "1 Jun 2022", value: 168 },
            { date: "1 Jul 2022", value: 251 },
            { date: "1 Aug 2022", value: 234 },
            { date: "1 Sep 2022", value: 227 },
            { date: "1 Oct 2022", value: 205 },
            { date: "1 Nov 2022", value: 267 },
            { date: "1 Dec 2022", value: 284 }
        ]
    },
    {
        instrument: "ACM",
        values: [
            { date: "1 Jan 2022", value: 265 },
            { date: "1 Feb 2022", value: 352 },
            { date: "1 Mar 2022", value: 369 },
            { date: "1 Apr 2022", value: 359 },
            { date: "1 May 2022", value: 385 },
            { date: "1 Jun 2022", value: 405 },
            { date: "1 Jul 2022", value: 349 },
            { date: "1 Aug 2022", value: 340 },
            { date: "1 Sep 2022", value: 325 },
            { date: "1 Oct 2022", value: 298 },
            { date: "1 Nov 2022", value: 285 },
            { date: "1 Dec 2022", value: 282 }
        ]
    },
    {
        instrument: "XYZ",
        values: [
            { date: "1 Jan 2022", value: 172 },
            { date: "1 Feb 2022", value: 191 },
            { date: "1 Mar 2022", value: 197 },
            { date: "1 Apr 2022", value: 193 },
            { date: "1 May 2022", value: 168 },
            { date: "1 Jun 2022", value: 162 },
            { date: "1 Jul 2022", value: 136 },
            { date: "1 Aug 2022", value: 142 },
            { date: "1 Sep 2022", value: 126 },
            { date: "1 Oct 2022", value: 120 },
            { date: "1 Nov 2022", value: 130 },
            { date: "1 Dec 2022", value: 132 }
        ]
    }]