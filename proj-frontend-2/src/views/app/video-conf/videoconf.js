import React, { useState, Fragment } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  CardHeader,
  Button,
} from "reactstrap";

import { serverURL } from "../../../constants/defaultValues";
import { Separator } from "../../../components/common/CustomBootstrap";
import Jitsi from "react-jitsi";
import { Helmet } from "react-helmet";
import { NotificationManager } from "../../../components/common/react-notifications";
const VideoConf = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [showIFrame, setIFrame] = useState(false);
  const [url, setURL] = useState("");

  const endMeeting = () => {
    fetch(`${serverURL}/consultations/setlink`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ConsultationID: props.match.params.consultationID,
        link: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          props.history.push("/doctors/app");
        }
      });
  };

  const handleAPI = (JitsiMeetAPI) => {
    setURL(JitsiMeetAPI._url);
    setIFrame(!showIFrame);
    fetch(`${serverURL}/consultations/setlink`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ConsultationID: props.match.params.consultationID,
        link: `https://meet.jit.si/${localStorage.getItem("user_id")}-${
          props.match.params.consultationID
        }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          NotificationManager.success(
            "",
            "Link sent successfull",
            3000,
            null,
            null,
            ""
          );
        }
      });
  };
  return (
    <Fragment>
      <Helmet>
        <title>Meeting</title>
      </Helmet>

      <Card className="d-flex flex-row mb-4">
        <div className=" d-flex flex-grow-1 min-width-zero">
          <CardBody className="flex-lg-row justify-content-between min-width-zero">
            <div className="min-width-zero">
              <>
                <Row>
                  <Col sm={6}>
                    <Jitsi
                      containerStyle={{
                        width: "1200px",
                        height: "762px",
                        border: "1px solid white",
                        padding: 35,

                        marginRight: "5%",
                      }}
                      roomName={`${localStorage.getItem("user_id")}-${
                        props.match.params.consultationID
                      }`}
                      displayName={displayName}
                      frameStyle={{
                        display: !showIFrame ? "none" : "block",
                        width: "100%",
                        height: "100% ",
                        alignContent: "center",
                      }}
                      onAPILoad={handleAPI}
                    />
                    <div
                      style={{
                        padding: 5,
                        marginLeft: 5,
                      }}
                    >
                      <Button
                        color="primary"
                        onClick={() => endMeeting()}
                        style={{ marginTop: 40 }}
                        className="btn-shadow"
                        size="lg"
                      >
                        End Meeting
                      </Button>
                    </div>
                  </Col>
                </Row>
              </>
            </div>
          </CardBody>
        </div>
      </Card>
    </Fragment>
  );
};
export default VideoConf;
