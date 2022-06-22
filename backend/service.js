const fs = require('fs');
const path = require('path');

let {
    construirComando,
    crearDirectorio,
    borrarDirectorio,
    descomprimirArchivo,
    instalarRequisitos,
    execServicio,
    encodeOutput
} = require('./utils.js');   

// Lee los servicios
function listarServicios() {
    let data = fs.readFileSync('./servicios/servicios.json');
    let info = JSON.parse(data)
    return info;
}
// Lee los datos de un servicio
function infoServicio(servicio) {
    let data = fs.readFileSync('./servicios/'+servicio+'/info-servicio.json');
    let info = JSON.parse(data)
    return info;
}

// Eliminia un servicio
async function eliminarServicio(servicio) {
    let response;
    await borrarDirectorio(`rm -rf ./servicios/${servicio}/`)

    let jsonFile = fs.readFileSync('./servicios/servicios.json');
    let jsonData = JSON.parse(jsonFile)

    const index = jsonData.indexOf(servicio)
    if (index > -1) jsonData.splice(index, 1)

    fs.writeFileSync("./servicios/servicios.json", JSON.stringify(jsonData))

    if (fs.existsSync(`./servicios/${servicio}/`))
        console.log('Ha ocurrido un error')
    else
        console.log('Servicio eliminado')
}

// Añade un nuevo específico
async function nuevoServicio(req, res) {

    console.log(`Añadiendo nuevo servicio con nombre: ${req.body.name}`)

    await crearDirectorio(`mkdir ./servicios/${req.body.name}`)
    
    await descomprimirArchivo(`unzip ${req.file.path} -d ./servicios/${req.body.name}`)

    if(req.body.req !== '')
        await instalarRequisitos(`(cd ./servicios/${req.body.name} && ${req.body.req})`)

    let info = {
        'name': req.body.name,
        'description': req.body.description,
        'req': req.body.req,
        'exec': req.body.exec,
        'type': req.body.type,
        'input': [],
        'output': req.body.output
    }

    if (typeof req.body.input === 'string')
        info.input.push(JSON.parse(req.body.input))
    else
        req.body.input.forEach((element) => {
            info.input.push(JSON.parse(element))
        })

    fs.writeFileSync(
        `./servicios/${req.body.name}/info-servicio.json`, 
        JSON.stringify(info)
    )

    let jsonFile = fs.readFileSync('./servicios/servicios.json');
    let jsonData = JSON.parse(jsonFile)

    jsonData.push(req.body.name)

    fs.writeFileSync("./servicios/servicios.json", JSON.stringify(jsonData))

    res.json({ message: "Servicio añadido con éxito"})
}

// Ejecuta un servicio específico
async function ejecutarServicio(req, res) {
    await borrarDirectorio(`rm -rf ./servicios/temp/out/*`)
    console.log(req.body)
    let comando = await construirComando(req)
    console.log(`Ejecutando el servicio ${req.body.name} con el comando: ${comando}`)
    if(req.body.type === 'Estatico') {
        let response = await execServicio(`(cd ./servicios/${req.body.name} && ${comando})`)
        if (req.body.output === 'Si')
            fs.writeFileSync("./servicios/temp/out/stdout.txt", response)
        console.log(`Response: ${response}`)
        response = await encodeOutput()
        console.log(`Response encoded: ${response}`)
        await borrarDirectorio(`rm -rf ./servicios/temp/in/*`)
        res.json(response)
    }
    else
        res.json({ message: "Nada por ahora"})
}

module.exports = {
    listarServicios,
    infoServicio,
    eliminarServicio,
    nuevoServicio,
    ejecutarServicio
};