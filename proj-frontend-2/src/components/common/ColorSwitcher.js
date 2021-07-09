import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  themeColorStorageKey,
  themeRadiusStorageKey
} from '../../constants/defaultValues';
import { FormGroup, Label, CustomInput } from 'reactstrap';
class ColorSwitcher extends Component {
  constructor(props) {
    super();

    this.state = {
      isOpen: false,
      selectedColor: localStorage.getItem(themeColorStorageKey),
      radius: localStorage.getItem(themeRadiusStorageKey) || 'rounded'
    };
    this.removeEvents();
  }

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = e => {
    e.preventDefault();
    const isOpen = this.state.isOpen;
    if (!isOpen) {
      this.addEvents();
    } else {
      this.removeEvents();
    }
    this.setState({
      isOpen: !isOpen
    });
  };
  changeThemeColor = (e, color) => {
    e.preventDefault();
    localStorage.setItem(themeColorStorageKey, color);
    this.toggle(e);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  componentDidMount() {
    this.changeRadius(this.state.radius);
  }

  addEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };
  removeEvents = () => {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  handleDocumentClick = e => {
    const container = this.getContainer();
    if (container.contains(e.target) || container === e.target) {
      return;
    }
    this.toggle(e);
  };
  changeRadius = radius => {
    if (radius === 'flat') {
      document.body.classList.remove('rounded');
    } else {
      document.body.classList.add('rounded');
    }
    this.setState({
      radius
    });
    localStorage.setItem(themeRadiusStorageKey, radius);
  };

  render() {
    const { selectedColor, radius } = this.state;
    return (
      <div className={`theme-colors ${this.state.isOpen ? 'shown' : ''}`}>
        <div className="p-4">
          <p className="text-muted mb-2">Light Theme</p>
          <div className="d-flex flex-row justify-content-between mb-4">
            {['purple', 'blue', 'green', 'orange', 'red'].map(color => (
              <a
                key={`light.${color}`}
                href={`#light.${color}`}
                className={`theme-color theme-color-${color} ${
                  selectedColor === `light.${color}` ? 'active' : ''
                }`}
                onClick={e => this.changeThemeColor(e, `light.${color}`)}
              >
                <span>`light.${color}`</span>
              </a>
            ))}
          </div>
          <p className="text-muted mb-2">Dark Theme</p>
          <div className="d-flex flex-row justify-content-between">
            {['purple', 'blue', 'green', 'orange', 'red'].map(color => (
              <a
                key={`dark.${color}`}
                href={`#dark.${color}`}
                className={`theme-color theme-color-${color} ${
                  selectedColor === `dark.${color}` ? 'active' : ''
                }`}
                onClick={e => this.changeThemeColor(e, `dark.${color}`)}
              >
                <span>`dark.${color}`</span>
              </a>
            ))}
          </div>
        </div>
        <div className=" pb-0 pl-4 pt-4">
          <FormGroup>
            <Label for="radiusRadio">Border Radius </Label>
            <div>
              <CustomInput
                type="radio"
                name="radiusRadio"
                id="rounded"
                label="Rounded"
                inline
                defaultChecked={radius === 'rounded'}
                onChange={() => this.changeRadius('rounded')}
              />
              <CustomInput
                type="radio"
                name="radiusRadio"
                id="flat"
                label="Flat"
                inline
                defaultChecked={radius === 'flat'}
                onChange={() => this.changeRadius('flat')}
              />
            </div>
          </FormGroup>
        </div>

        <a href="#section" className="theme-button" onClick={this.toggle}>
          {' '}
          <i className="simple-icon-magic-wand" />{' '}
        </a>
      </div>
    );
  }
}

export default ColorSwitcher;
