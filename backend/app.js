require('./models/User');
require('./models/Marker')
require('./config/passport');
const debug = require('debug')
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/api/users');
const markersRouter = require('./routes/api/markers');
const dateRequestsRouter = require('./routes/api/dateRequests');
const datesRouter = require('./routes/api/dates');
const friendRequestsRouter = require('./routes/api/friendRequests');
const friendsRouter = require('./routes/api/friends');
const chatRoomsRouter = require('./routes/api/chatRooms');
const chatMessagesRouter = require('./routes/api/chatMessages');
 
const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');

const csrfRouter = require('./routes/api/csrf');

const passport = require('passport');

const app = express();
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Security Middleware
if (!isProduction) {
    // Enable CORS only in development because React will be on the React
    // development server (http://localhost:3000). (In production, React files
    // will be served statically on the Express server.)
    app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// Attach Express routers
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/markers', markersRouter);
app.use('/api/dateRequests', dateRequestsRouter);
app.use('/api/dates', datesRouter);
app.use('/api/friendRequests', friendRequestsRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/chatRooms', chatRoomsRouter);
app.use('/api/chatMessages', chatMessagesRouter);

if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
        res.cookie('CSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });

    // Serve the static assets in the frontend's build folder
    app.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    app.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('CSRF-TOKEN', req.csrfToken());
        res.sendFile(
            path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});
   
const serverErrorLogger = debug('backend:error');

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

module.exports = app;