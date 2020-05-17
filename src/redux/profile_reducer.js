import userAPI, {authAPI, profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST;';


let initialState = {
    posts: [
        {id: 1, message: 'hi helllow', likesCount: 12},
        {id: 2, message: 'whdfats up', likesCount: 14},
        {id: 3, message: 'whatgdfgs up', likesCount: 81},
        {id: 4, message: 'what34vcbds up', likesCount: 145},
        {id: 5, message: 'what45s up', likesCount: 811},
    ],
    newPostText: 'newPostText',
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };
        default:
            return state;

    }

    return state;
};

export const addPostActionCreator = (postText) => ({type: ADD_POST, postText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const getUserProfile = (userId) => async (dispatch) => {
            let response = await userAPI.getProfile(userId)
            dispatch(setUserProfile(response.data))
    };


export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
};


export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
};


export default profileReducer;