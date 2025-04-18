Feature: Home Page

As a user I want to see a video feed on the main page.

Scenario: Home page
  Given I am on the "/" URL
  Then I should see a "Home Page"

Scenario: Content loading
  Given video feed is "loading"
  Then I should see a "Media Skeleton"
  And I should see a "Thumbnail" placeholder
  And I should see a "Channel Avatar" placeholder
  And I should see a "Title" placeholder
  And I should see a "Channel Name" placeholder 

Scenario: Browse Grid
  Given I am on the "Home Page"
  Then I should see a "Grid" layout
  And there is a "column gap" of "16px"
  And there is a "row gap" of "32px"
  And each "item" is the "same size"
  And minimum "item" width is "310px"

Scenario: Dynamic number of columns
  Given "Home Page" width is "resized"
  Then number of "Grid" columns should be adjusted
  And it should be based on number of "310px" items
      which will fit horizontally