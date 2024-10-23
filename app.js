require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const { sequelize } = require('./models');
const userRoutes = require('./routes/user');

app.use((req, res, next) => {
  const currentHour = new Date().getHours();
  if (currentHour >= 9 && currentHour <= 17) {
      next(); // Lanjutkan ke rute berikutnya
  } else {
      res.status(403).send('Aplikasi hanya aktif antara jam 9 pagi hingga 5 sore.');
  }
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(userRoutes);

sequelize.sync()
  .then(() => {
    app.listen(8000, () => {
      console.log('Server is running on http://localhost:8000');
    });
  })
  .catch(err => console.error(err));
