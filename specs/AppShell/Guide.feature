Feature: Guide

As a user I want to see a left sidebar with navigation items.

Scenario: Home item
  Given "Guide" is "opened"
  Then I should see "/" link "Item"
  And "Item" should have "Home" icon
  And "Item" should have "Home" title