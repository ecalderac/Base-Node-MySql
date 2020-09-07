require('./config/config');
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const api = express.Router();

// SOLO RUTAS

//Rutas para usuario
const Usuarios = require("./routes/Usuario");
api.use("/usuario", Usuarios);

//COLOCAR PREFIJO
app.use("/api-automotora", api);

app.listen(process.env.PORT, function() {
    console.log('Servidor corriendo en puerto: \x1b[32m%s\x1b[0m', process.env.PORT);
});