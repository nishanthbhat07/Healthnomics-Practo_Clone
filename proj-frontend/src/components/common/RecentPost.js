import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Badge } from "reactstrap"

class RecentPost extends Component {
    render() {
        return (
            <div className="d-flex flex-row mb-3">
                <NavLink className="d-block position-relative" to="#">
                    <img src={this.props.data.thumb} alt="thumbnail" className="list-thumbnail border-0" />
                    {this.props.data.badge !== "" && <Badge color="primary" pill className="position-absolute badge-top-left">{this.props.data.badge}</Badge>}
                </NavLink>
                <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink className="d-block position-relative" to="#">
                        <p className="list-item-heading">{this.props.data.title}</p>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default injectIntl(RecentPost);