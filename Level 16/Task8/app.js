const express = require('express');
const app = express();


app.use(express.json());


let products = [
    { id: 1, name: 'Pen', price: 10, description: 'Blue color pen' },
    { id: 2, name: 'Book', price: 100, description: '200-page notebook' }
];


app.get('/products', (req, res) => {
    res.status(200).json(products);
});


app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        res.status(200).json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(200).send(`Product with ID ${id} deleted`);
    } else {
        res.status(404).send('Product not found');
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
