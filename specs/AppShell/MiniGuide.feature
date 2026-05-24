Feature: Mini Guide

As a user I want to see a left sidebar with navigation items.

Scenario: Home item
  Given screen resolution is minimum "793px"
  And screen resolution is maximum "1312px"
  Then I should see a "Mini Guide"
  And I should see "/" link "Item"
  And "Item" should have "Home" icon
  And "Item" should have "Home" title