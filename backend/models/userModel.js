import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async (name, email, password, role) => {
  const [result] = await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
  return result.insertId;
};
