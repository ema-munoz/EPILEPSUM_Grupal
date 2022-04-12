const dudas = {}

const baseDatosSQL = require("../Configuration/basededatos.sql");
const baseDatosORM = require("../Configuration/basededatos.orm");

dudas.mostrar = async (req, res) => {
    res.render("dudas/preguntasAgregar");
}

dudas.mostrarRespuestas = async (req, res) => {
    const preguntasId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM preguntas")
    res.render("dudas/respuestasAgregar", {
        enlistar
    });
}

dudas.agregar = async (req, res) => {
    const preguntasId = req.user.idUsuario;
    const {
        pregunta
    } = req.body
    const nuevoAgregamiento = {
        pregunta,
        usuarioIdUsuario: preguntasId
    }
    await baseDatosORM.preguntas.create(nuevoAgregamiento)
    req.flash("success", "Datos Guardados...")
    res.redirect("/dudas/preguntas/lista/" + preguntasId);
}

dudas.agregarRespuestas = async (req, res) => {
    const respuestasId = req.user.idUsuario;
    const {
        objetivos,
        pregunta,
        numeros,
        unico
    } = req.body
    if (parseInt(numeros) === 1) {
        await baseDatosSQL.query('INSERT INTO respuestas (respuesta, usuarioIdUsuario, preguntaIdPreguntas) VALUES(?, ?, ?)', [unico, respuestasId, pregunta])
    } else {
        if (parseInt(numeros) > 1) {
            for (let i = 0; i < objetivos.length; i++) {
                await baseDatosSQL.query('INSERT INTO respuestas (respuesta, usuarioIdUsuario, preguntaIdPreguntas) VALUES(?, ?, ?)', [objetivos[i], respuestasId, pregunta])
            }
        }
    }

    req.flash('success', 'guardado')
    res.redirect('/dudas/respuestas/lista/' + respuestasId)
}

dudas.lista = async (req, res) => {
    const preguntasId = req.user.idUsuario;
    const enlistar = await baseDatosSQL.query("SELECT * FROM preguntas WHERE usuarioIdUsuario = ?", [preguntasId])
    res.render("dudas/preguntasLista", {
        enlistar
    });
}

dudas.listaRespuestas = async (req, res) => {
    const preguntasId = req.user.idUsuario;
    const enlistar = await baseDatosSQL.query("SELECT * FROM listaDudas WHERE usuarioIdUsuario = ?", [preguntasId])
    res.render("dudas/respuestasLista", {
        enlistar
    });
}

dudas.traerPreguntas = async (req, res) => {
    const preguntasId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM preguntas WHERE idPreguntas = ?", [preguntasId])
    res.render("dudas/preguntasEditar", {
        enlistar
    });
}

dudas.traerRespuestas = async (req, res) => {
    const respuestasId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM respuestas WHERE idRespuesta = ?", [respuestasId])
    const traerPregunta = await baseDatosSQL.query("SELECT DISTINCT idPreguntas, pregunta FROM listaDudas")
    res.render("dudas/respuestasEditar", {
        enlistar,
        traerPregunta
    });
}

dudas.editar = async (req, res) => {
    const preguntasId = req.params.id;
    const id = req.user.idUsuario
    const {
        pregunta,
    } = req.body
    const actualizacion = {
        pregunta
    }
    await baseDatosORM.preguntas.findOne({
            where: {
                idPreguntas: preguntasId
            }
        })
        .then(pregunta => {
            pregunta.update(actualizacion)
            req.flash("success", "Datos Actulizados.")
            res.redirect("/dudas/preguntas/lista/" + id);
        })
}

dudas.editarRespuestas = async (req, res) => {
    const respuestasId = req.params.id;
    const id = req.user.idUsuario
    const {
        respuestas,
        pregunta
    } = req.body
    await baseDatosSQL.query("UPDATE respuestas set respuesta = ? WHERE idRespuesta = ?", [respuestas, respuestasId])
            req.flash("success", "Datos Actulizados.")
            res.redirect("/dudas/respuestas/lista/" + id);
}

dudas.eliminar = async (req, res) => {
    const preguntaId = req.params.id;
    const id = req.user.idUsuario
    await baseDatosORM.preguntas.destroy({
        where: {
            idPreguntas: preguntaId
        }
    })
    res.redirect("dudas/preguntasLista/" + id);
}

dudas.eliminarRespuestas = async (req, res) => {
    const respuestaId = req.params.id;
    const id = req.user.idUsuario
    await baseDatosORM.respuestas.destroy({
        where: {
            idRespuestas: respuestaId
        }
    })
    res.redirect("dudas/respuestasLista/" + id);
}

module.exports = dudas