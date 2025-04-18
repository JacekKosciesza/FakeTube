Feature: Pivot Bar

As a user I want to switch between different views in the
application.

Scenario: Extra small resolution
  Given screen resolution is maximum "600px"
  Then I should see a "Pivot Bar"
  And I should see "/" link "Item"
  And "Item" should have "Home" icon
  And "Item" should have "Home" title