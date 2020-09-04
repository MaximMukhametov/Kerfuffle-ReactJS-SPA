import profileReducer, {addPostThunk, deletePost} from "./profile_reducer";
import React from "react";


let state = {
    posts: [
        {id: 1, message: 'hi helllow', likesCount: 12},
        {id: 2, message: 'whdfats up', likesCount: 14},
        {id: 3, message: 'whatgdfgs up', likesCount: 81},
        {id: 4, message: 'what34vcbds up', likesCount: 145},
        {id: 5, message: 'what45s up', likesCount: 811},
    ],

};

test('new post should be added', () => {
    let action = addPostThunk('test text');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5)

});

test('new post text should be test text', () => {
    let action = addPostThunk('test text');
    let newState = profileReducer(state, action);
    expect(newState.posts[5].message).toBe('test text')

});

test('after deleting length of messages should be decremented ' +
    'if id is correct', () => {
    let messagesCount = state.posts.length;
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(messagesCount - 1)

});

test('after deleting length of messages shouldn`t be decremented if id is' +
    ' not correct', () => {
    let messagesCount = state.posts.length;
    let action = deletePost(999999999999);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(messagesCount)

});
