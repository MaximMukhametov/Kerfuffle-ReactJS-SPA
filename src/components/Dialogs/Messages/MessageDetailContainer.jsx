import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {
    deleteMessageThunk,
    editMessageThunk,
    getMessagesWithUserThunk,
    sendMessageThunk,
    setMessagesWithUser
} from "../../../redux/messages_reducer";
import {connect} from "react-redux";
import MessageDetail from "./MessageDetail";
import MessageSendForm from "./MessageSendForm";
import {animated, useTransition} from "react-spring";
import WithAuthRedirect from "../../../hoc/WithAuthRedirect";
import {getUserProfile} from "../../../redux/profile_reducer";
import userPhoto from "../../../media/userPhoto.jpg";
import classes from "./MessageDetail.module.css"
import convertUTCDateToLocalDate
    from "../../../utils/convertUTCDateToLocalDate";
import {profileAPI} from "../../../api/api";
import Preloader from "../../common/preloader/preloader";


const MessageDetailContainer = (props) => {
    let [messageCounter, setMessageCounter] = useState(10);
    let [isLoadProfile, setIsLoadProfile] = useState(false);
    let [profile, setProfile] = useState(null);
    let [banScroll, setBanScroll] = useState(false);
    let [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
    const loadMoreMessagesCount = 10;

    useEffect(() => {

            profileAPI.getProfile(props.match.params.userId, true)
                .then(r => setProfile(r.data));
            props.getMessagesWithUserThunk(props.match.params.userId)
                .then(r => setIsLoadProfile(true))
        }, [props.match.params.userId]
    );
    useEffect(() => () => props.setMessagesWithUser([]), []);

    useEffect(() => {
        if (messages.length && !banScroll && isLoadProfile) {
            const elem = document.getElementById('messageSendForm');
            elem.scrollIntoView(true);
        }
        banScroll && setBanScroll(!banScroll)
    }, [props.messages]);


    const transitions = useTransition(props.messages,
        item => item.id, {
            config: {mass: 10, tension: 2000, friction: 60},
            from: {transform: 'rotateX(90deg) translate(0%)'},
            enter: {transform: 'rotateX(0deg) translate(0%)'},
            leave: {transform: 'rotateX(0deg) translate(200%)'},
        });

    const isMyMessage = (message) => (
        message.written_by.id === props.authUserId
    );


    const onSubmit = (messageText) => {
        props.sendMessageThunk(props.match.params.userId, messageText.message)

    };
    const loadMoreMessages = () => {
        setIsLoadingMoreMessages(true);
        setBanScroll(!banScroll);
        setMessageCounter(messageCounter + loadMoreMessagesCount);
        props.getMessagesWithUserThunk(props.match.params.userId,
            messageCounter + loadMoreMessagesCount)
            .then(r => setIsLoadingMoreMessages(false))
    };


    const messages = !!props.messages && transitions.reverse().map(
        m => <animated.div style={m.props}
                           key={m.item.id}
                           id={m.item.id}>
            <MessageDetail key={m.item.id}
                           message={{
                               id: m.item.id,
                               message: m.item.message,
                               data: convertUTCDateToLocalDate(m.item.created_at)
                           }}
                           writer={m.item.written_by}
                           isMyMessage={isMyMessage(m.item)}
                           addressee={m.item.written_for}
                           sendMessage={props.sendMessageThunk}
                           editMessage={props.editMessageThunk}
                           deleteMessage={props.deleteMessageThunk}
                           setBanScroll={setBanScroll}
                           routing={{
                               history: props.history,
                               location: props.location,
                               match: props.match
                           }}
            /></animated.div>
    );

    return (
        <div>{isLoadProfile ?
            <div className={classes.messages}>
                {!!profile && isLoadProfile &&
                <div className={classes.profile_info}>
                    <img
                        onClick={() => props.history.push('/profile/' + profile.id)}
                        src={(profile.photos && (profile.photos.small_img
                            || profile.photos.small)) || userPhoto}/>
                    <div>{profile.name}</div>
                </div>}
                <div className={classes.messages_body}>
                    {props.messageCount > messageCounter &&
                    <div className={classes.messages_body_load_previous}
                         onClick={loadMoreMessages}>
                        {!isLoadingMoreMessages ?
                            'Load previous...' : 'Loading...'}</div>}
                    <div
                        className={classes.messages_body_list}>{messages}</div>
                    <MessageSendForm id={'messageSendForm'}
                                     onSubmit={onSubmit}/>
                </div>
            </div> : <Preloader/>}</div>)
};


let mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return ({
        messages: state.messagesPage.messagesWithUser,
        authUserId: state.auth.userId,
        messageCount: state.messagesPage.messageCount,
    })
};

export default compose(
    withRouter,
    WithAuthRedirect,
    connect(mapStateToProps, {
        setMessagesWithUser, getUserProfile,
        getMessagesWithUserThunk, sendMessageThunk,
        editMessageThunk, deleteMessageThunk
    })
)(MessageDetailContainer)

