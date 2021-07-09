import React, { Component }  from "react";
import { NavLink } from "react-router-dom";
import SingleLightbox from "../../components/pages/SingleLightbox";
import IntlMessages from "../../helpers/IntlMessages";

class UserFollow extends Component {

    render() {
        return (
            <div className="d-flex flex-row mb-3 pb-3 border-bottom justify-content-between align-items-center">
                <SingleLightbox thumb={this.props.data.thumb} large={this.props.data.large} className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                <div className="pl-3 flex-fill">
                    <NavLink to="#">
                        <p className="font-weight-medium mb-0">{this.props.data.name}</p>
                        <p className="text-muted mb-0 text-small">{this.props.data.status}</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="btn btn-outline-primary btn-xs" to="#"><IntlMessages id="pages.follow" /></NavLink>
                </div>
            </div>
        );
    }
}

export default UserFollow;