import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile_reducer";
import {withRouter} from "react-router-dom";
import {toggleIsFetching} from "../../redux/users_reducer";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 7799
        }

        Promise.all([this.props.getUserProfile(userId), this.props.getStatus(userId)]).then(response => {
            this.props.toggleIsFetching(false)
        })
        // this.props.getUserProfile(userId)
        // this.props.getStatus(userId)

    };

    render() {
        return (
            <div>

                <Profile {...this.props}
                         profile={this.props.profile}
                         isFetching={this.props.isFetching}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}/>

            </div>
        )
    }
}

// HOC (хок) компонента, что-то типа декоратора в питоне, добавляет одинаковую функциональность к компонентам,
// принимает компоненту, добавляет что-то и возвращает компоненту
let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => {
    return ({
        profile: state.profilePage.profile,
        isFetching: state.usersPage.isFetching,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth

    })
};


// withRouter нужен для того чтобы достать url-параметры (и не только)
// из урла и запихать их в пропс (см. дебаг что приходит в пропс)

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);   <--- старый код

// connect принимает функцию которая принимает стейт и возвращает то что нам нужно,
// вторым параметром принимает функции акшн-криейторы, которые диспатчит и оотдаёт
// пропсам в виде колбэка, затем мы в отдельных скобках вызываем функцию конект с
// параметром - контейнерная компонента, чтобы запихать в неё получившиеся пропсы
// с параметрами и колбэками


export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps,
        {toggleIsFetching, getUserProfile, getStatus, updateStatus})
)(ProfileContainer)
