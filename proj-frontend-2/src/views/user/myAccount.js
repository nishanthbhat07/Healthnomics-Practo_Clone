import React, { Component } from "react";
import GradientCard from "../../components/cards/GradientCard";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phno: "",
      age: "",
      pic: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  componentDidMount() {
    this.setState({
      name: "Nishanth Bhat",
      email: "nishanthbhat07@gmail.com",
      phno: "1000000",
      age: 20,
      pic: "",
    });
  }
  render() {
    const { name, email, phno, age, pic } = this.state;
    return (
      <GradientCard
        name={name}
        email={email}
        phno={phno}
        age={age}
        history={this.props.history}
        handleChange={this.handleChange}
        pic={pic}
      />
    );
  }
}
export default MyAccount;
