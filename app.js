var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const winston = require('winston')

var indexRouter = require('./routes/index');

// API Routes
const levelsRouter = require('./routes/api/levels')
const usersRouter = require('./routes/api/users')
const itemsRouter = require('./routes/api/items')
const discountsRouter = require('./routes/api/discounts')
const ordersRouter = require('./routes/api/orders')

// View Routes
const itemsViewsRouter = require('./routes/view/items')
const ordersViewsRouter = require('./routes/view/orders')


var compression = require('compression')

const cors = require('cors')
const { handleError } = require('./helpers/error')

winston.add(
  new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      json: false,
      format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(i => i.level === 'error' ? `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}` : '')
      )
  })
)

winston.add(
  new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
      json: false,
      format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(i => i.level === 'info' ? `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}` : '')
      )
  })
)

var app = express();

// Remove 'X-Powered-By' header from HTTP response headers - Kz
app.disable('x-powered-by')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())

app.use(cors({exposedHeaders: ['x-auth-token']}))
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/levels', levelsRouter)
app.use('/api/v1/items', itemsRouter)
app.use('/api/v1/discounts', discountsRouter)
app.use('/api/v1/orders', ordersRouter)

//View Routes added by Kizito
app.use('/items', itemsViewsRouter)
app.use('/orders', ordersViewsRouter)

// Handling errors
app.use((err, req, res, next) => { handleError(err, res) })

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
