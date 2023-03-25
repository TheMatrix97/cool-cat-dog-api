const { default: axios } = require('axios');
const express = require('express');
const { DogController } = require('./controllers/dog.controller');
const { KittyController } = require('./controllers/kitty.controller');
const app = express();
const port = 3000;


// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello World! Try /cat to receive a cool kitty image');
});

app.get('/cat', async (req, res) => {
    const url = await new KittyController().getCoolCat();
    try {
        const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': imageResponse.data.length
        });
        res.end(imageResponse.data, 'binary');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image ' + url);
    }
});


app.get('/dog', async (req, res) => {
    const url = await new DogController().getCoolDog();
    try {
        const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': imageResponse.data.length
        });
        res.end(imageResponse.data, 'binary');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image ' + url);
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
