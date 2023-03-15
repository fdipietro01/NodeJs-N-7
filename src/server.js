const express = require("express");
const initConection = require("./db/mongo");
const router = require("./routes/index");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();
initConection();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://fdipietro01:Mongo01@cluster0.ik4waeo.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15000000000,
    }),
  })
);

//definir motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/aleas", express.static(__dirname + "/public"));

app.use(router);


app.listen(PORT, (err) => {
  if (err) return err;
  console.log(`Escuchando en el puerto ${PORT}`);
});

