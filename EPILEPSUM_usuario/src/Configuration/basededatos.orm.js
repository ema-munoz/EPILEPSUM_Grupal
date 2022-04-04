const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "EPILEPSUM";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Base de datos creada o comprobada correctamente");
    })
})  

const usuarioModels = require('../Model/user')
const medicacionUsuarioModels = require('../Model/medicacion')
const ataquesModels = require('../Model/ataquesEpilepticos')
const medicosModels = require('../Model/medico')
const contactosEmergenciaModels = require('../Model/contactosEmergencia')
const colaboracionesModels = require('../Model/colaboraciones')
const familiaresModels = require ('../Model/familiares')
const citaControlModels = require ('../Model/citaControl')
const consejosModels = require ('../Model/consejos')
const detallesExperienciasModels = require ('../Model/detallesExperiencia')
const detallesConsejosModels = require ('../Model/detallesConsejo')
const detallesMedicamentosModels = require ('../Model/detallesMedicamentos')
const detallesRolModels = require ('../Model/detallesRol')
const experienciasModels = require ('../Model/experiencia')
const rolModels = require ('../Model/rol')

const sequelize = new Sequelize(
  'epilepsum', 
  'root', 
  '', 
  {
  host: 'localhost',
  dialect: 'mysql',
  pool:{
    max:5,
    min:0,
    require:30000,
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

  sequelize.sync({ force: false})
  .then(() =>{
    console.log("Tablas sincronizadas")
  })

  const usuario = usuarioModels(sequelize, Sequelize)
  const medicacion = medicacionUsuarioModels(sequelize, Sequelize)
  const ataque = ataquesModels(sequelize, Sequelize)
  const medico = medicosModels(sequelize, Sequelize)
  const contactosEmergencia = contactosEmergenciaModels(sequelize, Sequelize)
  const colaboracion = colaboracionesModels(sequelize, Sequelize)
  const familiares = familiaresModels(sequelize, Sequelize)
  const citaControl = citaControlModels(sequelize, Sequelize)
  const consejo = consejosModels(sequelize, Sequelize)
  const detallesExperiencias = detallesExperienciasModels(sequelize, Sequelize)  
  const detallesConsejos = detallesConsejosModels(sequelize, Sequelize)  
  const detallesMedicamentos = detallesMedicamentosModels(sequelize, Sequelize)
  const detallesRol = detallesRolModels(sequelize, Sequelize)
  const experiencias = experienciasModels(sequelize, Sequelize)
  const rol = rolModels(sequelize, Sequelize)

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

  module.exports = {
    usuario,
    medicacion,
    ataque,
    medico,
    contactosEmergencia,
    colaboracion,
    familiares,
    citaControl,
    consejo,
    detallesConsejos,
    detallesExperiencias,
    detallesMedicamentos,
    detallesRol,
    experiencias,
    rol
  }
