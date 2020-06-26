import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {LogoutThunk} from "../../redux/auth_reducer";


class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    photos: state.auth.photos,
    login: state.auth.login
});

export default connect(mapStateToProps, {LogoutThunk})(HeaderContainer);