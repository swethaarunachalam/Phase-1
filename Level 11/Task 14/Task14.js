
const day = 4; 


let dayName;
let message = "";

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        message = "It's the weekend!";
        break;
    case 7:
        dayName = "Sunday";
        message = "It's the weekend!";
        break;
    default:
        dayName = "Invalid day number!";
}

console.log(dayName);
if (message) {
    console.log(message);
}
