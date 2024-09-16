const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Formato de token incorrecto' });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error en el middleware JWT:', error);
    res.status(500).json({ error: 'Error en la autenticación' });
  }
};

module.exports = jwtMiddleware;
