import {authAPI, dialogsAPI} from "../api/api";
import {setUserData, toggleIsFetchingStart} from "./auth_reducer";

const SET_DIALOGS_PREVIEW = 'SET_DIALOGS_PREVIEW';
const SET_MESSAGES_WITH_USER = 'SET_MESSAGES_WITH_USER';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_EDITED_MESSAGE = 'SET_EDITED_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const SET_MESSAGE_COUNT = 'SET_MESSAGE_COUNT';

let initialState = {
    dialogsPreview: [],
    messagesWithUser: [],
    messageCount: 10

};


export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS_PREVIEW:
            return {
                ...state,
                dialogsPreview: action.dialogsPreview
            };
        case SET_MESSAGES_WITH_USER:
            return {
                ...state, messagesWithUser: action.messages
            };
        case SET_MESSAGE:
            return {
                ...state,
                messagesWithUser: [...state.messagesWithUser, action.textMessage]
            };
        case SET_EDITED_MESSAGE:
            return {
                ...state,
                messagesWithUser: state.messagesWithUser.map(message => (
                    message.id === action.editedMessage.id ?
                        action.editedMessage : message
                ))
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messagesWithUser: state.messagesWithUser.filter(m => m.id != action.deletedMessageId)

            };
        case SET_MESSAGE_COUNT:
            return {
                ...state,
                messageCount: action.messageCount
            };
        default:
            return state;
    }
};

export const setDialogsPreview = (dialogsPreview) => ({
    type: SET_DIALOGS_PREVIEW,
    dialogsPreview
});

export const setMessagesWithUser = (messages) => ({
    type: SET_MESSAGES_WITH_USER,
    messages
});
export const setMessage = (textMessage) => ({type: SET_MESSAGE, textMessage});
export const setEditedMessage = (editedMessage) => ({
    type: SET_EDITED_MESSAGE,
    editedMessage
});
export const removeMessage = (deletedMessageId) => ({
    type: DELETE_MESSAGE,
    deletedMessageId
});
export const setMessageCount = (messageCount) => ({
    type: SET_MESSAGE_COUNT,
    messageCount
});


export const getAllUsersWithDialogsThunk = () => async (dispatch) => {
    const response = await dialogsAPI.getAllUsersWithDialogs();
    if (response.status === 200) {
        dispatch(setDialogsPreview(response.data))
    }
};
export const getMessagesWithUserThunk = (userId, loadMoreMessages) => async (dispatch) => {
    const response = await dialogsAPI.getMessagesWithUser(userId, loadMoreMessages);
    if (response.status === 200) {
        dispatch(setMessagesWithUser(response.data.data));
        dispatch(setMessageCount(response.data.count))

    }
};
export const sendMessageThunk = (userId, message) => async (dispatch) => {
    const response = await dialogsAPI.sendMessage(userId, message);
    if (response.status === 200) {
        dispatch(setMessage(response.data))

    }
};
export const editMessageThunk = (messageId, message) => async (dispatch) => {
    const response = await dialogsAPI.editMessage(messageId, message);
    if (response.status === 200) {
        dispatch(setEditedMessage(response.data))

    }
};
export const deleteMessageThunk = (messageId) => async (dispatch) => {
    const response = await dialogsAPI.deleteMessage(messageId);
    if (response.status === 200) {
        dispatch(removeMessage(messageId))

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