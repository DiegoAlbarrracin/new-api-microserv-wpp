const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Simular la validación del usuario
    const storedUser = { username: process.env.STORED_USERNAME, password: bcrypt.hashSync(process.env.STORED_PASSWORD, 10) }; // Contraseña hasheada

    if (username === storedUser.username && bcrypt.compareSync(password, storedUser.password)) {
      const token = jwt.sign({ username: storedUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login exitoso', token });
    }

    return res.status(401).json({ error: 'Credenciales inválidas' });
  } catch (error) {
    console.error('Error en la ruta /login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
