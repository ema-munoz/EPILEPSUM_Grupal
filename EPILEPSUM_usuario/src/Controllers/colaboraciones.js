const colaboraciones = {}

const baseDatosSQL = require("../Configuration/basededatos.sql");
const baseDatosORM = require("../Configuration/basededatos.orm");

colaboraciones.mostrar = (req, res) => {
    res.render("colaboraciones/ColaboracionesAgregar");
}

colaboraciones.agregar = async (req, res) => {
    const colaboracionesId = req.params.id;
    const {foto, nombre, descripcion} = req.body
    const nuevoAgregamiento = {
        foto,
        nombre, 
        descripcion,
        usuarioIdusuario: colaboracionesId
    }
    await baseDatosORM.colaboracion.create(nuevoAgregamiento)
    req.flash ("success", "Datos Guardados...")
    res.redirect("/colaboracion/lista/" + colaboracionesId);    
}

colaboraciones.lista = async (req, res) => {
    const colaboracionesId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM colaboraciones WHERE usuarioIdusuario = ?",[colaboracionesId])
    res.render("colaboraciones/ColaboracionesLista", {enlistar});
}

colaboraciones.traerDatos = async (req, res) => {
    const colaboracionesId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM colaboraciones WHERE idcolaboraciones = ?",[colaboracionesId])
    res.render("colaboraciones/ColaboracionesEditar", {enlistar});
}

colaboraciones.editar = async (req, res) => {
    const colaboracionesId = req.params.id;
    const id = req.user.idusuario
    const {foto, nombre, descripcion,} = req.body
    const actualizacion = {
        foto,
        nombre, 
        descripcion,
    }
    await baseDatosORM.colaboracion.findOne({where: {idcolaboraciones: colaboracionesId}})
    .then(colaboraciones => {
        colaboraciones.update(actualizacion)
        req.flash ("success", "Datos Actulizados.")
        res.redirect("/colaboracion/lista/" + id);
    })    
}

colaboraciones.eliminar = async (req, res) => {
    const colaboracionesId = req.params.id;
    const id = req.user.idusuario
    await baseDatosORM.colaboracion.destroy({where: {idcolaboraciones: colaboracionesId}})
    res.redirect("/colaboracion/lista/" + id);
}

module.exports = colaboraciones