const express = require('express');
const connection = require("../db/connection"); 
const router = express.Router();

// Ruta para obtener negocios por phoneNumber
router.get('/getNegociosByPhoneNumber/:phoneNumber', (req, res) => {
  try {
    const parametro = req.params.phoneNumber; 
    connection.query(
        `SELECT n.neg_id,n.neg_fechacierre, n.neg_asunto, m.mon_codigo, n.neg_valor, n.cli_id, c.cli_nombre, n.usu_asig_id, u.usu_nombre, u.usu_number
        FROM negocios n
        INNER JOIN clientes c ON c.cli_id = n.cli_id
        INNER JOIN usuarios u ON u.usu_id = n.usu_asig_id
        INNER JOIN monedas m ON m.mon_id = n.mon_id
        WHERE n.neg_estado=0 AND DATE(n.neg_fechacierre) BETWEEN CURDATE() AND CURDATE() + INTERVAL 7 DAY
        AND u.usu_number = ${parametro}`, 
    (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        return res.status(500).json({ error: 'Error al obtener los registros' });
      }
      res.status(200).json(rows);
    });
  } catch (error) {
    console.error('Error en la ruta /getNegociosByPhoneNumber/:phoneNumber:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;