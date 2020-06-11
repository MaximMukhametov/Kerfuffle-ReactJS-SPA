import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {
    deleteMessageThunk, editMessageThunk,
    getMessagesWithUserThunk,
    sendMessageThunk, setMessagesWithUser
} from "../../../redux/messages_reducer";
import {connect} from "react-redux";
import MessageDetail from "./MessageDetail";
import ProfileDataForm from "../../Profile/ProfileInfo/ProfileDataForm";
import MessageSendForm from "./MessageSendForm";
import {animated, useTransition} from "react-spring";


const MessageDetailContainer = (props) => {
    let [messageCounter, setMessageCounter] = useState(10)

    useEffect(() => {
            props.getMessagesWithUserThunk(props.match.params.userId)
        }, [props.match.params.userId]
    );
    useEffect(() => () => props.setMessagesWithUser([]), []);

    const transitions = useTransition(props.messages, item => item.id, {
        config: {mass: 10, tension: 2000, friction: 60},
        from: {transform: 'rotateX(90deg)', opacity: 1},
        enter: {transform: 'rotateX(0deg)', opacity: 1},
        leave: {transform: 'rotateX(90deg)', opacity: 1},
    });

    const isMyMessage = (message) => (
        message.written_by.id === props.authUserId ? true : false
    );

    const onSubmit = (messageText) => {
        props.sendMessageThunk(props.match.params.userId, messageText.message)
    };
    const loadMoreMessages = () => {
        setMessageCounter(messageCounter+10);
        props.getMessagesWithUserThunk(props.match.params.userId, messageCounter+10)
    };


    const messages = !!props.messages && transitions.reverse().map(
        m => <animated.div style={m.props}
                          key={m.item.id}>

            <MessageDetail key={m.item.id}
                            message={{
                                id: m.item.id,
                                message: m.item.message,
                                data: m.item.created_at
                            }}
                            writer={m.item.written_by}
                            isMyMessage={isMyMessage(m.item)}
                            addressee={m.item.written_for}
                            sendMessage={props.sendMessageThunk}
                            editMessage={props.editMessageThunk}
                            deleteMessage={props.deleteMessageThunk}
                            routing={{
                                history: props.history,
                                location: props.location,
                                match: props.match
                            }}
        /></animated.div>
    );

    return <div>
        {props.messageCount > messageCounter && <div onClick={loadMoreMessages}>Загрузить ещё...</div>}

        <div>{messages}</div>
        <MessageSendForm onSubmit={onSubmit}/>
    </div>
};


let mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return ({
        messages: state.messagesPage.messagesWithUser,
        authUserId: state.auth.userId,
        messageCount: state.messagesPage.messageCount

    })
};

export default compose(
    withRouter,
    connect(mapStateToProps, {
        setMessagesWithUser,
        getMessagesWithUserThunk, sendMessageThunk,
        editMessageThunk, deleteMessageThunk
    })
)(MessageDetailContainer)

