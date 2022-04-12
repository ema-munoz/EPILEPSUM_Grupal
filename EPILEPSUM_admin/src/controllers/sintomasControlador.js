const sintomasCtl = {}

const baseDatosSQL = require("../Configuration/basededatos.sql");
const baseDatosORM = require("../Configuration/basededatos.orm");


sintomasCtl.mostrar = async(req, res) => {
    res.render('sintomas/sintomasAgragar' )
}

sintomasCtl.enviar = async(req, res) => {
    const id = req.user.idusuario
    const { nombreSintomas, descrpcionsintomas} = req.body
    const nuevoEnvio = {
        nombreSintomas,
        descrpcionsintomas,
        usuarioIdusuario: id  
    }
    await baseDatosORM.sintomas.create(nuevoEnvio)
    req.flash('success', 'guardado')
    res.redirect('/sintomas/lista/' + id)
    }


sintomasCtl.lista = async(req, res) => {
const ids = req.params.id
const lista = await baseDatosSQL.query ('select * from  sintomas ?')
res.render('sintomas/sintomasListas',{ lista})
}

sintomasCtl.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await baseDatosSQL.query('select * from  sintomas where usuarioIdusuario = ?', [ids])
    res.render('sintomas/sintomasEditar', { lista})

}

sintomasCtl.actualizar = async(req, res) => {
    const ids = req.params.id
    const id = req.user.idusuario
    const {  nombreSintomas,descrpcionsintomas } = req.body
    const nuevoEnvio = {
        nombreSintomas,
        descrpcionsintomas
    
    }
    await baseDatosORM.proyecto.findOne({ where: { idSintomas: ids } })
    .then(actualizar => {
        actualizar.update(nuevoEnvio)
        req.flash("success","Datos Actulizados")
        res.redirect('/sintomas/lista/' + id)
    })
}

sintomasCtl.eliminar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.idusuario
    await baseDatosORM.sintomas.destroy({ where: { idSintomas: id } })
    req.flash('success', 'eliminacion')
    res.redirect('/sintomas/lista/' + ids)
}

module.exports = sintomasCtl