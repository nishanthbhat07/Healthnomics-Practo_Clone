import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
    Button,
    UncontrolledCollapse
  } from "reactstrap";
class QuestionAnswer extends Component {

    constructor(props) {
        super(props);
        this.getLikeLabel = this.getLikeLabel.bind(this);
    }

    getLikeLabel(likeCount) {
        if (likeCount === 1) {
            return this.props.intl.messages["pages.like"]
        } else {
            return this.props.intl.messages["pages.likes"]
        }
    }

    render() {
        return (
            <div>
                <Button
                    className="p-0 pb-2 font-weight-bold"
                    color="link"
                    id={this.props.data.key}>
                    <p className="mb-2">{this.props.data.question}</p>
                </Button>
                <UncontrolledCollapse toggler={"#" + this.props.data.key}>
                    <div className="pb-4">
                        {this.props.data.answer}
                    </div>
                </UncontrolledCollapse>
            </div>
        );
    }
}

export default injectIntl(QuestionAnswer);