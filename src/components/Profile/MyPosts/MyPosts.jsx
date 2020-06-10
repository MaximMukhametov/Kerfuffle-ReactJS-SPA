import React, {useEffect} from "react";
import Posts from "./Post/Posts";
import classes from './MyPosts.module.css';
import {reduxForm, reset} from "redux-form";
import MyPostsForm from "../../common/forms/postForm";
import {changePostThunk} from "../../../redux/profile_reducer";


// название только с большой буквы


const MyPosts = (props) => {
    useEffect(() => {
        // props.getPostThunk(props.match.params.userId)
    }, props.posts, props.match.params);

    let postElemetns = props.posts.map(
        p => <Posts key={p.id}
                    id={p.id}
                    text={p.text}
                    name={p.user_name}
                    likes_count={p.likes}
                    like_users={p.like}
                    created_at={p.created_at}
                    clickLike={props.likePostThunk}
                    delPost={props.delPostThunk}
                    editPost={props.changePostThunk}
                    isOwner={!props.match.params.userId}/>

    );

    let addPost = (textOfPost) => {
        props.addPostThunk(textOfPost.post)
    };

    const afterSubmit = (result, dispatch) => {
        console.log(result, dispatch)

    };
    if (!props.profile) {
        return <div>Loading...</div>
    } else {
        return (
            <div className={classes.postsBlock}>
                mypost
                <div>
                    <h3>My post</h3>
                </div>
                {!props.match.params.userId &&
                <div>
                    <MyPostsReduxForm onSubmit={addPost}/>
                </div>}
                <div className={classes.posts}>
                    {postElemetns}
                </div>
            </div>
        )
    }
};

const MyPostsReduxForm = reduxForm({
    form: 'MyPostsForm',
    onSubmitSuccess: (result, dispatch, props) => {
       dispatch(reset('MyPostsForm'))
    },
})(MyPostsForm);

export default MyPosts