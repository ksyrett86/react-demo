import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NotifyUtils } from '@singularsystems/neo-core';
import { Neo, Routing, Views } from '@singularsystems/neo-react';
import { observer, Observer } from 'mobx-react';
import './Styles/App.scss';
import Sidebar from './Components/Sidebar';
import HeaderPanel from './Components/HeaderPanel';
import NeoLogo from './assets/img/Neo-charcoal.png';
import RouteView from './Components/RouteView';
import { AppService, Types } from './Services/AppService';
import CodeViewerModal from './Components/CodeViewerModal';
import CodeUtil from './Components/CodeUtil';

export default class App extends React.Component {

    private config = AppService.get(Types.Config);

    public render() {

        return (
            <BrowserRouter basename={this.config.baseUrl} getUserConfirmation={Routing.PageLeaveHandler.showNavigationConfirmation}>
                <main>
                    <ContainerPanel>

                        {/* Top header panel */}
                        <HeaderPanel />

                        {/* Left menu panel */}
                        <Sidebar />

                        {/* Right content panel */}
                        <div className="app-right-panel" id="right-panel">

                            <Observer>
                                {() => (
                                    <Neo.Loader task={Views.ViewBase.currentView ? Views.ViewBase.currentView.taskRunner : undefined} className="page-loader" showSpinner={false} />
                                )}
                            </Observer>

                            <div className={"app-content-area container-fluid"} id="content-panel">
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <RouteView />
                                </React.Suspense>
                            </div>

                            <div className="app-footer" id="footer-panel">
                                Powered by <img src={NeoLogo} alt="Neo" style={{ width: 60 }} />
                            </div>

                        </div>

                        <Neo.ModalContainer />
                        <Neo.ToastContainer notificationStore={NotifyUtils.store} />
                        <Neo.TooltipProvider />
                        <Neo.ContextMenuContainer />
                        <CodeViewerModal viewModel={CodeUtil.codeViewerModalVM} />
                    </ContainerPanel>
                </main>
            </BrowserRouter>
        );
    }
}

@observer
class ContainerPanel extends React.Component {

    private appLayout = AppService.get(Types.Services.AppLayout);

    componentDidMount() {
        this.appLayout.setup();
    }

    render() {
        const layout = this.appLayout;
        let containerClassName = "app-container";
        if (layout.thinSideBar) {
            containerClassName += " thin-sidebar";
        }
        if (layout.sideBarExpanded) {
            containerClassName += " sidebar-expanded";
        }
        if (layout.thinSideBar && !layout.sideBarExpanded) {
            containerClassName += " sidebar-collapsed";
        }
        if (layout.sideBarExpanded || !layout.thinSideBar) {
            containerClassName += " full-sidebar";
        }

        return (
            <div className={containerClassName}>{this.props.children}</div>
        )
    }
}