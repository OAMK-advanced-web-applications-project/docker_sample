import { pool } from './db.js'

const getAllTests = async () => {
  return await pool.query('SELECT * FROM test')
  return rows
}

export { getAllTests }