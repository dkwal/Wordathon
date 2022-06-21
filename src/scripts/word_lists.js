export async function readTextFiles(file1, file2) {
    let str1;
    let str2;
    await fetch(file1, {mode: "no-cors"})
        .then(response => response.text())
        .then(text => str1 = text);
    await fetch(file2, {mode: "no-cors"})
        .then(response => response.text())
        .then(text => str2 = text)
    return [str1, str2];

}