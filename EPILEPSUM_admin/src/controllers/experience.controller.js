const experenceCtl = {};

const baseDatosSQL = require("../Configuration/basededatos.sql");

experenceCtl.getScreeam = async (req, res) => {
  const experences = await baseDatosSQL.query("SELECT *FROM experiencias");

  //    console.log(users);
  res.render("pages/experence/experence-list", { experences });
};

experenceCtl.add = async (req, res) => {
  const { nombreExperiencia, descripcionExperiencia } = req.body;
  const newExperence = {
    nombreExperiencia,
    descripcionExperiencia,
  };
  await baseDatosSQL.query("INSERT INTO experiencias set ?", [newExperence]);
  req.flash("success", "se agrego una experiencia");
  res.redirect("/list-view");
};

experenceCtl.delete = async (req, res) => {
  const { id } = req.params;
  await baseDatosSQL.query("DELETE FROM experiencias WHERE ID = ?", [id]);

  req.flash("success", "Experiencia borrado correctamente");

  res.redirect("/list-view");
};

module.exports = experenceCtl;
