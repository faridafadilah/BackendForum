const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Templating Engine
app.set('view engine', 'ejs');

// database
const db = require('./app/models');
const Role = db.role;

// Jika ingin Membuat table ulang
// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

// simple route
app.get('/', (req, res) => {
  res.render('home');
});
// login
app.get('/login', (req, res) => {
  res.render('login', {
    nama: "Halaman Login"
  });
});

// register
app.get('/register', (req, res) => {
  res.render('register', {
    nama: "Halaman Register"
  });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/mainForum.routes')(app);
require('./app/routes/subForum.routes')(app);
require('./app/routes/diskusi.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initial untuk Membuat Role [user, admin, superadmin]
function initial() {
  Role.create({
    id: 1,
    name: 'user'
  });
 
  Role.create({
    id: 2,
    name: 'superadmin'
  });
 
  Role.create({
    id: 3,
    name: 'admin'
  });
}