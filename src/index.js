import express from 'express';
import dotenv from 'dotenv';
import pessoaRoutes from './routes/pessoaRoutes.js';
import formacaoRoutes from './routes/formacaoRoutes.js';
import experienciaRoutes from './routes/experienciaRoutes.js';
import habilidadeRoutes from './routes/habilidadeRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/pessoas', pessoaRoutes);
app.use('/formacoes', formacaoRoutes);
app.use('/experiencias', experienciaRoutes);
app.use('/habilidades', habilidadeRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


