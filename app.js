//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenvFlow = require('dotenv-flow');
const cors = require('cors');

dotenvFlow.config();
console.log(' Current Environment ===>', process.env.NODE_ENV);

//Local Modules
const { createPost } = require('./src/controllers/taskController');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');

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
app.post('/:user_id/post', createPost);

/* Handling invalid route */
app.use('/', function (req, res) {
  res.status(404).send('Route not found');
});

/**
 * Listening to port
 */
app.listen(app.get('port'), () => {
  console.log(`Find the server at port:${app.get('port')}`);
});
