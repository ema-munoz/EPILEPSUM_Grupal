const index = {};

const baseDatosSQL = require("../Configuration/basededatos.sql");

index.Controlador = (req, res)=>{
    res.render ("Control/Control");
}

index.lista = async (req, res) => {
    const medicamentosId = req.params.id;
    const enlistar = await baseDatosSQL.query("SELECT * FROM medicaciones WHERE usuarioIdusuario = ?", [medicamentosId])
    res.render("Control/Control", {enlistar})
}

module.exports = index;
