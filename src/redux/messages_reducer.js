
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Max'},
        {id: 2, name: 'Vova'},
        {id: 3, name: 'Misha'},
        {id: 4, name: 'Roma'},
        {id: 5, name: 'Slava'},
        {id: 6, name: 'Senya'},

    ],
    messages: [
        {id: 1, message: 'hello'},
        {id: 2, message: 'whats up'},
        {id: 3, message: 'huuh?'},
        {id: 4, message: 'wow hi'},
        {id: 5, message: 'lets do it!'},
        {id: 6, message: 'go go go'},

    ],

};


export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: action.body}]};

        default:
            return state;
    }
    ;
};

export const sendMessageCreator = (body) => ({type: SEND_MESSAGE, body});



export default messagesReducer;