import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreater} from "../../redux/messages_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateProps = (state) => {
    return{
        messagesPage: state.messagesPage
    }
}
let mapDispatchProps = (dispatch) => {
    return{
        onSendMessageChange:(body) => {
                    dispatch(updateNewMessageBodyCreater(body))
                },
        onSendMessageClick :() => {
                    dispatch(sendMessageCreator())
                }
    }
}

const DialogsContainer = connect(mapStateProps,mapDispatchProps)(Dialogs);


export default DialogsContainer
