import React from "react";
import { Card, CardBody } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const IconCard = ({className="mb-4", icon, title, value }) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card >
        <CardBody className="text-center">
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">
            <IntlMessages id={title} />
          </p>
          <p className="lead text-center">{value}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default IconCard;