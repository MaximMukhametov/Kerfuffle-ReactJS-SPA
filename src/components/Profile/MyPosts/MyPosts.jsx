import React, {useEffect} from "react";
import Posts from "./Post/Posts";
import classes from './MyPosts.module.css';
import {reduxForm, reset} from "redux-form";
import MyPostsForm from "../../common/forms/postForm";
import {animated, useTransition} from "react-spring";


// название только с большой буквы


const MyPosts = (props) => {
    useEffect(() => {
        // props.getPostThunk(props.match.params.userId)
    }, props.posts, props.match.params);


    const transitions = useTransition(props.posts, item => item.id, {
        config: { mass: 10, tension: 2000, friction: 60 },
        from: {transform: 'rotateX(90deg)', opacity: 1},
        enter: {transform: 'rotateX(0deg)', opacity: 1},
        leave: {transform: 'rotateX(90deg)', opacity: 1},
    });
    const AnimatedPosts = animated(Posts);

    let postElemetns = !!props.posts && transitions.map(
        (animatedObject) =>
            <animated.div style={animatedObject.props}
                          key={animatedObject.item.id}>
            <Posts
                            key={animatedObject.item.id}
                            id={animatedObject.item.id}
                            text={animatedObject.item.text}
                            name={animatedObject.item.user_name}
                            likes_count={animatedObject.item.likes}
                            like_users={animatedObject.item.like}
                            created_at={animatedObject.item.created_at}
                            clickLike={props.likePostThunk}
                            delPost={props.delPostThunk}
                            editPost={props.changePostThunk}
                            isOwner={!props.match.params.userId}/>
                            </animated.div>
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