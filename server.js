const path = require ("path");
const express = require('express');
const session = require('express-session')
const {engine} = require('express-handlebars');
const db = require('./models')
const routes = require('./controller')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

app.use(express.static("public"));

// Assigns the port
const PORT = process.env.PORT; // || 3001


const sequelize = require('./config/connection');

const sess = {
  secret: 'secret_secret_secret',
  saveUninitialized: true,
  cookie: { maxAge: 86400 }, //one day
  resave: false, 
  store: new SequelizeStore({
    db: sequelize
  })
}


app.use(session(sess));

// Allows express to get data from DOM
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Method override
app.use(
  methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          let method = req.body._method
          delete req.body._method
          return method
      }
  })
);



// Assigns handlebars as view engine and makes .hbs extensions
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');

// Creates routes
app.use(routes);


// Start the server on the port
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });