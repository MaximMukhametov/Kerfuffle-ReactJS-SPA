import React from "react";
import {sendMessageCreator} from "../../redux/messages_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


let mapStateProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
}


// HOC (хок) компонента, что-то типа декоратора в питоне, добавляет одинаковую функциональность к компонентам,
// принимает компоненту, добавляет что-то и возвращает компоненту

//это старые строки
// let AuthRedirectComponent = WithAuthRedirect(Dialogs);
//
// const DialogsContainer = connect(mapStateProps, mapDispatchProps)(AuthRedirectComponent);


export default compose(
    connect(mapStateProps, {sendMessageCreator}),
    WithAuthRedirect,
)(Dialogs)
