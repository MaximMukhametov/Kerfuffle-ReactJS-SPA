import React, {createContext} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom"
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/users/users";


const App = (props) => {
    return (
        <div className="app-wraper">
            <Header/>
            <Navbar/>
            <div className="app-wraper-content">
                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                <Route path='/profile' render={() => <Profile/>}/>
                <Route path='/users' render={() => <Users/>}/>
            </div>
        </div>
    );
}

export default App;
