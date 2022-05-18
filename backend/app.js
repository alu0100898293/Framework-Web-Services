let express = require('express') //llamamos a Express
let app = express()   
var cors = require('cors')
//let {LineaHorarioSalidas, GetLineas} = require('./data.js') 
//let {fiabilidadLinea, ParadaProxGuagua} = require('./analysis.js');             

let port = process.env.PORT || 3000  // establecemos nuestro puerto

app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend en funcionamiento')
  })

/*app.get('/:parada', function(req, res) {
    let parada = req.params.parada;
    res.send(GetLineas(parada)); 
})

app.get('/horarios/:linea', function(req, res) {
    let linea = req.params.linea;
    res.send(LineaHorarioSalidas(linea)); 
})

app.get('/tiemporestante/:parada', function(req, res) {
    let parada = req.params.parada;
    ParadaProxGuagua(parada)
    .then(data => {
        res.send(data.llegadas.llegada); 
    })
})

app.get('/fiabilidad/:parada&:linea&:id_trayecto', function(req, res) {
    let parada = req.params.parada;
    let linea = req.params.linea;
    let id_trayecto = req.params.id_trayecto;
    fiabilidadLinea(linea, parada, id_trayecto)
    .then(data => {
        res.send(data); 
    })
})*/

// iniciamos nuestro servidor
app.listen(port)
console.log('Escuchando en el puerto ' + port)