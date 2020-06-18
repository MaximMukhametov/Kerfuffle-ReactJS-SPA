import React, {useEffect} from "react";
import Posts from "./Post/Posts";
import classes from './MyPosts.module.css';
import {formValues, formValueSelector, reduxForm, reset} from "redux-form";
import MyPostsForm from "../../common/forms/postForm";
import {animated, useTransition} from "react-spring";
import {setUsers} from "../../../redux/users_reducer";
import {connect} from "react-redux";


// название только с большой буквы


const MyPosts = (props) => {
    useEffect(() => {
        // props.getPostThunk(props.match.params.userId)
    }, props.posts, props.match.params);


    const transitions = useTransition(props.posts, item => item.id, {
        config: {mass: 10, tension: 2000, friction: 60},
        from: {transform: 'rotateX(90deg) translate(0%)'},
        enter: {transform: 'rotateX(0deg) translate(0%)'},
        leave: {transform: 'rotateX(0deg) translate(200%)'},
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
            <div className={classes.postsBlock}>
                <h3>Posts</h3>
                {!props.match.params.userId &&
                <div className={classes.post_input}>
                    <MyPostsReduxForm onSubmit={addPost}/>
                </div>}
                {props.posts && props.posts.length?
                <div className={classes.posts}>
                    {postElemetns}
                </div>:
                    <div>{props.profile.name} hasn't posted anything yet :(</div>}
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