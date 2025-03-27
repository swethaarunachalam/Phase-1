
const product = {
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    inStock: true
};

const { name, price, category, inStock } = product;

console.log("Destructured Values:");
console.log("Name:", name);
console.log("Price:", price);
console.log("Category:", category);
console.log("In Stock:", inStock);


function getProductDetails({ name, price, category, inStock }) {
    return `Product Details: ${name} - ${category}, Price: ₹${price}, Available: ${inStock ? "Yes" : "No"}`;
}


console.log(getProductDetails(product));
