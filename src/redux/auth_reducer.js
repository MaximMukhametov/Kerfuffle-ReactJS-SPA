import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {
    setOwnerBackgroundPhoto
} from "./profile_reducer";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING_START = 'TOGGLE_IS_FETCHING_START';
const SET_AUTH = 'SET_AUTH';


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
        case SET_AUTH:
            return {
                ...state, isAuth: action.isAuth,

            };
        case TOGGLE_IS_FETCHING_START:
            return {...state, isFetchingApp: action.isFetchingApp};
        default:
            return state;

    }
};


export const setUserData = (login, userId, isAuth) => ({
    type: SET_USER_DATA, payload: {login, userId, isAuth}
});

export const setAuth = (isAuth) => ({
    type: SET_AUTH, isAuth
});

export const toggleIsFetchingStart = (isFetchingApp) => ({
    type: TOGGLE_IS_FETCHING_START,
    isFetchingApp
});


// это thunk, он возвращает функцию, мидлвар отлавливает такие функции,
// разворачивает и исполняет, и через диспатч заного прокидывает в конвеер
// используем промисы с синтаксисом async + await
export const getAuthUserData = () => async (dispatch) => {

    let response = await authAPI.me();

    if (response.status === 200) {
        let {name: login, id, background_photo} = response.data; // не важен порядок аргументов, главное чтобы названия совпадали
        dispatch(setOwnerBackgroundPhoto(background_photo));
        dispatch(setUserData(login, id, true));

    }
    dispatch(toggleIsFetchingStart(false))
};

export const LoginThunk = (email, password) => async (dispatch) => {
    try {
        let response = await authAPI.login(email, password);
        const {access: accessToken, refresh: refreshToken} = response.data;
        // const getToken = accessToken.split('.');
        // const decoder = atob(accessToken.split('.')[1]);
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(setAuth(true))

    } catch (error) {
        console.log(error.response);

        dispatch(stopSubmit("login", {_error: error.request.responseText})) // доработать поулчение описания ошибки
    }

};

export const LogoutThunk = (email, password, rememberMe) => async (dispatch) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    dispatch(setUserData(null, null, null, false))
};

export default authReducer;