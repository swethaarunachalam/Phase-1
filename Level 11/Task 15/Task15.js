
function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero"); 
    }
    return a / b;
}


function testDivision(x, y) {
    try {
        let result = divideNumbers(x, y);
        console.log(`Result: ${x} / ${y} = ${result}`);
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        console.log("Division operation completed.\n");
    }
}


testDivision(10, 2); 
testDivision(8, 0);   
testDivision(15, 3);  