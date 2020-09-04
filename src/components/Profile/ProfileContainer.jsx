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
import {useIsFetching, useQueryCache} from 'react-query'


// Container component for displaying personal
// data about the user and his contacts
const ProfileContainer = (props) => {
    const isFetching = useIsFetching();
    const queryCache = useQueryCache();
    console.log(isFetching, queryCache);
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

        let allPromise = Promise.all([props.getUserProfile(userId,
            !props.match.params.userId),
            props.getStatus(userId),
            props.getPostThunk(props.match.params.userId)])
            .then(response => {
                props.toggleIsFetching(false)
            });
        return allPromise
    };

    useEffect(() => {
        if (props.match.params.userId &&
            !(isOwnerId)) {
            props.toggleIsFetching(true);
        }
        let allPromise = refreshProfile();

        return () => {
            console.log(allPromise);
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
