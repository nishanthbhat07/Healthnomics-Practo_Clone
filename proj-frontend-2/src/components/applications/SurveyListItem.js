import React from "react";
import { Card, CardBody, Badge, CustomInput } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../common/CustomBootstrap";

const SurveyListItem = ({ item, handleCheckChange, isSelected }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex flex-row mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to={`/app/applications/survey/${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <i
                className={`${
                  item.status === "COMPLETED"
                    ? "simple-icon-check heading-icon"
                    : "simple-icon-refresh heading-icon"
                }`}
              />
              <span className="align-middle d-inline-block">{item.title}</span>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.category}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.createDate}
            </p>
            <div className="w-15 w-xs-100">
              <Badge color={item.labelColor} pill>
                {item.label}
              </Badge>
            </div>
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item.id}`}
              checked={isSelected}
              onChange={event => handleCheckChange(event, item.id)}
              label=""
            />
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(SurveyListItem);
