import React from "react";
import {reduxForm} from "redux-form";
import {fieldCreator, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {LoginThunk} from "../../redux/auth_reducer";
import {Redirect} from "react-router-dom";
import classesform from "./../common/FormsControls/FormsControls.module.css"
import classes from "./login.module.css"
import logo from "./../../media/logo_large.png"
import background from "./../../media/defaultBackgroundPhoto.jpg"


const maxLength30 = maxLengthCreator(30);

// Login form component
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form className={classes.login_form} onSubmit={handleSubmit}>
            {fieldCreator("Login", "text", Input, {
                validate: [required, maxLength30],
                placeholder: "Login"
            })}
            {fieldCreator("Password", "password", Input, {
                validate: [required, maxLength30],
                placeholder: "Password"
            })}
            {error && <div className={classesform.formCommonError}>
                {error}
            </div>}
            <div>
                <button className={classes.login_button}>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: 'login',
    onSubmitFail : (errors , dispatch ) => errors.detail
})(LoginForm);


// Login component
const Login = (props) => {
    const onSubmit = (formData) => {
        props.LoginThunk(formData.Login, formData.Password)
    };
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div className={classes.login}>
        <img src={background} id="bg" alt=""/>
        <div className={classes.login_logo}>
            <img src={logo} alt=""/>
            <h1 className={classes.login_title}>Kerfuffle</h1></div>
        <LoginReduxForm onSubmit={onSubmit}/>
        <span className={classes.login_test_account}>Test account: Linus <br/>
            password: w2e3r4t5y6</span>
    </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {LoginThunk})(Login)