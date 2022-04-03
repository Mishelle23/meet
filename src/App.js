import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    location: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location).slice(0, this.state.numberOfEvents);

      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents
    }, this.updateEvents(this.state.location, numberOfEvents));
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />
    return (
      <div className="App">
        {!navigator.onLine ? (<OfflineAlert text='Offline mode, Only previous data is displayed' style={{ textAlign: 'center' }} />) : (<OfflineAlert text='' />)}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />

        <EventList
          events={this.state.events}
          numberOfEvents={this.state.numberOfEvents}
        />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
