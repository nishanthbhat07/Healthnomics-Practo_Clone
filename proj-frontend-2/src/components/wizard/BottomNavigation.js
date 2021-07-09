import React, { Component } from "react";
import { WithWizard } from "react-albus";
import { Button } from "reactstrap";

export class BottomNavigation extends Component {
  render() {
    return (
      <WithWizard
        render={({ next, previous, step, steps }) => (
          <div className={"wizard-buttons " + this.props.className}>
            <Button
              color="primary"
              className={"ml-5 " + (steps.indexOf(step) <= 0 ? "disabled" : "")}
              onClick={() => {
                this.props.onClickPrev(previous, steps, step);
              }}
            >
              {this.props.prevLabel}
            </Button>

            <Button
              color="primary"
              className={
                steps.indexOf(step) >= steps.length - 1 ? "disabled" : ""
              }
              onClick={() => {
                this.props.onClickNext(next, steps, step);
              }}
            >
              {this.props.nextLabel}
            </Button>
          </div>
        )}
      />
    );
  }
}
