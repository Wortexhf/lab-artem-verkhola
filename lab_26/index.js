const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const jsonParser = express.json();

let products = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 10 },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 20 }
];


const logToFile = (logMessage) => {
    const logFilePath = path.join(__dirname, "logs.txt"); 
    console.log(logFilePath);
    fs.appendFile(logFilePath, logMessage + "\n", (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
};

const logRequestToFile = (req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
    logToFile(logMessage); 
    next(); 
};

app.use(logRequestToFile);


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/product/list', (req, res) => {
    res.json(products);
});

app.post("/product/create", jsonParser, (req, res) => {
    const { name, category, price } = req.body;
    const newProduct = { id: products.length + 1, name, category, price };
    products.push(newProduct);
    res.json(products);
});

app.put("/product/:id", jsonParser, (req, res) => {
    const productId = parseInt(req.params.id);
    const { price } = req.body;
    const productIndex = products.findIndex(
        (product) => product.id === productId
    );
    if (productIndex !== -1) {
        products[productIndex].price = price;
        res.json(products);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.delete('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
