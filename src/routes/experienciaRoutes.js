import express from 'express';
import { pool } from '../db.js';
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM experiencia');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM experiencia WHERE id = $1', [id]);
  res.json(result.rows[0]);
});


router.post('/', async (req, res) => {
  const { pessoa_id, cargo, empresa, inicio, fim, descricao } = req.body;
  const result = await pool.query(
    'INSERT INTO experiencia (pessoa_id, cargo, empresa, inicio, fim, descricao) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [pessoa_id, cargo, empresa, inicio, fim, descricao]
  );
  res.json(result.rows[0]);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { pessoa_id, cargo, empresa, inicio, fim, descricao } = req.body;
  const result = await pool.query(
    'UPDATE experiencia SET pessoa_id=$1, cargo=$2, empresa=$3, inicio=$4, fim=$5, descricao=$6 WHERE id=$7 RETURNING *',
    [pessoa_id, cargo, empresa, inicio, fim, descricao, id]
  );
  res.json(result.rows[0]);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM experiencia WHERE id=$1', [id]);
  res.sendStatus(204);
});

export default router;
