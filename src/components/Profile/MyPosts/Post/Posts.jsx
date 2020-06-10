import React, {useState} from "react";
import classes from './Posts.module.css';
import {reduxForm} from "redux-form";
import MyPostsForm from "../../../common/forms/postForm";
import userPhoto from "../../../../userPhoto.jpg";
import {useTransition} from "react-spring";


// название только с большой буквы
const ChangePostsReduxForm = reduxForm({
    form: 'ChangePostsForm'
})(MyPostsForm);


const Posts = ({
                   id, name, text, created_at, delPost,
                   isOwner, editPost, likes_count, like_users, clickLike
               }) => {
    let [editMod, setEditMod] = useState(false);



    const like_user = like_users.map(u => <div>{u.name}<img
        src={(u.photos && (u.photos.small_img
            || u.photos.small)) || userPhoto}/></div>);

    const deletePost = () => {
        delPost(id)
    };

    const changePost = (textOfPost) => {
        editPost(id, textOfPost.post);
        setEditMod(!editMod);
    };

    const activateEditMode = () => {
        setEditMod(!editMod);
    };

    return (
        <div className={classes.item}>
            {editMod ?
                <div>
                    <ChangePostsReduxForm onSubmit={changePost}
                                          initialValues={{post: text}}/>
                    <button onClick={() => setEditMod(!editMod)}>Exit Edit
                    </button>
                </div> :

                <div>
                    <img alt='sdf'
                         src='https://encrypted-tbn0.gstatic.com/
                         images?q=tbn%3AANd9GcR_WYzaA1BQvvu0FN7Zu1MsxawEDpzFdG7uczm3cp8_kPigMMFO'></img>
                    {name} <br/>
                    {text} <br/>
                    {created_at}
                    <div className={classes.like}>Likes{likes_count}
                        <div className={classes.like_users}>{like_user}</div>
                    </div>
                    {isOwner &&
                    <button onClick={deletePost}>Delete</button>}
                    <button onClick={() => clickLike(id)}>Like</button>
                    }
                    <button onClick={() => setEditMod(!editMod)}>Edit</button>
                    }
                </div>
            }
        </div>
    )
};

export default Posts