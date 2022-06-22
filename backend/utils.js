const execSync = require('child_process').execSync;
const fs = require('fs');
const archiver = require('archiver');
const path = require('path')

async function jsonParse(arrayObject) {
    let info = []
    arrayObject.forEach((element) => {
        info.push(JSON.parse(element))
    })
    return info
}

async function construirComando(req) {
    let command = `${req.body.exec} `
    let inputs = await jsonParse(req.body.input)
    inputs.forEach(element => {
        if(element.type === 'Texto')
            command += ` ${element.arg} ${element.value}`
        else
        
        command += ` ${element.arg} ${req.files[element.value].filename}`
    });
    return command
}

async function crearDirectorio(command) {
    try {
        execSync(`${command}`)
        console.log(`Directorio creado: ${command}`)
    }
    catch (err){
        console.log("output error: ", err)
    }
}

async function borrarDirectorio(command) {
    try {
        execSync(`${command}`)
        console.log(`Directorio borrado: ${command}`)
    }
    catch (err){
        console.log("output error: ", err)
    }
}

async function descomprimirArchivo(command) {
    try {
        execSync(`${command}`)
        console.log("Archivo descomprimido: ", command)
    }
    catch (err){
        console.log("output error: ", err)
    }
}

async function instalarRequisitos(command) {
    try {
        execSync(`${command}`)
        console.log("Requisitos instalados")
    }
    catch (err){
        console.log("output error: ", err)
    }
}

async function execServicio(command) {
    try {
        return execSync(`${command}`)
    }
    catch (err){
        console.log("output error: ", err)
    }
}

async function encodeOutput(){

    const files = await getFiles()
    let output = []

    files.forEach(element => {
        let file = fs.readFileSync(element.file, {encoding: 'base64'});
        if(element.type === 'Texto')
            output.push({
                file: file,
                type: element.type
            })
        else
            output.push({
                file: `data:image/${element.ext};base64,${file}`,
                type: element.type
            })
    });

    return {output}
}

async function getFiles(){
    const outputFolder = './servicios/temp/out'
    let files = []

    fs.readdirSync(outputFolder).forEach(file => {
        let ext = path.extname(`${outputFolder}/${file}`)
        console.log(`Extension of file: ${ext}`)
        if(ext === '.json' || ext === '.txt')
            files.push({
                file: `${outputFolder}/${file}`,
                type: 'Texto',
                ext: ext
            })
        else if(ext === '.png' || ext === '.jpg' || ext === '.jpeg')
            files.push({
                file: `${outputFolder}/${file}`,
                type: 'Imagen',
                ext: ext
            })
    });

    return files
}

module.exports = {
    construirComando,
    crearDirectorio,
    borrarDirectorio,
    descomprimirArchivo,
    instalarRequisitos,
    execServicio,
    encodeOutput
};