Feature: Specify number of events

Scenario: If user has not chosen number of events to be displayed, default number is 32.
Given user has not specified exact number of events
When user loads main page
Then number of events showing would be 32

Scenario: If user decides on number of events displayed, number is typed in the box and shall be displayed.
Given user opens main page
When user types chosen number
Then this number of events would be displayed
