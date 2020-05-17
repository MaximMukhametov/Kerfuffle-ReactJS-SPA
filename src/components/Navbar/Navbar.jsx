import React from "react";
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import SubNavbar from "./subNavbar/subNavbar";

// навлинк меняет адрес строки,
// а роут следит за изменениями и отрисовывает что-то если нужно

const Navbar = (props) => {
    // let subNavbarFriends = props.friends.friends.map(f => <SubNavbar friends={f}/>);
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink activeClassName={classes.activeLink} to="/profile">Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink activeClassName={classes.activeLink} to="/dialogs">Messages</NavLink>
            </div>
            <div className={classes.item}>
                <a href="/#">News</a>
            </div>
            <div className={classes.item}>
                <a href="/#">Music</a>
            </div>
            <div className={classes.item}>
                <a href="/#">Settings</a>
            </div>
            <div className={classes.item}>
                <NavLink activeClassName={classes.activeLink} to="/users">Users</NavLink>
            </div>

        </nav>

    )
};

export default Navbar