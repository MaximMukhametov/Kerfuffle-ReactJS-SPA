import React from "react";
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";

// Site navigation bar
const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.nav_items}>
                <div className={classes.item}>
                    <NavLink activeClassName={classes.activeLink}
                             to="/profile">Profile</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink activeClassName={classes.activeLink}
                             to="/dialogs">Messages</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink activeClassName={classes.activeLink}
                             to="/users">Users</NavLink>
                </div>
            </div>

        </nav>

    )
};

export default Navbar