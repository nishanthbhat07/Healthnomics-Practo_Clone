import React, { Component, Fragment } from "react";
import { serverURL } from "../../../constants/defaultValues";
import DataListView from "../../../containers/pages/DataListView";
import { Helmet } from "react-helmet";
const doctorsUID = [
  {
    DoctorID: "68",
    FirebaseID: "5JvLYrTm2AddppRtfVdBN4zai1r1",
  },
  {
    DoctorID: "30",
    FirebaseID: "HRd0d3KONoYr37AGHFcuhIxdPY33",
  },
  {
    DoctorID: "170",
    FirebaseID: "BOHIavwCRMhvZrJu7ZlJ6m8Qg8B3",
  },
  {
    DoctorID: "86",
    FirebaseID: "oODGP1jt8Vapjwo6lhw1674iCpH3",
  },
  {
    DoctorID: "31",
    FirebaseID: "KAznpwxQWKe2r8DI5VW7wDI0Hr92",
  },
  {
    DoctorID: "111",
    FirebaseID: "Za2f8Jd7paZYESWXv44WXoB7dAt1",
  },
];
export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const doc = doctorsUID.filter(
      (el) => el.FirebaseID === localStorage.getItem("user_id")
    );
    fetch(`${serverURL}/doctors/consultations`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DoctorID: doc[0].DoctorID,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        const temp = Object.values(resp);
        const t = temp.filter(
          (el) => el.BookingStatus === "B" || el.BookingStatus === "S"
        );
        this.setState({ data: t });
      })
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>
        {this.state.data ? (
          this.state.data
            .reverse()
            .map((item) => (
              <DataListView item={item} history={this.props.history} />
            ))
        ) : (
          <div className="loading"></div>
        )}
      </Fragment>
    );
  }
}
// localStorage.getItem("user_id")
