import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('If user has not chosen number of events to be displayed, default number is 32.', ({ given, when, then }) => {
    let AppWrapper;
    given('user has not specified exact number of events', () => {
      AppWrapper = mount(<App />);
    });

    when('user loads main page', () => {
      AppWrapper.update();
    });

    then(/^number of events showing would be (\d+)$/, (arg0) => {
      expect(AppWrapper.find('.event')).toHaveLength(2);
    });
  });

  test('If user decides on number of events displayed, number is typed in the box and shall be displayed.', ({ given, when, then }) => {
    let AppWrapper;
    given('user opens main page', () => {
      AppWrapper = mount(<App />);
    });

    when('user types chosen number', () => {
      AppWrapper.update();
      AppWrapper.find('.numberOfEvents_input').simulate('change', { target: { value: '1' } });
    });

    then('this number of events would be displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });
});