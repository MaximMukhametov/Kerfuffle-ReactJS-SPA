import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img alt='empty' src="https://i.pinimg.com/originals/6b/95/61/6b9561a1848457dc6399381ab62d599b.png"></img>

            <div className={classes.loginBlock} >
                {props.isAuth ?
                <span>{props.login}
                <button onClick={props.LogoutThunk}>Logout</button>
                </span>:
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
          </header>

    )
};

export default Header