const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());

app.post('/webhook/:webhook_id/:webhook_token', async (req, res) => {
    const { webhook_id, webhook_token } = req.params;

    // Check for authentication here (this is a placeholder)
    if (webhook_token !== 'your_expected_token') { 
        return res.status(403).send('Forbidden');
    }

    try {
        // Forward the request to the actual webhook destination
        const response = await axios.post(`https://example.com/api/${webhook_id}`, req.body);
        
        // Respond with the result from the forwarded request
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error forwarding webhook:', error.message);
        return res.status(500).send('Error processing your request');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
