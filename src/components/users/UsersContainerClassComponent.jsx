import React from "react";
import {connect} from "react-redux";
import {
    follow,
    requestUsers,
    setCurrentPage, setTotalUsersCount,
    setUsers,
    toggleFollowingProgres,
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


class UsersContainer extends React.Component {
    refreshUsers(page) {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(page ? page : currentPage, pageSize,
            this.props.match.params.postId, this.getQueryString());
    }

    getQueryString() {
        const queryString = new URLSearchParams(this.props.location.search);
        const followers = queryString.get('followers_by_userid');
        const following = queryString.get('following_by_userid');
        const action = (!!followers && 'followers') || (!!following && 'following');
        return {user: followers || following, action}
    }

    clearPageCounter() {
        this.props.setTotalUsersCount(0);
        this.props.setCurrentPage(1);
    }


    componentWillMount() {
        this.props.setUsers([]);
        this.clearPageCounter();
    }

    componentDidMount() {
        this.refreshUsers()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.postId !== prevProps.match.params.postId ||
            this.props.location.search !== prevProps.location.search) {
            this.clearPageCounter()
        } else if (this.props.totalUsersCount !== prevProps.totalUsersCount) {
            this.refreshUsers(1)
        }
    }


// shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.props.totalUsersCount != nextProps.totalUsersCount){
    //                 return true
    //     }
    // }


    onPageChanged = (page) => {
        const {pageSize} = this.props;
        this.props.setCurrentPage(page);
        this.props.requestUsers(page, pageSize, this.props.match.params.postId,
            this.getQueryString())
    };

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> :
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    toggleFollowingProgres={this.props.toggleFollowingProgres}
                />}</>
    };
}

const mapStateProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    };
};

export default compose(
    withRouter,
    connect(mapStateProps, {
        unfollow,
        follow,
        setUsers,
        setCurrentPage,
        toggleFollowingProgres,
        requestUsers,
        setTotalUsersCount
    }),
)(UsersContainer);

