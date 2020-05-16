import React from "react";
import {addPostActionCreator} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText

    };
};

const MyPostsContainer = connect(mapStateProps, {addPostActionCreator})(MyPosts);

export default MyPostsContainer