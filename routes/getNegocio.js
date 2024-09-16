const express = require('express');
const connection = require("../db/connection"); 
const router = express.Router();

// Ruta para obtener negocio por idNegocio
router.get('/getNegocio/:idNegocio', (req, res) => {
  try {
    const parametro = req.params.idNegocio;
    connection.query(
      `select n.neg_id,n.neg_asunto ,n.neg_valor ,n.neg_estado ,c.cli_nombre ,c2.con_nombre ,m.mon_codigo,e2.eta_nombre,p.pip_nombre  from negocios n
      inner join clientes c ON c.cli_id =n.cli_id
      left outer join contactos c2 ON c2.con_id =n.con_id
      inner join monedas m ON m.mon_id =n.mon_id
      inner join etapaxnegocio e ON e.neg_id =n.neg_id
      inner join etapas e2 ON e2.eta_id =e.eta_id
      inner join pipelines p ON p.pip_id= e2.pip_id where n.neg_id =${parametro}`,
      (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ', err);
        return res.status(500).json({ error: 'Error al obtener los registros' });
      }
      res.status(200).json(rows);
    });
  } catch (error) {
    console.error('Error en la ruta /getNegocio/:idNegocio: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
