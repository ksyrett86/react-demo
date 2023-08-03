import { Attributes, ModelBase, NeoModel } from '@singularsystems/neo-core';

@NeoModel
export default class DateModel extends ModelBase {

    @Attributes.Date()
    public basic: Date | null = new Date();

    @Attributes.Date()
    public blankDate : Date | null = null;

    @Attributes.Date()
    public autoChange : Date | null = new Date(2019, 9, 1);

    @Attributes.Date()
    public formatString: Date | null = new Date();

    @Attributes.Date()
    public minDate: Date | null = null;

    @Attributes.Date()
    public maxDate: Date | null = null;

    @Attributes.Date()
    public restrictedDate: Date | null = null;
  
    @Attributes.Date()
    public other: Date | null = null;

    public stringProperty: string = "10 Jan 2019";

    public month: Date | null = null;

    public year: Date | null = null;

    public time: Date | null = new Date();

    @Attributes.Date()
    public fromDate: Date | null = null;

    @Attributes.Date()
    public toDate: Date | null = null;

    constructor() {
        super();

        this.minDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - 1);

        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() + 1);
    }
}