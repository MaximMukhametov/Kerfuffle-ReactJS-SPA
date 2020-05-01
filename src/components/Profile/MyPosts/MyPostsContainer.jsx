import React from "react";
import Posts from "./Post/Posts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


// const MyPostsContainer2 = () => {
//     return (
//         <storeContext.Consumer>
//             {(store) => {
//                 let state = store.getState();
//
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 };
//
//                 let onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text);
//                     store.dispatch(action);
//                 };
//
//                 return <MyPosts updateNewPost={onPostChange}
//                                 addPost={addPost}
//                                 posts={state.profilePage.posts}
//                                 newPostText={state.profilePage.newPostText}/>
//             }}
//         </storeContext.Consumer>)
//
//
// };


const mapStateProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText

    };
};

const mapDispatchProps = (dispatch) => {
        return {
            updateNewPost: (text) => {
                let action = updateNewPostTextActionCreator(text);
                dispatch(action)
            },
            addPost: () => {
                dispatch(addPostActionCreator())
            }
        };
    }
;

const MyPostsContainer = connect(mapStateProps, mapDispatchProps)(MyPosts);

export default MyPostsContainer