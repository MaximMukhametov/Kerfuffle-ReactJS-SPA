import {authAPI, dialogsAPI} from "../api/api";
import {setUserData, toggleIsFetchingStart} from "./auth_reducer";

const SET_DIALOGS_PREVIEW = 'SET_DIALOGS_PREVIEW';

let initialState = {
    dialogsPreview: [],
    messagesWithUser: [],

};


export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS_PREVIEW:
            return {...state,
                dialogsPreview: action.dialogsPreview};

        default:
            return state;
    }
    ;
};

export const setDialogsPreview = (dialogsPreview) => ({type: SET_DIALOGS_PREVIEW, dialogsPreview});


export const getAllUsersWithDialogsThunk = () => async (dispatch) => {
    const response = await dialogsAPI.getAllUsersWithDialogs();
    if (response.status ===200) {
        dispatch(setDialogsPreview(response.data))

    }
};

export default messagesReducer;


// export const getAuthUserData = () => async (dispatch) => {
//
//     let response = await authAPI.me();
//
//     if (response.status === 200) {
//         let {name: login, id} = response.data; // не важен порядок аргументов, главное чтобы названия совпадали
//         dispatch(setUserData(login, id, true));
//     }
//     dispatch(toggleIsFetchingStart(false))
// };