import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCurrentTime } from "../../helpers/Utils";

import {
  CHAT_GET_CONTACTS,
  CHAT_GET_CONVERSATIONS,
  CHAT_ADD_MESSAGE_TO_CONVERSATION,
  CHAT_CREATE_CONVERSATION,
} from "../actions";
import { database } from "../../helpers/Firebase";
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
  const data = await database.collection("chats_data").get();
  const conversations = data.docs.map((doc) => doc.data());
  console.log(conversations);
  const conversations1 = conversations.filter(
    (x) => x.sender === localStorage.getItem("user_id") && x.reciever === 1
  );
  console.log("saga", conversations1);
  console.log("payload: ", payload);
  const selectedUser = {
    id: 1,
    lastSeenDate: "Last seen today 15:24",
    name: "Linn Ronning",
    thumb: "/assets/img/profile-pic-l-4.jpg",
  };

  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({
        conversations1,
        selectedUser,
      });
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
    await database
      .collection("chats_data")
      .add({
        sender: localStorage.getItem("user_id"),
        reciever: selectedUserId,
        time: time,
        text: message,
      })
      .then(async () => {
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
      })
      .catch((error) => alert(error));
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
