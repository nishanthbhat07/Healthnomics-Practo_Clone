import React from "react";
import { Progress } from "reactstrap";

const SurveyQuota = ({
  title = "Gender",
  data = [
    { title: "Male", count: 105, quota: 125 },
    { title: "Female", count: 90, quota: 125 }
  ]
}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalCount = data.map(x => x.count).reduce(reducer);
  
  return (
    <div className="mb-4">
      <p className="mb-2">{title}</p>
      <Progress multi className="mb-3">
        {data.map((item, index) => {
          return (
            <Progress
              key={`survey_progress_${index}`}
              bar
              color={`theme-${index + 1}`}
              value={(item.count / totalCount) * 100}
            />
          );
        })}
      </Progress>
      <table className="table table-sm table-borderless">
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={`survey_data_${index}`}>
                <td className="p-0 pb-1 w-10">
                  <span
                    className={`log-indicator border-theme-${index +
                      1} align-middle`}
                  />
                </td>
                <td className="p-0 pb-1">
                  <span className="font-weight-medium text-muted text-small">{`${
                    item.count
                  }/${item.quota} ${item.title}`}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyQuota;
