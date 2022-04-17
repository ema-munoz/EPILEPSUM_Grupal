const dudas = {}

const baseDatosSQL = require("../Configuration/basededatos.sql");
const baseDatosORM = require("../Configuration/basededatos.orm");

dudas.mostrar = async (req, res) => {
    const idMax = await baseDatosSQL.query("SELECT MAX(idPreguntas) FROM preguntas")
    res.render("dudas/dudasAgregar", {
        idMax
    });
}

dudas.agregar = async (req, res) => {
    const respuestasId = req.user.idUsuario;
    const {
        preguntas,
        objetivos,
        pregunta,
        numeros,
        unico
    } = req.body
    const nuevoAgregamiento = {
        pregunta,
        usuarioIdUsuario: preguntas
    }
    await baseDatosORM.preguntas.create(nuevoAgregamiento)

    if (parseInt(numeros) === 1) {
        await baseDatosSQL.query("INSERT INTO respuestas (respuesta, usuarioIdUsuario, preguntaIdPreguntas) VALUES(?, ?, ?)", [unico, respuestasId, preguntas])
    } else {
        if (parseInt(numeros) > 1) {
            for (let i = 0; i < objetivos.length; i++) {
                await baseDatosSQL.query("INSERT INTO respuestas (respuesta, usuarioIdUsuario, preguntaIdPreguntas) VALUES(?, ?, ?)", [objetivos[i], respuestasId, preguntas])
            }
        }
    }
    req.flash("success", "Datos Guardos")
    res.redirect("/dudas/lista/" + respuestasId)
}

dudas.lista = async (req, res) => {
    const preguntasId = req.user.idUsuario;
    const enlistar = await baseDatosSQL.query("SELECT DISTINCT idPreguntas, pregunta FROM listaDudas WHERE usuarioIdUsuario = ?", [preguntasId])
    res.render("dudas/dudasLista", {
        enlistar
    });
}

dudas.detalle = async (req, res) => {
    const id = req.params.id;
    const preguntasId = req.user.idUsuario;
    const enlistar = await baseDatosSQL.query("SELECT DISTINCT idPreguntas, pregunta FROM listaDudas WHERE idPreguntas = ?", [id])
    const enlistar1 = await baseDatosSQL.query("SELECT DISTINCT respuesta FROM listaDudas WHERE preguntaIdPreguntas = ?", [id])
    res.render("dudas/dudasDetalle", {
        enlistar,
        enlistar1
    });
}

dudas.traer = async (req, res) => {
    const preguntasId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT DISTINCT idPreguntas, pregunta FROM listaDudas WHERE idPreguntas = ?", [preguntasId])
    const enlistar1 = await baseDatosSQL.query("SELECT DISTINCT respuesta FROM listaDudas WHERE preguntaIdPreguntas = ?", [preguntasId])
    res.render("dudas/dudasEditar", {
        enlistar,
        enlistar1
    });
}

dudas.editar = async (req, res) => {
    const respuestasId = req.params.id;
    const id = req.user.idUsuario
    const {
        pregunta,
        respuestas,
        preguntas,
        objetivos1,
        unico,
        numeros
    } = req.body
    const actualizacion = {
        pregunta
    }
    await baseDatosORM.preguntas.findOne({
        where: {
            idPreguntas: respuestasId
        }
    }).then(pregunta => {
        pregunta.update(actualizacion)
    })

    if (respuestas.length > 10) {
        await baseDatosSQL.query("UPDATE respuestas SET respuesta = ? WHERE preguntaIdPreguntas = ? AND idRespuesta = ?", [respuestas, preguntas, respuestasId])

        if (parseInt(numeros) === 1) {
            await baseDatosSQL.query('INSERT INTO respuestas(respuesta, preguntaIdPreguntas, usuarioIdUsuario) VALUES (?,?,?)', [unico, respuestasId, id])
            req.flash("success", "Datos Actulizados.")
            res.redirect("/dudas/lista/" + id);
        }

        if (parseInt(numeros) > 1) {
            for (let j = 0; j < objetivos1.length; j++) {
                await baseDatosSQL.query('INSERT INTO respuestas(respuesta, preguntaIdPreguntas, usuarioIdUsuario) VALUES (?,?,?)', [objetivos1[j], respuestasId, id])
            }
            req.flash("success", "Datos Actulizados.")
            res.redirect("/dudas/lista/" + id);

        }

        if (numeros === "") {
            await sql.query("UPDATE respuestas SET respuesta = ? WHERE idRespuesta = ?", [respuestas, parseInt(respuestasId)])
            console.log("No hay nuevas respuestas")
            req.flash("success", "Se Actualizo Correctamente");
            res.redirect("/dudas/detalle/" + id);
        }
    }

    if (respuestas.length < 10) {
        for (let i = 0; i < respuestas.length; i++) {
            await baseDatosSQL.query("UPDATE respuestas SET respuesta = ? WHERE preguntaIdPreguntas = ? AND idRespuesta = ?", [respuestas[i], preguntas, (parseInt(respuestasId) + i)])
        }

        if (parseInt(numeros) > 1) {
            for (let j = 0; j < objetivos1.length; j++) {
                await baseDatosSQL.query('INSERT INTO respuestas(respuesta, preguntaIdPreguntas, usuarioIdUsuario) VALUES (?,?,?)', [objetivos1[j], respuestasId, id])
            }
            req.flash("success", "Datos Actulizados.")
            res.redirect("/dudas/lista/" + id);
        } else {
            console.log('No hay nuevas respuestas.')
            req.flash("success", "Datos Actulizados.")
            res.redirect("/dudas/lista/" + id);
        }
    }
}

dudas.eliminarDuda = async (req, res) => {
    const respuestaId = req.params.id;
    const id = req.user.idUsuario
    await baseDatosORM.preguntas.destroy({
        where: {
            idPreguntas: respuestaId
        }
    })
    await baseDatosORM.respuestas.destroy({
        where: {
            idRespuesta: respuestaId
        }
    })
    res.redirect("/dudas/lista/" + id);
}

dudas.eliminarRespuesta = async (req, res) => {
    const respuestaId = req.params.id;
    const id = req.user.idUsuario

    await baseDatosORM.respuestas.destroy({
        where: {
            idRespuesta: respuestaId
        }
    })
    res.redirect("/dudas/lista/" + id);
}

module.exports = dudas
