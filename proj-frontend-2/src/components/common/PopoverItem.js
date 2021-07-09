import React from "react";
import { Button, Popover, PopoverBody } from "reactstrap";

export class PopoverItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  };

  render() {
    return (
      <span>
        <Button
          className="mr-1 mb-2"
          color="secondary"
          id={"Popover-" + this.props.id}
          onClick={this.toggle}
        >
          {this.props.item.text}
        </Button>
        <Popover
          placement={this.props.item.placement}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverBody>{this.props.item.body}</PopoverBody>
        </Popover>
      </span>
    );
  }
}
export default PopoverItem;
