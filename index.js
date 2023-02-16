require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const sequelize = require('./model/initSeque');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

// cookies credentials 

app.use(credentials);

// Cross origin resource sharing
app.use(cors(corsOptions));

//build-in middleware to handle url encoded data
app.use(express.urlencoded({ extended: false }));
// parse application json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

//Routes handlers
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.use('/register', require('./routes/registerRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/refresh', require('./routes/refreshRoutes'));
app.use('/logout', require('./routes/logoutRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/daily', require('./routes/dailyRoutes'));

// verified routes
app.use(verifyJWT);
app.use('/user', require('./routes/userRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" })
    } else {
        res.type('text').send("404 Not Found");
    }
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync({ force: true });
      console.log('All models were synchronized successfully.');

      app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));