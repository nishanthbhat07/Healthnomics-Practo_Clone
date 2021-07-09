import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Row } from "reactstrap";

import { Colxx } from "../../../components/common/CustomBootstrap";

import {
  getContacts,
  getConversations,
  changeConversation,
  addMessageToConversation,
} from "../../../redux/actions";
import ChatApplicationMenu from "../../../containers/applications/ChatApplicationMenu";
import ChatHeading from "../../../components/applications/ChatHeading";
import MessageCard from "../../../components/applications/MessageCard";
import SaySomething from "../../../components/applications/SaySomething";

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActiveTab: "messages",
      messageInput: "",
    };
  }

  componentDidMount() {
    const currentUserId = 0;
    this.props.getContacts();
    this.props.getConversations(currentUserId);
  }

  // componentDidUpdate() {
  //   if (
  //     this.props.chatApp.loadingConversations &&
  //     this.props.chatApp.loadingContacts &&
  //     this.props.chatApp.selectedUser == null
  //   ) {
  //     this.props.changeConversation(this.props.chatApp.selectedUserId);
  //   }

  //   if (this._scrollBarRef) {
  //     this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
  //   }
  // }

  handleChatInputPress = (e) => {
    if (e.key === "Enter") {
      if (this.state.messageInput.length > 0) {
        this.props.addMessageToConversation(
          this.props.chatApp.currentUser.id,
          this.props.chatApp.selectedUser.id,
          this.state.messageInput,
          this.props.chatApp.conversations
        );

        this.setState({
          messageInput: "",
          menuActiveTab: "messages",
        });
      }
    }
  };

  handleChatInputChange = (e) => {
    this.setState({
      messageInput: e.target.value,
    });
  };

  handleSendButtonClick = () => {
    if (this.state.messageInput.length > 0) {
      this.props.addMessageToConversation(
        this.props.chatApp.currentUser.id,
        this.props.chatApp.selectedUser.id,
        this.state.messageInput,
        this.props.chatApp.conversations
      );
      this.setState({
        messageInput: "",
        menuActiveTab: "messages",
      });
    }
  };

  toggleAppMenu = (tab) => {
    this.setState({
      menuActiveTab: tab,
    });
  };

  render() {
    const {
      allContacts,
      conversations,
      loadingConversations,
      loadingContacts,
      currentUser,
      selectedUser,
    } = this.props.chatApp;
    console.log(
      "All contact",
      allContacts,
      "convo:",
      conversations,
      "convoload",
      loadingConversations,
      "contacload ",
      loadingContacts,
      "curruser",
      currentUser,
      "seluser",
      selectedUser
    );
    // const { menuActiveTab, messageInput } = this.state;
    // const { messages } = this.props.intl;
    // console.log("Conversations: ", conversations1);
    // const selectedConversation =
    //   loadingConversations && loadingContacts && selectedUser
    //     ? conversations1.find(
    //         (x) =>
    //           x.sender.includes(localStorage.getItem("user_id")) &&
    //           x.reciever.includes(1)
    //       )
    //     : null;
    return loadingConversations && loadingContacts ? (
      <Fragment></Fragment>
    ) : (
      <div className="loading" />
    );
  }
}

const mapStateToProps = ({ chatApp }) => {
  return { chatApp };
};
export default injectIntl(
  connect(mapStateToProps, {
    getContacts,
    getConversations,
    changeConversation,
    addMessageToConversation,
  })(ChatApp)
);
