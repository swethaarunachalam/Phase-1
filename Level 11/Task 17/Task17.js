
let array1 = [1, 2, 3];
let array2 = [4, 5, 6];
let combinedArray = [...array1, ...array2];
console.log("Combined Array:", combinedArray);
let obj1 = { name: "Swetha", age: 21 };
let obj2 = { city: "Dharmapuri", job: "Developer" };
let combinedObject = { ...obj1, ...obj2 };
console.log("Combined Object:", combinedObject);
let copiedArray = [...array1];
copiedArray.push(10); 
console.log("Original Array:", array1);
console.log("Modified Copy:", copiedArray);
