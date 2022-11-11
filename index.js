const express = require(`express`);
const db = require(`./config/connection.js`);
const routes = require(`./routes`);

// creating the PORT for the server to run off
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});