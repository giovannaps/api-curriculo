import express from 'express';
import { pool } from '../db.js';
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM habilidade');
  res.json(result.rows);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM habilidade WHERE id = $1', [id]);
  res.json(result.rows[0]);
});


router.post('/', async (req, res) => {
  const { pessoa_id, nome, nivel } = req.body;
  const result = await pool.query(
    'INSERT INTO habilidade (pessoa_id, nome, nivel) VALUES ($1,$2,$3) RETURNING *',
    [pessoa_id, nome, nivel]
  );
  res.json(result.rows[0]);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { pessoa_id, nome, nivel } = req.body;
  const result = await pool.query(
    'UPDATE habilidade SET pessoa_id=$1, nome=$2, nivel=$3 WHERE id=$4 RETURNING *',
    [pessoa_id, nome, nivel, id]
  );
  res.json(result.rows[0]);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM habilidade WHERE id=$1', [id]);
  res.sendStatus(204);
});

export default router;
