require('dotenv').config({
  path: __dirname + '/.env'
})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
const bodyParser = require('body-parser');
var flash = require('connect-flash');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const connectDB = require('./db');
const electionRouter = require('./routes/election');
const assemblyElectionRouter = require('./routes/assembly-election');
const partyRouter = require('./routes/party');
const candidateRouter = require('./routes/candidate');
const constituenciesRouter = require('./routes/constituency');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'sdfksdhvfklufhvylksduyvfsdfff',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false,
      httpOnly: false,
      sameSite: 'lax'
  }
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/elections', electionRouter);
app.use("/api/auth", authRouter)
app.use("/api/assembly-elections", assemblyElectionRouter)
app.use("/api/party", partyRouter)
app.use("/api/candidate", candidateRouter)
app.use("/api/constituency", constituenciesRouter)

// MongoDB connection
connectDB();

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  res.render('error');
});


module.exports = {app};
