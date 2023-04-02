//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenvFlow = require('dotenv-flow');
const cors = require('cors');
const passport = require('passport');

dotenvFlow.config();
console.log(' Current Environment ===>', process.env.NODE_ENV);

//Local Modules
const { createPost } = require('./src/controllers/postController');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Passport.js initialization
require('./src/services/authServices');
passport.initialize();

const app = express();

const clientUrl = process.env.CLIENT_URL || '*';

/* Configuring port */
app.set('port', process.env.PORT || 8000);

/* Importing database connection */
require('./src/config/dbConfig');

/* CORS settings */
const corsOptions = {
  origin: clientUrl,
  optionsSuccessStatus: 200,
  methods: ['POST', 'GET', 'OPTIONS', 'HEAD', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: '*',
  preflightContinue: true,
};
app.use(cors(corsOptions));
app.options('*', cors());

/* Parsing Request Limits */
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);

/* Configuring Routes */
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/auth', authRoutes);
app.post(
  '/:user_id/post',
  passport.authenticate('jwt', { session: false }),
  createPost
);

/* Handling invalid route */
app.use('/', function (req, res) {
  res.status(404).json('Route not found');
});

/**
 * Listening to port
 */
app.listen(app.get('port'), () => {
  console.log(`Find the server at port:${app.get('port')}`);
});
