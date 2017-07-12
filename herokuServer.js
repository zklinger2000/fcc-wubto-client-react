const express = require('express');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(morgan('combined')); // Middleware for logging
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
