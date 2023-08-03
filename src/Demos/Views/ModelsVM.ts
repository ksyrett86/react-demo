import { NeoModel, ModelBase, Attributes, Misc } from '@singularsystems/neo-core';
import { Views } from '@singularsystems/neo-react';
import { AppService, Types } from '../../Services/AppService';
import { IReactionDisposer, reaction } from 'mobx';

// DemoCode: ObserveModelProperties
@NeoModel
export class CriteriaModel extends ModelBase {

    constructor(public vm: ModelsVM) {
        super();
    }

    @Attributes.OnChanged<CriteriaModel>(c => c.searchChanged, false, 500)
    public search: string = "";

    @Attributes.OnChanged<CriteriaModel>(c => c.countryChanged)
    public countryId: number | null = null;

    private searchChanged(oldValue: string) {
        this.vm.events.push(`search changed from ${oldValue} to: ${this.search}`);
    }

    private countryChanged(oldValue: number) {
        this.vm.events.push(`country changed from ${oldValue ?? "<null>"} to: ${this.countryId ?? "<null>"}`);
    }
}
// End DemoCode

// DemoCode: ObserveUsingReaction|ObserveUsingAutoRunner
// This model has no OnChanged attributes.
@NeoModel
export class AutoCriteriaModel extends ModelBase {

    public search: string = "";

    public countryId: number | null = null;
}
// End DemoCode

@NeoModel
export default class ModelsVM extends Views.ViewModelBase {

    constructor(
        taskRunner = AppService.get(Types.Neo.TaskRunner),
        private notifications = AppService.get(Types.Neo.UI.GlobalNotifications)) {

        super(taskRunner);
    }

    // Example 1
    public criteriaModel = new CriteriaModel(this);
    public events: string[] = [];

    // Example 2
    // DemoCode: ObserveUsingReaction,VM code
    public criteriaModel2 = new AutoCriteriaModel();
    public events2: string[] = [];
    public disposer2?: IReactionDisposer;

    private setupExample2() {
        this.disposer2 = reaction(() => {
            // This callback function accesses the search and countryId observable properties,
            // and returns their values as fields on a new object.
            return {
                search: this.criteriaModel2.search,
                countryId: this.criteriaModel2.countryId
            }
        }, (result) => {
            // Mobx will execute this second callback whenever the values which were
            // accessed above change.
            this.events2.push("Observed state changed to: " + JSON.stringify(result));
        });
    }

    public dispose() {
        // Note: Reactions must be disposed to prevent memory leaks.
        if (this.disposer2) this.disposer2();
    }
    // End DemoCode

    // Example 3
    // DemoCode: ObserveUsingAutoRunner,VM code
    public criteriaModel3 = new AutoCriteriaModel();
    public events3: string[] = [];
    public autoRunner3?: Misc.IAutoRunner;

    private setupExample3() {

        // The callback will be run when any properties on criteriaModel3 change.
        // This can be configured to only observe certain properties, and to include child objects and lists.
        this.autoRunner3 = this.autoDispose(this.criteriaModel3.onAnyPropertyChanged(() => {
            // Usually you would pass the query object directly to an API get method.
            this.events3.push("Query object: " + JSON.stringify(this.criteriaModel3.toQueryObject()));
        }));
    }

    public example3Search() {
        // When searching manually, you can call fireImmediate() to execute the callback immediately.
        this.autoRunner3?.fireImmediate();
    }
    // End DemoCode
    
    public async initialise() {
        
        this.setupExample2();
        this.setupExample3();
       
    }
}