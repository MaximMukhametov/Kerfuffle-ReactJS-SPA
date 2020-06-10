import React from "react";
import {reduxForm} from "redux-form";
import {fieldCreator, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {LoginThunk} from "../../redux/auth_reducer";
import {Redirect} from "react-router-dom";
import classes from "./../common/FormsControls/FormsControls.module.css"


const maxLength30 = maxLengthCreator(30);
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>

            {fieldCreator("Login", "text", Input, {
                validate: [required, maxLength30],
                placeholder: "Login"
            })}
            {fieldCreator("Password", "password", Input, {
                validate: [required, maxLength30],
                placeholder: "Password"
            })}


            {error && <div className={classes.formCommonError}>
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

// 'login' - даём уникальное имя для формы? и передаём форму
// которую необходимо обернуть( в данном случае LoginForm)
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.LoginThunk(formData.Login, formData.Password)
    };
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1> Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {LoginThunk})(Login)