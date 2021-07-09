import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Nav, TabContent, TabPane, CardHeader, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "../../components/common/ApplicationMenu";

import {
  changeConversation,
  createConversation,
  searchContact,
} from "../../redux/actions";

class ChatApplicationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }
  toggleAppMenu = (tab) => {
    if (this.props.activeTab !== tab) {
      this.props.toggleAppMenu(tab);
    }
    if (tab === "messages") {
      this.handleSearchContact("");
    }
  };

  handleSearchContact = (keyword) => {
    this.setState({
      searchKey: keyword,
    });
    if (keyword.length > 0) {
      if (this.props.activeTab !== "contacts") {
        this.props.toggleAppMenu("contacts");
      }
      this.props.searchContact(keyword);
    } else {
      this.props.searchContact("");
    }
  };

  handleConversationClick = (e, selectedUserId) => {
    this.props.changeConversation(selectedUserId);
    this.handleSearchContact("");
  };

  handleContactClick = (userId) => {
    if (this.props.activeTab !== "messages") {
      this.props.toggleAppMenu("messages");
      this.props.searchContact("");
    }

    const { conversations, currentUser } = this.props.chatApp;
    const conversation = conversations.find(
      (x) => x.users.includes(currentUser.id) && x.users.includes(userId)
    );
    if (conversation) {
      this.props.changeConversation(userId);
    } else {
      this.props.createConversation(currentUser.id, userId, conversations);
      this.props.changeConversation(userId);
    }
  };

  render() {
    const {
      contacts,
      allContacts,
      conversations,
      loadingConversations,
      loadingContacts,
      currentUser,
    } = this.props.chatApp;
    const { messages } = this.props.intl;

    return (
      <ApplicationMenu>
        <CardHeader className="pl-0 pr-0">
          <Nav tabs className="card-header-tabs ml-0 mr-0">
            <NavItem className="w-50 text-center">
              <NavLink
                className={classnames({
                  active: this.props.activeTab === "messages",
                  "nav-link": true,
                })}
                onClick={() => {
                  this.toggleAppMenu("messages");
                }}
                to="#"
              >
                <IntlMessages id="chat.messages" />
              </NavLink>
            </NavItem>
            {/* <NavItem className="w-50 text-center">
              <NavLink
                className={classnames({
                  active: this.props.activeTab === "contacts",
                  "nav-link": true,
                })}
                onClick={() => {
                  this.toggleAppMenu("contacts");
                }}
                to="#"
              >
                <IntlMessages id="chat.contacts" />
              </NavLink>
            </NavItem> */}
          </Nav>
        </CardHeader>

        <div className="pt-4 pr-4 pl-4 pb-0">
          <div className="form-group">
            <input
              type="text"
              className="form-control rounded"
              placeholder={messages["menu.search"]}
              value={this.state.searchKey}
              onChange={(e) => this.handleSearchContact(e.target.value)}
            />
          </div>
        </div>

        <TabContent
          activeTab={this.props.activeTab}
          className="chat-app-tab-content"
        >
          <TabPane tabId="messages" className="chat-app-tab-pane">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <div className="pt-2 pr-4 pl-4 pb-2">
                {loadingContacts &&
                  loadingConversations &&
                  conversations.map((item, index) => {
                    const otherUser = allContacts.find(
                      (u) =>
                        u.id === item.users.find((x) => x !== currentUser.id)
                    );
                    return (
                      <div
                        key={index}
                        className="d-flex flex-row mb-1 border-bottom pb-3 mb-3"
                      >
                        <NavLink
                          className="d-flex"
                          to="#"
                          onClick={(e) =>
                            this.handleConversationClick(e, otherUser.id)
                          }
                        >
                          <img
                            alt={otherUser.name}
                            src={otherUser.thumb}
                            className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                          />
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                              <div className="min-width-zero">
                                <p className=" mb-0 truncate">
                                  {otherUser.name}
                                </p>
                                <p className="mb-1 text-muted text-small">
                                  {item.lastMessageTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </PerfectScrollbar>
          </TabPane>
          {/* <TabPane tabId="contacts" className="chat-app-tab-pane">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <div className="pt-2 pr-4 pl-4 pb-2">
                {loadingContacts &&
                  contacts
                    .filter(x => x.id !== currentUser.id)
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex flex-row mb-3 border-bottom pb-3"
                        >
                          <NavLink
                            className="d-flex"
                            to="#"
                            onClick={()=>this.handleContactClick(item.id)}
                          >
                            <img
                              alt={item.name}
                              src={item.thumb}
                              className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                            />
                            <div className="d-flex flex-grow-1 min-width-zero">
                              <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div className="min-width-zero">
                                  <p className="mb-0 truncate">{item.name}</p>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
              </div>
            </PerfectScrollbar>
          </TabPane> */}
        </TabContent>
      </ApplicationMenu>
    );
  }
}

const mapStateToProps = ({ chatApp }) => {
  return { chatApp };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeConversation,
    createConversation,
    searchContact,
  })(ChatApplicationMenu)
);
