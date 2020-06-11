import userAPI, {profileAPI} from "../api/api";
import authReducer from "./auth_reducer";

const GET_POST = 'GET_POST';
const ADD_POST = 'ADD_POST';
const DEL_POST = 'DEL_POST';
const EDIT_POST = 'EDIT_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST;';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const PHOTO_IS_UPLOADING = 'PHOTO_IS_UPLOADING';


let initialState = {
    posts: [],
    newPostText: 'newPostText',
    profile: null,
    status: "",
    isLoadingPhoto: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                posts: action.postsText,
            };

        case ADD_POST:
            return {
                ...state,
                posts: [action.postText, ...state.posts],
                newPostText: ''
            };

        case DEL_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };

        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(post => (
                    post.id == action.newPost.id ? action.newPost
                        : post
                ))
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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };

        case PHOTO_IS_UPLOADING:
            return {
                ...state, isLoadingPhoto: action.isLoadingPhoto
            };

        default:
            return state;

    }

    return state;
};

export const getPost = (postsText) => ({type: GET_POST, postsText});
export const addPost = (postText) => ({type: ADD_POST, postText});
export const delPost = (postId) => ({type: DEL_POST, postId});
export const editPost = (newPost) => ({
    type: EDIT_POST,
    newPost,
});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});
export const photoIsUploading = (isLoadingPhoto) => ({
    type: PHOTO_IS_UPLOADING,
    isLoadingPhoto
});

export const getUserProfile = (userId, isOwner) => async (dispatch) => {
    !isOwner && dispatch(setUserProfile(null)) &&
    dispatch(getPost([]));
    let response = await userAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
};


export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data.status));
};


export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.status === 201) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = (fileWithPhoto) => async (dispatch) => {
    dispatch(photoIsUploading(true));
    const response = await profileAPI.savePhoto(fileWithPhoto);
    if (response.status === 201) {
        dispatch(savePhotoSuccess(response.data));
        dispatch(photoIsUploading(false))
    }
};

export const saveProfile = (profile, isOwner) => async (dispatch) => {
    const response = await profileAPI.saveProfile(profile);
    if (response.status === 201) {
        dispatch(getUserProfile(profile.id, isOwner))
    }
};

export const addPostThunk = (text) => async (dispatch) => {
    const response = await profileAPI.addPost(text);
    if (response.status === 201) {
        dispatch(addPost(response.data))
    }
};

export const getPostThunk = (userid) => async (dispatch) => {
    const response = await profileAPI.getPost(userid);
    if (response.status === 200) {
        dispatch(getPost(response.data))
    }
};

export const likePostThunk = (userid) => async (dispatch) => {
    const response = await profileAPI.likePost(userid);
    if (response.status === 200) {
        dispatch(editPost(response.data))
    }
};


export const changePostThunk = (userid, text) => async (dispatch) => {
    const response = await profileAPI.changePost(userid, text);
    if (response.status === 200) {
        dispatch(editPost(response.data))
    }
};

export const delPostThunk = (postId) => async (dispatch) => {
    const response = await profileAPI.delPost(postId);
    if (response.status === 204) {
        dispatch(delPost(postId))
    }
};


export default profileReducer;