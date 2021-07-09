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
import { useHistory } from "react-router-dom";
import { Separator } from "../../../components/common/CustomBootstrap";
import Jitsi from "react-jitsi";
import { Helmet } from "react-helmet";
const VideoConf = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [roomName, setRoomName] = useState("");
  const history = useHistory();
  const [onCall, setOnCall] = useState(false);
  const [showIFrame, setIFrame] = useState(false);
  const [url, setURL] = useState("");
  const handleSend = () => {
    //     fetch("/employer/send-invite-over-mail", {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/json",
    //
    //       },
    //       body: JSON.stringify({
    //         url,
    //         _id: this.props.match.params.detID,
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         alert(data.message);
    //       });
    //   };
  };
  const handleAPI = (JitsiMeetAPI) => {
    setURL(JitsiMeetAPI._url);
    setIFrame(!showIFrame);
    console.log("Herre!!!!!!!!!!!!!!!!");
    fetch("/employer/start-interview/provide-link", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        _id: props.match.params.detID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          alert(data.message);
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
              {onCall ? (
                <>
                  <CardHeader
                    style={{
                      paddingBottom: 25,

                      fontSize: 24,
                      fontWeight: "bold",
                      opacity: 1,
                    }}
                  >
                    {roomName}
                  </CardHeader>
                  <Separator className="mb-5" />
                  <Row>
                    <Col sm={6}>
                      <Jitsi
                        containerStyle={{
                          width: "800px",
                          height: "500px",

                          marginLeft: "20%",
                          padding: 35,

                          marginRight: "5%",
                        }}
                        roomName={roomName}
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
                          onClick={() => handleSend}
                          style={{ marginTop: 40 }}
                          className="btn-shadow"
                          size="lg"
                        >
                          Send invite Via Mail
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <CardHeader
                    style={{
                      paddingBottom: 25,

                      fontSize: 24,
                      fontWeight: "bold",
                      opacity: 1,
                    }}
                  >
                    Create Meeting
                  </CardHeader>
                  <Separator className="mb-5" />
                  <Row style={{ padding: 20, margin: 20 }}>
                    <Label style={{ fontSize: 24 }}>Room Name</Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: 20, margin: 20 }}>
                    <Label style={{ fontSize: 24 }}>Your Name</Label>
                    <Col sm={6}>
                      <Input
                        style={{ marginLeft: 20 }}
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <div
                    style={{
                      padding: 5,
                      marginLeft: 5,
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={() => setOnCall(true)}
                      style={{ marginTop: 40 }}
                      className="btn-shadow"
                      size="lg"
                    >
                      Let&apos;s start!
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardBody>
        </div>
      </Card>
    </Fragment>
  );
};
export default VideoConf;
