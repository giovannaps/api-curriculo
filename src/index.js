import express from 'express';
import dotenv from 'dotenv';
import pessoaRoutes from './routes/pessoaRoutes.js';
import formacaoRoutes from './routes/formacaoRoutes.js';
import experienciaRoutes from './routes/experienciaRoutes.js';
import habilidadeRoutes from './routes/habilidadeRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API do Currículo funcionando!');
});
 

app.use('/pessoas', pessoaRoutes);
app.use('/formacao', formacaoRoutes);
app.use('/experiencia', experienciaRoutes);
app.use('/habilidade', habilidadeRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


