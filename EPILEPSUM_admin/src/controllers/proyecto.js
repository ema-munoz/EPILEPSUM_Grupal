const proyectoCtl = {}

const orm = require('../Configuration/basededatos.orm');
const sql = require('../Configuration/basededatos.sql');

proyectoCtl.enseñar = async(req, res) => {
    const id = req.user.idusuario
    const proyecto = await sql.query('select * from proyectos where usuarioIdusuario = ?', [id])
    ren.render('proyecto/agregarProyecto', { proyecto })
}

proyectoCtl.dirigir = (req, res) => {
    const id = req.user.idusuario
    const ids = req.params.id
    const { nombreProyecto, objetivos, numero } = req.body
    const nuevoEnvio = {
        nombreProyecto,
        usuarioIdusuario: id
    }
    await orm.proyecto.create(nuevoEnvio)
    for (let i = 0; i < objetivos.length; i++) {
        await sql.query('INSERT INTO detalleproyectos (objetivo, proyectoIdProyect) VALUES(?, ?)', [objetivos[i], numero])
    }
    req.flash('success', 'guardado')
    res.redirect('/proyecto/lista/' + id)
}

proyectoCtl.lista = async(req, res) => {
    const ids = req.params.id
    const lista = await ('select * from  proyectos where usuarioIdusuario = ?', [ids])
    const objetivos = await ('select * from detalleproyectos where proyectoIdProyect')
    res.render('proyecto/listaProyecto', {
        lista,
        objetivos
    })
}

proyectoCtl.eliminar = async(req, res) => {
    const id = req.params.id
    await orm.proyecto.destroy({ where: { idProyect: id } })
    await orm.detalleProyecto.destroy({ where: { proyectoIdProyect: id } })
    req.flash('success', 'eliminacion')
    res.redirect('/proyecto/lista/' + id)
}

proyectoCtl.traer = async(req, res) => {
    const ids = req.params.id
    const listas = await ('select * from  proyectos where idProyect = ?', [ids])
    const objetivos = await ('select * from detalleproyectos where proyectoIdProyect = ?', [ids])
    res.render('proyecto/editarProyecto', {
        listas,
        objetivos
    })
}

proyectoCtl.actualizar = async(req, res) => {
    const ids = req.params.id
    const { nombreProyecto, objetivos, numero } = req.body
    const nuevoEnvio = {
        nombreProyecto,
        usuarioIdusuario: id
    }
    await orm.proyecto.findOne({ where: { idProyect: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    for (let i = 0; i < objetivos.length; i++) {
        await sql.query('UPDATE proyectos set objetivo = ? , proyectoIdProyect = ?', [objetivos[i], numero])
    }
    req.flash('success', 'guardado')
    res.redirect('/proyecto/lista/' + id)
}

module.exports = proyectoCtl