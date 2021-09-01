require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routes');

const app = express();

// Body parser
app.use(express.json());

// Settings
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // open to any domain
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
  });

// Routes
app.use('/users', routers.usersRoute);

// Error Handler
app.use((err, req, res, next) => {
    if (!res.headerSent) {
        res.status(err.code || 500).json({ message: err.message || "Internal Error" });
    }
});

const PORT = process.env.PORT || 5000;
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qodoc.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Port: ${PORT} - DB connected`))
    )
    .catch((err) => console.log(err));