import React, { Component } from "react";

import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardSubtitle } from "reactstrap";
import ThumbnailImage from "./ThumbnailImage";
import { Separator } from "../common/CustomBootstrap";
class SASCard extends Component {
  render() {
    return (
      <Card
        onClick={() => {
          const urlparams =
            this.props.data.name === "General Physician"
              ? "Physician"
              : this.props.data.name === "Gynecologist/Obstetrician"
              ? "Gynecologist_Obstetrician"
              : this.props.data.name;
          if (
            this.props.history.location.pathname === "/app/second-menu/second"
          ) {
            this.props.history.push(
              `/app/show-doctors-clinics/consult/online/${urlparams.toLowerCase()}`
            );
          } else {
            this.props.history.push(
              `/app/show-doctors-clinics/${localStorage
                .getItem("location_region")
                .toLowerCase()}/${urlparams.toLowerCase()}`
            );
          }
        }}
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

export default injectIntl(SASCard);
