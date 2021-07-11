import React, { useState } from "react";
import { Row, Col, Card, CardBody, Button, Input, CardTitle } from "reactstrap";
import { Separator } from "../common/CustomBootstrap";
const MyAccountCard = ({
  name,
  email,
  phno,
  age,
  handleChange,
  history,
  updateUserDetails,
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <Card className="mt-5 justify-content-end">
      <CardBody
        style={{ fontSize: 24 }}
        className="justify-content-end d-flex flex-column"
      >
        <CardTitle style={{ padding: 10, fontSize: 36 }}> My Details</CardTitle>
        <Separator className="mb-5" />
        <Row>
          <Col sm={{ offset: 10, size: 1 }}>
            <i
              className="simple-icon-pencil"
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(!edit)}
            />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm={{ offset: 2, size: 4 }}>Name</Col>
          <Col sm={6}>
            {edit ? (
              <Input
                name="name"
                onChange={handleChange}
                type="text"
                value={name}
              />
            ) : (
              name
            )}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm={{ offset: 2, size: 4 }}>Email</Col>
          <Col sm={6}>
            {edit ? (
              <Input
                name="email"
                onChange={handleChange}
                type="email"
                value={email}
              />
            ) : (
              email
            )}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm={{ offset: 2, size: 4 }}>Phone Number</Col>
          <Col sm={6}>
            {edit ? (
              <Input
                name="phno"
                onChange={handleChange}
                type="tel"
                value={phno}
              />
            ) : (
              phno
            )}
          </Col>
        </Row>

        <Row className="mb-5">
          <Col sm={{ offset: 2, size: 4 }}>Age</Col>
          <Col sm={6}>
            {edit ? (
              <Input
                name="age"
                onChange={handleChange}
                type="text"
                value={age}
              />
            ) : (
              age
            )}
          </Col>
        </Row>

        <Row>
          <Col sm={{ size: 2 }}>
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state`}
              size="lg"
              onClick={() => history.push("/")}
            >
              Back to Home
            </Button>
          </Col>
          {edit ? (
            <Col sm={{ offset: 8, size: 2 }}>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  color="primary"
                  className={`btn-shadow btn-multiple-state`}
                  size="lg"
                  onClick={() => {
                    updateUserDetails();
                    setEdit(!edit);
                  }}
                >
                  Save
                </Button>
              </div>
            </Col>
          ) : null}
        </Row>
      </CardBody>
    </Card>
  );
};
export default MyAccountCard;
