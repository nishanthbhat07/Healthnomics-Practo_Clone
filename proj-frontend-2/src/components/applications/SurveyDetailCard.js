import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";

const SurveyDetailCard = ({ survey }) => {
  return (
    <Colxx xxs="12" lg="4" className="mb-4">
      <Card className="mb-4">
        <CardBody>
          <p className="list-item-heading mb-4">Summary</p>
          <p className="text-muted text-small mb-2">Name</p>
          <p className="mb-3">{survey.title}</p>

          <p className="text-muted text-small mb-2">Details</p>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: survey.detail
            }}
          />

          <p className="text-muted text-small mb-2">Category</p>
          <p className="mb-3">{survey.category}</p>

          <p className="text-muted text-small mb-2">Label</p>
          <div>
            <p className="d-sm-inline-block mb-1">
              <Badge color={survey.labelColor} pill>
                {survey.label}
              </Badge>
            </p>
            <p className="d-sm-inline-block  mb-1" />
          </div>
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default SurveyDetailCard;
