Feature: Application shell

As a user I want to see an application shell, which is responsive
and adapts to different screen resolutions.

Scenario: Extra small resolution
  Given screen resolution is maximum "600px"
  Then I should see a "Masthead"
  And I should see a "Pivot Bar"

Scenario: Small resolution
  Given screen resolution is minimum "601px"
  And screen resolution is maximum "791px"
  Then I should see a "Masthead"
  And I should NOT see a "Mini Guide"
  And "App Drawer" should have a "temporary" variant
  And "App Drawer" should be "closed"

Scenario: Medium resolution
  Given screen resolution is minimum "792px"
  And screen resolution is maximum "1312px"
  Then I should see a "Masthead"
  And I should see a "Mini Guide"
  And "App Drawer" should have a "temporary" variant
  And "App Drawer" should be "closed"

Scenario: Large resolution
  Given screen resolution is minimum "1313px"
  Then I should see a "Masthead"
  And I should NOT see a "Mini Guide"
  And "App Drawer" should have a "persistent" variant
  And "App Drawer" should be "opened"