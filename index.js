
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
    res.json({ message: "what's up m'boy!" });
});

app.get('/user', (req, res) => {
    res.json({ 
        id: 1,
        usuario: "Jere",
        username: "jeremiasweb"
    });
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