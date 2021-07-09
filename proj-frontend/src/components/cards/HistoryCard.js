import React from "react";
import { Row, Col, Card, CardBody, Button, CardTitle } from "reactstrap";
import { Separator } from "../common/CustomBootstrap";
import { slots } from "../../data/slots";
import { NotificationManager } from "../common/react-notifications";
import moment from "moment";
import { serverURL } from "../../constants/defaultValues";
const HistoryCard = ({
  abBookings,
  aoBookings,
  acBookings,
  cbBookings,
  coBookings,
  ccBookings,
}) => {
  const showNotification = (msg, choice) => {
    switch (choice) {
      case "success":
        return NotificationManager.success("", msg, 3000, null, null, "");
      case "error":
        return NotificationManager.error("", msg, 3000, null, null, "");
      default:
        return NotificationManager.success("", msg, 3000, null, null, "");
    }
  };
  const cancelAppointment = (AppointmentID) => {
    fetch(`${serverURL}/appointments/cancel`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AppointmentID: AppointmentID,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          showNotification("Cancelled successfully", "success");
          setTimeout(() => {
            window.location.reload(false);
          }, 700);
        }
      })
      .catch((error) => showNotification("error", "error"));
  };
  const cancelConsultation = (ConsultationID) => {
    fetch(`${serverURL}/consultations/cancel`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ConsultationID: ConsultationID,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          showNotification("Cancelled successfully", "success");
          setTimeout(() => {
            window.location.reload(false);
          }, 700);
        }
      })
      .catch((error) => showNotification("error", "error"));
  };
  return (
    <>
      <Card className="mt-5 justify-content-end">
        <CardBody
          style={{ fontSize: 24 }}
          className="justify-content-end d-flex flex-column"
        >
          <CardTitle style={{ padding: 10, fontSize: 36 }}>
            Upcoming Appointments
          </CardTitle>
          <Separator className="mb-5" />
          {abBookings.length
            ? abBookings.map((item) => (
                <>
                  <Row key={item.AppointmentID}>
                    <Col sm={4}>{item.ClinicName}</Col>
                    <Col sm={2}>
                      {moment(item.BookingDay).format("DD/MM/YYYY")}
                    </Col>
                    <Col sm={4}>
                      {slots.filter((i) => i.id === item.BookingTime)[0].slot}
                    </Col>
                    <Col sm={2}>
                      <Button
                        onClick={() => {
                          var confirm = window.confirm("Are you sure?");
                          if (confirm) {
                            cancelAppointment(item.AppointmentID);
                          }
                        }}
                        color="primary"
                        className="btn-shadow mb-5"
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                  <Separator className="mb-4" />
                </>
              ))
            : "No upcoming appointments"}
        </CardBody>
      </Card>
      <Card className="mt-5 justify-content-end">
        <CardBody
          style={{ fontSize: 24 }}
          className="justify-content-end d-flex flex-column"
        >
          <CardTitle style={{ padding: 10, fontSize: 36 }}>
            Upcoming Consultations
          </CardTitle>
          <Separator className="mb-5" />
          {cbBookings.length
            ? cbBookings.map((item) => (
                <>
                  <Row key={item.ConsultationID}>
                    <Col sm={4}>{item.DoctorName}</Col>
                    <Col sm={2}>
                      {moment(item.BookingDay).format("DD/MM/YYYY")}
                    </Col>
                    <Col sm={2}>
                      {slots.filter((i) => i.id === item.BookingTime)[0].slot}
                    </Col>
                    <Col sm={2}>
                      <Button
                        disabled={item.link ? false : true}
                        onClick={() => window.open(item.link, "_blank")}
                        color="primary"
                        className="btn-shadow mb-5"
                      >
                        Join
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button
                        onClick={() => {
                          var confirm = window.confirm("Are you sure?");
                          if (confirm) {
                            cancelConsultation(item.ConsultationID);
                          }
                        }}
                        color="secondary"
                        className="btn-shadow mb-5"
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                  <Separator className="mb-4" />
                </>
              ))
            : "No upcoming Consultation"}
        </CardBody>
      </Card>
      <Card className="mt-5 justify-content-end">
        <CardBody
          style={{ fontSize: 24 }}
          className="justify-content-end d-flex flex-column"
        >
          <CardTitle style={{ padding: 10, fontSize: 36 }}>
            Previous Appointments
          </CardTitle>
          <Separator className="mb-5" />
          {aoBookings.length
            ? aoBookings.map((item) => (
                <>
                  <Row key={item.AppointmentID}>
                    <Col sm={4}>{item.ClinicName}</Col>
                    <Col sm={2}>
                      {moment(item.BookingDay).format("DD/MM/YYYY")}
                    </Col>
                    <Col sm={4}>
                      {slots.filter((i) => i.id === item.BookingTime)[0].slot}
                    </Col>
                  </Row>
                  <Separator className="mb-4" />
                </>
              ))
            : "No previous appointments"}
        </CardBody>
      </Card>
      <Card className="mt-5 justify-content-end">
        <CardBody
          style={{ fontSize: 24 }}
          className="justify-content-end d-flex flex-column"
        >
          <CardTitle style={{ padding: 10, fontSize: 36 }}>
            Previous Consulations
          </CardTitle>
          <Separator className="mb-5" />
          {coBookings.length
            ? coBookings.map((item) => (
                <>
                  <Row key={item.ConsultationID} className="mb-3">
                    <Col sm={4}>{item.DoctorName}</Col>
                    <Col sm={2}>
                      {moment(item.BookingDay).format("DD/MM/YYYY")}
                    </Col>
                    <Col sm={4}>
                      {slots.filter((i) => i.id === item.BookingTime)[0].slot}
                    </Col>
                  </Row>
                  <Separator className="mb-4" />
                </>
              ))
            : "No previous Consultation"}
        </CardBody>
      </Card>
      <Card className="mt-5 justify-content-end">
        <CardBody
          style={{ fontSize: 24 }}
          className="justify-content-end d-flex flex-column"
        >
          <CardTitle style={{ padding: 10, fontSize: 36 }}>
            Canceled Appointments
          </CardTitle>
          <Separator className="mb-5" />
          {acBookings.length
            ? acBookings.map((item) => (
                <>
                  <Row key={item.AppointmentID} className="mb-3">
                    <Col sm={4}>{item.ClinicName}</Col>
                    <Col sm={2}>
                      {moment(item.BookingDay).format("DD/MM/YYYY")}
                    </Col>
                    <Col sm={4}>
                      {slots.filter((i) => i.id === item.BookingTime)[0].slot}
                    </Col>
                  </Row>
                  <Separator className="mb-4" />
                </>
              ))
            : `No cancelation found`}
        </CardBody>
      </Card>
      <Card className="mt-5 justify-content-end">
        <CardBody
          style={{ fontSize: 24 }}
          className="justify-content-end d-flex flex-column"
        >
          <CardTitle style={{ padding: 10, fontSize: 36 }}>
            Canceled Consulations
          </CardTitle>
          <Separator className="mb-5" />

          {ccBookings.length
            ? ccBookings.map((item) => (
                <>
                  <Row key={item.ConsultationID}>
                    <Col sm={4}>{item.DoctorName}</Col>
                    <Col sm={2}>
                      {moment(item.BookingDay).format("DD/MM/YYYY")}
                    </Col>
                    <Col sm={4}>
                      {slots.filter((i) => i.id === item.BookingTime)[0].slot}
                    </Col>
                  </Row>
                  <Separator className="mb-4" />
                </>
              ))
            : "No cancelation found"}
        </CardBody>
      </Card>
    </>
  );
};

export default HistoryCard;
