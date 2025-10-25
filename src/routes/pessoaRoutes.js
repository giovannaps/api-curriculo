import express from 'express';
import { pool } from '../db.js';
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM pessoa');
  res.json(result.rows);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM pessoa WHERE id = $1', [id]);
  res.json(result.rows[0]);
});


router.post('/', async (req, res) => {
  const { nome, email, telefone } = req.body;
  const result = await pool.query(
    'INSERT INTO pessoa (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, telefone]
  );
  res.json(result.rows[0]);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  const result = await pool.query(
    'UPDATE pessoa SET nome=$1, email=$2, telefone=$3 WHERE id=$4 RETURNING *',
    [nome, email, telefone, id]
  );
  res.json(result.rows[0]);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM pessoa WHERE id=$1', [id]);
  res.sendStatus(204);
});

export default router;


