var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Server Port
var port = process.env.PORT || 3000;

// Route definition
var indexRouter = require('./routes/index.router');
var contactRouter = require('./routes/contact.router');

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