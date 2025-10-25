import express from 'express';
import { pool } from '../db.js';
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM formacao');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM formacao WHERE id = $1', [id]);
  res.json(result.rows[0]);
});


router.post('/', async (req, res) => {
  const { pessoa_id, curso, instituicao, ano_inicio, ano_fim } = req.body;
  const result = await pool.query(
    'INSERT INTO formacao (pessoa_id, curso, instituicao, ano_inicio, ano_fim) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [pessoa_id, curso, instituicao, ano_inicio, ano_fim]
  );
  res.json(result.rows[0]);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { pessoa_id, curso, instituicao, ano_inicio, ano_fim } = req.body;
  const result = await pool.query(
    'UPDATE formacao SET pessoa_id=$1, curso=$2, instituicao=$3, ano_inicio=$4, ano_fim=$5 WHERE id=$6 RETURNING *',
    [pessoa_id, curso, instituicao, ano_inicio, ano_fim, id]
  );
  res.json(result.rows[0]);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM formacao WHERE id=$1', [id]);
  res.sendStatus(204);
});

export default router;
