const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, requireAdmin} = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://kristoffde:DftbDRCcOuk89m95@supermodedata.bavrwd8.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(80))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/veileder', requireAdmin, (req, res) => res.render('veileder'));
app.use(authRoutes);

app.get('/game', checkUser, requireAuth, (req, res)=> res.render('game'))
app.get('/admin', requireAdmin, (req, res)=> res.render('admin'))
app.get('/regler', (req, res)=> res.render('regler'))