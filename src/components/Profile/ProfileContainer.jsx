import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getPost,
    getPostThunk,
    getStatus,
    getUserProfile,
    saveBackgroundPhoto,
    savePhoto,
    saveProfile,
    setUserProfile,
    updateStatus
} from "../../redux/profile_reducer";
import {withRouter} from "react-router-dom";
import {toggleIsFetching} from "../../redux/users_reducer";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import Preloader from "../common/preloader/preloader";
import { useQuery } from 'react-query'

const ProfileContainer = (props) => {
    let [refreshHystory, setRefreshHystory] = useState(true);
    const isOwnerId = +props.match.params.userId === props.userId;

    const refreshProfile = () => {

        if (isOwnerId) {
            props.history.push('/profile/');
            setRefreshHystory(!refreshHystory);
            return NaN
        }

        let userId = props.match.params.userId;
        if (!userId) {
            userId = '';
            if (!props.isAuth) {
                props.history.push("/login");
            }
        }

        Promise.all([props.getUserProfile(userId, !props.match.params.userId),
            props.getStatus(userId),
            props.getPostThunk(props.match.params.userId)])
            .then(response => {
                props.toggleIsFetching(false)
            })
    };

    useEffect(() => {
        if (props.match.params.userId &&
            !(isOwnerId)) {
            props.toggleIsFetching(true);
        }

        refreshProfile();

        return () => {
            if (props.match.params.userId && !isOwnerId) {
                props.setUserProfile(null);
                props.getPost([]);
                props.toggleIsFetching(true)
            }

        }
    }, [props.match.params.userId, props.location]);

    return (

        <div>{!props.isFetching ?
            <Profile {...props}
                     isOwner={!props.match.params.userId}
                     profile={props.profile}
                     isFetching={props.isFetching}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
                     saveBackgroundPhoto={props.saveBackgroundPhoto}
                     saveProfile={props.saveProfile}
                     isLoadingPhoto={props.isLoadingPhoto}/> :
            <Preloader/>}
        </div>
    )
};


// HOC (хок) компонента, что-то типа декоратора в питоне, добавляет одинаковую функциональность к компонентам,
// принимает компоненту, добавляет что-то и возвращает компоненту
let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => {
    return ({
        profile: state.profilePage.profile,
        isFetching: state.usersPage.isFetching,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        isLoadingPhoto: state.profilePage.isLoadingPhoto,
        userId: state.auth.userId,

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
        {
            saveBackgroundPhoto,
            toggleIsFetching,
            getUserProfile,
            getStatus,
            updateStatus,
            savePhoto,
            saveProfile,
            getPostThunk,
            getPost,
            setUserProfile
        })
)(ProfileContainer)
// !isOwner && dispatch(setUserProfile(null)) &&
// dispatch(getPost([]));