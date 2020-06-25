import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {getAllUsersWithDialogsThunk} from "../../redux/messages_reducer";

let mapStateProps = (state) => {
    return {
        dialogsPreview: state.messagesPage.dialogsPreview,
        messagesWithUser: state.messagesPage.messagesWithUser,
        authUserId: state.auth.userId
    }
};

export default compose(
    connect(mapStateProps, {getAllUsersWithDialogsThunk}),
    WithAuthRedirect,
)(Dialogs)
