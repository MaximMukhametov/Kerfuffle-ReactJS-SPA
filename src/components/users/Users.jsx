import React, {useState} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import classesForm
    from "../../components/common/FormsControls/FormsControls.module.css";
import classes from "./Users.module.css"
import {fieldCreator, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../utils/validators/validators";
import {reduxForm} from "redux-form";
import {UserSearchButton} from "../common/buttons/Buttons";

const maxLength30 = maxLengthCreator(30);
const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {
    let [searchName, setSearchName] = useState(null);
    const searchUsersByName = (formData) => {
        setSearchName(formData.search);
        props.requestUsers({name: formData.search})
    };
    return <div>
        <SearchUserReduxForm onSubmit={searchUsersByName}/>

        {totalUsersCount > pageSize ?
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount}
                       pageSize={pageSize}/> :
            <div className={classes.search_not_found}>
                {totalUsersCount === 0 &&
                `There are no users named "${searchName}" ;(`}</div>}
        {
            props.users.map(u => <User user={u}
                                       followingInProgress={props.followingInProgress}
                                       unfollow={props.unfollow}
                                       follow={props.follow}
                                       key={u.id}/>)
        }
    </div>
};


const SearchUserForm = ({handleSubmit, error, ...props}) => {
    return (
        <form className={classes.search_form} onSubmit={handleSubmit}>
            {error && <div className={classesForm.formCommonError}>
                {error}
            </div>}
            <div>
                {fieldCreator("search", "text",
                    Input, {
                        validate: [maxLength30],
                        placeholder: "User name",
                        ...props
                    })}
            </div>
            <UserSearchButton/>
        </form>)
};
const SearchUserReduxForm = reduxForm({form: "user_search"})(SearchUserForm);

export default Users;


