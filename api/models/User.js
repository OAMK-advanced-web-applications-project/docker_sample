import { pool } from './db.js'

const getUserByEmail = async (email) => {
  const result = await pool.query( 
    'SELECT "userID", username, email, password FROM public.app_users WHERE email = $1', 
    [email], 
  ) 
  return result
}


export { getUserByEmail }
