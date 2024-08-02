require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');

// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined.');
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if connection fails
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'ejs');

// Middleware for method override
app.use(methodOverride('_method'));

// Middleware for express session
app.use(session({
  secret: "node-js",
  resave: true,
  saveUninitialized: true
}));

// Middleware for connect flash
app.use(flash());

// Middleware for file upload
app.use(fileUpload());

// Setting flash messages variables globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Import and use routes
const routes = require('./routes/routes');
app.use('/', routes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
