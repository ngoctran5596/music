require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);
const db = require('./config/db');
app.use(cors());

//routes app
routes(app)
//conect db
db.connect();
//public router
app.use(express.static(path.join('src', 'public')));
app.use(express.static(path.join('src', 'resources/assets')));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());


//template engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    //sử dụng function trong express handlerbar
    helpers: {
      sum: (a, b) => a + b,

    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


server.listen(PORT, function () {
  console.log("Express server listening on " + PORT);
});
