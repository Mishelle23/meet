import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: '32',
    infoText: "",
  };

  handleInputChange = (event) => {
    const number = event.target.value;
    if (number < 1 || number > 12) {
      this.setState({
        infoText: "Number between 1 and 12 to be entered",
      });
    } else {
      this.setState({
        numberOfEvents: number,
        infoText: "",
      });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
};

export default NumberOfEvents;