import { pool } from './db.js'

const getUserByEmail = async (email) => {
  const result = await pool.query( 
    'SELECT "userID", username, email, password FROM public.app_users WHERE email = $1', 
    [email], 
  ) 
  return result
}

const deleteUser = async (userId) => {
  const result = await pool.query(
    'DELETE FROM app_users WHERE "userID" = $1 RETURNING *', [userId]
  )
  return result.rows[0]
}


export { getUserByEmail, deleteUser }
