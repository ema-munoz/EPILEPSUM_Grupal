const projectCtl = {}

const orm = require('../Configuration/basededatos.orm');
const sql = require('../Configuration/basededatos.sql');

projectCtl.enseñar = async(req, res) => {
    const id = req.user.idusuario
    const project = await sql.query('select * from projects where usuarioIdusuario = ?', [id])
    ren.render('project/agregarProject', { project })
}

projectCtl.dirigir = (req, res) => {
    const id = req.user.idusuario
    const ids = req.params.id
    const { nombre, objetivos, numero } = req.body
    const nuevoEnvio = {
        nombre,
        usuarioIdusuario: id
    }
    await orm.project.create(nuevoEnvio)
    for (let i = 0; i < objetivos.length; i++) {
        await sql.query('INSERT INTO detalleprojects (objetivo, projectIdProyect) VALUES(?, ?)', [objetivos[i], numero])
    }
    req.flash('success', 'guardado')
    res.redirect('/project/lista/' + id)
}
projectCtl.lista = async(req, res) => {
    const ids = req.params.id
    const lista = await ('select * from  projects where usuarioIdusuario = ?', [ids])
    const objetivos = await ('select * from detalleprojects where projectIdProyect')
    res.render('project/listaProject', {
        lista,
        objetivos
    })
}

projectCtl.eliminar = async(req, res) => {
    const id = req.params.id
    await orm.project.destroy({ where: { idProyect: id } })
    await orm.detalleProject.destroy({ where: { projectIdProyect: id } })
    req.flash('success', 'eliminacion')
    res.redirect('/project/lista/' + id)
}

projectCtl.traer = async(req, res) => {
    const ids = req.params.id
    const listas = await ('select * from  projects where idProyect = ?', [ids])
    const objetivos = await ('select * from detalleprojects where projectIdProyect = ?', [ids])
    res.render('project/editarProject', {
        listas,
        objetivos
    })
}

projectCtl.actualizar = async(req, res) => {
    const ids = req.params.id
    const { nombre, objetivos, numero } = req.body
    const nuevoEnvio = {
        nombre,
        usuarioIdusuario: id
    }
    await orm.project.findOne({ where: { idProyect: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    for (let i = 0; i < objetivos.length; i++) {
        await sql.query('UPDATE projects set objetivo = ? , projectIdProyect = ?', [objetivos[i], numero])
    }
    req.flash('success', 'guardado')
    res.redirect('/project/lista/' + id)
}

module.exports = projectCtl