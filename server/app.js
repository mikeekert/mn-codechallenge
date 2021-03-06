const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Server Port
const port = process.env.PORT || 3000;

// Route definition
const indexRouter = require('./routes/index.router');
const contactRouter = require('./routes/contact.router');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Public Files Serving
app.use(express.static('./server/public'));

// Routes
app.use('/', indexRouter);
app.use('/contact', contactRouter);

// Start Listening
app.listen(port);