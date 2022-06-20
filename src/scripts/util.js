export function getUniqueIndices(quantity, arrLength) {
    let arr = [];
    while (arr.length < quantity) {
        let candidate = Math.floor(Math.random() * arrLength)
        if(!arr.includes(candidate)) arr.push(candidate);
    }
    return arr;
}