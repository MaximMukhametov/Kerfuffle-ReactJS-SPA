import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    follow,
    requestUsers,
    setCurrentPage, setTotalUsersCount,
    setUsers,
    toggleFollowingProgres, toggleIsFetching,
    unfollow
} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users_selectors";
import {withRouter} from "react-router-dom";


const UsersContainer = (props) => {
    let [isFetching, setIsFetching] = useState(true);

    const clearPageCounter = async () => {
        props.setTotalUsersCount(0);
        props.setCurrentPage(1);
        props.setUsers([]);
    };
    const getQueryString = () => {
        const queryString = new URLSearchParams(props.location.search);
        const followers = queryString.get('followers_by_userid');
        const following = queryString.get('following_by_userid');
        const action = (!!followers && 'followers') || (!!following && 'following');
        return {user: followers || following, action}
    };

    const refreshUsers = (page) => {
        const {currentPage, pageSize} = props;
        let d = props.requestUsers(page ? page : currentPage, pageSize,
            props.match.params.postId, getQueryString());
        return d
    };

    useEffect(() => {
        const awaitUserData = async () => {
            await clearPageCounter();
            await refreshUsers(1);
            setIsFetching(false)
        };
        awaitUserData()
    }, [props.match.params, props.location.search]);


    const onPageChanged = (page) => {
        const {pageSize} = props;
        props.setCurrentPage(page);
        props.requestUsers(page, pageSize, props.match.params.postId,
            getQueryString())
    };


    return <>
        {isFetching ?
            <Preloader/> :
            <Users
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                users={props.users}
                onPageChanged={onPageChanged}
                follow={props.follow}
                unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}
                toggleFollowingProgres={props.toggleFollowingProgres}
            />}</>
};


const mapStateProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        // isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    };
};

export default compose(
    withRouter,
    connect(mapStateProps, {
        unfollow,
        toggleIsFetching,
        follow,
        setUsers,
        setCurrentPage,
        toggleFollowingProgres,
        requestUsers,
        setTotalUsersCount
    }),
)(UsersContainer);

