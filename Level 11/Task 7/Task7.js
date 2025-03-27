let foods =["Pizza", "Biryani", "Burger", "Pasta", "Ice Cream"];

console.log("original array:",foods);
 foods.push("swetha");
 foods.shift();

console.log("modified array:",foods);
console.log("Array length:",foods.length);
console.log("index of 'pasta':",foods.indexOf("pasta"));

let slicefoods = foods.slice(1,4);
console.log("sliced Array:",slicefoods);