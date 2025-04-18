Feature: Masthead

As a user I want to see a top app bar with a logo and a hamburger
menu button, which opens or closes the navigation drawer sidebar.
The logomark is the symbol or icon, and the logotype is the name
of the company or brand. 

Scenario: Extra small resolution
  Given screen resolution is maximum "600px"
  Then I should NOT see a "Guide Button"
  And I should see a "Logo"

Scenario: Small resolution
  Given screen resolution is minimum "601px"
  Then I should see a "Guide Button"
  And I should see a "Logo"

Scenario: Logomark
  Given "Logo" is visible
  Then I should see "FakeTube" logomark

Scenario: Logotype
  Given "Logo" is visible
  Then I should see "FakeTube" logotype

Scenario: Click logo
  When I click a "Logo"
  Then I should go to "/" URL

Scenario: Hover over logo
  When I "hover" over logo
  Then I should see "FakeTube Home" tooltip