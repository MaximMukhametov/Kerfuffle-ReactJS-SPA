import React, {useState} from "react";
import classes from './Posts.module.css';
import {reduxForm} from "redux-form";
import MyPostsForm from "../../../common/forms/postForm";
import userPhoto from "../../../../media/userPhoto.jpg";


// название только с большой буквы
const ChangePostsReduxForm = reduxForm({
    form: 'ChangePostsForm'
})(MyPostsForm);


const Posts = ({id, name, text, created_at, isOwner,
                   likes_count, like_users, props}) => {

    let [editMod, setEditMod] = useState(false);

    const like_user = like_users.slice(0, 10).map(u => {
        return likes_count > 0 &&
            (<div className={classes.like_user_element}>
                <img src={(u.photos && (u.photos.small_img
                    || u.photos.small)) || userPhoto}/>
                <div>{u.name}</div>
            </div>)
    });

    const showLikeUsers = (postId) => {
        // props.setTotalUsersCount(0);
        // props.setCurrentPage(1);
        props.history.push('/users/' + postId)
    };

    const deletePost = () => {
        props.delPostThunk(id)
    };

    const changePost = (textOfPost) => {
        props.changePostThunk(id, textOfPost.post);
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
                    <div className={classes.test_ccs_image_url}></div>
                    {name} <br/>
                    {text} <br/>
                    {created_at}
                    <div className={classes.like}>Likes{likes_count}
                    {likes_count > 0 &&
                        <div className={classes.like_users}>{like_user}
                        {likes_count > 10 &&
                            <button onClick={() => showLikeUsers(id)}>...show
                                all users
                            </button>}
                        </div>}
                    </div>
                    {isOwner &&
                    <div>
                        <button onClick={deletePost}>Delete</button>
                        <button onClick={() => setEditMod(!editMod)}>Edit
                        </button>
                    </div>}
                    <button onClick={() => props.likePostThunk(id)}>Like
                    </button>
                </div>
            }
        </div>
    )
};

export default Posts