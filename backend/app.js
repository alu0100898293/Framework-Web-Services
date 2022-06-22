const express = require('express') //llamamos a Express
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

let {listarServicios, 
    infoServicio, 
    ejecutarServicio, 
    eliminarServicio,
    nuevoServicio
} = require('./service.js');   

const app = express()   
const port = 3000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'servicios/temp/in')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Backend en funcionamiento')
  })

app.get('/servicios', (req, res) => {
    console.log("Retornando nombres de servicios")
    let info = listarServicios()
    res.send(info)
})

app.get('/info-servicio/:servicio', (req, res) => {
    let servicio = req.params.servicio;
    console.log("Retornando datos del servicio " + servicio)
    res.send(infoServicio(servicio))
})

app.get('/del-servicio/:servicio', (req, res) => {
    let servicio = req.params.servicio;
    console.log("Eliminado el servicio " + servicio)
    res.send(eliminarServicio(servicio))
})

app.post('/add-servicio', upload.single('file'), nuevoServicio)

app.post('/exec-servicio', upload.array('files'), ejecutarServicio)

app.get('/add-servicio', (req, res) => {
    console.log("Añadiendo nuevo servicio ")
    res.send('ok')
})

app.get('/exec-servicio/:servicio', (req, res) => {
    let servicio = req.params.servicio;
    console.log("Ejecutando el servicio " + servicio)
    res.send(ejecutarServicio())
})

// iniciamos nuestro servidor
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`))