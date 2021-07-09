import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCurrentTime } from "../../helpers/Utils";

import {
  CHAT_GET_CONTACTS,
  CHAT_GET_CONVERSATIONS,
  CHAT_ADD_MESSAGE_TO_CONVERSATION,
  CHAT_CREATE_CONVERSATION,
} from "../actions";

import {
  getContactsSuccess,
  getContactsError,
  getConversationsSuccess,
  getConversationsError,
} from "./actions";

import contactsData from "../../data/chat.contacts.json";
import conversationsData from "../../data/chat.conversations.json";

function* loadContacts() {
  try {
    const response = yield call(loadContactsAsync);
    const { contacts, currentUser } = response;
    yield put(getContactsSuccess(contacts, currentUser));
  } catch (error) {
    yield put(getContactsError(error));
  }
}

const loadContactsAsync = async () => {
  const contacts = contactsData.data;
  const currentUser = contacts[0];
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({ contacts, currentUser });
    }, 2000);
  })
    .then((response) => response)
    .catch((error) => error);
};

function* loadConversations(userId) {
  try {
    const response = yield call(loadConversationsAsync, userId);
    const { conversations, selectedUser } = response;
    yield put(getConversationsSuccess(conversations, selectedUser));
  } catch (error) {
    yield put(getConversationsError(error));
  }
}

const loadConversationsAsync = async ({ payload }) => {
  let conversations = conversationsData.data;
  console.log("Before", conversations);
  conversations = conversations.filter((x) => x.users.includes(payload));
  console.log("After", conversations);
  const selectedUser = conversations[0].users.find((x) => x !== payload);
  console.log("selected user", selectedUser);
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({ conversations, selectedUser });
    }, 1000);
  })
    .then((response) => response)
    .catch((error) => error);
};

function* addMessageToConversation({ payload }) {
  try {
    const {
      currentUserId,
      selectedUserId,
      message,
      allConversations,
    } = payload;

    const response = yield call(
      addMessageToConversationAsync,
      currentUserId,
      selectedUserId,
      message,
      allConversations
    );
    const { conversations, selectedUser } = response;
    yield put(getConversationsSuccess(conversations, selectedUser));
  } catch (error) {
    yield put(getConversationsError(error));
  }
}
const addMessageToConversationAsync = async (
  currentUserId,
  selectedUserId,
  message,
  allConversations
) => {
  let conversation = allConversations.find(
    (x) => x.users.includes(currentUserId) && x.users.includes(selectedUserId)
  );
  const time = getCurrentTime();
  if (conversation) {
    conversation.messages.push({
      sender: currentUserId,
      time: time,
      text: message,
    });
    conversation.lastMessageTime = time;
    let conversations = allConversations.filter(
      (x) => x.id !== conversation.id
    );
    conversations.splice(0, 0, conversation);

    return await new Promise((success, fail) => {
      setTimeout(() => {
        success({ conversations, selectedUser: selectedUserId });
      }, 500);
    })
      .then((response) => response)
      .catch((error) => error);
  }
};

function* createNewConversation({ payload }) {
  try {
    const { currentUserId, selectedUserId, allConversations } = payload;
    const response = yield call(
      createNewConversationAsync,
      currentUserId,
      selectedUserId,
      allConversations
    );
    const { conversations, selectedUser } = response;
    yield put(getConversationsSuccess(conversations, selectedUser));
  } catch (error) {
    yield put(getConversationsError(error));
  }
}

const createNewConversationAsync = async (
  currentUserId,
  selectedUserId,
  allConversations
) => {
  let conversation = {
    id: allConversations.length + 1,
    users: [currentUserId, selectedUserId],
    lastMessageTime: "-",
    messages: [],
  };

  allConversations.splice(0, 0, conversation);
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({
        conversations: allConversations,
        selectedUser: selectedUserId,
      });
    }, 500);
  })
    .then((response) => response)
    .catch((error) => error);
};

export function* watchGetContact() {
  yield takeEvery(CHAT_GET_CONTACTS, loadContacts);
}
export function* watchGetConversation() {
  yield takeEvery(CHAT_GET_CONVERSATIONS, loadConversations);
}
export function* watchAddMessageToConversation() {
  yield takeEvery(CHAT_ADD_MESSAGE_TO_CONVERSATION, addMessageToConversation);
}
export function* watchCreateConversation() {
  yield takeEvery(CHAT_CREATE_CONVERSATION, createNewConversation);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetContact),
    fork(watchGetConversation),
    fork(watchAddMessageToConversation),
    fork(watchCreateConversation),
  ]);
}
