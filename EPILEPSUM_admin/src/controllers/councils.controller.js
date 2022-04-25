const councilsCtl = {};

const baseDatosSQL = require("../Configuration/basededatos.sql");

councilsCtl.getScreeam = async (req, res) => {
  const councils = await baseDatosSQL.query("SELECT *FROM consejos");

  //    console.log(users);
  res.render("pages/councils/councils-list", { councils });
};

councilsCtl.add = async (req, res) => {
  const { nombreConsejo, descripcionConsejo } = req.body;
  const newCouncil = {
    nombreConsejo,
    descripcionConsejo,
  };
  //console.log(newCouncil);
  await baseDatosSQL.query("INSERT INTO consejos set ?", [newCouncil]);
  req.flash("success", "se agrego un consejo");
  res.redirect("/list-councils");
};

councilsCtl.delete = async (req, res) => {
  const { id } = req.params;
  await baseDatosSQL.query("DELETE FROM consejos WHERE ID = ?", [id]);

  req.flash("success", "Experiencia borrado correctamente");

  res.redirect("/list-councils");
};

module.exports = councilsCtl;