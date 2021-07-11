import React, { Component } from "react";
import { serverURL } from "../../../constants/defaultValues";
import DocCard from "../../../components/cards/DocCard";
import { Helmet } from "react-helmet";
class RenderClinicsAndDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const cat = this.props.match.params.parameter;
    const location = this.props.match.params.location;

    fetch(`${serverURL}/appointments/search`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Location: location,
        SearchQuery: cat,
        SearchType: "CS&CN",
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
          <title>Clinics</title>
        </Helmet>
        {this.state.data.map((item) => (
          <DocCard
            parameter={this.props.match.params.parameter}
            item={item}
            history={this.props.history}
            location={this.props.match.params.location}
          />
        ))}
      </>
    );
  }
}
export default RenderClinicsAndDocs;
