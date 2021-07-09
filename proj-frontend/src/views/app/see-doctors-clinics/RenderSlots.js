import React from "react";
import { Col, Button } from "reactstrap";

import { slots } from "../../../data/slots";
export const RenderSlots = ({ onChange, radioValue }) => {
  return (
    <Col sm={12} style={{ margin: 5 }}>
      {slots.map((sl) => (
        <Button
          outline
          style={{ margin: 5 }}
          key={sl.id}
          size="md"
          variant="primary"
          name="radio"
          active={radioValue === sl.slot}
          value={sl.slot}
          checked={radioValue === sl.slot}
          onClick={(e) => onChange(e)}
        >
          {sl.slot}
        </Button>
      ))}
    </Col>
  );
};
