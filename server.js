'use strict'

const express = require('express'),
	  path    = require('path');


let app  = express();
let port = process.env.PORT || 5000;

// serve static files
app.use(express.static( path.join(__dirname, '.') ));

// SERVER
app.listen(port);

console.log('Listening on port %d', port);