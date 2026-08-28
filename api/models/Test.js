import { pool } from './db.js'

const getAllTests = async () => {
  const rows = await pool.query('SELECT * FROM test')
  return rows
}

export { getAllTests }