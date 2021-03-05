const projectData = {};
const data = [];

const express = require('express');
const app = express();
const cors = require('cors');

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
  console.log(req.body);
  data.push(req.body);
}

app.get('/', (req, res) => {
  res.send(projectData);
})

app.post('/', addData);