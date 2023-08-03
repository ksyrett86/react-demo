import * as React from "react";
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from "react-router";
import { ModalUtils } from '@singularsystems/neo-core';
import { AppService, Types } from '../../Services/AppService';

class OidcLoginRedirect extends React.Component<RouteComponentProps> {

    constructor(props: any) {
        super(props);
        
        AppService.get(Types.Neo.Security.AuthenticationService).endSignIn().then(redirectPath => {
            if (redirectPath) {
                this.props.history.push(redirectPath);
            }
        }).catch(e => {
            ModalUtils.showMessage("Login", "An error occured: " + e);
        });
    }

    public render() {
        return <div>Signing in...</div>
    }
}

export default withRouter(OidcLoginRedirect);