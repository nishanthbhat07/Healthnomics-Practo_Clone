import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, Jumbotron, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Logo from "./Healthnomics.png";
import HomeCard from "../../../components/cards/HomeCard";
import OC from "./oc.png";
import VC from "./vc.png";

export default class HomeUi extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <Jumbotron>
                  <img
                    style={{ width: "100%", height: "500px", borderRadius: 7 }}
                    src={Logo}
                    alt="Healthnomics"
                  />

                  <hr className="my-4" />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Col className="col">
                      <HomeCard
                        history={this.props.history}
                        type={"OC"}
                        content={"Consult Doctors Online"}
                        image={OC}
                      />
                    </Col>
                    <Col className="col">
                      <HomeCard
                        history={this.props.history}
                        type={"VC"}
                        content={"Find Clinics near you"}
                        image={VC}
                      />
                    </Col>
                  </div>
                </Jumbotron>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
