import React, { Component } from "react";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { Tooltip } from "reactstrap";

import { defaultColor,themeColorStorageKey } from "../../constants/defaultValues";

export default class TopnavDarkSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchChecked: false,
      tooltipOpen: false
    };
  }
  componentDidMount(){
      const color = this.getColor();
          this.setState({
            switchChecked:color.indexOf('dark')>-1
          })
  }

  toggle = () => {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
  };

  getColor = () => {
    return localStorage.getItem(themeColorStorageKey)
      ? localStorage.getItem(themeColorStorageKey)
      : defaultColor;
  };
  changeMode = () => {
    let color = this.getColor();

    if(color.indexOf('dark')>-1){
        color= color.replace('dark','light')
    }else if(color.indexOf('light')>-1){
        color= color.replace('light','dark')
    }

    this.setState({
        switchChecked:color.indexOf('dark')>-1
      },()=>{
          localStorage.setItem(themeColorStorageKey,color)
        setTimeout(() => {
            window.location.reload();
          }, 500);
      })
  };

  render() {
    return (
      <div className="d-none d-md-inline-block align-middle mr-3">
        <Switch
          id="Tooltip-Switch"
          className="custom-switch custom-switch-primary custom-switch-small"
          checked={this.state.switchChecked}
          onChange={this.changeMode}
        />

        <Tooltip
          placement="left"
          isOpen={this.state.tooltipOpen}
          target={"Tooltip-Switch"}
          toggle={this.toggle}
        >
          Dark Mode
        </Tooltip>
      </div>
    );
  }
}
