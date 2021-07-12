import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, Col, Input, CardText, Button } from "reactstrap";
import { slots } from "../../data/slots";
import { symptoms } from "../../data/symptoms";
import { NotificationManager } from "../common/react-notifications";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
import { RenderSlots } from "../../views/app/see-doctors-clinics/RenderSlots";
import RatingComponent from "../../components/common/Rating";
import { Wizard, Steps, Step } from "react-albus";
import { BottomNavigation } from "../wizard/BottomNavigation";
import { serverURL } from "../../constants/defaultValues";
import StripeCheckout from "react-stripe-checkout";
import { Helmet } from "react-helmet";
import Logo from "./logo-trial-3.png";
class ConsultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      radioValue: "",
      date: new Date(),
    };

    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showNoti = this.showNoti.bind(this);
    this.bookAppointment = this.bookAppointment.bind(this);
    this.checkSlot = this.checkSlot.bind(this);
    this.showWarnNoti = this.showWarnNoti.bind(this);
    this.onToken = this.onToken.bind(this);
  }
  onChange = (e) => {
    // alert(e.currentTarget.value);
    this.setState({ radioValue: e.currentTarget.value });
  };
  showModal = () => {
    this.setState({ open: !this.state.open });
  };
  topNavClick(stepItem, push) {
    push(stepItem.id);
  }
  showNoti = (msg) => {
    NotificationManager.error("", msg, 3000, null, null, "");
  };
  showWarnNoti = (msg) => {
    // console.log(msg);

    NotificationManager.warning("", msg, 3000, null, null, "");
  };
  showBookNotification = () => {
    NotificationManager.success(
      "",
      `Booking for ${this.state.date} is confirmed`,
      3000,
      null,
      null,
      ""
    );
  };
  bookAppointment = () => {
    const selectedSlot = slots.filter(
      (item) => item.slot === this.state.radioValue
    );
    const splData = symptoms.filter(
      (item) => item.name.toLowerCase() === this.props.parameter
    );

    var today = new Date();
    var dayDiff = new Date(this.state.date).getDate() - today.getDate();
    fetch(`${serverURL}/consultations/bookslot`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SymptomID: splData[0].id,
        UserID: localStorage.getItem("user_id"),
        DoctorID: this.props.item.DoctorID,
        DateDiff: dayDiff,
        TimeSlot: selectedSlot[0].id,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp) {
          this.showModal();
          this.showBookNotification();
        }
      });
  };

  checkSlot = () => {
    if (this.state.date && this.state.radioValue) {
      var today = new Date();
      var monthDiff = new Date(this.state.date).getMonth() - today.getMonth();
      var dayDiff = new Date(this.state.date).getDate() - today.getDate();
      const selectedSlot = slots.filter(
        (item) => item.slot === this.state.radioValue
      );
      if (dayDiff > 7) {
        this.showNoti("Advanced booking for more than 7 days not allowed");
      } else {
        if (monthDiff !== 0) {
          this.showNoti("Advanced booking for more than 7 days not allowed");
        } else {
          fetch(`${serverURL}/consultations/checkslot`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              DoctorID: this.props.item.DoctorID,
              DateDiff: dayDiff,
              TimeSlot: selectedSlot[0].id,
            }),
          })
            .then((res) => res.json())
            .then((resp) => {
              if (resp.SlotAvailable) {
                this.showModal();
              } else {
                this.showWarnNoti("Please choose another slot");
              }
            });
        }
      }
      // console.log(localStorage.getItem("user_id"));
    } else {
      this.showNoti("Please select date and slot");
    }
  };

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  }
  onToken = (token) => {
    console.log(token);
    this.bookAppointment();
  };
  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }
  render() {
    const { DoctorName, DoctorID, Rating, MinMaxCost, image_url, PhoneNumber } =
      this.props.item;
    var price = MinMaxCost.split("|");
    var priceForStripeConv = 100;
    const priceForStripe = priceForStripeConv * 100;
    const publishableKey =
      "pk_test_51HojBHDpfvzgJR4pXFOGRvutxEvv5tUs2z61xMMxhFkMlyqlpQ8zmwPOLiixRqmf3x0ygs71SWxkpbldhiH18t4800Am9RBDzh";
    return (
      <>
        <Card className=" d-flex flex-row mb-4" key={DoctorID}>
          <div className=" d-flex flex-grow-1 min-width-zero">
            <CardBody className=" pl-0 align-self-center  flex-sm-row ">
              <Wizard>
                <Steps>
                  <Step id="step1" name={"Step 1"} desc={"BLAH"}>
                    <div className="wizard-basic-step ">
                      <Row>
                        <Col sm={3} md={3} lg={4} className="offset-1">
                          <div style={{ height: "15vh", width: "20vw" }}>
                            <ThumbnailImage
                              src={image_url}
                              alt={"dummy"}
                              className="m-4"
                              small={true}
                            />
                          </div>
                        </Col>

                        <Col
                          sm={7}
                          md={7}
                          lg={6}
                          style={{
                            fontSize: 24,
                          }}
                        >
                          <Row style={{ padding: 10, fontSize: 24 }}>
                            <Col sm={9}>
                              <CardText
                                style={{ fontWeight: "bolder", fontSize: 28 }}
                              >
                                {DoctorName}
                              </CardText>
                            </Col>
                          </Row>

                          <Row style={{ padding: 10, fontSize: 24 }}>
                            <i className="iconsminds-telephone-2" />

                            <Col sm={9} className="mt-2 ml-4">
                              <CardText>{PhoneNumber}</CardText>
                            </Col>
                          </Row>

                          <Row style={{ padding: 10, fontSize: 24 }}>
                            <i className="simple-icon-like" />
                            <Col sm={6} className="mt-2 ml-4">
                              <RatingComponent
                                total={5}
                                rating={Rating}
                                interactive={false}
                              />
                            </Col>
                          </Row>
                          <Row style={{ padding: 10, fontSize: 24 }}>
                            <i
                              className="iconsminds-coins"
                              style={{ width: 10, height: 10 }}
                            />
                            <Col className="mt-2 ml-5">
                              <CardText>{`₹${price[0]} - ${price[1]}`}</CardText>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Step>
                  <Step
                    id="step2"
                    name={"wizard.step-name-2"}
                    desc={"wizard.step-desc-2"}
                  >
                    <div
                      className="wizard-basic-step "
                      style={{ margin: 10, padding: 5, fontSize: 24 }}
                    >
                      <Row className="mb-5">
                        <Col sm={{ offset: 1, size: 4 }}>Select Date</Col>
                        <Col sm={6}>
                          <Input
                            name="date"
                            type="date"
                            value={this.state.date}
                            onChange={(e) =>
                              this.setState({ date: e.target.value })
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-5">
                        <Col sm={{ offset: 1, size: 4 }} className="mb-2">
                          Select Slot
                        </Col>
                        <Col sm={12}>
                          <RenderSlots
                            onChange={this.onChange}
                            radioValue={this.state.radioValue}
                          />
                        </Col>
                      </Row>
                      {this.state.open ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                          className="d-flex justify-content-end align-items-center"
                        >
                          <Helmet>
                            <title>Pay</title>
                          </Helmet>
                          <StripeCheckout
                            stripeKey={publishableKey}
                            name="HEALTHNOMICS"
                            allowRememberMe
                            label="Pay Now"
                            billingAddress={false}
                            shippingAddress={false}
                            image={Logo}
                            currency="INR"
                            description={`Your total is Rs.${priceForStripeConv}`}
                            amount={priceForStripe}
                            panelLabel="Pay Now"
                            token={this.onToken}
                          >
                            <div className="d-flex justify-content-end align-items-center">
                              <Button color="primary" className="btn-shadow">
                                Click Here to Pay!
                              </Button>
                            </div>
                          </StripeCheckout>
                          <div className="d-flex justify-content-end align-items-center">
                            <Button
                              color="secondary"
                              className="btn-shadow"
                              onClick={() => this.setState({ open: false })}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : null}
                      {!this.state.open ? (
                        <div className="d-flex justify-content-end align-items-center">
                          <Button
                            onClick={() => this.checkSlot()}
                            color="primary"
                            className="btn-shadow"
                          >
                            BOOK APPOINTMENT
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </Step>
                </Steps>

                <BottomNavigation
                  onClickNext={this.onClickNext}
                  onClickPrev={this.onClickPrev}
                  className="justify-content-between"
                  prevLabel={"Back"}
                  nextLabel={"Next"}
                />
              </Wizard>
            </CardBody>
          </div>
        </Card>
      </>
    );
  }
}

export default injectIntl(ConsultCard);
