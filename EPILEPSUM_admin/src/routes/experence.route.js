const express = require('express');
const router = express.Router();
const pool = require("../Configuration/basededatos.sql");
const fileUpload = require('express-fileupload');



const { getScreeam, add } = require('../controllers/experience.controller');

router.get('/list-view', getScreeam);
router.post('/add', add);

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM experiencias WHERE ID = ?', [id]);

    req.flash('success', 'Experiencia borrado correctamente');

    res.redirect('/list-view');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const experences = await pool.query('SELECT * FROM experiencias WHERE id = ?', [id]);
    res.render('pages/experence/experence-edit', { experence: experences[0] })

});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nombreExperiencia,
        descripcionExperiencia
    } = req.body;
    const newExperence = {
        nombreExperiencia,
        descripcionExperiencia
    };

    await pool.query('UPDATE experiencias set ? WHERE id = ?', [newExperence, id]);
    req.flash('success', 'experiencia actualizado correctamente');

    res.redirect('/list-view');

});

router.get('/add-experence', (req, res) => {
    res.render('pages/experence/experence-add');
});


router.post('/image-experence/:id', async (req, res) => {
    const { id } = req.params;

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message', 'No Ingresaste una Foto o Imagen')
        return res.status(400).redirect('/list-view');
    }

    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/img/image-experence/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE experiencias SET imagenExperiencia = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Foto de experiencia actualizado');
        res.redirect('/list-view');

    });
});


module.exports = router