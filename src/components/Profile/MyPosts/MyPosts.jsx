import React from "react";
import Posts from "./Post/Posts";
import classes from './MyPosts.module.css';
import {reduxForm, reset} from "redux-form";
import MyPostsForm from "../../common/forms/PostForm";
import {animated, useTransition} from "react-spring";


// Rendering of posts
const MyPosts = (props) => {

    // Feed it your items, keys (which can be null if items are atomic),
    // and lifecycles. Whenever items are added
    // or removed, it will animate these changes.
    const transitions = useTransition(props.posts, item => item.id, {
        config: {mass: 10, tension: 2000, friction: 60},
        from: {transform: 'rotateX(90deg) translate(0%)'},
        enter: {transform: 'rotateX(0deg) translate(0%)'},
        leave: {transform: 'rotateX(0deg) translate(300%)'},
    });

    let postElemetns = !!props.posts && transitions.map(
        (animatedObject) =>
            <animated.div style={animatedObject.props}
                          key={animatedObject.item.id}>
                <Posts props={props}
                       key={animatedObject.item.id}
                       id={animatedObject.item.id}
                       text={animatedObject.item.text}
                       name={animatedObject.item.user_name}
                       likes_count={animatedObject.item.likes}
                       like_users={animatedObject.item.like}
                       created_at={animatedObject.item.created_at}
                       isOwner={!props.match.params.userId}/>
            </animated.div>
    );

    let addPost = (textOfPost) => {
        props.addPostThunk(textOfPost.post)
    };

    if (!props.profile) {
        return <div>Loading...</div>
    } else {
        return (
            <div className={classes.posts_block}>
                <h3>Posts</h3>
                {!props.match.params.userId &&
                <div className={classes.post_input}>
                    <MyPostsReduxForm onSubmit={addPost}/>
                </div>}
                {props.posts && props.posts.length ?
                    <div className={classes.posts}>
                        {postElemetns}
                    </div> :
                    <div
                        className={classes.posts_block_empty}>{props.profile.name} hasn't
                        posted anything yet
                        :(</div>}
            </div>
        )
    }
};

let MyPostsReduxForm = reduxForm({
    form: 'MyPostsForm',
    onSubmitSuccess: (result, dispatch, props) => {
        dispatch(reset('MyPostsForm'))
    },
})(MyPostsForm);

export default MyPosts