require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Add this
const app = express();
const axios = require('axios');

// Use CORS middleware
app.use(cors({
    origin: process.env.CLIENT_DOMAIN  // Allow requests from your React app's domain
}));

app.get('/:query', (req, res) => {
    const origin = req.headers.origin;  // Get the Origin header
    console.log('Supplied origin:', origin);  // Log the origin


    const query = req.params.query;  // Change this to req.params.query to get the correct URL parameter
    axios.get(`https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${query}`)
    .then(response => {
        console.log(response.data);
        res.send(response.data);
    })
    .catch(error => {
        res.status(500).send('Error fetching data');
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
