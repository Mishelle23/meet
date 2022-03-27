import React, { Component } from "react";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      detailsButtonText: 'More details',
    };
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.setState.collapsed,
      detailsButtonText: this.state.collapsed ? 'Hide details' : 'More details',
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state
    return (
      <div className="event">
        <h2 className="summary">{event.summary}
        </h2>
        <p className="start-date">
          {event.start.dateTime} ({event.start.timeZone})
        </p>
        <p className="location">@{event.summary} | {event.location}</p>

        <button
          className={`${collapsed ? "show" : "hide"}-details`}
          onClick={() => this.handleClick()}>
          {this.state.detailsButtonText}
        </button>

        {!this.state.collapsed &&
          <div className={`extra-details show`}>
            <a href={event.htmllink}>
              See datails on Google Calendar
            </a>
            <p className="event-description">{event.description}</p>
          </div>
        }
      </div>
    );
  }
}



export default Event;