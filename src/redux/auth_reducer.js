import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {setOwnerBackgroundPhoto} from "./profile_reducer";

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING_START = 'TOGGLE_IS_FETCHING_START';
const SET_AUTH = 'SET_AUTH';
const SET_PHOTO = 'SET_PHOTO';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetchingApp: true,
    photos: null,
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
        case SET_PHOTO:
            return {
                ...state, photos: action.photos,
            };

        case TOGGLE_IS_FETCHING_START:
            return {...state, isFetchingApp: action.isFetchingApp};
        default:
            return state;
    }
};


export const setUserData = (login, userId, isAuth, photos) => ({
    type: SET_USER_DATA, payload: {login, userId, isAuth, photos}
});

export const setAuth = (isAuth) => ({
    type: SET_AUTH, isAuth
});

export const setPhoto = (photos) => ({
    type: SET_PHOTO, photos
});

export const toggleIsFetchingStart = (isFetchingApp) => ({
    type: TOGGLE_IS_FETCHING_START,
    isFetchingApp
});

export const getAuthUserData = () => async (dispatch) => {

    let response = await authAPI.me();

    if (response.status === 200) {
        let {name: login, id, background_photo, photos} = response.data;
        dispatch(setOwnerBackgroundPhoto(background_photo));
        dispatch(setUserData(login, id, true, photos));
    }
    dispatch(toggleIsFetchingStart(false))
};

export const LoginThunk = (email, password) => async (dispatch) => {
    try {
        let response = await authAPI.login(email, password);
        const {access: accessToken, refresh: refreshToken} = response.data;
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(getAuthUserData());
        dispatch(setAuth(true))

    } catch (error) {
        dispatch(stopSubmit("login",
            {_error: error.request.responseText}))
    }
};

export const LogoutThunk = (email, password, rememberMe) => async (dispatch) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    dispatch(setUserData(null, null, null, false))
};

export default authReducer;