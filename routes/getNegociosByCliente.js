const express = require('express');
const connection = require("../db/connection"); 
const router = express.Router();

// Ruta para obtener negocios por idCliente
router.get('/getNegociosByCliente/:idCliente', (req, res) => {
  try {
    const parametro = req.params.idCliente;
    connection.query(
      `SELECT n.neg_id,n.neg_fechacierre, n.neg_asunto, m.mon_codigo, n.neg_valor, n.cli_id, c.cli_nombre, n.usu_asig_id, u.usu_nombre, u.usu_number, p.pip_nombre
      FROM negocios n
      INNER JOIN clientes c ON c.cli_id = n.cli_id
      INNER JOIN usuarios u ON u.usu_id = n.usu_asig_id
      INNER JOIN monedas m ON m.mon_id = n.mon_id
      INNER JOIN etapaxnegocio exn on n.neg_id = exn.neg_id
      INNER JOIN etapas e on e.eta_id = exn.eta_id
      INNER JOIN pipelines p on p.pip_id = e.pip_id
      WHERE n.neg_estado=0
      AND c.cli_id = ${parametro}`, 
    (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        return res.status(500).json({ error: 'Error al obtener los registros' });
      }
      res.status(200).json(rows);
    });
  } catch (error) {
    console.error('Error en la ruta /getNegociosByCliente/:idCliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;