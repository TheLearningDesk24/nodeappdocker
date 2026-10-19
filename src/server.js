const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the New Node.js Express API!",
        routes: ["/health", "/api/data"]
    });
});

app.get('/health', (req, res) => {
    res.json({ status: "UP", timestamp: new Date() });
});

app.get('/api/data', (req, res) => {
    res.json({ data: "Here is your sample data from the new app." });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});