import {applyMiddleware, combineReducers, createStore,compose} from "redux";
import profileReducer from "./profile_reducer";
import messagesReducer from "./messages_reducer";
import subNavbarReducer from "./subNavbar_reducer";
import usersReducer from "./users_reducer";
import authReducer from "./auth_reducer";
import thunkMiddlware from "redux-thunk";
import { reducer as formReducer} from 'redux-form'


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    subNavbar: subNavbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

//  applyMiddleware(thunkMiddlware) создаёт мидлвар для работы с санками( thunk )



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddlware)))


export default store