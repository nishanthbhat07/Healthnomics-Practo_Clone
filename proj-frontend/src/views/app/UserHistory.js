import React, { Component } from "react";
import { NotificationManager } from "../../components/common/react-notifications";
import HistoryCard from "../../components/cards/HistoryCard";
import { serverURL } from "../../constants/defaultValues";
import { Helmet } from "react-helmet";
export default class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abBookings: [],
      aoBookings: [],
      acBookings: [],
      cbBookings: [],
      coBookings: [],
      ccBookings: [],
      datesAndSlots: [],
    };
    this.fetchAppointments = this.fetchAppointments.bind(this);
    this.fetchConsultation = this.fetchConsultation.bind(this);
    this.showError = this.showError.bind(this);
  }
  showError = (error) => {
    NotificationManager.error("", error, 3000, null, null, "");
  };
  fetchAppointments = async () => {
    fetch(`${serverURL}/users/appointments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        const avalues = Object.values(resp);
        const abb = avalues.filter((item) => item.BookingStatus === "B");
        const aob = avalues.filter((item) => item.BookingStatus === "O");
        const acb = avalues.filter((item) => item.BookingStatus === "C");
        console.log(abb);
        this.setState({
          abBookings: abb,
          aoBookings: aob,
          acBookings: acb,
        });
      })
      .catch((error) => this.showError(error));
  };
  fetchConsultation = async () => {
    fetch(`${serverURL}/users/consultations`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        const cvalues = Object.values(resp);
        const cbb = cvalues.filter(
          (item) => item.BookingStatus === "B" || item.BookingStatus === "S"
        );
        const cob = cvalues.filter((item) => item.BookingStatus === "O");
        const ccb = cvalues.filter((item) => item.BookingStatus === "C");
        this.setState({
          cbBookings: cbb,
          coBookings: cob,
          ccBookings: ccb,
        });
      });
  };
  componentDidMount() {
    this.fetchAppointments();
    setTimeout(() => {
      this.fetchConsultation();
    }, 2000);
  }
  render() {
    return (
      <>
        <Helmet>
          <title>History</title>
        </Helmet>
        <HistoryCard
          abBookings={this.state.abBookings}
          aoBookings={this.state.aoBookings}
          acBookings={this.state.acBookings}
          cbBookings={this.state.cbBookings}
          coBookings={this.state.coBookings}
          ccBookings={this.state.ccBookings}
        />
      </>
    );
  }
}
