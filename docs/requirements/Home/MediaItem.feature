Feature: Media Item

As a user I want to see a card which represents a video.
It should show a video thumbnail and detailed metadata
related to video and channel.

Scenario: Thumbnail
  Given "Media" is loaded
  Then I should see a video a "Thumbnail"
  And "Image" aspect ratio is "16/9"
  And I should see a "Time status" badge

Scenario: Details
  Given "Media" is loaded
  Then I should see a "Channel Avatar"
  And I should see a "Channel Name"
  And I should see video a "Title"
  And I should see a a "Publish Date"

Scenario: Player
  Given "Media" is loaded
  And I "hover" over "Media" item
  Then I should see a video a "Player"
  And it should "autoplay"
  And "Progress Bar" should show current progress
  And "Time Status" should show current playback time

Scenario: Unmute
  Given "Player" is visible
  And video is "muted"
  When I click "Unmuted" button
  Then video should be "unmuted"

Scenario: Mute
  Given "Player" is visible
  And video is "unmuted"
  When I click "Muted" button
  Then video should be "muted"