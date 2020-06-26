import {Redirect} from "react-router-dom";
import * as React from "react";
import {connect} from "react-redux";


let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const WithAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>;
            return <Component {...this.props} />
        }
    }

    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)
    (RedirectComponent);
    return ConnectedRedirectComponent;
};

export default WithAuthRedirect;