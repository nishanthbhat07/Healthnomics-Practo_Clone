import {
    CHAT_GET_CONTACTS,
    CHAT_GET_CONTACTS_SUCCESS,
    CHAT_GET_CONTACTS_ERROR,
    CHAT_GET_CONVERSATIONS,
    CHAT_GET_CONVERSATIONS_SUCCESS,
    CHAT_GET_CONVERSATIONS_ERROR,
    CHAT_ADD_MESSAGE_TO_CONVERSATION,
    CHAT_CREATE_CONVERSATION,
    CHAT_SEARCH_CONTACT,
    CHAT_CHANGE_CONVERSATION
} from '../actions';


export const getContacts = () => ({
    type: CHAT_GET_CONTACTS
});

export const getContactsSuccess = (contacts, currentUser) => {
    return ({
        type: CHAT_GET_CONTACTS_SUCCESS,
        payload: { contacts, currentUser }
    })
};

export const getContactsError = (error) => ({
    type: CHAT_GET_CONTACTS_ERROR,
    payload: error
});

export const getConversations = (userId) => ({
    type: CHAT_GET_CONVERSATIONS,
    payload:  userId 
});
export const getConversationsSuccess = (conversations, selectedUser) => ({
    type: CHAT_GET_CONVERSATIONS_SUCCESS,
    payload: { conversations, selectedUser }
});

export const getConversationsError = (error) => ({
    type: CHAT_GET_CONVERSATIONS_ERROR,
    payload: error
});

export const addMessageToConversation = (currentUserId,selectedUserId,message,allConversations) => ({
    type: CHAT_ADD_MESSAGE_TO_CONVERSATION,
    payload: {currentUserId,selectedUserId,message,allConversations}
});

export const createConversation = (currentUserId,selectedUserId,allConversations) => {
    return ({
        type: CHAT_CREATE_CONVERSATION,
        payload: {currentUserId,selectedUserId,allConversations}
    })
};

export const searchContact = (keyword) => ({
    type: CHAT_SEARCH_CONTACT,
    payload: keyword
});

export const changeConversation = (userId) => ({
    type: CHAT_CHANGE_CONVERSATION,
    payload: userId
});

