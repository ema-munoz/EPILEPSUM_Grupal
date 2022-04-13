const orm = require("../Configuration/basededatos.orm");
const sql = require("../Configuration/basededatos.sql");
const index = {};

index.mostrar = (req, res) => {
    res.render("Usuario/Verificacion");
}

index.verificacion = async (req, res, done) => {
    const {
        username
    } = req.body
    const verificar = await orm.usuario.findOne({
        where: {
            username: username
        }
    })

    if (verificar) {
        const clientes = verificar;

        if (clientes.username === null) {
            done(null, false, req.flash("success", "No tiene cuenta con este correo, usted será redirigido a Registro."));
        } else {
            res.redirect('/Login/' + clientes.idUsuario);
        }
    } else {
        res.redirect('/Registro');
    }

    const traerTiposEpilepsia = await sql.query("SELECT * FROM tipoEpilepsia")

    if (traerTiposEpilepsia.length == 0) {
        const tipoEpilepsia = traerTiposEpilepsia [0]

        if (tipoEpilepsia === undefined) {
            await sql.query("INSERT INTO tipoEpilepsia (nombreTipoEpilepsia) VALUES ('EPILEPSIA FOCAL')");

            await sql.query("CREATE VIEW listaExperiencia as SELECT e.*, d.* FROM experiencias e join detallesexperiencias d ON  d.experienciaIdExperiencias = e.idExperiencias")

            await sql.query("CREATE VIEW listaDudas as SELECT p.idPreguntas, p.pregunta, r.* FROM preguntas p join respuestas r ON  r.preguntaIdPreguntas = p.idPreguntas")

            await sql.query("CREATE VIEW listaContenido as SELECT c.*, dc.* FROM contenidos c join detalleContenidos dc ON  dc.contenidoIdContenido = c.idContenido;")

            console.log("Guardado con éxito.")
        }
    } else {
        console.log("Ya esta creado.")
    }
}

module.exports = index;
