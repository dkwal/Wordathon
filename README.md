Live Version
* https://dkwal.github.io/Wordathon/

Instructions
* Wordathon is a spin on the viral word game Wordle. The game starts out in similar fashion, allowing the player six guesses to determine a secret 5-letter word. With each guess, the letter tiles will change color to give the player feedback about each guessed letter's presence in the secret word. Yellow tiles indicate the letter is in the secret word but placed in the wrong column. Green tiles indicate the letter is both in the secret word and placed in the right column. Dark gray tiles indicate the letter is not in the secret word at all. The user will only be allowed to guess valid words contained within the game's dictionary.
* The player wins the round if they are able to guess the secret word before running out of guesses. The game doesn't end there, however. In the second round, the player will input guesses simultaneously on two unique boards! In other words, each guess will be submitted to both boards, and each board will provide feedback unique to its own secret word. If the player succeeds in guessing both secret words, the player will be sent to a final round with 4 unique boards.

Technologies Used
* Vanilla JS

Technical Implementation Details
* An event listener checks for keyboard input for characters a-z, enter, and backspace. This allows the player to enter and delete letters into the onscreen board.
<pre><code>
    document.addEventListener("keydown", (e) => {
        if (gameVars.guessesRemaining === 0) {
            return;
        }
        let pressedKey = String(e.key);
        if (pressedKey === "Backspace" && gameVars.nextLetterIdx !== 0) {
            deleteLetter(gameVars);
            return;
        }
    
        if (pressedKey === "Enter") {
            checkGuess(gameVars);
            return;
        }
    
        let found = pressedKey.match(/[a-z]/gi);
        if (!found || found.length > 1) {
            return;
        } else {
            insertLetter(gameVars, pressedKey);
        }
    });
    <code><pre>
* Keyboard input allows the event listener to trigger deleteLetter(), checkGuess(), and insertLetter() based on the player's input.
* The bulk of the game logic occurs in checkGuess(), where if the guess is a valid word of 5 letters, the color of each letter in the guessed word will be shaded according to its presence in the secret word.
<pre><code>
        // loop through and change any correctly placed letters to green
        // remove the letter from the word so it is not considered again
        for (let j = 0; j < 5; j++) {
            let letter = gameVars.currentGuess[j];
            if (letter === winner[j]) {
                guessColors[j] = 'green';
                winner = winner.replace(letter, " ");
                keyboardColors[j][i] = 'green';
            }
        }

        // loop again and change any remaining letters in the word to yellow
        // remove the letter from the word
        for (let j = 0; j < 5; j++) {
            let letter = gameVars.currentGuess[j];
            if (guessColors[j] !== 'green' && winner.includes(letter)) {
                guessColors[j] = 'yellow';
                winner = winner.replace(letter, " ");
                keyboardColors[j][i] = 'yellow';
            }
        }
<code><pre>
* in the above code, letters are colored green if they are in the right place, then taken out of consideration to be colored again by replacing the letter in the winning word with " ". Then, the same process occurs for any yellow letters which are in the winning word but placed improperly. Any remaining letters which are not in the word default to gray.

To-do
* Make keyboard shading work for levels 2 and 3.
* Add on-screen instructions
* Add css animations from the css.animate library
* Replace alerts with notifications from the notie library.
* Add additional styling.
* Prevent letters from being typed on boards that have been completed.