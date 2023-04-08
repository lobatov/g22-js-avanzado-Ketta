var createError = require('http-errors');
var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Ruta de inicio*/
app.use('/', indexRouter);

/*Ruta para saber si el servidor esta trabajando */
app.use('/health', (req, res, next) =>
  res.status(200).send({ message: "Server OK" })
);

/*Ruta por si el cliente le da cualquier otra cosa adicional al localhost:3000*/
app.use('*', (req, res, next) =>
  res.status(404).send({ message: "Not found" })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
