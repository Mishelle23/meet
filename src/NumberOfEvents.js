import React, { Component } from "react";

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfEvents: '32',
    };
  }

  updateNumberOfEvents = (event) => {
    this.setState({
      numberOfEvents: event.target.value,
    });
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.updateNumberOfEvents}
        />
      </div>
    )
  }
};

export default NumberOfEvents;