import React from 'react';
import './App.css';
import store from "./redux/redux_store";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom"
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import Preloader from "./components/common/preloader/preloader";
import {connect, Provider} from "react-redux";
import {getAuthUserData} from "./redux/auth_reducer";
import {WithSuspense} from "./hoc/WithSuspense";
import MessageDetailContainer
    from "./components/Dialogs/Messages/MessageDetailContainer";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

// const MessageDetailContainer = React.lazy(() => import('./components/Dialogs/Messages/MessageDetailContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <div className="app-wraper">
                <img src={this.props.background_photo} id="bg" alt=""/>
                {this.props.isFetching ?
                    <Preloader/> :
                    <>
                        <HeaderContainer/>
                        <Navbar/>
                        <div className="app-wraper-content">
                            <Route exact path='/dialogs'
                                   render={WithSuspense(DialogsContainer)}/>
                            <Route path='/dialogs/:userId'
                                   render={() => <MessageDetailContainer/>}/>
                            <Route path='/profile/:userId?'
                                   render={WithSuspense(ProfileContainer)}/>
                            <Route path='/users/:postId?'
                                   render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                        </div>
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.auth.isFetchingApp,
    background_photo: (state.profilePage.profile ?
        state.profilePage.profile.background_photo : null),
});

let AppContainer = connect(mapStateToProps, {getAuthUserData})(App);


const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};


export default MainApp