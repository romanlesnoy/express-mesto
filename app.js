const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");


const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('connect to db') )

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

app.use((req, res, next) => {
    req.user = {
        _id: "60350ae43f936b4411598684",
    };

    next();
});

app.use("/", usersRouter, cardsRouter);

app.use("*", (req, res) => {
    res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT);