import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Separator } from "../../../components/common/CustomBootstrap";
import { symptoms } from "../../../data/symptoms";
import SASCard from "../../../components/cards/SASCard";
import { Helmet } from "react-helmet";
export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  showModal = () => {
    this.setState({ open: !this.state.open });
  };
  search = () => {
    if (window.event.key === "Enter") {
      this.props.history.push(
        `/app/show-doctors-clinics/consult/online/${this.searchKey.value}`
      );
    }
  };
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="search-lg d-inline-block  mr-5 mt-4 mb-1">
          <input
            type="text"
            name="keyword"
            id="search"
            placeholder="Search symptoms"
            ref={(input) => (this.searchKey = input)}
            onKeyPress={() => this.search()}
          />
        </div>
        <Separator className="mb-5 mt-5" />
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {symptoms.map((item) => (
            <Row
              className="flex-wrap"
              style={{
                padding: 25,
                marginRight: 20,
                alignContent: "space-between",
              }}
            >
              <SASCard
                data={{
                  name: item.name,
                  thumb: item.img,
                }}
                history={this.props.history}
              />
            </Row>
          ))}
        </Row>
      </Fragment>
    );
  }
}
