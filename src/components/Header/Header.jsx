import React, {useState} from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "./../../media/logo.png"
import avatar from "./../../media/userPhoto.jpg"


const Header = (props) => {
    let [logoutClick, setLogoutClick] = useState(false);
    const photo = props.photos ? props.photos.small_img : avatar;
    return (
        <header className={classes.header}>
            <img alt='empty' src={logo}/>
            <div className={classes.header_title}>Kerfuffle</div>

            <div className={classes.login_block}>
                {props.isAuth && props.login ?
                    <div onClick={() => setLogoutClick(!logoutClick)}
                         onMouseLeave={() => setLogoutClick(false)}
                         className={classes.login_block__isauth}>
                        <a className={classes.arrow_icon}>
                            <span className={classes.left_bar +
                            ' ' + (logoutClick && classes.left_bar_rotate)}/>
                            <span className={classes.right_bar +
                            ' ' + (logoutClick && classes.right_bar_rotate)}/>
                        </a>
                        <div
                            className={classes.login_block__name}>{props.login}</div>
                        <button className={classes.login_block__logout +
                        ' ' + (logoutClick && classes.login_block__isauth__active)}
                                onClick={props.LogoutThunk}>Logout
                        </button>
                        <img
                            className={!!props.login && classes.login_block__img}
                            src={photo} alt=""/>
                    </div> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>

    )
};

export default Header