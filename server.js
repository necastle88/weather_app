const projectData = [];

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* Dependencies */
app.use(express.urlencoded({ extended: false }));
app.use(express.static('website'));
app.use(express.json());
app.use(cors());

const port = 8000;

// Spin up the server

const server = app.listen(port, listening);
function listening(){
  console.log(server);
  console.log(`running on localhost: ${port}`);
};

const addData = (req, res) => {
    projectData.push(req.body);
    console.log(projectData)
}

app.get('/data', (req, res) => {
  res.send(projectData);
})

app.post('/', addData);