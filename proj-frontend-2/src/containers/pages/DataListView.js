import React from "react";
import {
  Card,
  Row,
  Col,
  CardText,
  CardBody,
  Button,
  CustomInput,
  Badge,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import moment from "moment";
import { slots } from "../../data/slots";
const DataListView = ({ item, history }) => {
  // console.log(item);
  var time = slots.filter((sl) => sl.id == item.BookingTime)[0].slot;

  return (
    <Colxx xxs="12" className="mb-3" key={item.ConsultationID}>
      <Card>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <CardBody className="card-body align-self-center  flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <Row>
              <Col sm={3}>
                <CardText>{item.Username}</CardText>
              </Col>
              <Col sm={3}>
                <CardText>
                  {moment(item.BookingDay).format("DD-MM-YYYY")}
                </CardText>
              </Col>
              <Col sm={3}>
                <CardText>{time}</CardText>
              </Col>
              <Col sm={{ offset: 1, size: 2 }}>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() =>
                    history.push(
                      `/doctors/app/online-consultation/${item.ConsultationID}`
                    )
                  }
                >
                  Start
                </Button>
              </Col>
            </Row>
          </CardBody>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(DataListView);
