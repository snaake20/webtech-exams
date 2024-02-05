const express = require('express');

const app = express();
app.use(express.static('public'));

app.use(express.json());

app.locals.data = [
  {
    name: 'jim',
    job: 'engineer',
  },
  {
    name: 'tim',
    job: 'accountant',
  },
  {
    name: 'ann',
    job: 'accountant',
  },
];

// - Serverul livrează index.html ca resursă statică; (0.5 pts)

app.get('/employees', (req, res) => {
  res.status(200).json(app.locals.data);
});

app.post('/employees', (req, res) => {
  console.log(req.body);
  app.locals.data.push(req.body);
  res.status(201).json({ message: 'success' });
});

module.exports = app;
