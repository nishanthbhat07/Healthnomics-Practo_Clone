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

const INIT_STATE = {
	allContacts: null,
	contacts: null,
	conversations: null,
	error: '',
	searchKeyword: '',
	loadingContacts: false,
	loadingConversations: false,
	currentUser: null,
	selectedUser: null,
	selectedUserId: null
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case CHAT_GET_CONTACTS:
			return { ...state, loadingContacts: false };

		case CHAT_GET_CONTACTS_SUCCESS:
			return { ...state, loadingContacts: true, allContacts: action.payload.contacts, contacts: action.payload.contacts, currentUser: action.payload.currentUser };

		case CHAT_GET_CONTACTS_ERROR:
			return { ...state, loadingContacts: false, error: action.payload };


		case CHAT_GET_CONVERSATIONS:
			return { ...state, loadingConversations: false };

		case CHAT_GET_CONVERSATIONS_SUCCESS:
			return { ...state, 
				loadingConversations: true, 
				conversations: action.payload.conversations, 
				selectedUserId:  action.payload.selectedUser 
			};

		case CHAT_GET_CONVERSATIONS_ERROR:
			return { ...state, loadingConversations: false, error: action.payload };

		case CHAT_CHANGE_CONVERSATION:
			return { ...state, selectedUser: state.allContacts.find(x => x.id === action.payload) };


		case CHAT_ADD_MESSAGE_TO_CONVERSATION:
			return { ...state };

		case CHAT_CREATE_CONVERSATION:
			return { ...state };

		case CHAT_SEARCH_CONTACT:
			if (action.payload === '') {
				return { ...state, contacts: state.allContacts };
			} else {
				const keyword = action.payload.toLowerCase();
				const searchedContacts = state.allContacts.filter((item) => item.name.toLowerCase().indexOf(keyword) > -1);
				return { ...state, contacts: searchedContacts }
			}

		default: return { ...state };
	}
}
