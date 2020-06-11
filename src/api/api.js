// Слой доступа к данным (Data Access Layer — DAL)

import * as axios from "axios";


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "29b52a33-0663-4c91-8b93-9c77dbcc6e59"
        }
    }
);

const djangoBackEnd = axios.create(
    {
        withCredentials: false,
        baseURL: 'http://localhost:8000/',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
        }
    }
);

export const isAuthorized = async (currentPage, pageSize) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
        const updateToken = await djangoBackEnd.post('auth/jwt/refresh/',
            {refresh: refreshToken})
            .then(response => {
                sessionStorage.setItem('accessToken', response.data.access);
                return response
            })
            .then(response => {
                djangoBackEnd.defaults.headers['Authorization'] = "Bearer " +
                    response.data.access;
                return response.status
            })
            .catch(error => {
                return error.response.status
            });
        return updateToken
    }
};


const requestWithAuth = async (action) => {
    try {
        return await action();
    } catch (error) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && error.response.status == 401) {
            try {
                const updateToken = await djangoBackEnd.post('auth/jwt/refresh/',
                    {refresh: refreshToken});
                sessionStorage.setItem('accessToken', updateToken.data.access);
                djangoBackEnd.defaults.headers['Authorization'] = "Bearer "
                    + updateToken.data.access;
                return await action()
            } catch (error) {
                return error.response
            }
        } else {
            return error.response
        }
    }
};


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, postId) {
        const getUsersWhoLikePost = postId ? `&like_post=${postId}` : '';
        return requestWithAuth(() => (
            djangoBackEnd.get(`users/?page=${currentPage}&count=${pageSize}` +
                getUsersWhoLikePost)))
    }
    ,

    follow(userId) {
        return requestWithAuth(() => (
            djangoBackEnd.post(
                `follow/${userId}`
                , {})))
    },
    unfollow(userId) {
        return requestWithAuth(() => (
            djangoBackEnd.delete(
                `follow/${userId}`
            )))
    },

    getProfile(userId) {
        return profileAPI.getProfile(userId);
    },
};

export const profileAPI = {

    getProfile(userId) {
        return requestWithAuth(() => (
            djangoBackEnd.get(`profile/` + userId)))
    },
    getStatus(userId) {
        return requestWithAuth(() => (
            djangoBackEnd.get(`profile/status/` + userId)))
    },
    updateStatus(status) {
        return requestWithAuth(() => (
            djangoBackEnd.put(`profile/status/`, {status: status})));
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("large_img", photoFile);
        return requestWithAuth(() => (
            djangoBackEnd.put('profile/photo/', formData)))
    },
    saveProfile(profile) {
        return requestWithAuth(() => (
            djangoBackEnd.put('profile/', profile)))
    },

    addPost(text) {
        return requestWithAuth(() => (
            djangoBackEnd.post('posts/', {text})))
    },

    getPost(userid) {
        return requestWithAuth(() => (
            djangoBackEnd.get('posts/', {params: {userid}})))
    },

    delPost(postId) {
        return requestWithAuth(() => (
            djangoBackEnd.delete(`posts/${postId}/`)))
    },

    changePost(postId, text) {
        return requestWithAuth(() => (
            djangoBackEnd.put(`posts/${postId}/`, {text})))
    },

    likePost(postId, text) {
        return requestWithAuth(() => (
            djangoBackEnd.post(`like/${postId}`, {})))
    }
};

export const authAPI = {
    me() {
        return requestWithAuth(() => (djangoBackEnd.get(`auth/me/`)))
    },

    login(name, password) {
        return axios.post(`http://localhost:8000/auth/jwt/create/`, {
            name,
            password
        })
            .then(response => {
                djangoBackEnd.defaults.headers['Authorization'] = "Bearer " +
                    response.data.access;
                return response
            })
    },
};

export const dialogsAPI = {
    getAllUsersWithDialogs() {
        return requestWithAuth(() => (
            djangoBackEnd.get('message/1?get_users=1')))
    },
    getMessagesWithUser(userId, loadMoreMessages) {
        const countMessages = !!loadMoreMessages? `?count=${loadMoreMessages}`: '';
        return requestWithAuth(() => (
            djangoBackEnd.get('message/' + userId + countMessages)))
    },
    sendMessage(userId, message) {
        return requestWithAuth(() => (
            djangoBackEnd.post('message/' + userId, {message})))
    },
    editMessage(messageId, message) {
        return requestWithAuth(() => (
            djangoBackEnd.patch('message/' + messageId, {message})))
    },
    deleteMessage(messageId) {
        return requestWithAuth(() => (
            djangoBackEnd.delete('message/' + messageId)))
    },
};

export default usersAPI;
