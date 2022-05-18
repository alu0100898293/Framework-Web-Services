const fs = require('fs');

// Lee los datos de un servicio
function listarServicios(servicio) {
    let info = fs.readFileSync('./servicios/servicios.json');
    return info;
}
// Lee los datos de un servicio
function infoServicio(servicio) {
    let info = fs.readFileSync('./servicios/'+servicio+'/info.json');
    return info;
}

// Ejecuta un servicio específico
function ejecutarServicio(servicio) {
    let horario = [];
    times.forEach(time => {
        if (time.stop_id == n_parada)
            horario.push(time);
    });
    return horario;
}