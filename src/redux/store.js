import profileReducer from "./profile_reducer";
import messagesReducer from "./messages_reducer";
import subNavbarReducer from "./subNavbar_reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hi helllow', likesCount: 12},
                {id: 2, message: 'whats up', likesCount: 11},
            ],
            newPostText: 'newPostText'
        },
        messagesPage: {
            messages: [
                {id: 1, message: 'Max'},
                {id: 2, message: 'Vova'},
                {id: 3, message: 'Misha'},
                {id: 4, message: 'Roma'},
                {id: 5, message: 'Slava'},
                {id: 6, message: 'Senya'},

            ],
            dialogs: [
                {id: 1, name: 'Max'},
                {id: 2, name: 'Vova'},
                {id: 3, name: 'Misha'},
                {id: 4, name: 'Roma'},
                {id: 5, name: 'Slava'},
                {id: 6, name: 'Senya'},

            ],
            newMessageBody: "lalalalala"
        },
        subNavbar: {
            friends: [
                "Vova", "Roma", "Slava"
            ]
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer

    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
        this._state.subNavbar = subNavbarReducer(this._state.subNavbar, action);
        this._callSubscriber(this._state)
    }
};

export default store;
window.store = store;
