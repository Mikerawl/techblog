const express = require('express');
const {engine} = require('express-handlebars');
const path = require ("path");
const db = require('./models')

const app = express();

app.use(express.static("public"));

// Assigns the port
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

// Allows express to get data from DOM
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// Assigns handlbebars as view engine and makes .hbs extentions
app.engine('.hbs', engine({extname:'.hbs'}));
app.set('view engine', '.hbs');


// Creates routes
const htmlRouter = require('./controller/html')


app.use("/", htmlRouter);



// Start the server on the port

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });

