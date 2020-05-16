import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, LogoutThunk} from "../../redux/auth_reducer";


class HeaderContainer extends React.Component {
    // withCredentials: true необходим для того чтобы прицепить куку к запросу на сервак,
    // потому что браузер по умолчанию не шлёт куку с кродоменными запросами

    render() {
        return <Header {...this.props}/>
    }
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {LogoutThunk})(HeaderContainer);