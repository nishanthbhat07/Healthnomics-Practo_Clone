import React, { Component, Fragment }  from "react";
import { NavLink } from "react-router-dom";
import Lightbox from 'react-image-lightbox';

class SingleLightbox extends Component {

    constructor(props) {
        super(props);
        this.onThumbClick = this.onThumbClick.bind(this);
        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
      }

      onThumbClick() {
        this.setState({ isOpen: true });
    }


    render() {
        const { isOpen } = this.state;
        return (
            <Fragment>
                <NavLink to="#" onClick={() => this.onThumbClick()}>
                    <img src={this.props.thumb} alt="thumbnail" className={this.props.className}/>
                </NavLink>

                {isOpen && (
                    <Lightbox
                        mainSrc={this.props.large}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </Fragment>
        );
    }
}

export default SingleLightbox;