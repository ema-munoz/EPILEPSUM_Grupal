const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "EPILEPSUM";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
}).then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Base de datos creada o comprobada correctamente");
    })
})

const usuarioModels = require('../Model/user')
const medicacionUsuarioModels = require('../Model/medicacion')
const ataquesModels = require('../Model/ataquesEpilepticos')
const medicosModels = require('../Model/medico')
const contactosEmergenciaModels = require('../Model/contactosEmergencia')
const colaboracionesModels = require('../Model/colaboraciones') // verificar
const familiaresModels = require('../Model/familiares')
const citaControlModels = require('../Model/citaControl')
const consejosModels = require('../Model/consejos')
const detallesExperienciasModels = require('../Model/detallesExperiencia')
const detallesConsejosModels = require('../Model/detallesConsejo')
const detallesMedicamentosModels = require('../Model/detallesMedicamentos')
const detallesRolModels = require('../Model/detallesRol')
const experienciasModels = require('../Model/experiencia')
const rolModels = require('../Model/rol')

const proyectoModels = require('../Model/proyecto')
const detalleProyectoModels = require('../Model/detalleProyecto')

const efectosSecundariosModels = require('../Model/efectosSecundarios')
const sintomasModels = require('../Model/sintomas')
const tipoEpilepsiaModels = require('../Model/tipoEpilepsia')

const preguntasModels = require('../Model/preguntas')
const respuestasModels = require('../Model/respuestas')
const pacientesModels = require('../Model/paciente')

const sequelize = new Sequelize(
    'epilepsum',
    'root',
    '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No se conecto')
    })

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas")
    })

const usuario = usuarioModels(sequelize, Sequelize)
const medicacion = medicacionUsuarioModels(sequelize, Sequelize)
const ataque = ataquesModels(sequelize, Sequelize)
const medico = medicosModels(sequelize, Sequelize)
const contactosEmergencia = contactosEmergenciaModels(sequelize, Sequelize)
const colaboracion = colaboracionesModels(sequelize, Sequelize) //verificar
const familiares = familiaresModels(sequelize, Sequelize)
const citaControl = citaControlModels(sequelize, Sequelize)
const consejo = consejosModels(sequelize, Sequelize)
const detallesExperiencias = detallesExperienciasModels(sequelize, Sequelize)
const detallesConsejos = detallesConsejosModels(sequelize, Sequelize)
const detallesMedicamentos = detallesMedicamentosModels(sequelize, Sequelize)
const detallesRol = detallesRolModels(sequelize, Sequelize)
const experiencias = experienciasModels(sequelize, Sequelize)
const rol = rolModels(sequelize, Sequelize)

const proyecto = proyectoModels(sequelize, Sequelize)
const detalleProyecto = detalleProyectoModels(sequelize, Sequelize)

const efectosSecundarios = efectosSecundariosModels(sequelize, Sequelize)
const tipoEpilepsia = tipoEpilepsiaModels(sequelize, Sequelize)
const sintomas = sintomasModels(sequelize, Sequelize)

const preguntas = preguntasModels(sequelize, Sequelize)
const respuestas = respuestasModels(sequelize, Sequelize)
const pacientes = pacientesModels(sequelize, Sequelize)

usuario.hasMany(efectosSecundarios)
efectosSecundarios.belongsTo(usuario)

usuario.hasMany(tipoEpilepsia)
tipoEpilepsia.belongsTo(usuario)

usuario.hasMany(sintomas)
sintomas.belongsTo(usuario)


usuario.hasMany(contactosEmergencia)
contactosEmergencia.belongsTo(usuario)

usuario.hasMany(colaboracion)
colaboracion.belongsTo(usuario)

usuario.hasMany(medicacion)
medicacion.belongsTo(usuario)

usuario.hasMany(ataque)
ataque.belongsTo(usuario)

usuario.hasMany(medico)
medico.belongsTo(usuario)

familiares.hasMany(contactosEmergencia)
contactosEmergencia.belongsTo(familiares)

usuario.hasMany(detallesRol)
detallesRol.belongsTo(usuario)

rol.hasMany(detallesRol)
detallesRol.belongsTo(rol)

consejo.hasMany(detallesConsejos)
detallesConsejos.belongsTo(consejo)

experiencias.hasMany(detallesExperiencias)
detallesExperiencias.belongsTo(experiencias)

medicacion.hasMany(detallesMedicamentos)
detallesMedicamentos.belongsTo(medicacion)

usuario.hasMany(citaControl)
citaControl.belongsTo(usuario)

proyecto.hasMany(detalleProyecto)
detalleProyecto.belongsTo(proyecto)

usuario.hasMany(proyecto)
proyecto.belongsTo(usuario)

usuario.hasMany(preguntas)
preguntas.belongsTo(usuario)

usuario.hasMany(respuestas)
respuestas.belongsTo(usuario)

preguntas.hasMany(respuestas)
respuestas.belongsTo(preguntas)

pacientes.hasMany(experiencias)
experiencias.belongsTo(pacientes)

pacientes.hasMany(consejo)
consejo.belongsTo(pacientes)

pacientes.hasMany(citaControl)
citaControl.belongsTo(pacientes)

pacientes.hasMany(medicacion)
medicacion.belongsTo(pacientes)

pacientes.hasMany(contactosEmergencia)
contactosEmergencia.belongsTo(pacientes)

module.exports = {
    usuario,
    medicacion,
    ataque,
    medico,
    contactosEmergencia,
    familiares,
    citaControl,
    consejo,
    detallesConsejos,
    detallesExperiencias,
    detallesMedicamentos,
    detallesRol,
    experiencias,
    rol,

    proyecto,
    detalleProyecto,
    efectosSecundarios,

    tipoEpilepsia,
    sintomas,
    preguntas,
    respuestas,
    pacientes
}