require('dotenv').config();
const app = require('./src/app');
const { conn } = require('./src/db.js');
const swaggerDocs = require('./src/api-docs');

const port = process.env.PORT || 3000;

conn.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
    swaggerDocs(app, port);
  });
});
