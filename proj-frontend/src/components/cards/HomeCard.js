import React from "react";
import { Row, Card, CardBody, CardSubtitle } from "reactstrap";
import ThumbnailImage from "./ThumbnailImage";
const HomeCard = ({ content, image, history, type }) => (
  <Card
    style={{ cursor: "pointer" }}
    onClick={() => {
      if (type === "OC") history.push("/app/second-menu/second");
      else if (type === "VC") history.push("/app/dashboard/start");
    }}
  >
    <CardBody>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="col" style={{ width: "45%", height: "25%" }}>
          <ThumbnailImage src={image} alt={content} className="m-4" />
        </div>

        <div
          className="col truncate mb-1"
          style={{
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "center",
            display: "flex",
            lineHeight: 4,
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {content}
        </div>
      </Row>
    </CardBody>
  </Card>
);
export default HomeCard;
