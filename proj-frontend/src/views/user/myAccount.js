import React, { Component } from "react";
import MyAccountCard from "../../components/cards/MyAccountCard";
import { serverURL } from "../../constants/defaultValues";
import { Helmet } from "react-helmet";
import { NotificationManager } from "../../components/common/react-notifications";
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phno: "",
      age: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  componentDidMount() {
    fetch(`${serverURL}/users/details`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        const { EmailID, PhoneNumber, Username, Age } = result;
        this.setState({
          name: Username,
          email: EmailID,
          phno: PhoneNumber,
          age: Age,
        });
      })
      .catch((err) => console.log(err));
  }
  showSuccessNoti = () => {
    NotificationManager.success("", "Successfully Saved", 3000, null, null, "");
  };
  updateUserDetails = () => {
    fetch(`${serverURL}/users/update`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: localStorage.getItem("user_id"),
        Username: this.state.name,
        PhoneNumber: this.state.phno,
        EmailID: this.state.email,
        Age: this.state.age,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.showSuccessNoti();
        }
      });
  };
  render() {
    const { name, email, phno, age } = this.state;
    return (
      <>
        <Helmet>
          <title>My Account</title>
        </Helmet>
        <MyAccountCard
          name={name}
          email={email}
          phno={phno}
          age={age}
          history={this.props.history}
          handleChange={this.handleChange}
          updateUserDetails={this.updateUserDetails}
        />
      </>
    );
  }
}
export default MyAccount;
