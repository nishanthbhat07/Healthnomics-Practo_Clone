import React, { Component } from "react";
import ConsultCard from "../../../components/cards/ConsultCard";
import { serverURL } from "../../../constants/defaultValues";
import { Helmet } from "react-helmet";
class RenderConsult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const cat = this.props.match.params.par;

    // alert(cat);
    fetch(`${serverURL}/consultations/search`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SearchQuery: cat,
        SearchType: "DN&DS",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        this.setState({ data: Object.values(res) });
      })
      .catch((err) => console.log(err));
  }
  render() {
    console.log();
    return (
      <>
        <Helmet>
          <title>Online Consultations</title>
        </Helmet>
        {this.state.data.map((item) => (
          <ConsultCard
            parameter={this.props.match.params.par}
            item={item}
            history={this.props.history}
          />
        ))}
      </>
    );
  }
}
export default RenderConsult;
