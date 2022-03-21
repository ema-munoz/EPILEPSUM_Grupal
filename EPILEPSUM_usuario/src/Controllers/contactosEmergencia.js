const contactosEmergencia = {}

const baseDatosSQL = require("../Configuration/basededatos.sql");
const baseDatosORM = require("../Configuration/basededatos.orm");

contactosEmergencia.mostrar = async(req, res) => {
    const familiar = await baseDatosSQL.query ("SELECT * FROM familiares");
    res.render("ContactosEmergencias/contatosAgregar", {familiar});
}

contactosEmergencia.agregar = async (req, res) => {
    const contactosEmergenciaId = req.params.id;
    const {nombre, familiar, telefono, celular} = req.body
    const nuevoAgregamiento = {
        nombre, 
        telefono, 
        celular,
        usuarioIdusuario: contactosEmergenciaId,
        familiareIdfamiliar: familiar 
    }
    await baseDatosORM.contactosDeEmergencia.create(nuevoAgregamiento)
    req.flash ("success", "Datos Guardados...")
    res.redirect("/contactos/lista/" + contactosEmergenciaId);    
}

contactosEmergencia.lista = async (req, res) => {
    const contactosEmergenciaId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT c.*, f.* FROM contactosEmergencia c JOIN familiares f ON f.idfamiliar = c.familiareIdfamiliar WHERE usuarioIdusuario = ?",[contactosEmergenciaId])
    res.render("ContactosEmergencias/contactosLista", {enlistar});
}

contactosEmergencia.traerDatos = async (req, res) => {
    const contactosEmergenciaId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM contactosEmergencia WHERE idcontactosEmergencia = ?",[contactosEmergenciaId])
    const familiar = await baseDatosSQL.query ("SELECT * FROM familiares");
    res.render("ContactosEmergencias/contactosEditar", {enlistar, familiar});
}

contactosEmergencia.editar = async (req, res) => {
    const contactosEmergenciaId = req.params.id;
    const id = req.user.idusuario
    const {nombre, familiar, telefono, celular} = req.body
    const actualizacion = {
        nombre,
        telefono, 
        celular,
        familiareIdfamiliar: familiar 
    }
    await baseDatosORM.contactosDeEmergencia.findOne({where: {idcontactosEmergencia: contactosEmergenciaId}})
    .then(contactos => {
        contactos.update(actualizacion)
        req.flash ("success", "Datos Actulizados.")
        res.redirect("/contactos/lista/" + id);
    })    
}

contactosEmergencia.eliminar = async (req, res) => {
    const contactosEmergenciaId = req.params.id;
    const id = req.user.idusuario
    await baseDatosORM.contactosDeEmergencia.destroy({where: {idcontactosEmergencia: contactosEmergenciaId}})
    res.redirect("/contactos/lista/" + id);
}

module.exports = contactosEmergencia