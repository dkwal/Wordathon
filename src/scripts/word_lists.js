// import * as fs from 'fs';

// const winningWordsStr = fs.readFileSync("../textfiles/winning-words.txt").toString('utf-8');
// const guessableWordsStr = fs.readFileSync("../textfiles/guessable-words.txt").toString('utf-8');

// export const WINNING_WORDS = winningWordsStr.split("\n");
// export const GUESSABLE_WORDS = guessableWordsStr.split("\n");

export async function readTextFiles(file1, file2) {
    let str1;
    let str2;
    await fetch(file1)
        .then(response => response.text())
        .then(text => str1 = text);
    await fetch(file2)
        .then(response => response.text())
        .then(text => str2 = text)
    return [str1, str2];

}