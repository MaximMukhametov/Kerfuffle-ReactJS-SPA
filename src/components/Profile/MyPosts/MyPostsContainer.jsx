import React from "react";
import {
    addPostThunk,
    changePostThunk,
    delPostThunk,
    getPostThunk,
    likePostThunk
} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {
    setCurrentPage,
    setTotalUsersCount,
    setUsers
} from "../../../redux/users_reducer";

const mapStateProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
    };
};

const MyPostsContainer = compose(withRouter,
    connect(mapStateProps, {
        addPostThunk,
        getPostThunk,
        delPostThunk,
        changePostThunk,
        likePostThunk,
        setUsers,
        setTotalUsersCount,
        setCurrentPage
    }))(MyPosts);

export default MyPostsContainer