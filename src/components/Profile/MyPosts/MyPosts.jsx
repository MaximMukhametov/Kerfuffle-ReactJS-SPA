import React from "react";
import Posts from "./Post/Posts";
import classes from './MyPosts.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {fieldCreator, Input, Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const MyPostsForm = (props) => {

    // всё что передаётся в тэг Field в качестве параметров,
    // уходит в компоненту component={Textarea} ,
    // туда некоторые параметры попадают в полё input(такие как name, value  и т.д.),
    // так же туда попадают параметры Meta, и все остальные парааметры просто передаются
    // как обычные пропсы(например placeholder и lalalala={'lalalala'})
    return (
        <form onSubmit={props.handleSubmit}>
                  {fieldCreator("Post","text", Textarea,{validate:[required, maxLength10],placeholder:"New Post"})}
            <button>send</button>
        </form>
    )
};

// название только с большой буквы
const MyPostsReduxForm = reduxForm({
    form: 'MyPostsForm'
})(MyPostsForm);

const MyPosts = React.memo(props => {
    let postElemetns = props.posts.map(p => <Posts key={p.id} messages={p.message} likesCount={p.likesCount}/>);

    let addPost = (textOfPost) => {
        props.addPostActionCreator(textOfPost.Post)
    };

    return (
        <div className={classes.postsBlock}>
            mypost
            <div>
                <h3>My post</h3>
            </div>
            <div>
                <MyPostsReduxForm onSubmit={addPost}/>
            </div>
            <div className={classes.posts}>
                {postElemetns}
            </div>
        </div>
    )

}, function moviePropsAreEqual(prevMovie, nextMovie) {
    console.log('prevMovie, nextMovie', prevMovie, nextMovie);
    return prevMovie === nextMovie
        && prevMovie === nextMovie;
});

export default MyPosts