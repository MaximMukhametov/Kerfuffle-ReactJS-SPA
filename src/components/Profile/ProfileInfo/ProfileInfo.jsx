import React from "react";
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = ({profile,status,updateStatus}) => {

    if (!profile) {
        return <div>...loading status</div>
    } else {
        return (
            <div>
                <div className={classes.descriptionBlock}>
                    <img src={profile.photos.large}/>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
            </div>

        )
    }
};

export default ProfileInfo