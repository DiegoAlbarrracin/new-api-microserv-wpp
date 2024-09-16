const express = require('express');
const cors = require('cors');
const jwtMiddleware = require('./middleware/jwtMiddleware');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));


app.use('/api', require('./routes/login'));
app.use('/api', jwtMiddleware, require('./routes/getUsuarios'));
app.use('/api', jwtMiddleware, require('./routes/getNegociosByPhoneNumber'));
app.use('/api', jwtMiddleware, require('./routes/getNegociosAbiertos'));
app.use('/api', jwtMiddleware, require('./routes/getNegocio'));
app.use('/api', jwtMiddleware, require('./routes/getNegociosByCliente'));


const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
