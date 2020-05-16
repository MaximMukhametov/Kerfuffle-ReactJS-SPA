import React from "react";
import {connect} from "react-redux";
import {
    follow,
    requestUsers,
    setCurrentPage,
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

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);

    };

    onPageChanged = (page) => {
        const {pageSize} = this.props;
        this.props.setCurrentPage(page);
        this.props.requestUsers(page, pageSize)

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
    connect(mapStateProps, {
        unfollow,
        follow,
        setUsers,
        setCurrentPage,
        toggleFollowingProgres,
        requestUsers,
    }),
)(UsersContainer);

