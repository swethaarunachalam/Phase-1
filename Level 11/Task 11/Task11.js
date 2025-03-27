
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


let squaredNumbers = numbers.map(num => num * num);
console.log("Squared Numbers:", squaredNumbers);

let oddNumbers = numbers.filter(num => num % 2 !== 0);
console.log("Odd Numbers:", oddNumbers);


let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of Numbers:", sum);


console.log("Numbers and their Square Roots:");
numbers.forEach(num => console.log(`${num}: ${Math.sqrt(num).toFixed(2)}`));
