import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING_START = 'TOGGLE_IS_FETCHING_START';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetchingApp: true,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case TOGGLE_IS_FETCHING_START:
            return {...state, isFetchingApp: action.isFetchingApp};
        default:
            return state;

    }
};


export const setUserData = (login, email, userId, isAuth) => ({
    type: SET_USER_DATA, payload: {login, email, userId, isAuth}
});
export const toggleIsFetchingStart = (isFetchingApp) => ({type: TOGGLE_IS_FETCHING_START, isFetchingApp});


// это thunk, он возвращает функцию, мидлвар отлавливает такие функции,
// разворачивает и исполняет, и через диспатч заного прокидывает в конвеер
// используем промисы с синтаксисом async + await
export const getAuthUserData = () => async (dispatch) => {

    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {login, email, id} = response.data.data; // не важен порядок аргументов, главное чтобы названия совпадали
        dispatch(setUserData(login, email, id, true));
    }
    dispatch(toggleIsFetchingStart(false))
};

export const LoginThunk = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())

    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Someerror";
        dispatch(stopSubmit("login", {_error: message}))
    }
};

export const LogoutThunk = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))

    }
};

export default authReducer;