const express = require('express');
const router = express.Router();
const pool = require("../Configuration/basededatos.sql");
const fileUpload = require('express-fileupload');



const { getScreeam, add } = require('../controllers/councils.controller');

router.get('/list-councils', getScreeam);
router.post('/add-councils', add);

router.get('/deleted/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM consejos WHERE ID = ?', [id]);

    req.flash('success', 'consejos borrado correctamente');

    res.redirect('/list-councils');
});

router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const councils = await pool.query('SELECT * FROM consejos WHERE id = ?', [id]);
    res.render('pages/councils/councils-edit', { council: councils[0] })

});

router.post('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nombreConsejo,
        descripcionConsejo
    } = req.body;
    const newCouncils = {
        nombreConsejo,
        descripcionConsejo
    };

    await pool.query('UPDATE consejos set ? WHERE id = ?', [newCouncils, id]);
    req.flash('success', 'consejos actualizado correctamente');

    res.redirect('/list-councils');

});

router.get('/add-councils', (req, res) => {
    res.render('pages/councils/councils-add');
});


router.post('/image-councils/:id', async (req, res) => {
    const { id } = req.params;

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message', 'No Ingresaste una Foto o Imagen')
        return res.status(400).redirect('/list-councils');
    }

    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/img/image-councils/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE consejos SET imagenConsejo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Foto de consejos actualizado');
        res.redirect('/list-councils');

    });
});


module.exports = router