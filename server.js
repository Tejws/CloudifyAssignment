const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');  // Add cors import

const app = express();
const port = 3000;

const apiKey = process.env.TRELLO_API_KEY;
const apiToken = process.env.TRELLO_API_TOKEN;
const listId = process.env.TRELLO_LIST_ID;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/createcard', async (req, res) => {
    const { name, description, startDate, dueDate } = req.body;

    try {
        const response = await axios.post(
            `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
            {
                name: name,
                desc: description,
                due: dueDate,
                start: startDate,
                idList: listId,
            }
        );
        res.status(200).send(`Card created: ${response.data.shortUrl}`);
    } catch (error) {
        res.status(500).send('Error creating Trello card');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
