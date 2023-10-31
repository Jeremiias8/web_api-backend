
const express = require('express');
// const router = express.Router();
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// respuestas transformadas a tipo JSON
app.use(express.json());

// respuestas modificadas
app.use(express.urlencoded({extended: true}));

// ruta base
app.get('/', (req, res) => {
    res.json({ message: "ruta base desde la api del backend" });
});

// JSON que se devuelve en esa ruta de la API
app.get('/user', (req, res) => {
    res.json(
        { 
            id: 1,
            usuario: "Jeremías",
            web: "www.jeremiasweb.com"
        },
        {
            id: 2,
            usuario: "Jeremy", 
            web: "jeritto8web.com"
        }
    );
});

// importando archivo rutas
const routes = require('./routes/web_api-routes')(app);

// seteando puerto de escucha para peticiones
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// conexión MongoDB
const db = require('./models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a la BBDD exitosamente !");
    })
    .catch((error) => {
        console.log("No se pudo conectar a la BBDD...", error);
        process.exit();
    });