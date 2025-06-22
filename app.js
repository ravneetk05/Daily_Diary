const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();

// Middleware  for every app.use 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// express.router == router create karta ha 



// Routes
// app.get('/', (req, res) => {
//   res.redirect('/users');
// });

// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.render('users', { users });
// });

//welcome pageee
app.get('/', (req, res) => {
    res.render('welcome');
  });

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/', (req, res) => {
  res.redirect('/users');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('users', { users });
});

app.post('/submit', async (req, res) => {
  await User.create({ name: req.body.name, diary: req.body.diary });
  res.redirect('/users');
});

app.get('/edit/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('edit', { user });
});

app.post('/update/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    diary: req.body.diary,
  });
  res.redirect('/users');
});

app.post('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/users');
});

// to start the server 
app.listen(4000, () => {
  console.log(' Server running at http://localhost:4000');
});
