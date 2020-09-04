import classes from "./Users.module.css";
import userPhoto from "../../media/userPhoto.jpg";
import React from "react";
import {NavLink} from "react-router-dom";


// Renders the user with their avatar and name.
let User = ({user, followingInProgress, unfollow, follow}) => {

    return <div className={classes.user}>
                <span className={classes.user_photo_block}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img
                            src={(user.photos && (user.photos.small_img ||
                                user.photos.small)) || userPhoto}
                            className={classes.users_photo}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button disabled={
                                followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unfollow(user.id)

                                    }
                                    }>Unfollow</button> :
                            <button disabled={
                                followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id)

                                    }
                                    }>Follow</button>}
                    </div>
                </span>
        <span className={classes.user_info}>
                    <span>
                        <div
                            className={classes.user_info_name}>{user.name}</div>
                        <div
                            className={classes.user_info_status}>{user.status}</div>
                    </span>
                </span>
    </div>;
};

export default User;


