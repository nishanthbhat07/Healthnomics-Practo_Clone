import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
class UserCardBasic extends Component {
  render() {
    return (
      <Card
        onClick={() =>
          this.props.history.push(
            `/app/show-doctors-clinics/${localStorage
              .getItem("location")
              .toLowerCase()}/${this.props.data.name.toLowerCase()}`
          )
        }
        className="d-flex flex-row mb-4"
        style={{
          cursor: "pointer",
          width: "350px",
          height: "270px",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div className=" d-flex flex-grow-1 min-width-zero">
          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <Row
              style={{
                marginLeft: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ThumbnailImage
                src={this.props.data.thumb}
                alt={this.props.data.name}
                className="m-4"
              />
              <Separator className="mb-2 ml-2" />

              <CardSubtitle
                className="truncate mb-1"
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  textAlign: "center",
                }}
              >
                {this.props.data.name}
              </CardSubtitle>
            </Row>
          </CardBody>
        </div>
      </Card>
    );
  }
}

export default injectIntl(UserCardBasic);
