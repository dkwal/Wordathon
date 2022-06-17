Description
* Wordathon is a spin on the viral word game Wordle. The game starts out in similar fashion, allowing the player six guesses to determine a secret 5-letter word. With each guess, the letter tiles will change color to give the player feedback about each guessed letter's presence in the secret word. Yellow tiles indicate the letter is in the secret word but placed in the wrong column. Green tiles indicate the letter is both in the secret word and placed in the right column. Dark gray tiles indicate the letter is not in the secret word at all. The user will only be allowed to guess valid words contained within the game's dictionary.
* The player wins the round if they are able to guess the secret word before running out of guesses. The game doesn't end there, however. In the second round, the player will input guesses simultaneously on two unique boards! In other words, each guess will be submitted to both boards, and each board will provide feedback unique to its own secret word. If the player succeeds in guessing both secret words, the player will be sent to a final round with 4 unique boards.

In Wordathon, users will be able to:
* Input letters onto a grid to form 5-letter words in an attempt to find the secret word(s).
* Receive feedback about their guesses in the form of colored letter tiles, where the color indicates the letter's presence in the secret word(s).
* Interact with an on-screen keyboard that will also display the colors of the letters guessed so far to indicate their presence in the secret word(s).
* View statistics about their performance in past games.

In addition, this project will include:
* { 2-4 other aspects of your project, including instructions & README }
* Instructions on how to play
* A production README

Wireframe: https://wireframe.cc/ogc8m4
* Nav bar includes links to Github, LinkedIn, and a button to open the side bar
* Side bar includes instructions and settings
* Game controls will include typing or clicking on the on-screen keyboard.

Technologies, Libraries, APIs
* notie: https://github.com/jaredreich/notie
  * A JS library that will help with notifications to the user.
* animate.css: https://github.com/animate-css/animate.css
  * A css library that will provide nice animations when the user takes actions.
* NPM
  * For bundling files and setting up a server so changes will update on the page without reloading.

Implementation timeline
* Friday & Weekend
  * Setup project, get basics of the project running like the grid for the first level and the on-screen keyboard. Implement user input via keyboard strokes and clicking the on-screen keyboard. Move on to game logic if there is time.
* Monday
  * Figure out game logic, especially for switching between levels and rendering the additional boards.
* Tuesday
  * Additional time for game logic. If everything is going smoothly, will work on sidebar features, nav features, and styling.
* Wednesday
  * Focus on styling and finish up anything related to core features. If time, work on implementing bonus features like a leaderboard and past game statistics.
* Thursday Morning
  * Deploy to GitHub pages. If time, rewrite this proposal as a production README.