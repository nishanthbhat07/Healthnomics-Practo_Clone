import React, { Component, Fragment } from "react";
import { Row, Tooltip } from "reactstrap";
import { Helmet } from "react-helmet";
import { Separator } from "../../../components/common/CustomBootstrap";

import { speciality_data } from "../../../data/specality";
import SASCard from "../../../components/cards/SASCard";
import { LocationModal } from "./location";
export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      state:
        localStorage.getItem("location_state") &&
        localStorage.getItem("location_region")
          ? localStorage.getItem("location_state")
          : "Maharashtra",
      region:
        localStorage.getItem("location_state") &&
        localStorage.getItem("location_region")
          ? localStorage.getItem("location_region")
          : "Pune",
      tooltipOpen: false,
    };
    this.onClick = this.onClick.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  toggle = () => {
    this.setState((prevState) => ({
      tooltipOpen: !prevState.tooltipOpen,
    }));
  };

  showModal = () => {
    this.setState({ open: !this.state.open });
  };
  setStateVal = (val) => {
    this.setState({ state: val });
  };
  setRegion = (val) => {
    this.setState({ region: val });
  };
  onClick = () => {
    localStorage.setItem("location_region", this.state.region);
    localStorage.setItem("location_state", this.state.state);
  };
  search = () => {
    if (window.event.key === "Enter") {
      if (localStorage.getItem("location_region")) {
        this.props.history.push(
          `/app/show-doctors-clinics/${this.state.region.toLowerCase()}/${
            this.searchKey.value
          }`
        );
      } else {
        this.showModal();
      }
    }
  };
  componentDidMount() {
    if (!localStorage.getItem("location_region")) {
      this.showModal();
    }
  }
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
            placeholder="Search by doctors or clinics"
            ref={(input) => (this.searchKey = input)}
            onKeyPress={() => this.search()}
          />
        </div>
        <i
          onClick={() => {
            localStorage.removeItem("location_region");
            localStorage.removeItem("location_state");
            this.showModal();
          }}
          id="Tooltip"
          className="iconsminds-location-2"
          style={{ float: "right", fontSize: 28, cursor: "pointer" }}
        >
          <Tooltip
            placement="top"
            isOpen={this.state.tooltipOpen}
            target={"Tooltip"}
            toggle={this.toggle}
          >
            Change Location
          </Tooltip>
        </i>
        <Separator className="mb-5 mt-5" />
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {speciality_data.map((item) => (
            <Row
              key={item.id}
              className="flex-wrap"
              style={{
                padding: 25,
                marginRight: 20,
                alignContent: "space-between",
              }}
            >
              <SASCard
                history={this.props.history}
                showModal={this.showModal}
                data={{
                  name: item.name,
                  thumb: item.img,
                }}
              />
            </Row>
          ))}
        </Row>

        <LocationModal
          open={this.state.open}
          state={this.state.state}
          region={this.state.region}
          setRegion={this.setRegion}
          setStateVal={this.setStateVal}
          showModal={this.showModal}
          onClick={this.onClick}
        />
      </Fragment>
    );
  }
}
