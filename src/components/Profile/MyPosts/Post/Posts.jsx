import React from "react";
import classes from './Posts.module.css';

const Posts = (props) => {
    return (
        <div className={classes.item}>
            <img alt='sdf'
                 src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_WYzaA1BQvvu0FN7Zu1MsxawEDpzFdG7uczm3cp8_kPigMMFO'></img>
            {props.messages} {props.likesCount}
        </div>
    )
};

export default Posts