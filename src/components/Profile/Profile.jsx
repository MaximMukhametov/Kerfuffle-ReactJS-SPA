import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classes from "./Profile.module.css"


const Profile = (props) => {
    return (
        <div className={classes.profile_info}>
            <div className={classes.profile}><ProfileInfo
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isLoadingPhoto={props.isLoadingPhoto}/></div>

            <div className={classes.posts}><MyPostsContainer/></div>
        </div>
    )
};

export default Profile