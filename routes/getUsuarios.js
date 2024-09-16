const express = require('express');
const connection = require("../db/connection"); 
const router = express.Router();

// Ruta para obtener usuarios
router.get('/getUsuarios', (req, res) => {
  try {
    connection.query(`SELECT usu_id, usu_nombre FROM usuarios`, (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        return res.status(500).json({ error: 'Error al obtener los registros' });
      }
      res.status(200).json(rows);
    });
  } catch (error) {
    console.error('Error en la ruta /getUsuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
