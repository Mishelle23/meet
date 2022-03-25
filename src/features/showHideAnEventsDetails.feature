Feature: Show/hide an event's details

Scenario: If user has not clicked on event, the event element collapses by default.
Given the user is on the main page
When user has not clicked on event displayed
Then event details would be collapsed

Scenario: If user clicks on certain event, the event would expand.
Given user gets list of events displayed
When user clicks on particular event
Then event details would be showing

Scenario: If user clicks on expanded event, the event details would hide.
Given event is displaying details
When user clicks on this event
Then event details hide
