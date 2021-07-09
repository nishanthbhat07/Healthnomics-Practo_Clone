import Autosuggest from "react-autosuggest";
import React from "react";

export default class ReactAutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      suggestions: [],
      data: this.props.data || []
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {value: props.value}
  }

  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.data.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.props.onChange && this.props.onChange(newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholder || "",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={{
          container: "autosuggest",
          input: "form-control",
          inputOpen: "react-autosuggest__input--open",
          suggestionsContainer: "react-autosuggest__suggestions-container",
          suggestionsContainerOpen:
            "react-autosuggest__suggestions-container--open",
          suggestionsList: `react-autosuggest__suggestions-list ${
            this.state.suggestions.length ? "show" : ""
          }`,
          suggestionFocused: "active",
          suggestion: "react-autosuggest__suggestion"
        }}
      />
    );
  }
}
