import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('If user has not clicked on event, the event element collapses by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user is on the main page', () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();
    });

    when('user has not clicked on event displayed', () => {

    });

    then('event details would be collapsed', () => {
      expect(AppWrapper.find('.event_moreDetails')).toHaveLength(0);
    });
  });

  test('If user clicks on certain event, the event would expand.', ({ given, when, then }) => {
    let AppWrapper;
    given('user gets list of events displayed', async () => {
      AppWrapper = await mount(<App />);
    });

    when('user clicks on particular event', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.show-details')).toHaveLength(2);
      AppWrapper.find('.show-details').at(0).simulate('click');
    });

    then('event details would be showing', () => {
      expect(AppWrapper.find('.extra-details')).toHaveLength(1);
    });
  });

  test('If user clicks on expanded event, the event details would hide.', ({ given, when, then }) => {
    let AppWrapper;
    given('event is displaying details', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.show-details').at(0).simulate('click');
    });

    when('user clicks on this event', () => {
      AppWrapper.find('.show-details').at(0).simulate('click');
      expect(AppWrapper.find('.event_moreDetails')).toHaveLength(0);
    });

    then('event details hide', () => {
      expect(AppWrapper.find('.event_moreDetails')).toHaveLength(0);
    });
  });
});
