//Third Party Modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenvFlow = require('dotenv-flow');
const cors = require('cors');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenvFlow.config();
console.log(' Current Environment ===>', process.env.NODE_ENV);

//Local Modules
const createPostRoute = require('./src/routes/createPostRoute');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Media Post App Documentation',
      version: '1.0.0',
      description:
        'This is social media post app allows users the create new posts.',
    },
    servers: [
      {
        url: 'https://dull-lion-bedclothes.cyclic.app/',
      },
      {
        url: 'http://localhost:3000/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

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
app.use('/', createPostRoute);

/* Swagger api-docs Routes */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
