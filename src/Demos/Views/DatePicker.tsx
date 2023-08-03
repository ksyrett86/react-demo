import CodeUtil from '../../Components/CodeUtil';
import React from 'react';
import { Neo, Views } from '@singularsystems/neo-react';
import DateModel from '../Models/DateModel';
import { DateUtils } from '@singularsystems/neo-core';
import { observer } from 'mobx-react';

@observer
export default class DatePickerDemo extends Views.ViewBase {

    constructor(props: unknown) {
        super("Date picker", Views.EmptyViewModel, props);

        this.onDateSelected = this.onDateSelected.bind(this);
    }

    private model = new DateModel();

    // DemoCode: DateRange
    private toDateElement = React.createRef<HTMLInputElement>();

    private onDateSelected(isClosing: boolean) {
        if (isClosing && this.model.fromDate && this.toDateElement.current) {
            this.toDateElement.current.focus();
        }
    }
    // End DemoCode

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Date Picker">

                    <p className="mb-0">
                        The <code>Neo.DatePicker</code> component adds features on top of the text input component to help with the input and display of dates.
                    </p>
                </Neo.Card>

                <Neo.Card title="Basic">

                    <p>
                        Date properties on your model should be decorated with the <code>@Attributes.Date()</code> attribute. The date picker treats all date properties
                        as nullable. If you want to force a date to be selected, you can do so by adding an <code>@Rules.Required()</code> attribute on the property.
                    </p>

                    <Neo.GridLayout alignItems="center">
                        <p>Basic date picker. The default format of the date picker is dd MMM yyyy.</p>
                        <Neo.DatePicker bind={this.model.meta.basic} appendText="fa-calendar-alt" />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Usage">
                    <p>
                        A date can either be selected by typing into the input of the datepicker, or by clicking on a date in the datepicker popup.
                    </p>

                    <h6>Text input</h6>
                    The text typed into the date picker will be parsed according to the format string of the datepicker. In this case it is day month year, so the following
                    inputs will result in the corresponding dates being selected. Pressing tab will update the date value. Pressing escape will undo any changes.
                    <Neo.GridLayout alignItems="center">
                        <div>
                            <ul>
                                <li><code>4</code> - 4th day of the current month.</li>
                                <li><code>4/6</code> - 4th of June of current year.</li>
                                <li><code>4 Sep</code> - 4th of September of current year.</li>
                                <li><code>Mar</code> - 1st of March of current year.</li>
                                <li><code>1/2/17</code> - 1st of Feb 2017.</li>
                                <li><code>1-2-17</code> - 1st of Feb 2017.</li>
                                <li><code>1 2 17</code> - 1st of Feb 2017.</li>
                            </ul>
                        </div>
                        <Neo.DatePicker bind={this.model.meta.blankDate} />
                    </Neo.GridLayout>
                    <p>
                        Changing the formatted value of an existing date will also update the datepicker popup as you are typing.
                    </p>

                    <h6>Mouse input</h6>
                    <p>
                        Clicking on the input box will cause the date picker popup to display, unless the editor is readonly or disabled. You can scroll between months
                        using the left and right buttons, or by clicking on the month name which will display the month view. <br />
                        Clicking on the year while in the month view will display the year view, which makes it quicker to navigate to previous years / months.
                    </p>
                </Neo.Card>

                <Neo.Card title="Time" data-code-key="DateTime" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DateTime, "Time")} />}>
                    <p>
                        The datepicker component has basic time support by specifying a time component in the format string. The time
                        can only be changed by typing in a new time in the date input. There is currently no ui to select a new time.
                    </p>
                    <p>
                        The datepicker component will also never overwrite the time component of a <code>Date</code> property, whether the datepicker is showing
                        time or not. You can therefore have a date only editor, and time only editor bound to the same property without them overwriting each others values.
                    </p>
                    <Neo.GridLayout alignItems="center">
                        <div>
                            Format string is set to <code>dd MMM yyyy HH:mm</code>.
                        </div>
                        <Neo.FormGroup label="Date and time" bind={this.model.meta.time} dateProps={{ formatString: "dd MMM yyyy HH:mm" }} />
                        <div>
                            Format string is set to <code>HH:mm</code>, causing the date picker to be in time only mode. The date picker popup will not be shown.
                        </div>
                        <Neo.FormGroup label="Time only" bind={this.model.meta.time} dateProps={{ formatString: "HH:mm" }} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Props">
                    <p>
                        The properties of the date picker are specified using the <code>dateProps</code> prop. The properties available are described below.
                    </p>
                </Neo.Card>

                <Neo.Card title="Always show" data-code-key="DateInline" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DateInline, "Always show")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>alwaysShow</code> prop causes the datepicker popup to always be visible.
                            </p>
                            <p>
                                This can be combined with the <code>autoChangeDate</code> prop, so that the date changes as the user scrolls through months.
                                The <code>autoChangeDate</code> can be set to <code>start</code> or <code>end</code> to specify if the date should be set to
                                the start or the end of the month while scrolling.
                            </p>
                            <em>Selected date: {DateUtils.format(this.model.autoChange!)}</em>
                        </div>

                        <Neo.DatePicker bind={this.model.meta.autoChange} dateProps={{ alwaysShow: true, showInput: true, autoChangeDate: "start" }} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Format string" data-code-key="DateFormat" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DateFormat, "Format string")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>formatString</code> prop controls how the date value is formatted, and how text input is parsed as explained above.
                                Format strings are specified using the .Net date format.
                            </p>
                            <p>
                                Format settings can also be changed globally using the static properties of the <code>DateUtils</code> class.
                            </p>
                        </div>
                        <Neo.DatePicker bind={this.model.meta.formatString} dateProps={{ formatString: "ddd, dd MMMM yyyy" }} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Min and max dates" data-code-key="DateMinMax" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DateMinMax, "Min and max dates")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>minDate</code> and <code>maxDate</code> props restrict the date to within the range specified by these values.
                            </p>
                            <p>
                                Text input with a date value before the <code>minDate</code> will cause the date to be set to the min date. As with <code>maxDate</code>.
                            </p>
                        </div>
                        <div>
                            <Neo.FormGroup bind={this.model.meta.minDate} dateProps={{ maxDate: this.model.maxDate }} />
                            <Neo.FormGroup bind={this.model.meta.maxDate} dateProps={{ minDate: this.model.minDate }} />
                            <Neo.FormGroup bind={this.model.meta.restrictedDate} dateProps={{ minDate: this.model.minDate, maxDate: this.model.maxDate }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Range" data-code-key="DateRange" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DateRange, "Range")} />}>
                    <Neo.GridLayout>
                        <p>
                            The neo date picker doesn't support selecting a date range. If you need the user to select a date range, it is possible to focus the second date picker when the first date is selected.
                        </p>
                        <div>
                            <Neo.GridLayout>
                                <Neo.FormGroup bind={this.model.meta.fromDate} dateProps={{ onDateSelected: this.onDateSelected }} />
                                <Neo.FormGroup bind={this.model.meta.toDate} dateProps={{ minDate: this.model.fromDate }} inputElement={this.toDateElement} />
                            </Neo.GridLayout>
                        </div>
                    </Neo.GridLayout>
                    
                </Neo.Card>

                <Neo.Card title="Month and year only" data-code-key="DateMonthYear" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_DateMonthYear, "Month and year only")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>monthView</code> and <code>yearView</code> props can be used to make the date picker popup only allow month or year selection.
                            </p>
                            <p>
                                Setting these properties will not change the format string, so a better alternative is to specify a format string instead, without a day or
                                month component. <br />
                                Setting format string to <code>MMMM yyyy</code> will force <code>monthView</code> to be true. <br />
                                Setting format string to <code>yyyy</code> will force <code>yearView</code> to be true.
                            </p>
                            <em>Selected month: {DateUtils.format(this.model.month!)}</em> <br />
                            <em>Selected month: {DateUtils.format(this.model.year!)}</em>
                        </div>
                        <div>
                            <Neo.FormGroup bind={this.model.meta.month} dateProps={{ formatString: "MMMM yyyy" }} />
                            <Neo.FormGroup bind={this.model.meta.year} dateProps={{ formatString: "yyyy" }} />
                        </div>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Auto close">
                    <Neo.GridLayout>
                        <div>
                            <p>
                                When the <code>autoClose</code> prop is set to false, the datepicker popup will stay visible if the input is defocused. It will only be hidden if
                                a date is clicked on. This is mostly useful during development when testing styling updates to the date picker.
                            </p>
                        </div>
                        <Neo.DatePicker bind={this.model.meta.other} dateProps={{ autoClose: false }} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="display3DayLetters">
                    <Neo.GridLayout>
                        <div>
                            <p>
                                This specifies that 3 letter day names should be displayed in the popup date table.
                            </p>
                        </div>
                        <Neo.DatePicker bind={this.model.meta.other} dateProps={{ display3DayLetters: true }} />
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="yearsBeforeInYearView">
                    <Neo.GridLayout>
                        <div>
                            <p>
                                This specifies how many years must show before the current year in the year view of the date picker popup. Set this to a low
                                value if you expect the selected date to be in the future rather than the past.
                            </p>
                        </div>
                        <Neo.DatePicker bind={this.model.meta.other} dateProps={{ yearsBeforeInYearView: 1 }} />
                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_DateTime = [{ language: "jsx", code: 
`<p>
    The datepicker component has basic time support by specifying a time component in the format string. The time
    can only be changed by typing in a new time in the date input. There is currently no ui to select a new time.
</p>
<p>
    The datepicker component will also never overwrite the time component of a <code>Date</code> property, whether the datepicker is showing
    time or not. You can therefore have a date only editor, and time only editor bound to the same property without them overwriting each others values.
</p>
<Neo.GridLayout alignItems="center">
    <div>
        Format string is set to <code>dd MMM yyyy HH:mm</code>.
    </div>
    <Neo.FormGroup label="Date and time" bind={this.model.meta.time} dateProps={{ formatString: "dd MMM yyyy HH:mm" }} />
    <div>
        Format string is set to <code>HH:mm</code>, causing the date picker to be in time only mode. The date picker popup will not be shown.
    </div>
    <Neo.FormGroup label="Time only" bind={this.model.meta.time} dateProps={{ formatString: "HH:mm" }} />
</Neo.GridLayout>`}];

const demo_source_code_DateInline = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>alwaysShow</code> prop causes the datepicker popup to always be visible.
        </p>
        <p>
            This can be combined with the <code>autoChangeDate</code> prop, so that the date changes as the user scrolls through months.
            The <code>autoChangeDate</code> can be set to <code>start</code> or <code>end</code> to specify if the date should be set to
            the start or the end of the month while scrolling.
        </p>
        <em>Selected date: {DateUtils.format(this.model.autoChange!)}</em>
    </div>

    <Neo.DatePicker bind={this.model.meta.autoChange} dateProps={{ alwaysShow: true, showInput: true, autoChangeDate: "start" }} />
</Neo.GridLayout>`}];

const demo_source_code_DateFormat = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>formatString</code> prop controls how the date value is formatted, and how text input is parsed as explained above.
            Format strings are specified using the .Net date format.
        </p>
        <p>
            Format settings can also be changed globally using the static properties of the <code>DateUtils</code> class.
        </p>
    </div>
    <Neo.DatePicker bind={this.model.meta.formatString} dateProps={{ formatString: "ddd, dd MMMM yyyy" }} />
</Neo.GridLayout>`}];

const demo_source_code_DateMinMax = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>minDate</code> and <code>maxDate</code> props restrict the date to within the range specified by these values.
        </p>
        <p>
            Text input with a date value before the <code>minDate</code> will cause the date to be set to the min date. As with <code>maxDate</code>.
        </p>
    </div>
    <div>
        <Neo.FormGroup bind={this.model.meta.minDate} dateProps={{ maxDate: this.model.maxDate }} />
        <Neo.FormGroup bind={this.model.meta.maxDate} dateProps={{ minDate: this.model.minDate }} />
        <Neo.FormGroup bind={this.model.meta.restrictedDate} dateProps={{ minDate: this.model.minDate, maxDate: this.model.maxDate }} />
    </div>
</Neo.GridLayout>`}];

const demo_source_code_DateRange = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>
        The neo date picker doesn't support selecting a date range. If you need the user to select a date range, it is possible to focus the second date picker when the first date is selected.
    </p>
    <div>
        <Neo.GridLayout>
            <Neo.FormGroup bind={this.model.meta.fromDate} dateProps={{ onDateSelected: this.onDateSelected }} />
            <Neo.FormGroup bind={this.model.meta.toDate} dateProps={{ minDate: this.model.fromDate }} inputElement={this.toDateElement} />
        </Neo.GridLayout>
    </div>
</Neo.GridLayout>`}, { language: "javascript", code: `private toDateElement = React.createRef<HTMLInputElement>();

private onDateSelected(isClosing: boolean) {
    if (isClosing && this.model.fromDate && this.toDateElement.current) {
        this.toDateElement.current.focus();
    }
}`}];

const demo_source_code_DateMonthYear = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>monthView</code> and <code>yearView</code> props can be used to make the date picker popup only allow month or year selection.
        </p>
        <p>
            Setting these properties will not change the format string, so a better alternative is to specify a format string instead, without a day or
            month component. <br />
            Setting format string to <code>MMMM yyyy</code> will force <code>monthView</code> to be true. <br />
            Setting format string to <code>yyyy</code> will force <code>yearView</code> to be true.
        </p>
        <em>Selected month: {DateUtils.format(this.model.month!)}</em> <br />
        <em>Selected month: {DateUtils.format(this.model.year!)}</em>
    </div>
    <div>
        <Neo.FormGroup bind={this.model.meta.month} dateProps={{ formatString: "MMMM yyyy" }} />
        <Neo.FormGroup bind={this.model.meta.year} dateProps={{ formatString: "yyyy" }} />
    </div>
</Neo.GridLayout>`}];
