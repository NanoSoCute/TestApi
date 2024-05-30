const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/gpt3', (req, res) => {
    res.send('Hello, World!');
});

// Define a route to read and serve the use.json file
app.get('/json', (req, res) => {
    // Read the use.json file
    fs.readFile('use.json', 'utf8', (err, data) => {
        if (err) {
            // If there's an error reading the file, send an error response
            console.error('Error reading use.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the contents of the use.json file as a JSON response
        res.json(JSON.parse(data));
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
