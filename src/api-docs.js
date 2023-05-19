const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de personajes de Disney',
      version: '1.0.0',
      description: 'Documentacion API de personajes de Disney',
      contact: {
        name: 'Elvis Franco',
        email: 'elvisfranco_11@hotmail.com',
      },
      servers: ['http://localhost:3001'],
    },
  },
  basePath: '/',
  apis: ['./src/db.js', './src/**/*.js'],
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);
const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Server running at port http://localhost:${port}/docs`);
};

module.exports = swaggerDocs;
