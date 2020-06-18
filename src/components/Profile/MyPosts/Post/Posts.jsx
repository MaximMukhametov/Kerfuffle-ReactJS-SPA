import React, {useState} from "react";
import classes from './Posts.module.css';
import {reduxForm} from "redux-form";
import MyPostsForm from "../../../common/forms/postForm";
import userPhoto from "../../../../media/userPhoto.jpg";
import deleteIcon from "../../../../media/delete.png"
import editIcon from "../../../../media/edit.png"
import checkMark from "../../../../media/check_mark.png"
import crossMark from "../../../../media/cross_mark.png"
import likeIcon from "../../../../media/like.png"
import emptyLikeIcon from "../../../../media/empty_like.png"
import convertUTCDateToLocalDate
    from "../../../../utils/convertUTCDateToLocalDate";


// название только с большой буквы
const ChangePostsReduxForm = reduxForm({
    form: 'ChangePostsForm',
})(MyPostsForm);


const Posts = ({
                   id, name, text, created_at, isOwner,
                   likes_count, like_users, props
               }) => {

    let [editMod, setEditMod] = useState(false);
    const maxLikesUsers = 12;

    const like_user = like_users.slice(0, maxLikesUsers).map(u => {
        return likes_count > 0 &&
            (<div className={classes.post_like_user_element}>
                <img onClick={() => linkToUserProfile(u.id)}
                     src={(u.photos && (u.photos.small_img
                         || u.photos.small)) || userPhoto}/>
                <div
                    className={classes.post_like_user_element_name}>{u.name}</div>
            </div>)
    });

    const showLikeUsers = (postId) => {
        props.history.push('/users/' + postId)
    };

    const linkToUserProfile = (userId) => {
        props.history.push('/profile/' + userId)
    };

    const deletePost = () => {
        props.delPostThunk(id)
    };

    const changePost = (textOfPost) => {
        props.changePostThunk(id, textOfPost.post);
        setEditMod(!editMod);
    };

    return (
        <div className={classes.post}>
            <div className={classes.post_owner}>
                <img className={classes.post_owner_img} alt='sdf'
                     src={(props.profile.photos && (props.profile.photos.large_img
                         || props.profile.photos.large)) || userPhoto}/>
                <div>{name} </div>
            </div>
            <div
                className={classes.post_data}>
                {convertUTCDateToLocalDate(created_at)}</div>
            <div className={classes.post_text}>{editMod ?
                <div className={classes.post_text_editor}>
                    <ChangePostsReduxForm onSubmit={changePost}
                                          initialValues={{post: text}}/>
                    <button onClick={() => setEditMod(!editMod)}></button>
                </div> :
                <div>{text} </div>}</div>


            <div className={classes.post_likes}>
                <img className={classes.post_likes_img}
                     onClick={() => props.likePostThunk(id)}
                     src={likes_count > 0 ? likeIcon : emptyLikeIcon}/>
                <span
                    className={classes.post_likes_like_count}>{likes_count > 0 && likes_count}</span>
                {likes_count > 0 &&
                <div>
                    <div className={classes.post_likes_users}>
                        {like_user}
                        {likes_count > maxLikesUsers &&
                        <div className={classes.show_all_users}
                             onClick={() => showLikeUsers(id)}>...show
                            all users
                        </div>}
                    </div>
                </div>}
            </div>

            <div className={classes.post_edit}>{isOwner &&
            <div>
                <img src={editIcon} alt="Edit"
                     onClick={() => setEditMod(!editMod)}/>
                <img src={deleteIcon} alt="Edit" onClick={deletePost}/>

            </div>}</div>


        </div>
    )
};

export default Posts