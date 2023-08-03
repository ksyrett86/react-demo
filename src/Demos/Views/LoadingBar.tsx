import CodeUtil from '../../Components/CodeUtil';
import React from "react";
import { ModalUtils, TaskRunner } from '@singularsystems/neo-core';
import { Neo, Views } from '@singularsystems/neo-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { AppService, Types } from '../../Services/AppService';

@observer
export default class LoadingBar extends Views.PersistentViewBase<Views.EmptyViewModel> {

    constructor(props: unknown) {
        super("Loading & Progress", Views.EmptyViewModel, props);
    }

    @observable.ref
    private showSimpleLoader = false;

    // DemoCode: LoadingTaskRunner
    private exampleTask = AppService.get(Types.Neo.TaskRunner);

    private async runExampleTask(addError: boolean) {

        const returnVal = await this.exampleTask.run(async options => {
            // This can be used to change error handling:
            // options.errorHandling = AutoErrorHandling.DontHandle;
            options.loadingText = "Loading something...";

            await TaskRunner.delay(2000);

            options.loadingText = "Loading something else...";

            await TaskRunner.delay(2000);

            options.loadingText = "Loading final thing...";

            await TaskRunner.delay(2000);

            if (addError) {
                throw new Error("An error occurred running the task!");
            } else {
                return "Successful result";
            }
        });

        if (returnVal) {
            ModalUtils.showMessage("Success!", returnVal);
        }
    }
    // End DemoCode

    // DemoCode: LoadingDefaultTaskRunner
    private async runDefaultTask() {
        this.taskRunner.run(async options => {
            options.variant = "success";

            await TaskRunner.delay(2000);

            options.loadingText = "Saving data...";

            await TaskRunner.delay(2000);

            options.loadingText = "Processing records...";
            options.variant = "primary";

            await TaskRunner.delay(2000);

            options.loadingText = "Click on another page, and then come back to this page";
            options.variant = "danger";

            await TaskRunner.delay(20000);

            options.loadingText = "You are still waiting?";
            options.variant = "dark";

            await TaskRunner.delay(2000);
        });
    }
    // End DemoCode

    public render() {
        return (
            <div className="constrain-width">
                <Neo.Card title="Loading & Progress" data-code-key="LoadingBasic" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_LoadingBasic, "Loading & Progress")} />}>
                    <Neo.GridLayout>
                        <div>
                            <p>
                                The <code>Neo.Loader</code> component can be wrapped around another component to show a loading spinner, and prevent the underlying content from
                                being clicked. The simplest way to show the loader is to set the <code>show</code> prop to true.
                            </p>
                        </div>

                        <Neo.Loader show={this.showSimpleLoader}>
                            <div className="loading-target">
                                <p>A div with some content and a button in it.</p>
                                <Neo.Button onClick={() => this.showSimpleLoader = true}>Click here</Neo.Button>
                            </div>
                        </Neo.Loader>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Progress bar" data-code-key="LoadingProgress" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_LoadingProgress, "Progress bar")} />}>

                    <Neo.GridLayout>
                        <p>The progress bar supports the same customisation as the bootstrap progress bar.
                            The <code>progress</code> is specified as a fraction: 0.2 intead of 20%.
                        </p>
                        <Neo.ProgressBar progress={0.2} className="mt-3" />
                    </Neo.GridLayout>
                    <Neo.GridLayout>
                        <p><code>Variant</code> can be changed</p>
                        <Neo.ProgressBar progress={0.4} variant="success" className="mt-3" />
                    </Neo.GridLayout>
                    <Neo.GridLayout>
                        <p>Striped</p>
                        <Neo.ProgressBar progress={0.6} variant="warning" type="striped" className="mt-3" />
                    </Neo.GridLayout>
                    <Neo.GridLayout>
                        <p>Animated</p>
                        <Neo.ProgressBar progress={0.8} variant="danger" type="animated" className="mt-3" />
                    </Neo.GridLayout>
                    <Neo.GridLayout>
                        <p>Reversed - you can set this globally using <code>Misc.Settings.progressBar.reverse</code></p>
                        <Neo.ProgressBar progress={0.8} variant="dark" type="animated" reverse className="mt-3" />
                    </Neo.GridLayout>

                </Neo.Card>

                <Neo.Card title="Task runner" data-code-key="LoadingTaskRunner" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_LoadingTaskRunner, "Task runner")} />}>

                    <Neo.GridLayout>
                        <p>
                            The <code>TaskRunner</code> component can be used with the <code>loader</code> and <code>progress</code> components to automatically
                            show a loader or progress bar while an async task is busy running. <br />
                            In this example, the loader is bound to a <code>TaskRunner</code>, rather than a boolean value. The loader will show automatically
                            while the task is running. Errors that occur will be automatically handled by the task runner. This can be changed by setting
                            the <code>errorHandling</code> property in the run callback.
                        </p>
                        <Neo.Loader task={this.exampleTask}>
                            <div className="loading-target">
                                <p>Click the button to run the task.</p>
                                <Neo.Button onClick={() => this.runExampleTask(false)} variant="success">Run successful task</Neo.Button> {" "}
                                <Neo.Button onClick={() => this.runExampleTask(true)} variant="danger">Run error task</Neo.Button>
                            </div>
                        </Neo.Loader>
                    </Neo.GridLayout>
                </Neo.Card>

                <Neo.Card title="Default task" data-code-key="LoadingDefaultTaskRunner" headerElements={<Neo.Button icon="code" size="sm" className="demo-code-button" onClick={() => CodeUtil.showCode(demo_source_code_LoadingDefaultTaskRunner, "Default task")} />}>

                    <Neo.GridLayout>
                        <div>
                            <p>
                                If your component inherits <code>ViewBase</code>, it will have a <code>taskRunner</code> property. You can use the task runner of the current
                                view in your master page to show a view level loading / progress bar. If your component inherits <code>PersistentViewBase</code>, the task runner
                                will be persisted when navigating to another page and back.
                            </p>
                            <p>
                                A <code>TaskRunner</code> instance will raise an error if <code>run</code> is called while a previous task is busy executing. This is to prevent
                                the same action running multiple times. E.g. if a user presses enter on a focused button more than once, the buttons click handler will
                                call <code>taskRunner.run</code> multiple times raising a console error. The callback passed to <code>taskRunner.run</code> will only be called
                                once, protecting you from creating duplicate calls to an api.
                            </p>
                        </div>
                        <div>
                            <Neo.Button onClick={() => this.taskRunner.run(() => TaskRunner.delay(1000))}>Simple example</Neo.Button> {" "}
                            <Neo.Button onClick={() => this.taskRunner.run("Saving records...", () => TaskRunner.delay(2000))}>Show loading text</Neo.Button> {" "}
                        </div>
                        <p>
                            Once the task has started, you can change the loading text, change the colour of the progress bar, and reset the progress bar.
                        </p>
                        <div>
                            <Neo.Button onClick={() => this.runDefaultTask()}>Complex example</Neo.Button>
                        </div>
                        <div>
                            <p>
                                If you have a single async operation like fetching some data, you can pass the <code>Promise</code> into the <code>TaskRunner</code> without
                                specifying a callback function. E.g. <code>await this.taskRunner.waitFor(Axios.get(...))</code>
                            </p>
                            <p>
                                Note: you can call <code>waitFor</code> many times while the <code>TaskRunner</code> is busy. For this reason, the method will raise an
                                error if it gets an axios result for an http method other than <code>get</code>.
                            </p>
                        </div>
                        <div>
                            <Neo.Button onClick={() => this.taskRunner.waitFor(TaskRunner.delay(2000))}>With existing promise</Neo.Button> {" "}
                        </div>

                    </Neo.GridLayout>
                </Neo.Card>
            </div>
        )
    }
}

// Auto Generated
// The code below was generated using the data-code-name attributes in the above tags.

const demo_source_code_LoadingBasic = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            The <code>Neo.Loader</code> component can be wrapped around another component to show a loading spinner, and prevent the underlying content from
            being clicked. The simplest way to show the loader is to set the <code>show</code> prop to true.
        </p>
    </div>

    <Neo.Loader show={this.showSimpleLoader}>
        <div className="loading-target">
            <p>A div with some content and a button in it.</p>
            <Neo.Button onClick={() => this.showSimpleLoader = true}>Click here</Neo.Button>
        </div>
    </Neo.Loader>
</Neo.GridLayout>`}];

const demo_source_code_LoadingProgress = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>The progress bar supports the same customisation as the bootstrap progress bar.
        The <code>progress</code> is specified as a fraction: 0.2 intead of 20%.
    </p>
    <Neo.ProgressBar progress={0.2} className="mt-3" />
</Neo.GridLayout>
<Neo.GridLayout>
    <p><code>Variant</code> can be changed</p>
    <Neo.ProgressBar progress={0.4} variant="success" className="mt-3" />
</Neo.GridLayout>
<Neo.GridLayout>
    <p>Striped</p>
    <Neo.ProgressBar progress={0.6} variant="warning" type="striped" className="mt-3" />
</Neo.GridLayout>
<Neo.GridLayout>
    <p>Animated</p>
    <Neo.ProgressBar progress={0.8} variant="danger" type="animated" className="mt-3" />
</Neo.GridLayout>
<Neo.GridLayout>
    <p>Reversed - you can set this globally using <code>Misc.Settings.progressBar.reverse</code></p>
    <Neo.ProgressBar progress={0.8} variant="dark" type="animated" reverse className="mt-3" />
</Neo.GridLayout>`}];

const demo_source_code_LoadingTaskRunner = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <p>
        The <code>TaskRunner</code> component can be used with the <code>loader</code> and <code>progress</code> components to automatically
        show a loader or progress bar while an async task is busy running. <br />
        In this example, the loader is bound to a <code>TaskRunner</code>, rather than a boolean value. The loader will show automatically
        while the task is running. Errors that occur will be automatically handled by the task runner. This can be changed by setting
        the <code>errorHandling</code> property in the run callback.
    </p>
    <Neo.Loader task={this.exampleTask}>
        <div className="loading-target">
            <p>Click the button to run the task.</p>
            <Neo.Button onClick={() => this.runExampleTask(false)} variant="success">Run successful task</Neo.Button> {" "}
            <Neo.Button onClick={() => this.runExampleTask(true)} variant="danger">Run error task</Neo.Button>
        </div>
    </Neo.Loader>
</Neo.GridLayout>`}, { language: "javascript", code: `private exampleTask = AppService.get(Types.Neo.TaskRunner);

private async runExampleTask(addError: boolean) {

    const returnVal = await this.exampleTask.run(async options => {
        // This can be used to change error handling:
        // options.errorHandling = AutoErrorHandling.DontHandle;
        options.loadingText = "Loading something...";

        await TaskRunner.delay(2000);

        options.loadingText = "Loading something else...";

        await TaskRunner.delay(2000);

        options.loadingText = "Loading final thing...";

        await TaskRunner.delay(2000);

        if (addError) {
            throw new Error("An error occurred running the task!");
        } else {
            return "Successful result";
        }
    });

    if (returnVal) {
        ModalUtils.showMessage("Success!", returnVal);
    }
}`}];

const demo_source_code_LoadingDefaultTaskRunner = [{ language: "jsx", code: 
`<Neo.GridLayout>
    <div>
        <p>
            If your component inherits <code>ViewBase</code>, it will have a <code>taskRunner</code> property. You can use the task runner of the current
            view in your master page to show a view level loading / progress bar. If your component inherits <code>PersistentViewBase</code>, the task runner
            will be persisted when navigating to another page and back.
        </p>
        <p>
            A <code>TaskRunner</code> instance will raise an error if <code>run</code> is called while a previous task is busy executing. This is to prevent
            the same action running multiple times. E.g. if a user presses enter on a focused button more than once, the buttons click handler will
            call <code>taskRunner.run</code> multiple times raising a console error. The callback passed to <code>taskRunner.run</code> will only be called
            once, protecting you from creating duplicate calls to an api.
        </p>
    </div>
    <div>
        <Neo.Button onClick={() => this.taskRunner.run(() => TaskRunner.delay(1000))}>Simple example</Neo.Button> {" "}
        <Neo.Button onClick={() => this.taskRunner.run("Saving records...", () => TaskRunner.delay(2000))}>Show loading text</Neo.Button> {" "}
    </div>
    <p>
        Once the task has started, you can change the loading text, change the colour of the progress bar, and reset the progress bar.
    </p>
    <div>
        <Neo.Button onClick={() => this.runDefaultTask()}>Complex example</Neo.Button>
    </div>
    <div>
        <p>
            If you have a single async operation like fetching some data, you can pass the <code>Promise</code> into the <code>TaskRunner</code> without
            specifying a callback function. E.g. <code>await this.taskRunner.waitFor(Axios.get(...))</code>
        </p>
        <p>
            Note: you can call <code>waitFor</code> many times while the <code>TaskRunner</code> is busy. For this reason, the method will raise an
            error if it gets an axios result for an http method other than <code>get</code>.
        </p>
    </div>
    <div>
        <Neo.Button onClick={() => this.taskRunner.waitFor(TaskRunner.delay(2000))}>With existing promise</Neo.Button> {" "}
    </div>

</Neo.GridLayout>`}, { language: "javascript", code: `private async runDefaultTask() {
    this.taskRunner.run(async options => {
        options.variant = "success";

        await TaskRunner.delay(2000);

        options.loadingText = "Saving data...";

        await TaskRunner.delay(2000);

        options.loadingText = "Processing records...";
        options.variant = "primary";

        await TaskRunner.delay(2000);

        options.loadingText = "Click on another page, and then come back to this page";
        options.variant = "danger";

        await TaskRunner.delay(20000);

        options.loadingText = "You are still waiting?";
        options.variant = "dark";

        await TaskRunner.delay(2000);
    });
}`}];
