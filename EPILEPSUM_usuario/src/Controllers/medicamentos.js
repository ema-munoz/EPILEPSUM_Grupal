const medicamentos = {}

const baseDatosSQL = require("../Configuration/basededatos.sql");
const baseDatosORM = require("../Configuration/basededatos.orm");

medicamentos.mostrar = (req, res) => {
    res.render("Medicamentos/medicamentosAgregar");
}

medicamentos.agregar = async (req, res) => {
    const medicamentosId = req.params.id;
    const {nombre, dosis, hora, fechaInicio, fechaFinal} = req.body
    const nuevoMedicamento = {
        nombre,
        dosis,
        hora,
        fechaInicio, 
        fechaFinal,
        usuarioIdusuario: medicamentosId
    }
    await baseDatosORM.medicacion.create(nuevoMedicamento)
    req.flash ("sucess", "Medicamento Registrado.")
     res.redirect("/medicamentos/lista/" + medicamentosId);
}

medicamentos.lista = async (req, res) => {
    const medicamentosId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM medicaciones WHERE usuarioIdusuario = ?", [medicamentosId])
    res.render("Medicamentos/medicamentosLista", {enlistar})
}

medicamentos.traerDatos = async(req, res) => {
    const medicamentosId = req.params.id;
    const enlistar = await baseDatosSQL.query ("SELECT * FROM medicaciones WHERE idmedicaciones = ?", [medicamentosId])
    res.render("Medicamentos/medicamentosEditar", {enlistar});
}

medicamentos.editar = async (req, res) => {
    const medicamentosId = req.params.id;
    const id = req.user.idusuario
    const {nombre, dosis, hora, fechaInicio, fechaFinal} = req.body
    const actualizacion = {
        nombre,
        dosis,
        hora,
        fechaInicio, 
        fechaFinal
    }
    await baseDatosORM.medicacion.findOne({where: {idmedicaciones: medicamentosId}})
    .then( medicacion => {
        medicacion.update(actualizacion)
        req.flash ("sucess", "Información actualizada.")
        res.redirect("/medicamentos/lista/" + id);
    })
}

medicamentos.eliminar = async (req, res) => {
    const medicamentosId = req.params.id;
    const id = req.user.idusuario
    await baseDatosORM.medicacion.destroy({where: {idmedicaciones: medicamentosId}})
    res.redirect("/medicamentos/lista/" + id);
}

module.exports = medicamentos
