Feature: App Drawer

As a user I want to see a left sidebar with a navigation menu.
It should be temporary or persistent variant, depending on the
screen resolution. Can be opened or closed by a hamburger menu button.

Scenario: No app drawer
  Given screen resolution is maximum "600px"
  Then I "App Drawer" should NOT be present

Scenario: Closed temporary variant
  Given screen resolution is minimum "601px"
  And screen resolution is maximum "1312px"
  Then "App Drawer" should have a "temporary" variant
  And "App Drawer" should be "closed"

Scenario: Opened temporary variant
  Given screen resolution is minimum "601px"
  And screen resolution is maximum "1312px"
  And "App Drawer" has a "temporary" variant
  And "App Drawer" is "closed"
  When I click "Guide Button"
  Then "App Drawer" should be "opened"

Scenario: Opened persistent variant
  Given screen resolution is minimum "1313px"
  Then "App Drawer" should have a "persistent" variant
  And "App Drawer" should be "opened"
  And I should see a "Guide"