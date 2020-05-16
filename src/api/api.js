// Слой доступа к данным (Data Access Layer — DAL)

import * as axios from "axios";

// api key 29b52a33-0663-4c91-8b93-9c77dbcc6e59


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "29b52a33-0663-4c91-8b93-9c77dbcc6e59"
        }
    }
);


export const usersAPI = {
        getUsers(currentPage = 1, pageSize = 10) {
            return instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
        },
        follow(userId) {
            return instance.post(`follow/${userId}`, {})
                .then(response => response.data)
        },
        unfollow(userId) {
            return instance.delete(`follow/${userId}`)
                .then(response => response.data);
        },
        getProfile(userId) {
            return profileAPI.getProfile(userId);
        },


    }

;

export const profileAPI = {

        getProfile(userId) {
            return instance.get(`profile/` + userId)
        },
        getStatus(userId) {
            return instance.get(`profile/status/` + userId)
        },
        updateStatus(status) {
            return instance.put(`profile/status/`, {status: status});
        },


    }

;


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
};


export default usersAPI;
